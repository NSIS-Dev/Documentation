# MessageBox

---

Displays a `MessageBox` containing the text "messagebox_text". mb_option_list must be one or more of the following, delimited by |s (e.g. MB_YESNO|MB_ICONSTOP).

* MB_OK - Display with an OK button
* MB_OKCANCEL - Display with an OK and a cancel button
* MB_ABORTRETRYIGNORE - Display with abort, retry, ignore buttons
* MB_RETRYCANCEL - Display with retry and cancel buttons
* MB_YESNO - Display with yes and no buttons
* MB_YESNOCANCEL - Display with yes, no, cancel buttons
* MB_ICONEXCLAMATION - Display with exclamation icon
* MB_ICONINFORMATION - Display with information icon
* MB_ICONQUESTION - Display with question mark icon
* MB_ICONSTOP - Display with stop icon
* MB_USERICON - Display with installer's icon
* MB_TOPMOST - Make messagebox topmost
* MB_SETFOREGROUND - Set foreground
* MB_RIGHT - Right align text
* MB_RTLREADING - RTL reading order
* MB_DEFBUTTON1 - Button 1 is default
* MB_DEFBUTTON2 - Button 2 is default
* MB_DEFBUTTON3 - Button 3 is default
* MB_DEFBUTTON4 - Button 4 is default

Return_check can be 0 (or empty, or left off), or one of the following:

* IDABORT - Abort button
* IDCANCEL - Cancel button
* IDIGNORE - Ignore button
* IDNO - No button
* IDOK - OK button
* IDRETRY - Retry button
* IDYES - Yes button

If the return value of the `MessageBox` is return_check, the installer will [`Goto`][1] jumpto.
Use the `/SD` parameter with one of the return_check values above to specify the option that will be used when the installer is silent. See section [4.12][2] for more information.

## Parameters:

    mb_option_list messagebox_text [/SD return] [return_check jumpto] [return_check_2 jumpto_2]

## Example:

	MessageBox MB_OK "simple message box"
	MessageBox MB_YESNO "is it true?" IDYES true IDNO false
	true:
	  DetailPrint "it's true!"
	  Goto next
	false:
	  DetailPrint "it's false"
	next:
	MessageBox MB_YESNO "is it true? (defaults to yes on silent installations)" /SD IDYES IDNO false2
	  DetailPrint "it's true (or silent)!"
	  Goto next2
	false2:
	  DetailPrint "it's false"
	next2:

## History:

Added in NSIS v1.0f

---

[1]: Goto.md
[2]: http://nsis.sourceforge.net/Docs//Chapter4.html#4.12