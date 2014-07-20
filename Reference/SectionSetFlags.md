# SectionSetFlags

---

Sets the section's flags. The flag is a 32 bit integer. The first bit (lowest) represents whether the section is currently selected, the second bit represents whether the section is a section group (don't modify this unless you really know what you are doing), the third bit represents whether the section is a section group end (again, don't modify), the fourth bit represents whether the section is shown in bold or not, the fifth bit represents whether the section is read-only, the sixth bit represents whether the section group is to be automatically expanded, the seventh bit is set for section groups which are partially selected, the eighth bit is internally used for partially selected section group toggling and the ninth bit is used for reflecting section name changes. The error flag will be set if an out of range section is specified.

## Parameters

    section_index section_flags

## Example

Each flag has a name, prefixed with `SF_`:

	!define SF_SELECTED   1
	!define SF_SECGRP     2
	!define SF_SECGRPEND  4
	!define SF_BOLD       8
	!define SF_RO         16
	!define SF_EXPAND     32
	!define SF_PSELECTED  64

For an example of usage please see the [one-section.nsi][1] example.

For more useful macros and definitions, see Include\Sections.nsh.

	Section test test_section_id
	SectionEnd
	 
	Function .onInit
	  # set section 'test' as selected and read-only
	  IntOp $0 ${SF_SELECTED} | ${SF_RO}
	  SectionSetFlags ${test_section_id} $0
	FunctionEnd

## History

Added in NSIS v1.98

---

[1]: http://nsis.sourceforge.net/Docs/Examples/one-section.nsi