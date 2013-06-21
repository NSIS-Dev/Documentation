# FindWindow

---

Searches for a window. Behaves like the win32 FindWindowEx(). Searches by windowclass (and/or windowtitle if specified). If windowparent or childafter are specified, the search will be restricted as such. If windowclass or windowtitle is specified as "", they will not be used for the search. If the window is not found, the user variable returned is 0. To accomplish old-style FindWindow behavior, use FindWindow with [`SendMessage`][1].

## Parameters:

    user_var(hwnd output) windowclass [windowtitle] [windowparent] [childafter]

## Example:

	FindWindow $0 "#32770" "" $HWNDPARENT
	FindWindow $0 "my window class" "my window title"

## History:

Added in NSIS 1.0f

---

[1]: SendMessage.md