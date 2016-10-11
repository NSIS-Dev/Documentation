# ${AtLeastWin8}.1

Checks if the installer is running on Windows 8.1.

## Syntax

    logic_lib_statement ${AtLeastWin8.1}

## Example

    ${If} ${AtLeastWin8.1}
        DetailPrint "Windows 8.1 or higher"
    ${Else}
        DetailPrint "Older than Windows 8.1"
    ${EndIf}

## Credits

*unknown*
