# ${DisableX64FSRedirection}

Disables file system redirection.

## Syntax

```nsis
${DisableX64FSRedirection}
```

## Example

```nsis
SetOutPath $SYSDIR
${DisableX64FSRedirection}
File some.dll # extracts to C:\Windows\System32
```

## Credits

*unknown*
