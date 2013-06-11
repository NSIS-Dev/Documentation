# WordInsertS

---

Insert word in string.

## Syntax:

	${WordInsertS} "[string]" "[delimiter]" "[word]" "[E][options]" $var

	"[string]"          ;[string]
	                    ;  input string
	"[delimiter]"       ;[delimiter]
	                    ;  one or several symbols
	"[word]"            ;[word]
	                    ;  word to insert
	"[E][options]"      ;[options]
	                    ;  +number  : word number from start
	                    ;  -number  : word number from end
	                    ;
	                    ;[E]
	                    ;  with errorlevel output
	                    ;  IfErrors:
	                    ;     $var=1  delimiter is empty
	                    ;     $var=2  wrong word number
	                    ;     $var=3  syntax error (Use: +1,-1)
	                    ;[]
	                    ;  no errorlevel output (default)
	                    ;  If some errors found then (result=input string)
	                    ;
	$var                ;output (result)

## Examples:

### Example 1

	Section
		${WordInsertS} "C:\io.sys C:\WINDOWS" " " "C:\logo.sys" "-2" $R0
		; $R0="C:\io.sys C:\logo.sys C:\WINDOWS"
	SectionEnd

### Example 2

	Section
		${WordInsertS} "C:\io.sys" " " "C:\WINDOWS" "+2" $R0
		; $R0="C:\io.sys C:\WINDOWS"
	SectionEnd

### Example (3):

	Section
		${WordInsertS} "" " " "C:\WINDOWS" "+1" $R0
		; $R0="C:\WINDOWS "
	SectionEnd

### With errorlevel output

	Section
		${WordInsertS} "C:\io.sys C:\logo.sys" " " "C:\logo.sys" "E+4" $R0
		; $R0="2" (wrong word number "+4")

		IfErrors 0 noerrors
		MessageBox MB_OK 'Errorlevel=$R0' IDOK end

		noerrors:
		MessageBox MB_OK 'No errors'

		end:
	SectionEnd

## Credits:

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor