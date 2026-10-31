# Servidor local simple para ver el sitio en http://localhost:5173
# Uso:  powershell -ExecutionPolicy Bypass -File servidor-local.ps1
$root = Join-Path $PSScriptRoot 'sitio'
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:5173/')
$listener.Start()
Write-Host "Sirviendo $root en http://localhost:5173"
$types = @{ '.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.css'='text/css'; '.svg'='image/svg+xml'; '.png'='image/png'; '.webp'='image/webp'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.pdf'='application/pdf'; '.json'='application/json' }
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
  if ($path -eq '') { $path = 'index.html' }
  # Permite guardar un PNG/JPG en assets/ (usado para el recorte de la foto)
  if ($ctx.Request.HttpMethod -eq 'PUT' -and ($path -like 'assets/*.png' -or $path -like 'assets/*.jpg')) {
    $dest = [IO.Path]::GetFullPath((Join-Path $root $path))
    if ($dest.StartsWith((Join-Path $root 'assets'))) {
      $fs = [IO.File]::Create($dest); $ctx.Request.InputStream.CopyTo($fs); $fs.Close()
      $ctx.Response.StatusCode = 201
    } else { $ctx.Response.StatusCode = 403 }
    $ctx.Response.Close(); continue
  }
  $file = [IO.Path]::GetFullPath((Join-Path $root $path))
  if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
    $ext = [IO.Path]::GetExtension($file).ToLower()
    $ctx.Response.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
    $bytes = [IO.File]::ReadAllBytes($file)
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else { $ctx.Response.StatusCode = 404 }
  $ctx.Response.Close()
}
