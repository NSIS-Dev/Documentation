# ExecShellWait

Execute the specified program and continue immediately. Note that the file specified must exist on the target system, not the compiling system. [`$OUTDIR`][1] is used as the working directory. The error flag is set if the process could not be launched. Note, if the command could have spaces, you should put it in quotes to delimit it from parameters. e.g.: `Exec '"$INSTDIR\command.exe" parameters'`. If you don't put it in quotes it will not work on Windows 9x with or without parameters.

## Parameters

    [/INVOKEIDLIST] action command [parameters] [SW_SHOWDEFAULT | SW_SHOWNORMAL | SW_SHOWMAXIMIZED | SW_SHOWMINIMIZED | SW_HIDE]

## Example

    ExecShellWait "open" "http://nsis.sf.net/"
    ExecShellWait "open" "$INSTDIR\readme.txt"
    ExecShellWait "print" "$INSTDIR\readme.txt"

## History

Added in NSIS v3.02

[1]: ../Variables/OUTDIR.md
