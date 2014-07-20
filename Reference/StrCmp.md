# StrCmp

---

Compares (case insensitively) str1 to str2. If str1 and str2 are equal, [`Goto`][1] jump\_if\_equal, otherwise [`Goto`][1] jump\_if\_not\_equal.

## Parameters

    str1 str2 jump_if_equal [jump_if_not_equal]

## Example

	StrCmp $0 "a string" 0 +3
	DetailPrint '$$0 == "a string"'
	Goto +2
	DetailPrint '$$0 != "a string"'

## History

Added in NSIS v1.2g

---

[1]: Goto.md