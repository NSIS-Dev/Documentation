# AddSize

Tells the installer that the current section needs an additional "size_kb" kilobytes of disk space. Only valid within a section (will have no effect outside of a section or in a function).

## Parameters

```
size_kb
```

## Example

```nsis
Section
    AddSize 500
SectionEnd
```

## History

Added in NSIS v1.53
