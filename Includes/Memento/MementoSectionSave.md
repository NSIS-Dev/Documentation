# MementoSectionSave

---

Add a call to `${MementoSectionSave}` to [`.onInstSuccess`][1] to save the stateof all sections to the registry.

## Syntax:

    ${MementoSectionSave}

## Example:

	Function .onInstSuccess
		${MementoSectionSave}
	FunctionEnd

## Credits:

Written by [kichik][2]

---

[1]: ../../Callbacks/.onInstSuccess.md
[2]: http://nsis.sourceforge.net/User:Kichik