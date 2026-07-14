# ${LineSum}

Get sum of lines in text file.

## Syntax

```nsis
${LineSum} "[File]" $var
```

```
"[File]"      ; Input file
$var          ; Result: Sum of lines
```

Note:

- Error flag if input file doesn't exist

## Example

```nsis
Section
    ${LineSum} "C:\a.log" $R0
    ; $R0="54"
SectionEnd
```

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
