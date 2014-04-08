# GetRoot

---

Get root directory.

## Syntax:

	${GetRoot} "[FullPath]" $var

## Examples:

### Get root of local folder

	Section
		${GetRoot} "C:\Program Files\NSIS" $R0
		; $R0="C:"
	SectionEnd

### Get root of network share

	Section
		${GetRoot} "\\SuperPimp\NSIS\Source\exehead\Ui.c" $R0
		; $R0="\\SuperPimp\NSIS"
	SectionEnd

## Credits:

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor