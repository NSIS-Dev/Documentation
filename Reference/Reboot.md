# Reboot

---

Reboots the computer. Be careful with this one. If it fails, [`.onRebootFailed`][1] is called. In any case, this instruction never returns, just like [`Quit`][2].

## Example:

	MessageBox MB_YESNO|MB_ICONQUESTION "Do you wish to reboot the system?" IDNO +2
	Reboot

## History:

Added in NSIS v1.70

---

[1]: http://nsis.sourceforge.net/Reference/.onRebootFailed
[2]: Quit.md