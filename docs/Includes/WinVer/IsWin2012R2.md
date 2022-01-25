# ${IsWin2012R2}

Checks if the installer is running on Windows Server 2012 R2 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin2012R2}

## Example

    ${If} ${IsWin2012R2}
        DetailPrint "Running on Windows Server 2012 R2"
    ${Else}
        DetailPrint "Not running on Windows Server 2012 R2"
    ${EndIf}

## Credits

*unknown*
