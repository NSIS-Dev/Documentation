# DirText

---

Used to change the default text on the directory page.

The default string will be used if a string is empty ("").

Accepts variables. If variables are used, they must be initialized before the directory page is created.

## Parameters

    [text] [subtext] [browse_button_text] [browse_dlg_text]

* text: Text above the controls, to the right of the installation icon.
* subtext: Text on the directory selection frame.
* browse\_button\_text: Text on the Browse button.
* browse\_dlg\_text: Text on the "Browse For Folder" dialog, appears after clicking on "Browse" button.

## Example

	DetailPrint "this message will show on the installation window"

## History

Added in NSIS v1.0f

---
