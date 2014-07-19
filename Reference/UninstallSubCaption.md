# UninstallSubCaption

---

Sets the default subcaptions for the uninstaller pages (0=": Confirmation",1=": Uninstalling Files",2=": Completed"). If you specify an empty string (""), the default will be used (you can however specify " " to achieve a blank string).

You can also set a subcaption (or override the default) using [`Caption`][1] inside a [`PageEx`][2] block.

Accepts variables. If variables are used, they must be initialized before the relevant page is created.

## Parameters:

    page_number subcaption

## History:

Added in NSIS v1.56

---

[1]: Caption.md
[2]: PageEx.md