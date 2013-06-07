# Abort

---

Cancels the install, stops execution of script, and displays user_message in the status display. Note: you can use this from [Callback functions][1] to do special things. [Page callbacks][2] also uses Abort for special purposes.

## Parameters:

	user_message

## Example:

	Abort
	Abort "can't install"

## History:

Added in NSIS v1.1t

---

[1]: http://nsis.sourceforge.net/Docs/Chapter4.html#4.7.2
[2]: http://nsis.sourceforge.net/Docs/Chapter4.html#4.5