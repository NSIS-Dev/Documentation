# ${AtMostWin2008}

Checks if the installer is running on Windows Server 2008 at most.

## Syntax

    logic_lib_statement ${AtMostWin2008}

## Example

    ${If} ${AtMostWin2008}
        DetailPrint "Windows Server 2008 or lower"
    ${EndIf}

## Credits

*unknown*
