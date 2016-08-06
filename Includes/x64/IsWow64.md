# IsWow64

Checks if the installer is a 32-bit application running on a 64-bit OS. Requires [LogicLib][1].

## Syntax

	logic_lib_statement ${IsWow64}

## Example

	${If} ${IsWow64}
		MessageBox MB_OK "running on x64"
	${EndIf}

## Credits

*unknown*

[1]: https://github.com/NSIS-Handbook/Documentation/tree/master/Includes/LogicLib