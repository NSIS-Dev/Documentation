# ${GetParameters}

Get command line parameters.

## Syntax

```nsis
${GetParameters} $var
```

## Example

```nsis
Section
    ${GetParameters} $R0
    ; $R0="[parameters]"
SectionEnd
```

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
