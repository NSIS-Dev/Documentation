# ${IsWinVista}

Checks if the installer is running on Windows Vista exactly as specified.

## Syntax

    logic_lib_statement ${IsWinVista}

## Example

    ${If} ${IsWinVista}
        DetailPrint "Running on Windows Vista"
    ${Else}
        DetailPrint "Not running on Windows Vista"
    ${EndIf}

## Credits

*unknown*
