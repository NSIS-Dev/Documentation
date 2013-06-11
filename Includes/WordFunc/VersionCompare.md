# VersionCompare

---

Compare version numbers.

## Syntax:

	${VersionCompare} "[Version1]" "[Version2]" $var

	"[Version1]"        ; First version
	"[Version2]"        ; Second version
	$var                ; Result:
	                    ;    $var=0  Versions are equal
	                    ;    $var=1  Version1 is newer
	                    ;    $var=2  Version2 is newer

## Example:

	Section
		${VersionCompare} "1.1.1.9" "1.1.1.01" $R0
		; $R0="1"
	SectionEnd

## Credits:

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor