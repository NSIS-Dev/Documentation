# IsWindow

---

If HWND is a window, [`Goto`][1] jump\_if\_window, otherwise, [`Goto`][1] jump\_if\_not_window (if specified).

## Parameters

    HWND jump_if_window [jump_if_not_window]

## Example

	GetDlgItem $0 $HWNDPARENT 1
	IsWindow $0 0 +3
	MessageBox MB_OK "found a window"
	Goto +2
	MessageBox MB_OK "no window"

## History

Added in NSIS v1.51

---

[1]: Goto.md