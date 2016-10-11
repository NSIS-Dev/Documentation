# ${AtMostWin98}

Checks if the installer is running on Windows 98 at most.

## Syntax

    logic_lib_statement ${AtMostWin98}

## Example

    ${If} ${AtMostWin98}
        DetailPrint "Windows 98 or lower"
    ${Else}
        DetailPrint "Windows version is higher"
    ${EndIf}

## Credits

*unknown*
