# AndIf

---

Adds any number of extra conditions to [`If`][1], [`IfNot`][2], [`Unless`][3], [`ElseIf`][4], [`ElseIfNot`][5] and [`ElseUnless`][6] statements.

## Syntax

	${AndIf} expression

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
	StrCpy $1 true

	${If} $0 == true
	${AndIf} $1 == true
		MessageBox MB_OK "Everything's true"
	${EndIf}

### Integer tests

	${If} 2 > 1
	${AndIf} 2 < 3
		MessageBox MB_OK "2 is greater than 1 and smaller than 3"
	${EndIf}

### File conditions

	${If} ${FileExists} $SYSDIR\calc.exe
	${AndIf} ${FileExists} $SYSDIR\notepad.exe
		MessageBox MB_OK "We have both"
	${EndIf}

## Credits

Written by dselkirk and eccles

---

[1]: If.md
[2]: IfNot.md
[3]: Unless.md
[4]: ElseIf.md
[5]: ElseIfNot.md
[6]: ElseUnless.md