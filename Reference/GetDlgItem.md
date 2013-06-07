# GetDlgItem

---

Retrieves the handle of a control identified by item_id in the specified dialog box dialog. If you want to get the handle of a control on the inner dialog, first use

	FindWindow user_var(output) "#32770" "" `$HWNDPARENT

to get the handle of the inner dialog.

## Parameters:

    user_var(output) dialog item_id

## Example:

	GetDlgItem $0 $HWNDPARENT 1 # next/install button

## History:

Added in NSIS v2.0

---

[1]: Call.md
[2]: Goto.md