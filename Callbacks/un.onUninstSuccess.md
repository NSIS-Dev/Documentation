# un.onUninstSuccess

This callback is called when the uninstall was successful, right before the install window closes (which may be after the user clicks 'Close' if [`SetAutoClose`][1] is set to false)..

## Example

    Function un.onUninstSuccess
        MessageBox MB_OK "Congrats, it's gone."
    FunctionEnd

[1]: ../Reference/SetAutoClose.md