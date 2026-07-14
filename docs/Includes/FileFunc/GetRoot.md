# ${GetRoot}

Get root directory.

## Syntax

```nsis
${GetRoot} "[FullPath]" $var
```

## Examples

### Get root of local folder

```nsis
Section
    ${GetRoot} "C:\Program Files\NSIS" $R0
    ; $R0="C:"
SectionEnd
```

### Get root of network share

```nsis
Section
    ${GetRoot} "\\SuperPimp\NSIS\Source\exehead\Ui.c" $R0
    ; $R0="\\SuperPimp\NSIS"
SectionEnd
```

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
