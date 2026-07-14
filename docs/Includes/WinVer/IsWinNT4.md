# ${IsWinNT4}

Checks if the installer is running on Windows NT4 exactly as specified.

## Syntax

```
logic_lib_statement ${IsWinNT4}
```

## Example

```nsis
${If} ${IsWinNT4}
    DetailPrint "Running on Windows NT4"
${Else}
    DetailPrint "Not running on Windows NT4"
${EndIf}
```

## Credits

*unknown*
