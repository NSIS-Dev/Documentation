# ${IsWin2008}

Checks if the installer is running on Windows Server 2008 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin2008}

## Example

    ${If} ${IsWin2008}
        DetailPrint "Running on Windows Server 2008"
    ${Else}
        DetailPrint "Not running on Windows Server 2008"
    ${EndIf}

## Credits

*unknown*
