# ElseIfNot

Conditionally executes a block of statements, depending on the value of an expression. `${ElseIfNot}` and [`${ElseUnless}`][1] are equivalent and interchangeable, as are [`${IfNot}`][2] and [`${Unless}`][3]. Requires opening condition [`${If}`][4] or [`${IfNot}`][5].

## Syntax

	${ElseIfNot} expression

The following "expressions" are available:

	Standard (built-in) string tests (which are case-insensitive):
	 	a == b; a != b
	Additional case-insensitive string tests (using System.dll):
	 	a S< b; a S>= b; a S> b; a S<= b
	Case-sensitive string tests:
	 	a S== b; a S!= b
	Standard (built-in) signed integer tests:
	 	a = b; a <> b; a < b; a >= b; a > b; a <= b
	Standard (built-in) unsigned integer tests:
	 	a U< b; a U>= b; a U> b; a U<= b
	64-bit integer tests (using System.dll):
		a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
	Built-in NSIS flag tests:
		${Abort}; ${Errors}; ${RebootFlag}; ${Silent}
	Built-in NSIS other tests:
		${FileExists} a
	Any conditional NSIS instruction test:
		${Cmd} a
	Section flag tests:
		${SectionIsSelected} a; ${SectionIsSectionGroup} a;
		${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;
		${SectionIsReadOnly} a; ${SectionIsExpanded} a;
		${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

	StrCpy $0 true

	${IfNot} $0 == true
		MessageBox MB_OK "$$0 is true"
	${ElseIfNot} $0 == false
		MessageBox MB_OK "$$0 isn't false"
	${EndIf}

### File conditions

	${IfNot} ${FileExists} $SYSDIR\notepad.exe
	${AndIf} ${FileExists} $EXEDIR\notepad.exe
		; we found a copy in $EXEDIR
		Exec $EXEDIR\notepad.exe
	${ElseIfNot} ${FileExists} $SYSDIR\notepad.exe
	${AndIfNot} ${FileExists} $EXEDIR\notepad.exe
		MessageBox MB_OK "Could not find any notepad.exe"
	${ElseIf} ${FileExists} $SYSDIR\notepad.exe
		; we should've done that in the first place!
		Exec $SYSDIR\notepad.exe
	${EndIf}

## Credits

Written by dselkirk and eccles

[1]: ElseUnless.md
[2]: IfNot.md
[3]: Unless.md
[4]: If.md
[5]: IfNot.md