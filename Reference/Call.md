# Call

---

Calls the function named function\_name, the label named label\_name, or a variable that specifies an address. An address is returned by [`GetCurrentAddress`][1], [`GetFunctionAddress`][2] or [`GetLabelAddress`][3]. A call returns when it encounters a [`Return`][4] instruction. Sections and functions are automatically ended with a Return instruction. Uninstall functions cannot be called from installer functions and sections, and vice-versa.

## Parameters:

    function_name | :label_name | user_var(input)

## Example:

	Function func
		  Call :label
		  DetailPrint "#1: This will only appear 1 time."
		label:
		  DetailPrint "#2: This will appear before and after message #1."
		  Call :.global_label
	FunctionEnd
	 
	Section
		  Call func
		  Return
		 
		.global_label:
		  DetailPrint "#3: The global label was called"
	SectionEnd

## History:

Added in NSIS v1.3

---

[1]: GetCurrentAddress.md
[2]: GetFunctionAddress.md
[3]: GetLabelAddress.md
[4]: Return.md