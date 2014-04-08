# Do

---

Repeats a block of statements until stopped, or depending on the value of an expression.

## Syntax:

	${Do}

## Example:

	StrCpy $0 0

	${Do}
		IntOp $0 $0 + 1
		${If} $0 > 10
			${ExitDo}
		${EndIf}
	${Loop}

## Credits:

Written by dselkirk and eccles

---
