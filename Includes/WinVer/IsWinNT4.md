# IsWinNT4

---

Checks if the installer is running on Windows NT4 exactly as specified.

## Syntax:

	logic_lib_statement ${IsWinNT4}

## Example:

	${If} ${IsWinNT4}
		DetailPrint "Windows NT4 or higher"
	${Else}
		DetailPrint "Older than Windows NT4"
	${EndIf}

## Credits:

*unknown*

---
