# SetCtlColors

---

Sets a background color and the text color for a static control, edit control, button or a dialog. text_color and bg_color don't accept variables. Use [`GetDlgItem`][1] to get the handle (HWND) of the control. To make the control transparent specify "transparent" as the background color value. You can also specify `/BRANDING` with or without text color and background color to make the control completely gray (or any other color you choose). This is used by the branding text control in the MUI.

Warning: setting the background color of check boxes to "transparent" may not function properly when using [`XPStyle`][2] on. The background may be completely black, instead of transparent, when using certain Windows themes.

## Parameters:

    hwnd [/BRANDING] [text_color] [transparent|bg_color]

## Example:

	FindWindow $0 "#32770" "" $HWNDPARENT
	GetDlgItem $0 $0 1006
	SetCtlColors $0 0xFF0000 0x00FF00

## History:

Added in NSIS v2.0 Release Candidate 2

---

[1]: GetDlgItem.md
[2]: XPStyle.md