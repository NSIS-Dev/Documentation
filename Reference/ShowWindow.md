# ShowWindow

---

Sets the visibility of a window. Possible show_states are the same as [Windows ShowWindow][1] function. SW_* constants are defined in [Include\WinMessages.nsh][2].

## Parameters:

    hwnd show_state

## Example:

	!include WinMessages.nsh
	GetDlgItem $0 $HWNDPARENT 1
	ShowWindow $0 ${SW_HIDE}
	Sleep 1000
	ShowWindow $0 ${SW_SHOW}

## History:

Added in NSIS v2.0

---

[1]: http://msdn2.microsoft.com/en-us/library/ms633548
[2]: http://nsis.sourceforge.net/Docs/Include/WinMessages.nsh