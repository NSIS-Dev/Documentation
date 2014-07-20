# Else

---

Conditionally executes a block of statements, depending on the value of an expression. Requires opening condition [`${If}`][1] or [`${IfNot}`][2].

## Syntax

	${Else}

## Examples

### Check if condition is met

	StrCpy $0 true

	${If} $0 == true
		MessageBox MB_OK "$$0 is always true"
	${Else}
		MessageBox MB_OK "$$0 is never false"
	${EndIf}

### Integer tests

	${If} 1 > 0
		MessageBox MB_OK "1 is greater than 0"
	${Else}
		MessageBox MB_OK "Something went wrong!"
	${EndIf}

### File conditions

	${IfNot} ${FileExists} $SYSDIR\notepad.exe
		MessageBox MB_OK "Could not find notepad.exe"
	${Else}
		Exec $SYSDIR\notepad.exe
	${EndIf}

### Section test

	Section "My Section" mySection
		MessageBox MB_OK "Section is selected!""

		${If} ${SectionIsSelected} ${mySection}
			MessageBox MB_OK "Section is selected (and we knew that already!)"
		${Else}
			MessageBox MB_OK "This will never show, dummy!"
		${EndIf}
	SectionEnd

## Credits

Written by dselkirk and eccles

---

[1]: If.md
[2]: IfNot.md