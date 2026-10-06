Add-Type -AssemblyName System.Drawing

$dirOut = "C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\testimoni"
if (-not (Test-Path $dirOut)) { New-Item -ItemType Directory -Path $dirOut | Out-Null }

$codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegCodec = $codecs | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]98)

function MakeAvatar($srcPath, $rect, $targetSize, $outPath) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $cropped = $src.Clone($rect, $src.PixelFormat)
    $scaled = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $g = [System.Drawing.Graphics]::FromImage($scaled)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.DrawImage($cropped, (New-Object System.Drawing.Rectangle(0, 0, $targetSize, $targetSize)), 0, 0, $rect.Width, $rect.Height, [System.Drawing.GraphicsUnit]::Pixel)
    
    $scaled.Save($outPath, $jpegCodec, $encoderParams)
    
    $g.Dispose()
    $scaled.Dispose()
    $cropped.Dispose()
    $src.Dispose()
    Write-Host "Created: $outPath"
}

# 1. Rani & Bayu: from public/images/portfolio/rani-bayu-cover.jpg (2400 x 1600)
# Couple is facing each other in the center. Center between heads is ~ X=1200, Y=550.
# Crop 900x900 from X=750, Y=140
MakeAvatar "C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\portfolio\rani-bayu-cover.jpg" (New-Object System.Drawing.Rectangle(750, 140, 900, 900)) 600 "$dirOut\testimoni-rani-bayu.jpg"

# 2. Rida & Arfin: from public/images/portfolio/rida-arfin-akad.jpg (2400 x 1598)
# Very close couple portrait. Heads centered at X=1300, Y=700.
# Crop 750x750 from X=920, Y=330
MakeAvatar "C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\portfolio\rida-arfin-akad.jpg" (New-Object System.Drawing.Rectangle(920, 330, 750, 750)) 600 "$dirOut\testimoni-rida-arfin.jpg"

# 3. Ilma & Dio: from public/images/portfolio/ilma-dio-pelaminan.jpg (2400 x 1800)
# Sitting on stage. Groom on left, bride with suntiang on right.
# Crop 880x880 from X=760, Y=180
MakeAvatar "C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\portfolio\ilma-dio-pelaminan.jpg" (New-Object System.Drawing.Rectangle(760, 180, 880, 880)) 600 "$dirOut\testimoni-ilma-dio.jpg"

# 4. Atika & Edo: from public/images/paket/paket-signature.jpg (3072 x 2049)
# Edo on left, Atika on right holding hands.
# Couple faces at X ~ 900..2300, Y ~ 300..1200.
# Crop 1400x1400 from X=700, Y=250
MakeAvatar "C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\paket\paket-signature.jpg" (New-Object System.Drawing.Rectangle(700, 250, 1400, 1400)) 600 "$dirOut\testimoni-atika-edo.jpg"

# 5. Nanda & Zahori: from C:\Users\triag\.gemini\antigravity\brain\40bec7ef-07b9-49b9-afd5-43ac2f4f24d3\.user_uploaded\media_1791125232969.jpg (1024 x 683)
# Close-up portrait of Nanda & Zahori in ballroom! Couple faces at X ~ 300..600, Y ~ 180..500.
# Crop 480x480 from X=280, Y=180
MakeAvatar "C:\Users\triag\.gemini\antigravity\brain\40bec7ef-07b9-49b9-afd5-43ac2f4f24d3\.user_uploaded\media_1791125232969.jpg" (New-Object System.Drawing.Rectangle(280, 180, 480, 480)) 600 "$dirOut\testimoni-nanda-zahori.jpg"

Write-Host "All 5 testimonial avatars created successfully."
