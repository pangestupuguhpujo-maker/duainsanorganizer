Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\triag\.gemini\antigravity\brain\40bec7ef-07b9-49b9-afd5-43ac2f4f24d3\.user_uploaded\media_1791285086841.jpg"
$outDir = "C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\hero"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$outPath = "$outDir\hero-cover.jpg"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$bmp = New-Object System.Drawing.Bitmap($src)
$src.Dispose()

# Watermark removal patch
$rect = New-Object System.Drawing.Rectangle(460, 628, 96, 38)
$srcPatch = $bmp.Clone((New-Object System.Drawing.Rectangle(460, 590, 96, 38)), $bmp.PixelFormat)

for ($py = 0; $py -lt $rect.Height; $py++) {
    for ($px = 0; $px -lt $rect.Width; $px++) {
        $distX = [Math]::Min($px, $rect.Width - 1 - $px)
        $distY = [Math]::Min($py, $rect.Height - 1 - $py)
        $dist = [Math]::Min($distX, $distY)
        
        $alpha = 1.0
        if ($dist -lt 5) {
            $alpha = $dist / 5.0
        }
        
        $origColor = $bmp.GetPixel($rect.X + $px, $rect.Y + $py)
        $patchColor = $srcPatch.GetPixel($px, $py)
        
        $newR = [int]([Math]::Round($origColor.R * (1 - $alpha) + $patchColor.R * $alpha))
        $newG = [int]([Math]::Round($origColor.G * (1 - $alpha) + $patchColor.G * $alpha))
        $newB = [int]([Math]::Round($origColor.B * (1 - $alpha) + $patchColor.B * $alpha))
        
        $bmp.SetPixel($rect.X + $px, $rect.Y + $py, [System.Drawing.Color]::FromArgb($newR, $newG, $newB))
    }
}
$srcPatch.Dispose()

# Save with 98% JPEG quality
$codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegCodec = $codecs | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]98)

$bmp.Save($outPath, $jpegCodec, $encoderParams)
$bmp.Dispose()

Write-Host "Processed and saved clean hero image to: $outPath"
