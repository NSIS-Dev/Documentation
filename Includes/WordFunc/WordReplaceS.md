# WordReplaceS

Replace or delete word from string, case sensitive.

## Syntax

	${WordReplaceS} "[string]" "[word1]" "[word2]" "[E][options]" $var

	"[string]"         ;[string]
	                   ;  input string
	"[word1]"          ;[word1]
	                   ;  word to replace or delete
	"[word2]"          ;[word2]
	                   ;  replace with (if empty delete)
	"[E][options]"     ;[options]
	                   ;  +number  : word number from start
	                   ;  -number  : word number from end
	                   ;  +number* : word number from start multiple-replace
	                   ;  -number* : word number from end multiple-replace
	                   ;  +        : replace all results
	                   ;  +*       : multiple-replace all results
	                   ;  {        : if exists replace all delimiters
	                   ;               from left edge
	                   ;  }        : if exists replace all delimiters
	                   ;               from right edge
	                   ;  {}       : if exists replace all delimiters
	                   ;               from edges
	                   ;  {*       : if exists multiple-replace all
	                   ;               delimiters from left edge
	                   ;  }*       : if exists multiple-replace all
	                   ;               delimiters from right edge
	                   ;  {}*      : if exists multiple-replace all
	                   ;               delimiters from edges
	                   ;
	                   ;[E]
	                   ;  with errorlevel output
	                   ;  IfErrors:
	                   ;     $var=1  word to replace not found
	                   ;     $var=2  no such word number
	                   ;     $var=3  syntax error (Use: +1,-1,+1*,-1*,+,+*,{},{}*)
	                   ;[]
	                   ;  no errorlevel output (default)
	                   ;  If some errors found then (result=input string)
	                   ;
	$var               ;output (result)

## Examples

### replace

	Section
		${WordReplaceS} "C:\io.sys C:\logo.sys C:\WINDOWS" "SYS" "bmp" "+2" $R0
		; $R0="C:\io.sys C:\logo.bmp C:\WINDOWS"
	SectionEnd

### delete

	Section
		${WordReplaceS} "C:\io.sys C:\logo.sys C:\WINDOWS" "SYS" "" "+" $R0
		; $R0="C:\io. C:\logo. C:\WINDOWS"
	SectionEnd

### multiple-replace 1

	Section
		${WordReplaceS} "C:\io.sys      C:\logo.sys   C:\WINDOWS" " " " " "+1*" $R0
		; +1* or +2* or +3* or +4* or +5* or +6*
		; $R0="C:\io.sys C:\logo.sys   C:\WINDOWS"
	SectionEnd

### multiple-replace 2

	Section
		${WordReplaceS} "C:\io.sys C:\logo.sysSYSsys C:\WINDOWS" "sys" "bmp" "+*" $R0
		; $R0="C:\io.bmp C:\logo.bmp C:\WINDOWS"
	SectionEnd

### multiple-replace 3

	Section
		${WordReplaceS} "sysSYSsysC:\io.sys C:\logo.sys C:\WINDOWSsysSYSsys" "sys" "|" "{}*" $R0
		; $R0="|C:\io.sys C:\logo.sys C:\WINDOWS|"
	SectionEnd

### With errorlevel output

	Section
		${WordReplaceS} "C:\io.sys C:\logo.sys" "sys" "bmp" "E+3" $R0
		; $R0="2" (no such word number "+3")

		IfErrors 0 noerrors
		MessageBox MB_OK 'Errorlevel=$R0' IDOK end

		noerrors:
		MessageBox MB_OK 'No errors'

		end:
	SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor