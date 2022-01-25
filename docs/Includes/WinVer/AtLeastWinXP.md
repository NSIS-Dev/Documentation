# ${AtLeastWinXP}

Checks if the installer is running on Windows XP.

## Syntax

    logic_lib_statement ${AtLeastWinXP}

## Example

    ${If} ${AtLeastWinXP}
        DetailPrint "Windows XP or higher"
    ${EndIf}

## Credits

*unknown*
