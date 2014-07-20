# IsWinVista

---

Checks if the installer is running on Windows Vista exactly as specified.

## Syntax

	logic_lib_statement ${IsWinVista}

## Example

	${If} ${IsWinVista}
		DetailPrint "Windows Vista or higher"
	${Else}
		DetailPrint "Older than Windows Vista"
	${EndIf}

## Credits

*unknown*

---
