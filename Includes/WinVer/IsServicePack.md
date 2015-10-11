# IsServicePack

Checks if the installer is running on Windows service pack version exactly as specified.

## Syntax

	logic_lib_statement ${IsServicePack} service_pack_version

## Example

	${If} ${IsWinXP}
	${AndIf} ${IsServicePack} 2
		DetailPrint "Windows XP with SP2"
	${Else}
		DetailPrint "Not Windows XP, or different service pack installed"
	${EndIf}

## Credits

*unknown*
