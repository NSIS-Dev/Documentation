# FileReadByte

Reads a byte from a file opened with [`FileOpen`][1]. The byte is stored in the output as an integer (0-255). If the end of file is read and no more data is available, the output will be empty, and the error flag will be set.

## Parameters

    handle user_var(output)

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\file.dat r
    IfErrors done
    FileReadByte $0 $1
    FileReadByte $0 $2
    DetailPrint "$1 $2"
    FileClose $0
    done:

## History

Added in NSIS v1.80

[1]: FileOpen.md
