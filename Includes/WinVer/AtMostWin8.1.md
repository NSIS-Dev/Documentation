# ${AtMostWin8}.1

Checks if the installer is running on Windows 8.1 at most.

## Syntax

    logic_lib_statement ${AtMostWin8.1}

## Example

    ${If} ${AtMostWin8.1}
        DetailPrint "Windows 8.1 or lower"
    ${Else}
        DetailPrint "Windows version is higher"
    ${EndIf}

## Credits

*unknown*
