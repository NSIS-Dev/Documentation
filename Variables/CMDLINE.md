# $CMDLINE

---

The command line of the installer. The format of the command line can be one of the following:

- "full\path to\installer.exe" PARAMETER PARAMETER PARAMETER
- installer.exe PARAMETER PARAMETER PARAMETER
- For parsing out the PARAMETER portion, see [`GetParameters`][1]. If `/D=` is specified on the command line (to override the install directory) it won't show up in `$CMDLINE`.

## History:

Added in NSIS v1.65

---

[1]: ../Includes/FileFunc/GetParameters.md