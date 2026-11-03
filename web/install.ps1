# =============================================================================
# Instalador de Vectopen para Windows (PowerShell 5+).
#
#   irm https://malabo1990.github.io/vectopen-web/install.ps1 | iex
#
# Descarga la última versión de las releases oficiales de GitHub, comprueba la
# suma SHA-256, la instala en %LOCALAPPDATA%\Programs\Vectopen (sin permisos de
# administrador) y crea accesos directos en el menú Inicio y el escritorio.
# Para desinstalar: borra esa carpeta y los dos accesos directos.
# =============================================================================
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'   # Invoke-WebRequest va mucho más rápido sin barra
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$Repo = 'malabo1990/-Vectopen'
$Dest = Join-Path $env:LOCALAPPDATA 'Programs\Vectopen'

function Say($m) { Write-Host "==> $m" -ForegroundColor Cyan }

Say 'Buscando la última versión de Vectopen en GitHub…'
# /releases (no /latest): /latest ignora las betas.
$rel = (Invoke-RestMethod "https://api.github.com/repos/$Repo/releases?per_page=10" -Headers @{ 'User-Agent' = 'vectopen-installer' }) |
	Where-Object { -not $_.draft -and $_.assets.Count -gt 0 } | Select-Object -First 1
if (-not $rel) { throw 'No se encontró ninguna versión publicada.' }
$zip = $rel.assets | Where-Object { $_.name -like '*windows-x64.zip' } | Select-Object -First 1
if (-not $zip) { throw "La versión $($rel.tag_name) no tiene paquete para Windows." }
Say "Versión: $($rel.tag_name)"

$tmp = Join-Path ([IO.Path]::GetTempPath()) ("vectopen-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
	$file = Join-Path $tmp $zip.name
	Say "Descargando $($zip.name) ($([math]::Round($zip.size / 1MB)) MB)…"
	Invoke-WebRequest $zip.browser_download_url -OutFile $file -UseBasicParsing

	$sums = $rel.assets | Where-Object { $_.name -eq 'SHA256SUMS.txt' } | Select-Object -First 1
	if ($sums) {
		$txt = (Invoke-WebRequest $sums.browser_download_url -UseBasicParsing).Content
		if ($txt -is [byte[]]) { $txt = [Text.Encoding]::UTF8.GetString($txt) }
		$line = ($txt -split "`n") | Where-Object { $_ -match [regex]::Escape($zip.name) + '\s*$' } | Select-Object -First 1
		if ($line) {
			$want = ($line -split '\s+')[0].ToLower()
			$got = (Get-FileHash $file -Algorithm SHA256).Hash.ToLower()
			if ($want -ne $got) { throw 'La suma SHA-256 no coincide: descarga dañada.' }
			Say 'Suma SHA-256 correcta.'
		}
	}

	Say "Instalando en $Dest…"
	Get-Process -Name 'Vectopen' -ErrorAction SilentlyContinue | Stop-Process -Force
	if (Test-Path $Dest) { Remove-Item $Dest -Recurse -Force }
	Expand-Archive $file -DestinationPath $tmp -Force
	$inner = Get-ChildItem $tmp -Directory | Where-Object { Test-Path (Join-Path $_.FullName 'Vectopen.exe') } | Select-Object -First 1
	if (-not $inner) { throw 'El paquete no contiene Vectopen.exe.' }
	Move-Item $inner.FullName $Dest

	$exe = Join-Path $Dest 'Vectopen.exe'
	$shell = New-Object -ComObject WScript.Shell
	foreach ($dir in @([Environment]::GetFolderPath('Programs'), [Environment]::GetFolderPath('Desktop'))) {
		$lnk = $shell.CreateShortcut((Join-Path $dir 'Vectopen.lnk'))
		$lnk.TargetPath = $exe
		$lnk.WorkingDirectory = $Dest
		$lnk.Description = 'Vectopen — editor vectorial libre'
		$lnk.Save()
	}
	Say "Listo. ¡Disfruta de Vectopen $($rel.tag_name)! (menú Inicio y escritorio)"
} finally {
	Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
}
