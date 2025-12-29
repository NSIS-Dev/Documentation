# LoadAndSetImage

Removes a resource added with [`PEAddResource`][PEAddResource].

## Parameters

    [/EXERESOURCE] [/STRINGID] [/RESIZETOFIT[WIDTH|HEIGHT]] ctrl imagetype lrflags imageid [user_var(imagehandle)]

## Example

    LoadAndSetImage /EXERESOURCE $hIconStatic 1 0 103
    LoadAndSetImage /STRINGID /RESIZETOFITWIDTH $hBmpStatic 0 0x10 "$PluginsDir\myimg.bmp"

## History

Added in NSIS v3.05

[PEAddResource]: PEAddResource.md
