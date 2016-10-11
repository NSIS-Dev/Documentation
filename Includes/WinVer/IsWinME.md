# ${IsWinME}

Checks if the installer is running on Windows ME exactly as specified.

## Syntax

    logic_lib_statement ${IsWinME}

## Example

    ${If} ${IsWinME}
        DetailPrint "Windows ME or higher"
    ${Else}
        DetailPrint "Older than Windows ME"
    ${EndIf}

## Credits

*unknown*
