# ${AtMostWin95}

Checks if the installer is running on Windows 95 at most.

## Syntax

    logic_lib_statement ${AtMostWin95}

## Example

    ${If} ${AtMostWin95}
        DetailPrint "Windows 95 or lower"
    ${Else}
        DetailPrint "Windows version is higher"
    ${EndIf}

## Credits

*unknown*
