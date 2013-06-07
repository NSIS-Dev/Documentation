# SectionSetInstTypes

---

Sets the install types the section specified by section_index defaults to the enabled state in. Note that the section index starts with zero. Every bit of inst_types is a flag that tells if the section is in that install type or not. For example, if you have 3 install types and you want the first section to be included in install types 1 and 3, then the command should look like this:

## Parameters:

    section_index inst_types

## Example:

	SectionSetInstTypes 0 5
	# because the binary value for 5 is "00000101". The error flag will be set if the section index specified is out of range.

	Section test test_section_id
	SectionEnd

	Function .onInit
		# associate section 'test' with installation types 3 and 4
		SectionSetInstTypes ${test_section_id} 12
	FunctionEnd

## History:

Added in NSIS v2.0 Beta 3

---
