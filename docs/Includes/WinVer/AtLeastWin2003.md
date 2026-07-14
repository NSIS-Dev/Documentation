# ${AtLeastWin2003}

Checks if the installer is running on Windows Server 2003.

## Syntax

```
logic_lib_statement ${AtLeastWin2003}
```

## Example

```nsis
${If} ${AtLeastWin2003}
    DetailPrint "Windows Server 2003 or higher"
${EndIf}
```

## Credits

*unknown*
