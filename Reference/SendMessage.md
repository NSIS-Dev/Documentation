# SendMessage

Sends a message to HWND. If a user variable $x is specified as the last parameter (or one before the last if you use `/TIMEOUT`), the return value of `SendMessage` will be stored to it. Note that when specifying 'msg' you must just use the integer value of the message. If you wish to send strings use "STR:a string" as wParam or lParam where needed.

WM_CLOSE 16
WM_COMMAND 273
WM_USER 1024

Include WinMessages.nsh to have all of Windows messages defined in your script.

To send a string param, put STR: before the parameter, for example: "STR:Some string".

Use /TIMEOUT=time\_in\_ms to specify the duration, in milliseconds, of the time-out period.

## Parameters

    HWND msg wparam lparam [user_var(return value)] [/TIMEOUT=time_in_ms]

## Example

	!include WinMessages.nsh
	FindWindow $0 "Winamp v1.x"
	SendMessage $0 ${WM_CLOSE} 0 0

## History

Added in NSIS v1.51
