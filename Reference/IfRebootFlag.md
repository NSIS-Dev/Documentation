# IfRebootFlag

---

Checks the reboot flag, and jumps to jump_if_set if the reboot flag is set, otherwise jumps to jump_if_not_set. The reboot flag can be set by [`Delete`][1] and [`Rename`][2], or manually with [`SetRebootFlag`][3].

## Parameters:

    jump_if_set [jump_if_not_set]

## Example:

	IfRebootFlag 0 noreboot
	MessageBox MB_YESNO "A reboot is required to finish the installation. Do you wish to reboot now?" IDNO noreboot
	Reboot
	noreboot:

## History:

Added in NSIS v1.70

---

[1]: Delete.md
[2]: Rename.md
[3]: SetRebootFlag.md