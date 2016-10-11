# ${AtLeastWin2000}

Checks if the installer is running on Windows 2000.

## Syntax

    logic_lib_statement ${AtLeastWin2000}

## Example

    ${If} ${AtLeastWin2000}
        DetailPrint "Windows 2000 or higher"
    ${Else}
        DetailPrint "Older than Windows 2000"
    ${EndIf}

## Credits

*unknown*
