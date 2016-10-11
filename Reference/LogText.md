# LogText

If installer logging is enabled, inserts text "text" into the log file.

## Parameters

    text

## Example

    IfFileExists $WINDIR\notepad.exe 0 +2
    LogText "$$WINDIR\notepad.exe exists"

## History

Added in NSIS v2.0 Release Candidate 2
