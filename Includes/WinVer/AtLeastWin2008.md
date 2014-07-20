# AtLeastWin2008

---

Checks if the installer is running on Windows Server 2008.

## Syntax

	logic_lib_statement ${AtLeastWin2008}

## Example

	${If} ${AtLeastWin2008}
		DetailPrint "Windows Server 2008 or higher"
	${Else}
		DetailPrint "Older than Windows Server 2008"
	${EndIf}

## Credits

*unknown*

---
