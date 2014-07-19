# AtMostWin2008R2

---

Checks if the installer is running on Windows Server 2008 R2 at most.

## Syntax:

	logic_lib_statement ${AtMostWin2008R2}

## Example:

	${If} ${AtMostWin2008R2}
		DetailPrint "Windows Server 2008 R2 or lower"
	${Else}
		DetailPrint "Windows version is higher"
	${EndIf}

## Credits:

*unknown*

---
