# StrCpy

---

Sets the user variable $x with str. Note that str can contain other variables, or the user variable being set (concatenating strings this way is possible, etc). If maxlen is specified, the string will be a maximum of maxlen characters (if maxlen is negative, the string will be truncated abs(maxlen) characters from the end). If start\_offset is specified, the source is offset by it (if start\_offset is negative, it will start abs(start_offset) from the end of the string).

## Parameters:

    user_var(destination) str [maxlen] [start_offset]

## Example:

	StrCpy $0 "a string" # = "a string"
	StrCpy $0 "a string" 3 # = "a s"
	StrCpy $0 "a string" -1 # = "a strin"
	StrCpy $0 "a string" "" 2 # = "string"
	StrCpy $0 "a string" "" -3 # = "ing"
	StrCpy $0 "a string" 3 -4 # = "rin"

## History:

Added in NSIS v1.2g

---
