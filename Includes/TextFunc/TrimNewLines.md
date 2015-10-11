# TrimNewLines

Trim newlines in a string.

## Syntax

	${TrimNewLines} "[string]" $var

	"[string]"    ; Input string
	$var          ; Result: String without '$\r' and '$\n' at the end

Note:

- Error flag if file doesn't exist 
- Error flag if syntax error

## Example

	Section
		${TrimNewLines} "Text line$\r$\n" $R0
		; $R0="Text line"
	SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor