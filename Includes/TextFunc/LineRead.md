# LineRead

---

Get line in file specified with number.

## Syntax

	${LineRead} "[File]" "[LineNumber]" $var

	"[File]"         ; Input text file
	                 ;
	"[LineNumber]"   ; [No|-No]
	                 ;   3    line number from start
	                 ;   -5   line number from end
	                 ;
	$var             ; Result: Line

Note:

- Error flag if input file doesn't exist 
- Error flag if line number not found

## Example 

	Section
		${LineRead} "C:\a.log" "-1" $R0
		; $R0="Last line$\r$\n"
	SectionEnd

## Credits

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor