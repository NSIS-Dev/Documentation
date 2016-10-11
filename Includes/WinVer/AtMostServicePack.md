# ${AtMostServicePack}

Checks if the installer is running on Windows service version pack at most as specified.

## Syntax

    logic_lib_statement ${AtMostServicePack} service_pack_version

## Example

    ${If} ${IsWinXP}
    ${AndIf} ${AtMostServicePack} 2
        DetailPrint "Windows XP with SP2 (or lower)"
    ${Else}
        DetailPrint "Not Windows XP, or higher service pack installed"
    ${EndIf}

## Credits

*unknown*
