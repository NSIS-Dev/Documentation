# InstTypeGetText

---

Gets the Text of the specified [`InstType`][1].

## Parameters:

    inst_type_idx user_var

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