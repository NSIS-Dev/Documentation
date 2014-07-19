# AllowSkipFiles

---

This command specifies whether the user should be able to skip a file or not. A user has an option to skip a file if [`SetOverwrite`][1] is set to on (default) and the installer fails to open a file for writing when trying to extract a file. If off is used the ignore button which allows the user to skip the file will not show and the user will only have an option to abort the installation (Cancel button) or retry opening the file for writing (Retry button). If on is used the user will have an option to skip the file (error flag will be set - see [`SetOverwrite`][1]).

## Parameters:

    on|off

## History:

Added in NSIS v2.0 Beta 4

---

[1]: SetOverwrite.markdown