# EndSelect

---

Ends an open block of statements started by [`${Select}`][1].

## Syntax

	${EndSelect}

## Example

	StrCpy $0 1

	${Select} $0
		${Case} "1"
			MessageBox MB_OK "$$0 is 1"
		${Case} "2"
			MessageBox MB_OK "$$0 isn't 2"
		${CaseElse}
			MessageBox MB_OK "$$0 isn't anything else"
	${EndSelect}

## Credits

Written by dselkirk and eccles

---

[1]: Select.md