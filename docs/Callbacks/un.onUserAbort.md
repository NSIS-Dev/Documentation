# un.onUserAbort

This callback is called when the user hits the 'cancel' button and the uninstall hasn't already failed. If this function calls [`Abort`][1], the install will not be aborted.

## Example

    Function un.onUserAbort
        MessageBox MB_YESNO "Abort uninstall?" IDYES NoCancelAbort
        Abort ; causes uninstaller to not quit.
        NoCancelAbort:
    FunctionEnd

[1]: ../Commands/Abort.md
