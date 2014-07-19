# Break

---

Breaks a block of statements.

## Syntax:

	${Break}

## Examples:

### Simple example

	${For} $1 1 10
		${Break}
		MessageBox MB_OK "This will never show"
	${Next}

### In combination with a MessageBox

	${For} $1 1 10
		${IfCmd} MessageBox MB_YESNO "We're at $1, continue up to 10?" IDYES ${||} ${Break} ${|}
	${Next}

## Credits:

Written by dselkirk and eccles

---
