# EnableWindow

---

Enables or disables mouse and keyboard input to the specified window or control. Possible states are 0 (disabled) or 1 (enabled).

## Parameters:

    hwnd (1|0)

## Example:

	GetDlgItem $0 $HWNDPARENT 1
	EnableWindow $0 0
	Sleep 1000
	EnableWindow $0 1

## History:

Added in NSIS v2.0

---
