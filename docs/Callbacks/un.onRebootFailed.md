# un.onRebootFailed

This callback is called if [`Reboot`][1] fails. [`WriteUninstaller`][2], plug-ins, [`File`][3] and [`WriteRegBin`][4] should not be used in this callback.

## Example

    Function un.onRebootFailed
        MessageBox MB_OK|MB_ICONSTOP "Reboot failed. Please reboot manually." /SD IDOK
    FunctionEnd

[1]: ../Commands/Reboot.md
[2]: ../Commands/WriteUninstaller.md
[3]: ../Commands/File.md
[4]: ../Commands/WriteRegBin.md
