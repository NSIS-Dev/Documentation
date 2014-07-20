# IsWin2003

---

Checks if the installer is running on Windows Server 2003 exactly as specified.

## Syntax

	logic_lib_statement ${IsWin2003}

## Example

	${If} ${IsWin2003}
		DetailPrint "Windows Server 2003 or higher"
	${Else}
		DetailPrint "Older than Windows Server 2003"
	${EndIf}

## Credits

*unknown*

---
