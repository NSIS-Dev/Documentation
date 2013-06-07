# SetBrandingImage

---

Sets the current bitmap file displayed as the branding image. If no IMGID is specified, the first image control found will be used, or the image control created by [`AddBrandingImage`][1]. Note that this bitmap must be present on the user's machine. Use [`File`][2] first to put it there. If `/RESIZETOFIT` is specified the image will be automatically resized (very poorly) to the image control size. If you used [`AddBrandingImage`][1] you can get this size, by compiling your script and watching for [`AddBrandingImage`][1] output, it will tell you the size. `SetBrandingImage` will not work when called from [`.onInit`][3]!

## Parameters:

    [/IMGID=item_id_in_dialog] [/RESIZETOFIT] path_to_bitmap_file.bmp

## History:

Added in NSIS v2.0 Alpha 2

---

[1]: AddBrandingImage.md
[2]: File.md
[3]: ../Functions/onInit.md