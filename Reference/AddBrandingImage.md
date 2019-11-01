# AddBrandingImage

Adds a branding image on the top, bottom, left, or right of the installer. Its size will be set according to the width/height specified, the installer width/height and the installers font. The final size will not always be what you requested; have a look at the output of the command for the actual size. Because this depends on the installers, you should use [`SetFont`][1] before `AddBrandingImage`. The default padding value is 2.

`AddBrandingImage` only adds a placeholder for an image. To set the image itself at runtime, use [`SetBrandingImage`][2].

## Parameters

    (left|right|top|bottom) (width|height) [padding]

## Example

    AddBrandingImage left 100
    AddBrandingImage right 50
    AddBrandingImage top 20
    AddBrandingImage bottom 35
    AddBrandingImage left 100 5

## History

Added in NSIS v2.0 Alpha 2

[1]: SetFont.md
[2]: SetBrandingImage.md
