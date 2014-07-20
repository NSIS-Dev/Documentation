# ConfigRead

---

Read value from entry name in config file.

## Syntax

	${ConfigRead} "[File]" "[Entry]" $var
	"[File]"      ; config file
	              ;
	"[Entry]"     ; entry name
	              ;
	$var          ; Result:  Value

Note:

- Error flag if entry not found 
- Error flag if file doesn't exist

## Examples

### Example 1

	Section
		${ConfigRead} "C:\AUTOEXEC.BAT" "SET winbootdir=" $R0
		;$R0=C:\WINDOWS
	SectionEnd

### Example 2

	Section
		${ConfigRead} "C:\apache\conf\httpd.conf" "Timeout " $R0
		;$R0=30
	SectionEnd

## Credits

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor