# ${IsWinME}

Checks if the installer is running on Windows ME exactly as specified.

## Syntax

```
logic_lib_statement ${IsWinME}
```

## Example

```nsis
${If} ${IsWinME}
    DetailPrint "Running on Windows ME"
${Else}
    DetailPrint "Not running on Windows ME"
${EndIf}
```

## Credits

*unknown*
