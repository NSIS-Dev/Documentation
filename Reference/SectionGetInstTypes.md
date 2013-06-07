# SectionGetInstTypes

---

Retrieves the install types flags array of a section. See the explanation about [`SectionSetInstTypes`][1] for a description of how to deal with the output. The error flag will be set if the section index specified is out of range.

## Parameters:

    section_index user_var(output)

## Example:

	Section test test_section_id
	SectionEnd

	Function .onInit
		# associate section 'test' with installation types 5, on top of its existing associations
		SectionGetInstTypes ${test_section_id} $0
		IntOp $0 $0 | 16
		SectionSetInstTypes ${test_section_id} $0
	FunctionEnd

## History:

Added in NSIS v2.0 Beta 3

---

[1]: SectionSetInstTypes.md