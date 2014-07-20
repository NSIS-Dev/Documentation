# ExecWait

---

Execute the specified program and wait for the executed process to quit. See [`Exec`][1] for more information. If no output variable is specified `ExecWait` sets the error flag if the program executed returns a nonzero error code, or if there is an error. If an output variable is specified, `ExecWait` sets the variable with the exit code (and only sets the error flag if an error occurs; if an error occurs the contents of the user variable are undefined). Note, if the command could have spaces, you should put it in quotes to delimit it from parameters. e.g.: ExecWait '"$INSTDIR\command.exe" parameters'. If you don't put it in quotes it will not work on Windows 9x with or without parameters.

## Parameters

    command [user_var(exit code)]

## Example

	ExecWait '"$INSTDIR\someprogram.exe"'
	ExecWait '"$INSTDIR\someprogram.exe"' $0
	DetailPrint "some program returned $0"

## History

Added in NSIS v1.0i

---

[1]: Exec.md