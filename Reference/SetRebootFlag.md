# SetRebootFlag

---

Sets the reboot flag to either true or false. The flag's value can be read using [`IfRebootFlag`][1].

## Parameters

    true|false

## Example

	SetRebootFlag true
	IfRebootFlag 0 +2
	MessageBox MB_OK "this message box will always show"

## History

Added in NSIS v1.70

---

[1]: IfRebootFlag.md