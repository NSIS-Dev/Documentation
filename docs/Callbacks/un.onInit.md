# un.onInit

This callback will be called when the uninstaller is nearly finished initializing. If the `un.onInit` function calls [`Abort`][2], the uninstaller will quit instantly. Note that this function can verify and/or modify [`$INSTDIR`][3] if necessary.

## Example

    Function un.onInit
        MessageBox MB_YESNO "This will uninstall. Continue?" IDYES NoAbort
        Abort ; causes uninstaller to quit.
        NoAbort:
    FunctionEnd

or:

    Function un.onInit
        IfFileExists $INSTDIR\myfile.exe found
        Messagebox MB_OK "Uninstall path incorrect"
        Abort
        found:
    FunctionEnd

[1]: ../Reference/Abort.md
[2]: ../Variables/INSTDIR.md
