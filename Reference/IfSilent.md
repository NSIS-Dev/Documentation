# IfSilent

---

Checks the silent flag, and jumps to jump\_if\_silent if the installer is silent, otherwise jumps to jump\_if\_not. The silent flag can be set by [`SilentInstall`][1], [`SilentUninstall`][2], [`SetSilent`][3] and by the user passing `/S` on the command line.

## Parameters

    jump_if_set [jump_if_not_set]

## Example

	IfSilent +2
	ExecWait '"$INSTDIR\nonsilentprogram.exe"'

## History

Added in NSIS v2.0 Beta 4

---

[1]: SilentInstall.md
[2]: SilentUnInstall.md
[3]: SetSilent.md