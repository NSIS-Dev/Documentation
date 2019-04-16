# ${IsWin95}

Checks if the installer is running on Windows 95 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin95}

## Example

    ${If} ${IsWin95}
        DetailPrint "Running on Windows 95"
    ${Else}
        DetailPrint "Not running on Windows 95"
    ${EndIf}

## Credits

*unknown*
