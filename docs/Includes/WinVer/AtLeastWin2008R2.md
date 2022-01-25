# ${AtLeastWin2008R2}

Checks if the installer is running on Windows Server 2008 R2.

## Syntax

    logic_lib_statement ${AtLeastWin2008R2}

## Example

    ${If} ${AtLeastWin2008R2}
        DetailPrint "Windows Server 2008 R2 or higher"
    ${EndIf}

## Credits

*unknown*
