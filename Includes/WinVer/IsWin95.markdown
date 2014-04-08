# IsWin95

---

Checks if the installer is running on Windows 95 exactly as specified.

## Syntax:

	logic_lib_statement ${IsWin95}

## Example:

	${If} ${IsWin95}
		DetailPrint "Windows 95 or higher"
	${Else}
		DetailPrint "Older than Windows 95"
	${EndIf}

## Credits:

*unknown*

---
