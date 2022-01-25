# ${IsWin7}

Checks if the installer is running on Windows 7 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin7}

## Example

    ${If} ${IsWin7}
        DetailPrint "Running on Windows 7"
    ${Else}
        DetailPrint "Not running on Windows 7"
    ${EndIf}

## Credits

*unknown*
