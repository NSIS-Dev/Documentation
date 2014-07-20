# GetInstDirError

---

Use in the leave function of a directory page. Reads the flag set if 'DirVerify leave' is used. Possible values:

* 0: No error
* 1: Invalid installation directory
* 2: Not enough space on installation drive

## Parameters

    user_var(error output)

## Example

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

## History

Added in NSIS v2.0 Release Candidate 1

---
