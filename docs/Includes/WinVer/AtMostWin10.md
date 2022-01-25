# ${AtMostWin10}

Checks if the installer is running on Windows 10 at most.

## Syntax

    logic_lib_statement ${AtMostWin10}

## Example

    ${If} ${AtMostWin10}
        DetailPrint "Windows 10 or lower"
    ${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0b2
