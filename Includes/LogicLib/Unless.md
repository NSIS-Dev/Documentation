# Unless

---

Conditionally executes a block of statements, depending on the value of an expression. [`${IfNot}`][1] and `${Unless}` are equivalent and interchangeable, as are [`${ElseIfNot}`][2] and [`${ElseUnless}`][3].

## Syntax

	${Unless} expression

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

	${Unless} $0 == true
		MessageBox MB_OK "It's false"
	${EndUnless}

	${Unless} $0 != true
		MessageBox MB_OK "It's true (but I'd use $${If} $$0 == true)"
	${EndUnless}

### Integer tests

	${Unless} 1 > 0
		MessageBox MB_OK "This is never true"
	${EndUnless}

### File conditions

	${Unless} ${FileExists} $SYSDIR\notepad.exe
		MessageBox MB_OK "Could not find notepad.exe"
	${Else}
		Exec $SYSDIR\notepad.exe
	${EndUnless}

	${Unless} ${FileExists} $PROGAMFILES\*.*
		MessageBox MB_OK "Directory $$PROGRAMFILES doesn't exist"
	${EndUnless}

### Section test

	Section "My Section" mySection
		MessageBox MB_OK "Executing section"

		${Unless} ${SectionIsSelected} ${mySection}
			MessageBox MB_OK "This will never show, dummy!"
		${EndUnless}
	SectionEnd

## Credits

Written by dselkirk and eccles

---

[1]: IfNot.md
[2]: ElseIfNot.md
[3]: ElseUnless.md