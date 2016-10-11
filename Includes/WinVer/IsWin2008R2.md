# ${IsWin2008R2}

Checks if the installer is running on Windows Server 2008 R2 exactly as specified.

## Syntax

    logic_lib_statement ${IsWin2008R2}

## Example

    ${If} ${IsWin2008R2}
        DetailPrint "Windows Server 2008 R2 or higher"
    ${Else}
        DetailPrint "Older than Windows Server 2008 R2"
    ${EndIf}

## Credits

*unknown*
