# ${GetFileName}

Get last part from directory path.

## Syntax

```nsis
${GetFileName} "[PathString]" $var
```

## Example

```nsis
Section
    ${GetFileName} "C:\Program Files\Winamp\uninstwa.exe" $R0
    ; $R0="uninstwa.exe"
SectionEnd
```

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
