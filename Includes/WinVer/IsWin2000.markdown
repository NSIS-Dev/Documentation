# IsWin2000

---

Checks if the installer is running on Windows 2000 exactly as specified.

## Syntax:

	logic_lib_statement ${IsWin2000}

## Example:

	${If} ${IsWin2000}
		DetailPrint "Windows 2000 or higher"
	${Else}
		DetailPrint "Older than Windows 2000"
	${EndIf}

## Credits:

*unknown*

---
