# ${AtLeastWin11}

Checks if the installer is running on Windows 11.

## Syntax

    logic_lib_statement ${AtLeastWin11}

## Example

    ${If} ${AtLeastWin11}
        DetailPrint "Windows 11 or higher"
    ${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.09
