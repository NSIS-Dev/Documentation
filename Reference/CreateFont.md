# CreateFont

---

Creates a font and puts its handle into user_var. For more information about the different parameters have a look at MSDN's page about the Win32 API function [CreateFont()][1].
You can get the current font used by NSIS using the ^Font and ^FontSize [`LangString`][2].

## Parameters

    user_var(handle output) face_name [height] [weight] [/ITALIC] [/UNDERLINE] [/STRIKE]

## Example

	CreateDirectory $INSTDIR\some\directory

## History

Added in NSIS v2.0 Alpha 7

---

[1]: http://msdn.microsoft.com/library/default.asp?url=/library/en-us/gdi/fontext_8fp0.asp
[2]: LangString.md