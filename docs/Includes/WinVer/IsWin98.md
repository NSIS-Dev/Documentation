# ${IsWin98}

Checks if the installer is running on Windows 98 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin98}

## Example

    ${If} ${IsWin98}
        DetailPrint "Running on Windows 98"
    ${Else}
        DetailPrint "Not running on Windows 98"
    ${EndIf}

## Credits

*unknown*
