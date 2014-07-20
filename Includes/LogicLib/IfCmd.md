# IfCmd

---

Conditionally executes an inline statement, depending on a true value of the provided NSIS function.

## Syntax

	${IfCmd} expression statement

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

	StrCpy $R2 ""

	${IfCmd} MessageBox MB_YESNO "Please click Yes" IDYES ${||} StrCpy $R2 $R2A ${|}
	${Unless} ${Cmd} `MessageBox MB_YESNO|MB_DEFBUTTON2 "Please click No" IDYES`
		StrCpy $R2 $R2B
	${EndUnless}

	${If} $R2 == "AB"
		MessageBox "You clicked Yes"
	${Else}
		MessageBox "You clicked No"
	${EndIf}

## Credits

Written by dselkirk and eccles

---
