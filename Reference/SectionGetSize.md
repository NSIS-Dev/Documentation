# SectionGetSize

Gets the Size of the section specified by section_index and stores the value in the given User Variable. Note that the Index starts with Zero.

## Parameters

    section_index user_var

## Example

	Section test test_section_id
	SectionEnd

	Function .onInit
		# increase required size of section 'test' by 100 bytes
		SectionGetSize ${test_section_id} $0
		IntOp $0 $0 + 100
		SectionSetSize ${test_section_id} $0
	FunctionEnd

## History

Added in NSIS v2.0 Beta 4
