# ManifestSupportedOS

---

Declare that the installer is compatible with the specified Windows version(s). This adds a SupportedOS entry in the compatibility section of the application manifest. The default list of Win7+Win8 will probably be updated to include newer Windows versions in the future. none is the default if [`RequestExecutionLevel`][1] is set to none for compatibility reasons.

You can read more about the changes in behavior on [MSDN][2].

## Parameters

    none|all|WinVista|Win7|Win8|Win10|{GUID} [...]

## History

Added in NSIS v3.0a0

---

[1]: RequestExecutionLevel.md
[2]: http://msdn.microsoft.com/en-us/library/windows/desktop/hh848036