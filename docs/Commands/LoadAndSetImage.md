# LoadAndSetImage

Loads and sets an image on a static control. ctrl is the handle of the control. `imagetype` must be 0 for bitmaps and 1 for icons (and the control style must match the image type). `lrflags` should be 0x10 to load from a file or 0 to load from a resource. `imageid` specifies the file path or resource name. Use `/EXERESOURCE` to load a resource from the installer .EXE. Use `/STRINGID` if `imageid` is a string, otherwise it is interpreted as a number. Use `/RESIZETOFIT[WIDTH|HEIGHT]` to resize the image to the dimensions of the control. `imagehandle` can optionally receive the handle of the loaded image.

Images loaded on individual pages should be destroyed to minimize resource leaks. If images are loaded into the same control multiple times, the previous image will only be destroyed if it is a bitmap image. Previous icons and 32-bit ARGB bitmaps must be retrieved with `STM_GETIMAGE` and destroyed.

## Parameters

    [/EXERESOURCE] [/STRINGID] [/RESIZETOFIT[WIDTH|HEIGHT]] ctrl imagetype lrflags imageid [user_var(imagehandle)]

## Example

    LoadAndSetImage /EXERESOURCE $hIconStatic 1 0 103
    LoadAndSetImage /STRINGID /RESIZETOFITWIDTH $hBmpStatic 0 0x10 "$PluginsDir\myimg.bmp"

## History

Added in NSIS v3.05
