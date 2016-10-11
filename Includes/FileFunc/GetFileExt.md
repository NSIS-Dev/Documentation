# ${GetFileExt}

Get extension of file.

## Syntax

    ${GetFileExt} "[FileString]" $var

## Example

    Section
        ${GetFileExt} "C:\ftp\program.exe" $R0
        ; $R0="exe"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor