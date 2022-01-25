# ${AtMostWin2012R2}

Checks if the installer is running on Windows Server 2012 R2 at most.

## Syntax

    logic_lib_statement ${AtMostWin2012R2}

## Example

    ${If} ${AtMostWin2012R2}
        DetailPrint "Windows Server 2012 R2 or lower"
    ${EndIf}

## Credits

*unknown*
