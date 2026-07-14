# ${EnableX64FSRedirection}

Enables file system redirection.

## Syntax

```nsis
${EnableX64FSRedirection}
```

## Example

```nsis
SetOutPath $SYSDIR
${EnableX64FSRedirection}
File some.dll # extracts to C:\Windows\SysWOW64
```

## Credits

*unknown*
