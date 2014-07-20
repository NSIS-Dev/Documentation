# EndSwitch

---

Ends an open block of labels started by [`${Switch}`][1].

## Syntax

	${EndSwitch}

## Example

	{For} $0 1 10
		${Switch} $0
			${Case} "1"
				MessageBox MB_OK "$$0 is 1"
			${Case} "2"
				MessageBox MB_OK "$$0 is 2"
			${Case2} "3" "5"
				MessageBox MB_OK "$$0 is 3 or 5"
			${CaseElse}
				MessageBox MB_OK "$$0 is something else ($0)"
		${EndSwitch}
	${Next}

## Credits

Written by dselkirk and eccles

---

[1]: Switch.md