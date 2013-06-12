# AtLeastWin98

---

Checks if the installer is running on Windows 98.

## Syntax:

	logic_lib_statement ${AtLeastWin98}

## Example:

	${If} ${AtLeastWin98}
		DetailPrint "Windows 98 or higher"
	${Else}
		DetailPrint "Older than Windows 98"
	${EndIf}

## Credits:

*unknown*

---
