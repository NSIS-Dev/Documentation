# AtLeastWin10

Checks if the installer is running on Windows 10.

## Syntax

	logic_lib_statement ${AtLeastWin10}

## Example

	${If} ${AtLeastWin10}
		DetailPrint "Windows 10 or higher"
	${Else}
		DetailPrint "Older than Windows 10"
	${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0b2
