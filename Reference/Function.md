# Function

---

Begins and opens a new function. Function names beginning with "." (e.g. ".Whatever") are generally reserved for callback functions. Function names beginning with "un." are functions that will be generated in the Uninstaller. Hence, normal install Sections and functions cannot call uninstall functions, and the Uninstall Section and uninstall functions cannot call normal functions.

## Parameters

    [function_name]

## Example

	Function func
		# some commands
	FunctionEnd

	Section
		Call func
	SectionEnd

## History

Added in NSIS v1.3

---
