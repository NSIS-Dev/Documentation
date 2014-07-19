# .onUserAbort

---

This callback is called when the user hits the 'cancel' button, and the install hasn't already failed. If this function calls [`Abort`][1], the install will not be aborted.

Example:

	Function .onUserAbort
		MessageBox MB_YESNO "Abort install?" IDYES NoCancelAbort
		Abort ; causes installer to not quit.
		NoCancelAbort:
	FunctionEnd

---

[1]: ../Reference/Abort.markdown