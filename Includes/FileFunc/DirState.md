# DirState

---

Check directory full, empty or not exist.

## Syntax

	${DirState} "[path]" $var

	"[path]"      ; Directory
	$var          ; Result:
	              ;    $var=0  (empty)
	              ;    $var=1  (full)
	              ;    $var=-1 (directory not found)

## Example

	Section
		${DirState} "$TEMP" $R0
		; $R0="1"  directory is full
	SectionEnd

## Credits

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor