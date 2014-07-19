# GetParent

---

Get parent directory.

## Syntax:

	${GetParent} "[PathString]" $var

## Example:

	Section
		${GetParent} "C:\Program Files\Winamp\uninstwa.exe" $R0
		; $R0="C:\Program Files\Winamp"
	SectionEnd

## Credits:

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor