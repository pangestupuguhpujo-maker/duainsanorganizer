Add-Type -AssemblyName System.Drawing
$dir = "C:\Users\triag\.gemini\antigravity\brain\40bec7ef-07b9-49b9-afd5-43ac2f4f24d3\.user_uploaded"
$files = Get-ChildItem -Path $dir | Where-Object { $_.Name -like "*1791217*" -or $_.Name -like "*1791218*" }
foreach ($f in $files) {
    try {
        $bmp = [System.Drawing.Bitmap]::FromFile($f.FullName)
        Write-Host ("{0} : {1} x {2} ({3} bytes)" -f $f.Name, $bmp.Width, $bmp.Height, $f.Length)
        $bmp.Dispose()
    } catch {
        Write-Host ("{0} : error" -f $f.Name)
    }
}
