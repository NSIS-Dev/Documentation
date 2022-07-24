# ${AtMostWin11}

Checks if the installer is running on Windows 11 at most.

## Syntax

    logic_lib_statement ${AtMostWin11}

## Example

    ${If} ${AtMostWin11}
        DetailPrint "Windows 11 or lower"
    ${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.09
