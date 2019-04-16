# ${IsWin8}

Checks if the installer is running on Windows 8 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin8}

## Example

    ${If} ${IsWin8}
        DetailPrint "Running on Windows 8"
    ${Else}
        DetailPrint "Not running on Windows 8"
    ${EndIf}

## Credits

*unknown*
