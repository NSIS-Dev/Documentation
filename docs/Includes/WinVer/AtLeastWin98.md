# ${AtLeastWin98}

Checks if the installer is running on Windows 98.

## Syntax

```
logic_lib_statement ${AtLeastWin98}
```

## Example

```nsis
${If} ${AtLeastWin98}
    DetailPrint "Windows 98 or higher"
${EndIf}
```

## Credits

*unknown*
