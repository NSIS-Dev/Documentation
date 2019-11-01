# ExecShell

Execute the specified program using ShellExecute. Note that action is usually "open", "print", etc, but can be an empty string to use the default action. Parameters and the show type are optional. [`$OUTDIR`][1] is used for the working directory. The error flag is set if the process could not be launched.

## Parameters

    action command [parameters] [SW_SHOWDEFAULT | SW_SHOWNORMAL | SW_SHOWMAXIMIZED | SW_SHOWMINIMIZED | SW_HIDE]

## Example

    ExecShell "open" "http://nsis.sf.net/"
    ExecShell "open" "$INSTDIR\readme.txt"
    ExecShell "print" "$INSTDIR\readme.txt"

## History

Added in NSIS v1.1b

[1]: ../Variables/OUTDIR.md
