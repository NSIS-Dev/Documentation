# ${AtLeastServicePack}

Checks if the installer is running on Windows service pack version at least as specified.

## Syntax

    logic_lib_statement ${AtLeastServicePack} service_pack_version

## Example

    ${If} ${IsWinXP}
    ${AndIf} ${AtLeastServicePack} 1
        DetailPrint "Windows XP with SP1 (or higher)"
    ${Else}
        DetailPrint "Not Windows XP, or no service pack installed"
    ${EndIf}

## Credits

*unknown*
