# InstTypeSetText

---

Sets the Text of the specified [`InstType`][1]. If the Text is empty than the [`InstType`][1] is removed. By using a previously unused inst\_type\_idx number you can create new [`InstType`][1]. To add/remove [`Section`][2] to this new [`InstType`][1] see [`SectionSetInstTypes`][3]. Unlike [`SectionIn`][4] the index is zero based, which means the first install type's index is 0.

Gets the Text of the specified [`InstType`][1].

## Parameters:

    inst_type_idx text

## Example:

	InstType a
	InstType b
	 
	Function .onInit
		InstTypeGetText 0 $0
		DetailPrint $0 # prints 'a'
		InstTypeGetText 1 $0
		DetailPrint $0 # prints 'b'
	FunctionEnd

## History:

Added in NSIS v2.0

---

[1]: InstType.markdown
[2]: Section.markdown
[3]: SectionSetInstTypes.markdown
[4]: SectionIn.markdown