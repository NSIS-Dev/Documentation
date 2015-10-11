# AtMostWin2000

Checks if the installer is running on Windows 2000 at most.

## Syntax

	logic_lib_statement ${AtMostWin2000}

## Example

	${If} ${AtMostWin2000}
		DetailPrint "Windows 2000 or lower"
	${Else}
		DetailPrint "Windows version is higher"
	${EndIf}

## Credits

*unknown*
