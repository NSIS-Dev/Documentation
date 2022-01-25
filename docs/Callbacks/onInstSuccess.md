# .onInstSuccess

This callback is called when the install was successful, right before the install window closes (which may be after the user clicks 'Close' if [`AutoCloseWindow`][1] or [`SetAutoClose`][2] is set to false).

## Example

    Function .onInstSuccess
        MessageBox MB_YESNO "Congrats, it worked. View readme?" IDNO NoReadme
        Exec notepad.exe ; view readme or whatever, if you want.
        NoReadme:
    FunctionEnd

[1]: ../Reference/AutoCloseWindow.md
[2]: ../Reference/SetAutoClose.md
