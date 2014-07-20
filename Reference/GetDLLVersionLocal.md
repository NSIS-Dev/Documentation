# GetDLLVersionLocal

---

This is similar to [`GetDLLVersion`][1], only it acts on the system building the installer (it actually compiles into two [`StrCpy`][2] commands). Sets the two output variables with the DLL version information of the DLL on the build system.

## Parameters

    localfilename user_var(high dword output) user_var(low dword output)

## History

Added in NSIS v1.60

---

[1]: GetDLLVersion.md
[2]: StrCpy.md