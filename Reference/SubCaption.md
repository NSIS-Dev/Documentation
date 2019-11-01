# SubCaption

Overrides the subcaptions for each of the installer pages (0=": License Agreement",1=": Installation Options",2=": Installation Directory", 3=": Installing Files", 4=": Completed"). If you specify an empty string (""), the default will be used (you can however specify " " to achieve a blank string).

You can also set a subcaption (or override the default) using [`Caption`][1] inside a [`PageEx`][2] block.

Accepts variables. If variables are used, they must be initialized before the relevant page is created.

## Parameters

    [page_number subcaption]

## History

Added in NSIS v1.56

[1]: Caption.md
[2]: PageEx.md
