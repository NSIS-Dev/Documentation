# ${AtLeastWinVista}

Checks if the installer is running on Windows Vista.

## Syntax

    logic_lib_statement ${AtLeastWinVista}

## Example

    ${If} ${AtLeastWinVista}
        DetailPrint "Windows Vista or higher"
    ${EndIf}

## Credits

*unknown*
