# ${AtMostWinNT4}

Checks if the installer is running on Windows NT4 at most.

## Syntax

    logic_lib_statement ${AtMostWinNT4}

## Example

    ${If} ${AtMostWinNT4}
        DetailPrint "Windows NT4 or lower"
    ${EndIf}

## Credits

*unknown*
