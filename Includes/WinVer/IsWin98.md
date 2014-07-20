# IsWin98

---

Checks if the installer is running on Windows 98 exactly as specified.

## Syntax

	logic_lib_statement ${IsWin98}

## Example

	${If} ${IsWin98}
		DetailPrint "Windows 98 or higher"
	${Else}
		DetailPrint "Older than Windows 98"
	${EndIf}

## Credits

*unknown*

---
