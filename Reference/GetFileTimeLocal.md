# GetFileTimeLocal

---

This is similar to [`GetFileTime`][1], only it acts on the system building the installer (it actually compiles into two [`StrCpy`][2] commands). Sets the two output variables with the file timestamp of the file on the build system.

## Parameters

    filename user_var(high dword output) user_var(low dword output)

## History

Added in NSIS v1.60

---

[1]: GetFileTime.md
[2]: StrCpy.md