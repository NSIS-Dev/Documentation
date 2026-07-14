# ${AtMostWinXP}

Checks if the installer is running on Windows XP at most.

## Syntax

```
logic_lib_statement ${AtMostWinXP}
```

## Example

```nsis
${If} ${AtMostWinXP}
    DetailPrint "Windows XP or lower"
${EndIf}
```

## Credits

*unknown*
