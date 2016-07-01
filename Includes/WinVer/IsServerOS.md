# IsServerOS

Checks if the installer is running on a server version of Windows (NT4, 2003, 2008, etc.)

## Syntax

	logic_lib_statement ${IsServerOS}

## Example

	${If} ${IsServerOS}
		DetailPrint "Running on Windows Server."
	${Else}
		DetailPrint "Not running on Windows Server."
	${EndIf}

## Credits

*unknown*
