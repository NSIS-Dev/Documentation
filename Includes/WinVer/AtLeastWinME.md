# AtLeastWinME

---

Checks if the installer is running on Windows ME.

## Syntax:

	logic_lib_statement ${AtLeastWinME}

## Example:

	${If} ${AtLeastWinME}
		DetailPrint "Windows ME or higher"
	${Else}
		DetailPrint "Older than Windows ME"
	${EndIf}

## Credits:

*unknown*

---
