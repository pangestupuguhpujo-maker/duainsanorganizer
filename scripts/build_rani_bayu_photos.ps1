Add-Type -AssemblyName System.Drawing

$csharp = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class UltraSharpRaniBayu
{
    public static Bitmap SmartSharpen(Bitmap src, float fineAmount, float microAmount)
    {
        int width = src.Width;
        int height = src.Height;
        Bitmap result = new Bitmap(width, height, PixelFormat.Format32bppArgb);

        BitmapData srcData = src.LockBits(new Rectangle(0, 0, width, height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        BitmapData resData = result.LockBits(new Rectangle(0, 0, width, height), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

        int stride = srcData.Stride;
        int bytes = Math.Abs(stride) * height;
        byte[] srcBuf = new byte[bytes];
        byte[] tempBuf = new byte[bytes];
        byte[] resBuf = new byte[bytes];

        Marshal.Copy(srcData.Scan0, srcBuf, 0, bytes);
        Array.Copy(srcBuf, tempBuf, bytes);
        Array.Copy(srcBuf, resBuf, bytes);

        // Pass 1: Fine edge sharpening
        float cFine = 1.0f + 4.0f * fineAmount;
        float nFine = -fineAmount;

        for (int y = 1; y < height - 1; y++)
        {
            int rPrev = (y - 1) * stride;
            int rCurr = y * stride;
            int rNext = (y + 1) * stride;

            for (int x = 1; x < width - 1; x++)
            {
                int px = x * 4;
                for (int c = 0; c < 3; c++)
                {
                    float val = srcBuf[rCurr + px + c] * cFine
                              + srcBuf[rPrev + px + c] * nFine
                              + srcBuf[rNext + px + c] * nFine
                              + srcBuf[rCurr + (px - 4) + c] * nFine
                              + srcBuf[rCurr + (px + 4) + c] * nFine;

                    if (val < 0) val = 0;
                    if (val > 255) val = 255;
                    tempBuf[rCurr + px + c] = (byte)val;
                }
            }
        }

        // Pass 2: Micro-contrast enhancement
        for (int y = 2; y < height - 2; y++)
        {
            int rPrev2 = (y - 2) * stride;
            int rNext2 = (y + 2) * stride;
            int rCurr  = y * stride;

            for (int x = 2; x < width - 2; x++)
            {
                int px = x * 4;
                for (int c = 0; c < 3; c++)
                {
                    float centerVal = tempBuf[rCurr + px + c];
                    float surr = (tempBuf[rPrev2 + px + c] + tempBuf[rNext2 + px + c] +
                                  tempBuf[rCurr + (px - 8) + c] + tempBuf[rCurr + (px + 8) + c]) * 0.25f;

                    float diff = centerVal - surr;
                    float val = centerVal + diff * microAmount;

                    if (val < 0) val = 0;
                    if (val > 255) val = 255;
                    resBuf[rCurr + px + c] = (byte)val;
                }
            }
        }

        Marshal.Copy(resBuf, 0, resData.Scan0, bytes);
        src.UnlockBits(srcData);
        result.UnlockBits(resData);

        return result;
    }

    public static Bitmap CropAndScale(Bitmap src, Rectangle cropRect, int targetW, int targetH, float fineAmount, float microAmount)
    {
        Bitmap cropped = src.Clone(cropRect, src.PixelFormat);
        Bitmap scaled = new Bitmap(targetW, targetH, PixelFormat.Format32bppArgb);

        using (Graphics g = Graphics.FromImage(scaled))
        {
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
            g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
            g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
            g.DrawImage(cropped, new Rectangle(0, 0, targetW, targetH), 0, 0, cropRect.Width, cropRect.Height, GraphicsUnit.Pixel);
        }

        cropped.Dispose();
        Bitmap sharp = SmartSharpen(scaled, fineAmount, microAmount);
        scaled.Dispose();
        return sharp;
    }
}
"@

if (-not ([System.Management.Automation.PSTypeName]'UltraSharpRaniBayu').Type) {
    Add-Type -TypeDefinition $csharp -ReferencedAssemblies System.Drawing
}

$destDir = "C:\Users\triag\.gemini\antigravity\scratch\dua-insan-organizer\public\images\portfolio"
$srcDir = "C:\Users\triag\.gemini\antigravity\brain\40bec7ef-07b9-49b9-afd5-43ac2f4f24d3\.user_uploaded"

$codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegCodec = $codecs | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]98)

# 1. Cover: media_1791217417996.jpg (1024 x 682 -> 2400 x 1600)
$srcCover = [System.Drawing.Bitmap]::FromFile("$srcDir\media_1791217417996.jpg")
$coverRect = New-Object System.Drawing.Rectangle(0, 0, $srcCover.Width, $srcCover.Height)
$outCover = [UltraSharpRaniBayu]::CropAndScale($srcCover, $coverRect, 2400, 1600, 0.38, 0.25)
$coverPath = "$destDir\rani-bayu-cover.jpg"
$outCover.Save($coverPath, $jpegCodec, $encoderParams)
$srcCover.Dispose()
$outCover.Dispose()
Write-Host "Generated: $coverPath (2400 x 1600)"

# 2. Kirab Kembar Mayang: media_1791217466146.jpg (1024 x 682 -> crop X=20, W=909, H=682 -> 2400 x 1800)
$srcKirab = [System.Drawing.Bitmap]::FromFile("$srcDir\media_1791217466146.jpg")
$kirabRect = New-Object System.Drawing.Rectangle(20, 0, 909, 682)
$outKirab = [UltraSharpRaniBayu]::CropAndScale($srcKirab, $kirabRect, 2400, 1800, 0.38, 0.25)
$kirabPath = "$destDir\rani-bayu-kirab.jpg"
$outKirab.Save($kirabPath, $jpegCodec, $encoderParams)
$srcKirab.Dispose()
$outKirab.Dispose()
Write-Host "Generated: $kirabPath (2400 x 1800)"

# 3. Arak-arakan Senyum Bahagia: media_1791217771643.jpg (1024 x 682 -> crop X=57, W=909, H=682 -> 2400 x 1800)
$srcArak = [System.Drawing.Bitmap]::FromFile("$srcDir\media_1791217771643.jpg")
$arakRect = New-Object System.Drawing.Rectangle(57, 0, 909, 682)
$outArak = [UltraSharpRaniBayu]::CropAndScale($srcArak, $arakRect, 2400, 1800, 0.38, 0.25)
$arakPath = "$destDir\rani-bayu-arak-arakan.jpg"
$outArak.Save($arakPath, $jpegCodec, $encoderParams)
$srcArak.Dispose()
$outArak.Dispose()
Write-Host "Generated: $arakPath (2400 x 1800)"

# 4. Kacar-kucur: media_1791217794737.jpg (682 x 1024 -> crop Y=350, W=682, H=511 -> 2400 x 1800)
$srcKacar = [System.Drawing.Bitmap]::FromFile("$srcDir\media_1791217794737.jpg")
$kacarRect = New-Object System.Drawing.Rectangle(0, 350, 682, 511)
$outKacar = [UltraSharpRaniBayu]::CropAndScale($srcKacar, $kacarRect, 2400, 1800, 0.38, 0.25)
$kacarPath = "$destDir\rani-bayu-kacar-kucur.jpg"
$outKacar.Save($kacarPath, $jpegCodec, $encoderParams)
$srcKacar.Dispose()
$outKacar.Dispose()
Write-Host "Generated: $kacarPath (2400 x 1800)"

# 5. Koordinasi Tim WO: media_1791218029476.jpg (1024 x 686 -> crop X=80, W=914, H=686 -> 2400 x 1800)
$srcWo = [System.Drawing.Bitmap]::FromFile("$srcDir\media_1791218029476.jpg")
$woRect = New-Object System.Drawing.Rectangle(80, 0, 914, 686)
$outWo = [UltraSharpRaniBayu]::CropAndScale($srcWo, $woRect, 2400, 1800, 0.38, 0.25)
$woPath = "$destDir\rani-bayu-wo-koordinasi.jpg"
$outWo.Save($woPath, $jpegCodec, $encoderParams)
$srcWo.Dispose()
$outWo.Dispose()
Write-Host "Generated: $woPath (2400 x 1800)"

Write-Host "All 5 Rani & Bayu photos generated successfully in Ultra-HD."
