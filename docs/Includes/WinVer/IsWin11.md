# ${IsWin11}

Checks if the installer is running on Windows 11 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin11}

## Example

    ${If} ${IsWin11}
        DetailPrint "Running on Windows 11"
    ${Else}
        DetailPrint "Not running on Windows 11"
    ${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.09
