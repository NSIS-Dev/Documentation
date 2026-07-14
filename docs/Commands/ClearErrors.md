# ClearErrors

Clears the error flag.

## Example

```nsis
ClearErrors
IfErrors 0 +2
MessageBox MB_OK "this message box will never show"
```

## History

Added in NSIS v1.2g
