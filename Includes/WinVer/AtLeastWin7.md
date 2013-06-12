# AtLeastWin7

---

Checks if the installer is running on Windows 7.

## Syntax:

	logic_lib_statement ${AtLeastWin7}

## Example:

	${If} ${AtLeastWin7}
		DetailPrint "Windows 7 or higher"
	${Else}
		DetailPrint "Older than Windows 7"
	${EndIf}

## Credits:

*unknown*

---
