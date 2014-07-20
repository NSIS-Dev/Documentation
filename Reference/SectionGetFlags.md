# SectionGetFlags

---

Retrieves the section's flags. See above for a description of the flag. The error flag will be set if an out of range section is specified.

## Parameters

    section_index user_var(output)

## Example

	Section test test_section_id
	SectionEnd

	Function .onSelChange
		# keep section 'test' selected
		SectionGetFlags ${test_section_id} $0
		IntOp $0 $0 | ${SF_SELECTED}
		SectionSetFlags ${test_section_id} $0
	FunctionEnd

## History

Added in NSIS v1.98

---
