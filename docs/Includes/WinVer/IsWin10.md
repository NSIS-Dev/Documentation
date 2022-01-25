# ${IsWin10}

Checks if the installer is running on Windows 10 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin10}

## Example

    ${If} ${IsWin10}
        DetailPrint "Running on Windows 10"
    ${Else}
        DetailPrint "Not running on Windows 10"
    ${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0b2
