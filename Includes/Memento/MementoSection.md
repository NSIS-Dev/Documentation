# MementoSection

---

Replace [`Section`][1] with `${MementoSection}` and [`SectionEnd`][2] with [`${MementoSectionEnd}`][3]
for sections that whose state should be remembered by Memento.

For sections that should be unselected by default, use `${MementoSection}`'s
brother - [`${MementoUnselectedSection}`][4].

Sections that don't already have an identifier must be assigned one.

Section identifiers must stay the same across 

## Syntax:

    ${MementoSection} [section_name] [section_index_output]

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

	${MementoSection} "name" "some_id"
		; some code...
	${MementoSectionEnd}

	SectionGroup /e group

		${MementoSection} croc sec_croc
			; some code...
		${MementoSectionEnd}

		${MementoSection} cow sec_cow
			; some code...
		${MementoSectionEnd}

	SectionGroupEnd

	${MementoUnselectedSection} dinosaur sec_dinosaur
		; some code...
	${MementoSectionEnd}

	${MementoSectionDone}

## Credits:

Written by [kichik][5]

---

[1]: ../../Reference/Section.markdown
[2]: ../../Reference/SectionEnd.markdown
[3]: MementoSectionEnd.markdown
[4]: MementoUnselectedSection.markdown
[5]: http://nsis.sourceforge.net/User:Kichik