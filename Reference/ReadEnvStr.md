# ReadEnvStr

---

Reads from the environment string "name" and sets the value into the user variable $x. If there is an error reading the string, the user variable is set to empty, and the error flag is set.

## Parameters:

    user_var(output) name

## Example:

	ReadEnvStr $0 WINDIR
	ReadEnvStr $1 TEMP

## History:

Added in NSIS v1.58

---
