Add-Type -AssemblyName System.Drawing

$dirTest = "C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\testimoni-test"
if (-not (Test-Path $dirTest)) { New-Item -ItemType Directory -Path $dirTest | Out-Null }

# 1. Rani & Bayu: from public/images/portfolio/rani-bayu-cover.jpg (2400 x 1600)
$bmp1 = [System.Drawing.Bitmap]::FromFile("C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\portfolio\rani-bayu-cover.jpg")
Write-Host ("Rani-Bayu: {0} x {1}" -f $bmp1.Width, $bmp1.Height)
$c1 = $bmp1.Clone((New-Object System.Drawing.Rectangle(750, 150, 900, 900)), $bmp1.PixelFormat)
$c1.Save("$dirTest\test-rani-bayu.jpg")
$bmp1.Dispose()
$c1.Dispose()

# 2. Rida & Arfin: from public/images/portfolio/rida-arfin-akad.jpg
$bmp2 = [System.Drawing.Bitmap]::FromFile("C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\portfolio\rida-arfin-akad.jpg")
Write-Host ("Rida-Arfin-Akad: {0} x {1}" -f $bmp2.Width, $bmp2.Height)
$c2 = $bmp2.Clone((New-Object System.Drawing.Rectangle(900, 320, 800, 800)), $bmp2.PixelFormat)
$c2.Save("$dirTest\test-rida-arfin.jpg")
$bmp2.Dispose()
$c2.Dispose()

# 3. Ilma & Dio: from public/images/portfolio/ilma-dio-pelaminan.jpg
$bmp3 = [System.Drawing.Bitmap]::FromFile("C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\portfolio\ilma-dio-pelaminan.jpg")
Write-Host ("Ilma-Dio-Pelaminan: {0} x {1}" -f $bmp3.Width, $bmp3.Height)
$c3 = $bmp3.Clone((New-Object System.Drawing.Rectangle(750, 150, 900, 900)), $bmp3.PixelFormat)
$c3.Save("$dirTest\test-ilma-dio.jpg")
$bmp3.Dispose()
$c3.Dispose()

# 4. Atika & Edo: from public/images/paket/paket-signature.jpg
$bmp4 = [System.Drawing.Bitmap]::FromFile("C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\paket\paket-signature.jpg")
Write-Host ("Paket-Signature: {0} x {1}" -f $bmp4.Width, $bmp4.Height)
$c4 = $bmp4.Clone((New-Object System.Drawing.Rectangle(600, 200, 1500, 1500)), $bmp4.PixelFormat)
$c4.Save("$dirTest\test-atika-edo.jpg")
$bmp4.Dispose()
$c4.Dispose()

# 5. Nanda & Zahori: from public/images/paket/paket-prestige.jpg
$bmp5 = [System.Drawing.Bitmap]::FromFile("C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\paket\paket-prestige.jpg")
Write-Host ("Paket-Prestige: {0} x {1}" -f $bmp5.Width, $bmp5.Height)
# In paket-prestige, couple is standing in center: X ~ 1300..1800, Y ~ 700..1500.
# Let's crop X=1300, Y=700, W=600, H=600
$c5 = $bmp5.Clone((New-Object System.Drawing.Rectangle(1300, 750, 600, 600)), $bmp5.PixelFormat)
$c5.Save("$dirTest\test-nanda-zahori.jpg")
$bmp5.Dispose()
$c5.Dispose()

Write-Host "Avatars test crops saved."
