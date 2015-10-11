# OrUnless

Adds any number of extra conditions to [`If`][1], [`IfNot`][2], [`Unless`][3], [`ElseIf`][4], [`ElseIfNot`][5] and [`ElseUnless`][6] statements. [`${OrIfNot}`][7] and `${OrUnless}` are equivalent and interchangeable.

## Syntax

	${OrUnless} expression

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

## Example

	StrCpy $0 false
	StrCpy $1 false

	${Unless} $0 == true
	${OrUnless} $1 == true
		MessageBox MB_OK "Something's not true"
	${EndUnless}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
[3]: Unless.md
[4]: ElseIf.md
[5]: ElseIfNot.md
[6]: ElseUnless.md
[7]: OrIfNot.md