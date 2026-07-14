# ${AtLeastWin7}

Checks if the installer is running on Windows 7.

## Syntax

```
logic_lib_statement ${AtLeastWin7}
```

## Example

```nsis
${If} ${AtLeastWin7}
    DetailPrint "Windows 7 or higher"
${EndIf}
```

## Credits

*unknown*
