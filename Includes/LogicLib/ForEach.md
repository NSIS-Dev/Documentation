# ForEach

---

Repeats a block of statements varying the value of a variable.

## Syntax

	${ForEach} expression

## Example

	StrCpy $0 ""

	${ForEach} $1 9 0 - 1
		StrCpy $0 $0$1
	${Next}

	; $0 = 9876543210

## Credits

Written by dselkirk and eccles

---
