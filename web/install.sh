#!/bin/sh
# =============================================================================
# Instalador de Vectopen para Linux y macOS.
#
#   curl -fsSL https://malabo1990.github.io/vectopen-web/install.sh | sh
#
# Opciones (después de «sh -s --»):
#   --portable        Linux: instala en ~/.local (sin sudo), aunque haya dnf/apt
#   --version vX.Y.Z  instala esa versión en lugar de la última
#   --uninstall       quita la instalación portable / la app de macOS
#
#   curl -fsSL https://malabo1990.github.io/vectopen-web/install.sh | sh -s -- --portable
#
# Descarga siempre de las releases oficiales de GitHub
# (https://github.com/malabo1990/-Vectopen/releases) y comprueba la suma
# SHA-256 publicada junto a los paquetes.
# =============================================================================
set -eu

REPO="malabo1990/-Vectopen"
API="https://api.github.com/repos/$REPO/releases"
PORTABLE=0
VERSION=""
UNINSTALL=0

while [ $# -gt 0 ]; do
	case "$1" in
		--portable) PORTABLE=1 ;;
		--version) shift; VERSION="${1:-}" ;;
		--uninstall) UNINSTALL=1 ;;
		-h|--help) sed -n '2,17p' "$0" 2>/dev/null || true; exit 0 ;;
		*) echo "Opción desconocida: $1" >&2; exit 2 ;;
	esac
	shift
done

say() { printf '\033[1m==>\033[0m %s\n' "$*" >&2; }
die() { printf '\033[31mError:\033[0m %s\n' "$*" >&2; exit 1; }
need() { command -v "$1" >/dev/null 2>&1 || die "falta «$1»: instálalo y vuelve a intentarlo"; }

need curl
OS="$(uname -s)"
ARCH="$(uname -m)"
SUDO=""
[ "$(id -u)" -ne 0 ] && SUDO="sudo"

PREFIX="$HOME/.local"
APPDIR="$PREFIX/opt/vectopen"

if [ "$UNINSTALL" -eq 1 ]; then
	case "$OS" in
		Darwin) rm -rf "/Applications/Vectopen.app" "$HOME/Applications/Vectopen.app"; say "Vectopen eliminado de Aplicaciones." ;;
		*) rm -rf "$APPDIR" "$PREFIX/bin/vectopen" "$PREFIX/share/applications/vectopen.desktop" "$PREFIX/share/icons/hicolor/256x256/apps/vectopen.png"
		   say "Instalación portable eliminada. (Si lo instalaste con dnf/apt: «sudo dnf remove vectopen» o «sudo apt remove vectopen».)" ;;
	esac
	exit 0
fi

# ── qué release ──────────────────────────────────────────────────────────────
say "Buscando la última versión de Vectopen en GitHub…"
if [ -n "$VERSION" ]; then
	JSON="$(curl -fsSL "$API/tags/$VERSION")" || die "no existe la versión $VERSION"
else
	# /releases (no /latest): /latest ignora las betas.
	JSON="$(curl -fsSL "$API?per_page=10")" || die "no se pudo consultar GitHub"
fi
TAG="$(printf '%s' "$JSON" | grep -o '"tag_name": *"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)"$/\1/')"
[ -n "$TAG" ] || die "no se encontró ninguna versión publicada"
# Lista de URLs de esa release (la primera de la respuesta).
URLS="$(printf '%s' "$JSON" | grep -o '"browser_download_url": *"[^"]*"' | sed 's/.*"\(https[^"]*\)"$/\1/' | grep "/download/$TAG/")"
pick() { printf '%s\n' "$URLS" | grep -E "$1" | head -1; }
say "Versión: $TAG"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

