# ExitFor

---

Repeats a block of statements varying the value of a variable.

## Syntax

	${ExitFor} expression

## Example

	StrCpy $0 ""

	${For} $1 1 10
		StrCpy $0 $0$1
		${If} $1 == 5
			; let's interrupt this at 5
			${ExitFor}
		${EndIf}
	${Next}

	; $0 = 12345

## Credits

Written by dselkirk and eccles

---
