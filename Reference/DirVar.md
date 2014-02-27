# DirVar

---

Specifies which variable is to be used to contain the directory selected. This variable should contain the default value too. This allows to easily create two different directory pages that will not require you to move values in and out of [`$INSTDIR`][1]. The default variable is [`$INSTDIR`][1]. This can only be used in [`PageEx`][2] and for directory and uninstConfirm pages.

## Parameters:

    user_var(dir input/output)

## Example:

	Var ANOTHER_DIR
	PageEx directory
		DirVar $ANOTHER_DIR
	PageExEnd
	 
	Section
		SetOutPath $INSTDIR
		File "a file.dat"
		SetOutPath $ANOTHER_DIR
		File "another file.dat"
	SectionEnd

## History:

Added in NSIS v2.0 Beta 4

---

[1]: ../Variables/$INSTDIR.md
[2]: PageEx.md