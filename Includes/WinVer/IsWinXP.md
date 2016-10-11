# ${IsWinXP}

Checks if the installer is running on Windows XP exactly as specified.

## Syntax

    logic_lib_statement ${IsWinXP}

## Example

    ${If} ${IsWinXP}
        DetailPrint "Windows XP or higher"
    ${Else}
        DetailPrint "Older than Windows XP"
    ${EndIf}

## Credits

*unknown*
