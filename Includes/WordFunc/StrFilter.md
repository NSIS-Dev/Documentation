# StrFilter

---

* Convert string to uppercase or lowercase.
* Set symbol filter.

## Syntax

	${StrFilter} "[string]" "[options]" "[symbols1]" "[symbols2]" $var

	"[string]"       ;[string]
	                 ;  input string
	                 ;
	"[options]"      ;[+|-][1|2|3|12|23|31][eng|rus]
	                 ;  +   : convert string to uppercase
	                 ;  -   : convert string to lowercase
	                 ;  1   : only Digits
	                 ;  2   : only Letters
	                 ;  3   : only Special
	                 ;  12  : only Digits  + Letters
	                 ;  23  : only Letters + Special
	                 ;  31  : only Special + Digits
	                 ;  eng : English symbols (default)
	                 ;  rus : Russian symbols
	                 ;
	"[symbols1]"     ;[symbols1]
	                 ;  symbols include (not changeable)
	                 ;
	"[symbols2]"     ;[symbols2]
	                 ;  symbols exclude
	                 ;
	$var             ;output (result)

Note: 

- Error flag if syntax error 
- Same symbol to include & to exclude = to exclude

## Examples

### UpperCas

	Section
		${StrFilter} "123abc 456DEF 7890|%#" "+" "" "" $R0
		; $R0="123ABC 456DEF 7890|%#"
	SectionEnd

### LowerCase

	Section
		${StrFilter} "123abc 456DEF 7890|%#" "-" "ef" "" $R0
		; $R0="123abc 456dEF 7890|%#"
	SectionEnd

### Filter 1

	Section
		${StrFilter} "123abc 456DEF 7890|%#" "2" "|%" "" $R0
		; $R0="abcDEF|%"       ;only Letters + |%
	SectionEnd

### Filter 2

	Section
		${StrFilter} "123abc 456DEF 7890|%#" "13" "af" "4590" $R0
		; $R0="123a 6F 78|%#"  ;only Digits + Special + af - 4590
	SectionEnd

### Filter 3

	Section
		${StrFilter} "123abc 456DEF 7890|%#" "+12" "b" "def" $R0
		; $R0="123AbC4567890"  ;only Digits + Letters + b - def
	SectionEnd

### Filter 4

	Section
		${StrFilter} "123abcÀÁÂ 456DEFãäå 7890|%#" "+12rus" "ä" "ãå" $R0
		; $R0="123ÀÁÂ456ä7890"  ;only Digits + Letters + ä - ãå
	SectionEnd

### English + Russian Letters

	Section
		${StrFilter} "123abcÀÁÂ 456DEFãäå 7890|%#" "2rus" "" "" $R0
		; $R0="ÀÁÂãäå"        ;only Russian Letters
		${StrFilter} "123abcÀÁÂ 456DEFãäå 7890|%#" "2" "$R0" "" $R0
		; $R0="abcÀÁÂDEFãäå"  ;only English + Russian Letters
	SectionEnd

### Word Capitalize

	Section
		Push "_01-PERPETUOUS_DREAMER__-__THE_SOUND_OF_GOODBYE_(ORIG._MIX).MP3_"
		Call Capitalize
		Pop $R0
		; $R0="_01-Perpetuous_Dreamer__-__The_Sound_Of_Goodbye_(Orig._Mix).mp3_"

		${WordReplace} "$R0" "_" " " "+*" $R0
		; $R0=" 01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3 "

		${WordReplace} "$R0" " " "" "{}" $R0
		; $R0="01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3"
	SectionEnd

	Function Capitalize
		Exch $R0
		Push $0
		Push $1
		Push $2

		${StrFilter} '$R0' '-eng' '' '' $R0
		${StrFilter} '$R0' '-rus' '' '' $R0

		StrCpy $0 0

		loop:
		IntOp $0 $0 + 1
		StrCpy $1 $R0 1 $0
		StrCmp $1 '' end
		StrCmp $1 ' ' +5
		StrCmp $1 '_' +4
		StrCmp $1 '-' +3
		StrCmp $1 '(' +2
		StrCmp $1 '[' 0 loop
		IntOp $0 $0 + 1
		StrCpy $1 $R0 1 $0
		StrCmp $1 '' end

		${StrFilter} '$1' '+eng' '' '' $1
		${StrFilter} '$1' '+rus' '' '' $1

		StrCpy $2 $R0 $0
		IntOp $0 $0 + 1
		StrCpy $R0 $R0 '' $0
		IntOp $0 $0 - 2
		StrCpy $R0 '$2$1$R0'
		goto loop

		end:
		Pop $2
		Pop $1
		Pop $0
		Exch $R0
	FunctionEnd

## Credits

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor