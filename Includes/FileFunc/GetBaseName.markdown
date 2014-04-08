# GetBaseName

---

Get file name without extension.

## Syntax:

	${GetBaseName} "[FileString]" $var

## Example:

	Section
		${GetBaseName} "C:\ftp\program.exe" $R0
		; $R0="program"
	SectionEnd

## Credits:

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor