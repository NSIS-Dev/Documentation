# SectionIn

---

This command specifies which install types (see [`InstType`][1]) the current section defaults to the enabled state in. Multiple `SectionIn` commands can be specified (they are combined). If you specify `$RO` as a parameter, then the section will be read-only, meaning the user won't be able to change its state. The first install type defined using [`InstType'][1] is indexed 1, the next 2 and so on.

## Parameters:

    insttype_index [insttype_index] [RO]

## Example:

	InstType "full"
	InstType "minimal"
	 
	Section "a section"
		SectionIn 1 2
	SectionEnd
	 
	Section "another section"
		SectionIn 1
	SectionEnd

## History:

Added in NSIS v1.0f

---

[1]: InstType.markdown