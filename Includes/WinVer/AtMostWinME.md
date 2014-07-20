# AtMostWinME

---

Checks if the installer is running on Windows ME at most.

## Syntax

	logic_lib_statement ${AtMostWinME}

## Example

	${If} ${AtMostWinME}
		DetailPrint "Windows ME or lower"
	${Else}
		DetailPrint "Windows version is higher"
	${EndIf}

## Credits

*unknown*

---
