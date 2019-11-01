# FileSeek

Seeks a file opened with [`FileOpen`][1]. If mode is omitted or specified as SET, the file is positioned to "offset", relative to the beginning of the file. If mode is specified as CUR, then the file is positioned to "offset", relative to the current file position. If mode is specified as END, then the file is positioned to "offset", relative to the end of the file. If the final parameter "new position" is specified, the new file position will be stored to that variable.

## Parameters

    handle offset [mode] [user_var(new position)]

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\file.dat r
    IfErrors done
    FileSeek $0 -5 END
    FileRead $0 $1
    DetailPrint $1
    FileClose $0
    done:

## History

Added in NSIS v1.60

[1]: FileOpen.md
