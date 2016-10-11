# ${GetOptions}

Get options from command line parameters.

## Syntax

    ${GetOptions} "[Parameters]" "[Option]" $var

    "[Parameters]"     ; command line parameters
                       ;
    "[Option]"         ; option name
                       ;
    $var               ; Result: option string

Note:

- Error flag if option not found 
- First option symbol it is delimiter

## Examples

### Example 1

    Section
        ${GetOptions} "/S /T" "/T"  $R0

        IfErrors 0 +2
        MessageBox MB_OK "Not found" IDOK +2
        MessageBox MB_OK "Found"
    SectionEnd

### Example 2

    Section
        ${GetOptions} "-INSTDIR=C:\Program Files\Common Files -SILENT=yes" "-INSTDIR="  $R0
        ;$R0=C:\Program Files\Common Files
    SectionEnd

### Example 3

    Section
        ${GetOptions} '/SILENT=yes /INSTDIR="C:/Program Files/Common Files" /ADMIN=password' "/INSTDIR="  $R0
        ;$R0=C:/Program Files/Common Files
    SectionEnd

### Example 4

    Section
        ${GetOptions} `-SILENT=yes -INSTDIR='"C:/Program Files/Common Files"' -ADMIN=password` "-INSTDIR="  $R0
        ;$R0="C:/Program Files/Common Files"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor