# FileJoin

---

Join two files in one.

## Syntax:

	${FileJoin} "[File1]" "[File2]" "[File3]"
	"[File1]"     ; Input File1
	"[File2]"     ; Input File2
	"[File3]"     ; Output File3
	              ;  If [File3]="" Then add [File2] to [File1]

Note:

- Error flag if input files don't exist 
- Error flag if output file path doesn't exist

## Examples: 

### Join: a.log + b.log = Z.log

	Section
		${FileJoin} "C:\a.log" "C:\logs\b.log" "C:\Z.log"
	SectionEnd

### Add: a.log + b.log = a.log

	Section
		${FileJoin} "C:\a.log" "C:\logs\b.log" "C:\a.log"
	SectionEnd

## Credits:

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor