# MementoSectionDone

---

Use `${MementoSectionDone}` after the last [`${MementoSection}`][1].

## Syntax:

    ${MementoSectionRestore}

## Example:

	!include Memento.nsh

	!define MEMENTO_REGISTRY_ROOT HKLM
	!define MEMENTO_REGISTRY_KEY Software\Microsoft\Windows\CurrentVersion\Uninstall\MyProgram

	Function .onInit
		${MementoSectionRestore}
	FunctionEnd

	Function .onInstSuccess
		${MementoSectionSave}
	FunctionEnd

	${MementoUnselectedSection} dinosaur sec_dinosaur
		; some code...
	${MementoSectionEnd}

	${MementoSectionDone}

## Credits:

Written by [kichik][2]

---

[1]: MementoSection.md
[2]: http://nsis.sourceforge.net/User:Kichik