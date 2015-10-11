# AtMostWinXP

Checks if the installer is running on Windows XP at most.

## Syntax

	logic_lib_statement ${AtMostWinXP}

## Example

	${If} ${AtMostWinXP}
		DetailPrint "Windows XP or lower"
	${Else}
		DetailPrint "Windows version is higher"
	${EndIf}

## Credits

*unknown*
