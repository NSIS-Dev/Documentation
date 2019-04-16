# ${AtMostWin2003}

Checks if the installer is running on Windows Server 2003 at most.

## Syntax

    logic_lib_statement ${AtMostWin2003}

## Example

    ${If} ${AtMostWin2003}
        DetailPrint "Windows Server 2003 or lower"
    ${EndIf}

## Credits

*unknown*
