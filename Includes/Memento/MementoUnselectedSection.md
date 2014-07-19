# MementoUnselectedSection

---

Replace [`Section`][1] with [`${MementoSection}`][2] and [`SectionEnd`][3] with [`${MementoSectionEnd}`][4]
for sections that whose state should be remembered by Memento.

For sections that should be unselected by default, use [`${MementoSection}`][2]'s
brother - `${MementoUnselectedSection}`.

Sections that don't already have an identifier must be assigned one.

Section identifiers must stay the same across 

## Syntax:

    ${MementoUnselectedSection} [section_name] [section_index_output]

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

Written by [kichik][5]

---

[1]: ../../Reference/Section.md
[2]: MementoSection.md
[3]: ../../Reference/SectionEnd.md
[4]: MementoSectionEnd.md
[5]: http://nsis.sourceforge.net/User:Kichik