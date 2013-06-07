# Var

---

Declare a user variable. Allowed characters for variables names: [a-z][A-Z][0-9] and '_'. All defined variables are global, even if defined in a section or a function. To make this clear, variables defined in a section or a function must use the `/GLOBAL flag. The `/GLOBAL flag is not required outside of sections and functions.

## Parameters:

    [/GLOBAL] var_name

## Example:

	Var example
 
	Function testVar
		Var /GLOBAL example2

		StrCpy $example "example value"
		StrCpy $example2 "another example value"
	FunctionEnd

## History:

Added in NSIS v2.0 Beta 4

---