fetch() {  # fetch URL → $TMP/archivo (y comprueba SHA-256 si está publicada)
	f="$TMP/$(basename "$1")"
	say "Descargando $(basename "$1")…"
	curl -fL --progress-bar "$1" -o "$f"
	sums="$(pick 'SHA256SUMS')"
	if [ -n "$sums" ]; then
		curl -fsSL "$sums" -o "$TMP/SHA256SUMS.txt"
		want="$(grep " $(basename "$f")\$" "$TMP/SHA256SUMS.txt" | cut -d' ' -f1 || true)"
		if [ -n "$want" ]; then
			if command -v sha256sum >/dev/null 2>&1; then got="$(sha256sum "$f" | cut -d' ' -f1)"; else got="$(shasum -a 256 "$f" | cut -d' ' -f1)"; fi
			[ "$want" = "$got" ] || die "la suma SHA-256 no coincide: descarga dañada"
			say "Suma SHA-256 correcta."
		fi
	fi
	echo "$f"
}

install_portable() {
	url="$(pick 'linux-x86_64\.tar\.gz$')"
	[ -n "$url" ] || die "esta versión no tiene paquete portable de Linux"
	f="$(fetch "$url" | tail -1)"
	rm -rf "$APPDIR"; mkdir -p "$APPDIR" "$PREFIX/bin" "$PREFIX/share/applications" "$PREFIX/share/icons/hicolor/256x256/apps"
	tar xzf "$f" -C "$APPDIR" --strip-components=1
	chmod +x "$APPDIR/vectopen.x86_64"
	ln -sf "$APPDIR/vectopen.x86_64" "$PREFIX/bin/vectopen"
	[ -f "$APPDIR/vectopen.png" ] && cp "$APPDIR/vectopen.png" "$PREFIX/share/icons/hicolor/256x256/apps/vectopen.png"
	cat > "$PREFIX/share/applications/vectopen.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Vectopen
Comment=Editor vectorial libre / Free vector editor
Exec=$APPDIR/vectopen.x86_64 %F
Icon=vectopen
Categories=Graphics;VectorGraphics;
Terminal=false
EOF
	command -v update-desktop-database >/dev/null 2>&1 && update-desktop-database "$PREFIX/share/applications" >/dev/null 2>&1 || true
	say "Instalado en $APPDIR"
	case ":$PATH:" in *":$PREFIX/bin:"*) ;; *) say "Añade $PREFIX/bin a tu PATH para usar el comando «vectopen»." ;; esac
}

case "$OS" in
	Linux)
		[ "$ARCH" = "x86_64" ] || die "por ahora solo hay paquetes para Linux x86_64 (tu equipo: $ARCH)"
		if [ "$PORTABLE" -eq 0 ] && command -v dnf >/dev/null 2>&1 && [ -n "$(pick '\.rpm$')" ]; then
			f="$(fetch "$(pick '\.rpm$')" | tail -1)"
			say "Instalando con dnf (te pedirá la contraseña)…"
			$SUDO dnf install -y "$f"
		elif [ "$PORTABLE" -eq 0 ] && command -v apt-get >/dev/null 2>&1 && [ -n "$(pick '_amd64\.deb$')" ]; then
			f="$(fetch "$(pick '_amd64\.deb$')" | tail -1)"
			say "Instalando con apt (te pedirá la contraseña)…"
			$SUDO apt-get install -y "$f"
		else
			install_portable
		fi
		;;
	Darwin)
		need hdiutil
		url="$(pick 'macos-universal\.dmg$')"
		[ -n "$url" ] || die "esta versión no tiene paquete para macOS"
		f="$(fetch "$url" | tail -1)"
		MNT="$TMP/mnt"; mkdir -p "$MNT"
		hdiutil attach -nobrowse -quiet -mountpoint "$MNT" "$f"
		DEST="/Applications"; [ -w "$DEST" ] || DEST="$HOME/Applications"; mkdir -p "$DEST"
		rm -rf "$DEST/Vectopen.app"
		cp -R "$MNT/Vectopen.app" "$DEST/"
		hdiutil detach -quiet "$MNT" || true
		# Sin firmar todavía: quita la cuarentena para que macOS deje abrirla.
		xattr -dr com.apple.quarantine "$DEST/Vectopen.app" 2>/dev/null || true
		say "Instalado en $DEST/Vectopen.app"
		;;
	*)
		die "sistema no soportado por este script ($OS). En Windows usa: irm https://malabo1990.github.io/vectopen-web/install.ps1 | iex"
		;;
esac

say "Listo. ¡Disfruta de Vectopen $TAG!"
