# !pragma

The pragma commands allows you to change compiler features and behavior.

## Parameters

```
/REGEDIT5 root_key subkey key_name value
```

## Example

```nsis
!pragma warning disable 9000 ; Disable warning about using "Setup.exe" as the name
OutFile "Setup.exe"
```

## History

Added in NSIS v3.02
