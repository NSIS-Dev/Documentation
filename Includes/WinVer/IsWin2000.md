# ${IsWin2000}

Checks if the installer is running on Windows 2000 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin2000}

## Example

    ${If} ${IsWin2000}
        DetailPrint "Running on Windows 2000"
    ${Else}
        DetailPrint "Not running on Windows 2000"
    ${EndIf}

## Credits

*unknown*
