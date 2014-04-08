# AtLeastWin95

---

Checks if the installer is running on Windows 95.

## Syntax:

	logic_lib_statement ${AtLeastWin95}

## Example:

	${If} ${AtLeastWin95}
		DetailPrint "Windows 95 or higher"
	${Else}
		DetailPrint "Older than Windows 95"
	${EndIf}

## Credits:

*unknown*

---
