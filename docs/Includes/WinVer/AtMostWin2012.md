# ${AtMostWin2012}

Checks if the installer is running on Windows Server 2012 at most.

## Syntax

    logic_lib_statement ${AtMostWin2012}

## Example

    ${If} ${AtMostWin2012}
        DetailPrint "Windows Server 2012 or lower"
    ${EndIf}

## Credits

*unknown*
