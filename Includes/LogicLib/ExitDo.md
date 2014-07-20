# ExitDo

---

Exits a block of statements until started by [`${Do}`][1], [`${DoUntil}`][2] or [`${DoWhile}`][3].

## Syntax

	${ExitDo}

## Example

	StrCpy $0 0

	${Do}
		IntOp $0 $0 + 1
		${If} $0 > 10
			${ExitDo}
		${EndIf}
	${Loop}

## Credits

Written by dselkirk and eccles

---

[1]: Do.md
[2]: DoUntil.md
[3]: DoWhile.md