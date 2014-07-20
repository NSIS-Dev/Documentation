# AtMostWinVista

---

Checks if the installer is running on Windows Vista at most.

## Syntax

	logic_lib_statement ${AtMostWinVista}

## Example

	${If} ${AtMostWinVista}
		DetailPrint "Windows Vista or lower"
	${Else}
		DetailPrint "Windows version is higher"
	${EndIf}

## Credits

*unknown*

---
