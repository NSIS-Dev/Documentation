# ${GetExePath}

Get installer pathname ([`$EXEDIR`][1] with valid case for Windows 98/Me).

## Syntax

```nsis
${GetExePath} $var
```

## Example

```nsis
Section
    ${GetExePath} $R0
    ; $R0="C:\ftp"
SectionEnd
```

## Credits

Written by [Instructor][2]

[1]: ../../Variables/EXEDIR.md
[2]: http://nsis.sourceforge.net/User:Instructor
