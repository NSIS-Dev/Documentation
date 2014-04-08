# .onRebootFailed

---

This callback is called if [`Reboot`][1] fails. [`WriteUninstaller`][2], plug-ins, [`File`][3] and [`WriteRegBin`][4] should not be used in this callback.

## Example:

	Function .onRebootFailed
		MessageBox MB_OK|MB_ICONSTOP "Reboot failed. Please reboot manually." /SD IDOK
	FunctionEnd

---

[1]: ../Reference/Reboot.markdown
[2]: ../Reference/WriteUninstaller.markdown
[3]: ../Reference/File.markdown
[4]: ../Reference/WriteRegBin.markdown