# AtLeastWin8

---

Checks if the installer is running on Windows 8.

## Syntax

	logic_lib_statement ${AtLeastWin8}

## Example

	${If} ${AtLeastWin8}
		DetailPrint "Windows 8 or higher"
	${Else}
		DetailPrint "Older than Windows 8"
	${EndIf}

## Credits

*unknown*

---
