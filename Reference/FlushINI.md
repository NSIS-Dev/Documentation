# FlushINI

Flushes the INI file's buffers. Windows 9x keeps all changes to the INI file in memory. This command causes the changes to be written to the disk immediately. Use it if you edit the INI manually, delete it, move it or copy it right after you change it with [`WriteINIStr`][1], [`DeleteINISec`][2] or [`DeleteINStr`][3].

## Parameters

    ini_filename

## Example

    WriteINIStr $TEMP\something.ini test test test
    FlushINI $TEMP\something.ini
    Delete $TEMP\something.ini

## History

Added in NSIS v2.0 Beta 3

[1]: WriteINIStr.md
[2]: DeleteINISec.md
[3]: DeleteINIStr.md