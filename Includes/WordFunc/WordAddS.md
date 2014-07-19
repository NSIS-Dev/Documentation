# WordInsert

---

Insert word in string.

## Syntax:

	${WordInsert} "[string]" "[delimiter]" "[word]" "[E][options]" $var
---
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

### add

	Section
		${WordAddS} "C:\io.sys C:\WINDOWS" " " "+C:\WINDOWS C:\config.sys" $R0
		; $R0="C:\io.sys C:\WINDOWS C:\config.sys"
	SectionEnd

### delete

	Section
		${WordAddS} "C:\io.sys C:\logo.sys C:\WINDOWS" " " "-C:\WINDOWS C:\config.sys C:\IO.SYS" $R0
		; $R0="C:\logo.sys"
	SectionEnd

### add to one

	Section
		${WordAddS} "C:\io.sys" " " "+C:\WINDOWS C:\config.sys C:\IO.SYS" $R0
		; $R0="C:\io.sys C:\WINDOWS C:\config.sys"
	SectionEnd

### delete one

	Section
		${WordAddS} "C:\io.sys C:\logo.sys C:\WINDOWS" " " "-C:\WINDOWS" $R0
		; $R0="C:\io.sys C:\logo.sys"
	SectionEnd

### No new words found

	Section
		${WordAddS} "C:\io.sys C:\logo.sys" " " "+C:\logo.sys" $R0
		StrCmp $R0 "C:\io.sys C:\logo.sys" 0 +2
		MessageBox MB_OK "No new words found to add"
	SectionEnd

### No words deleted

	Section
		${WordAddS} "C:\io.sys C:\logo.sys" " " "-C:\config.sys" $R0
		StrCmp $R0 "C:\io.sys C:\logo.sys" 0 +2
		MessageBox MB_OK "No words found to delete"
	SectionEnd

### With errorlevel output

	Section
		${WordAddS} "C:\io.sys C:\logo.sys" "" "E-C:\logo.sys" $R0
		; $R0="1" (delimiter is empty "")

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