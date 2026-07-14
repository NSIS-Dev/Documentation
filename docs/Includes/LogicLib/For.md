# ${For}

Repeats a block of statements varying the value of a variable.

## Syntax

```nsis
${For} expression
```

## Example

```nsis
StrCpy $0 ""

${For} $1 1 5
    StrCpy $0 $0$1
${Next}

; $0 = 12345
```

## Credits

Written by dselkirk and eccles
