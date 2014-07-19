# GetLabelAddress

---

Gets the address of the label and stores it in the output user variable. This user variable then can be passed to [`Call`][1] or [`Goto`][2]. Note that you may only call this with labels accessible from your function, but you can call it from anywhere (which is potentially dangerous). Note that if you [`Call`][1] the output of `GetLabelAddress`, code will be executed until it [`Return`][3]'s (explicitly or implicitly at the end of a function), and then you will be returned to the statement after the [`Call`][1].

## Parameters:

    user_var(output) label

## Example:

	!include LogicLib.nsh
	PageEx directory
		DirVerify leave
		PageCallbacks "" "" dirLeave
	PageExEnd
	 
	Function dirLeave
		GetInstDirError $0
		${Switch} $0
			${Case} 0
				MessageBox MB_OK "valid installation directory"
				${Break}
			${Case} 1
				MessageBox MB_OK "invalid installation directory!"
				Abort
				${Break}
			${Case} 2
				MessageBox MB_OK "not enough free space!"
				Abort
				${Break}
		${EndSwitch}
	FunctionEnd

## History:

Added in NSIS v1.80

---

[1]: Call.markdown
[2]: Goto.markdown
[3]: Return.markdown