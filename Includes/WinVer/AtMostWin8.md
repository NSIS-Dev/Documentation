# AtMostWin8

Checks if the installer is running on Windows 8 at most.

## Syntax

	logic_lib_statement ${AtMostWin8}

## Example

	${If} ${AtMostWin8}
		DetailPrint "Windows 8 or lower"
	${Else}
		DetailPrint "Windows version is higher"
	${EndIf}

## Credits

*unknown*
