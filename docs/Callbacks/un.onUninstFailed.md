# un.onUninstFailed

This callback is called when the user hits the 'cancel' button after the uninstall has failed (if it used the [`Abort`][1] command or otherwise failed).

## Example

    Function un.onUninstFailed
        MessageBox MB_OK "Better luck next time."
    FunctionEnd

[1]: ../Commands/Abort.md
