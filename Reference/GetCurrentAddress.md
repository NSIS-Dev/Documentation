# GetCurrentAddress

---

Gets the address of the current instruction and stores it in the output user variable. This user variable then can be passed to [`Call`][1] or [`Goto`][2].

## Parameters

    user_var(output)

## Example

	Function func
		DetailPrint "function"
		IntOp $0 $0 + 2
		Call $0
		DetailPrint "function end"
	FunctionEnd
	 
	Section
	  DetailPrint "section"
	  DetailPrint "section"
	  GetCurrentAddress $0
	  Goto callFunc
	 
	  DetailPrint "back to section"
	  Return
	 
	callFunc:
	  Call func
	  DetailPrint "section end"
	SectionEnd

## History

Added in NSIS v1.80

---

[1]: Call.md
[2]: Goto.md