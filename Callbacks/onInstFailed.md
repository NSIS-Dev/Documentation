# .onInstFailed

This callback is called when the user hits the 'cancel' button after the install has failed (if it could not extract a file, or the install script used the Abort command).

## Example

    Function .onInstFailed
        MessageBox MB_OK "Better luck next time."
    FunctionEnd
