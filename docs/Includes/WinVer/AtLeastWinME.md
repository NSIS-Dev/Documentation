# ${AtLeastWinME}

Checks if the installer is running on Windows ME.

## Syntax

```
logic_lib_statement ${AtLeastWinME}
```

## Example

```nsis
${If} ${AtLeastWinME}
    DetailPrint "Windows ME or higher"
${EndIf}
```

## Credits

*unknown*
