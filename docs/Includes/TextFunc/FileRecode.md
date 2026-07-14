# ${FileRecode}

Recode text file from DOS to Windows format and vice-versa.

## Syntax

```nsis
${FileRecode} "[File]" "[Format]"
```

```
"[File]"        ;
                ;
"[Format]"      ; OemToChar   -from DOS to Windows
                ; CharToOem   -from Windows to DOS
```

Note:

- Error flag if file doesn't exist
- Error flag if syntax error

## Example

```nsis
Section
    ${FileRecode} "C:\SCANDISK.LOG" "CharToOem"
SectionEnd
```

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
