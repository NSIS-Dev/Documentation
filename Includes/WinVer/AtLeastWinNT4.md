# ${AtLeastWinNT4}

Checks if the installer is running on Windows NT4.

## Syntax

    logic_lib_statement ${AtLeastWinNT4}

## Example

    ${If} ${AtLeastWinNT4}
        DetailPrint "Windows NT 4 or higher"
    ${EndIf}

## Credits

*unknown*
