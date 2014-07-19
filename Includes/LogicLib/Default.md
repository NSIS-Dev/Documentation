# Default

---

Executes one of several blocks of statements, depending on the value of an expression. [`${CaseElse}`][1] and `${Default}` are equivalent and interchangeable.

## Syntax:

	${Default}

## Example:

	StrCpy $0 1

	${Select} $0
		${Case} "1"
			MessageBox MB_OK "$$0 is 1"
		${Case} "2"
			MessageBox MB_OK "$$0 isn't 2"
		${Default}
			MessageBox MB_OK "$$0 isn't anything else"
	${EndSelect}

## Credits:

Written by dselkirk and eccles

---

[1]: CaseElse.md