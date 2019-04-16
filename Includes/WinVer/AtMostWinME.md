# ${AtMostWinME}

Checks if the installer is running on Windows ME at most.

## Syntax

    logic_lib_statement ${AtMostWinME}

## Example

    ${If} ${AtMostWinME}
        DetailPrint "Windows ME or lower"
    ${EndIf}

## Credits

*unknown*
