# ${GetExeName}

Get installer filename (with valid case for Windows 98/Me).

## Syntax

    ${GetExeName} $var

## Example

    Section
        ${GetExeName} $R0
        ; $R0="C:\ftp\program.exe"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor