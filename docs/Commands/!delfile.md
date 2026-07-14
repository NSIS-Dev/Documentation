# !delfile

This command deletes a file on compile time.

## Parameters

```
file
```

## Example

```nsis
!tempfile FILE
!delfile "${FILE}"
!undef FILE
```

## History

Added in NSIS v2.11
