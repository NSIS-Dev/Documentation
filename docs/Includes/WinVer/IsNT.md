# ${IsNT}

Checks if the installer is running on Windows NT family (NT4, 2000, XP, etc.)

## Syntax

    logic_lib_statement ${IsNT}

## Example

    ${If} ${IsNT}
        DetailPrint "Running on NT. Installing Unicode enabled application."
    ${Else}
        DetailPrint "Not running on NT. Installing ANSI application."
    ${EndIf}

## Credits

*unknown*
