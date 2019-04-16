# ${IsWinXP}

Checks if the installer is running on Windows XP exactly as specified.

## Syntax

    logic_lib_statement ${IsWinXP}

## Example

    ${If} ${IsWinXP}
        DetailPrint "Running on Windows XP"
    ${Else}
        DetailPrint "Not running  Windows XP"
    ${EndIf}

## Credits

*unknown*
