# WordFind2XS

---

Find word between two delimiters, case sensitive

## Syntax:

	${WordFind2XS} "[string]" "[delimiter1]" "[delimiter2]" "[E][options]" $var

	"[string]"         ;[string]
	                   ;  input string
	"[delimiter1]"     ;[delimiter1]
	                   ;  first delimiter
	"[delimiter2]"     ;[delimiter2]
	                   ;  second delimiter
	"[E][options]"     ;[options]
	                   ;  +number   : word number from start
	                   ;  -number   : word number from end
	                   ;  +number}} : word number from start all space
	                   ;              after this word to output
	                   ;  +number{{ : word number from end all space
	                   ;              before this word to output
	                   ;  +number{} : word number from start
	                   ;              all space before and after
	                   ;              this word (word exclude)
	                   ;  +number*} : word number from start
	                   ;              all space after this
	                   ;              word to output with word
	                   ;  +number{* : word number from start
	                   ;              all space before this
	                   ;              word to output with word
	                   ;  #         : sum of words to output
	                   ;  /word     : number of word to output
	                   ;
	                   ;[E]
	                   ;  with errorlevel output
	                   ;  IfErrors:
	                   ;     $var=1  no words found
	                   ;     $var=2  no such word number
	                   ;     $var=3  syntax error (Use: +1,-1,#)
	                   ;[]
	                   ;  no errorlevel output (default)
	                   ;  If some errors found then (result=input string)
	                   ;
	$var               ;output (result)

## Examples:

### Example 1

	Section
		${WordFind2XS} "[C:\io.sys];[C:\logo.sys];[C:\WINDOWS]" "[C:\" "];" "+2" $R0
		; $R0="logo.sys"
	SectionEnd

### Example 2

	Section
		${WordFind2XS} "C:\WINDOWS C:\io.sys C:\logo.sys" "\" "." "-1" $R0
		; $R0="logo"
	SectionEnd

### Example 3

	Section
		${WordFind2XS} "C:\WINDOWS C:\io.sys C:\logo.sys" "\" "." "-1{{" $R0
		; $R0="C:\WINDOWS C:\io.sys C:"
	SectionEnd

### Example 4

	Section
		${WordFind2XS} "C:\WINDOWS C:\io.sys C:\logo.sys" "\" "." "-1{}" $R0
		; $R0="C:\WINDOWS C:\io.sys C:sys"
	SectionEnd

### Example 5

	Section
		${WordFind2XS} "C:\WINDOWS C:\io.sys C:\logo.sys" "\" "." "-1{*" $R0
		; $R0="C:\WINDOWS C:\io.sys C:\logo."
	SectionEnd

### Example 6

	Section
		${WordFind2XS} "C:\WINDOWS C:\io.sys C:\logo.sys" "\" "." "/logo" $R0
		; $R0="2"
	SectionEnd

### With errorlevel output

	Section
		${WordFind2XS} "[io.sys];[C:\logo.sys]" "\" "];" "E+1" $R0
		; $R0="1" ("\...];" not found)

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