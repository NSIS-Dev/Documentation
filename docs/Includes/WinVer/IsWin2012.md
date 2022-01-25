# ${IsWin2012}

Checks if the installer is running on Windows Server 2012 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin2012}

## Example

    ${If} ${IsWin2012}
        DetailPrint "Running on Windows Server 2012"
    ${Else}
        DetailPrint "Not running on Windows Server 2012"
    ${EndIf}

## Credits

*unknown*
