# GetExePath

---

Get installer pathname ($EXEDIR with valid case for Windows 98/Me).

## Syntax:

	${GetExePath} $var

## Example:

	Section
		${GetExePath} $R0
		; $R0="C:\ftp"
	SectionEnd

## Credits:

Written by [Instructor](1)

---

[1]: http://nsis.sourceforge.net/User:Instructor