# SetDetailsPrint

---

Sets mode at which commands print their status. None has commands be quiet, listonly has status text only added to the listbox, textonly has status text only printed to the status bar, and both enables both (the default). For extracting many small files, textonly is recommended (especially on Windows 9x with smooth scrolling enabled).

## Parameters:

    none|listonly|textonly|both|lastused

## Example:

	SetDetailsPrint none
	File "secret file.dat"
	SetDetailsPrint both

## History:

Added in NSIS v1.62

---
