# WriteRegStr

---

Write a string to the registry. See [`WriteRegExpandStr`][1] for more details.

## Parameters

    root_key subkey key_name value

## Example

	WriteRegStr HKLM "Software\My Company\My Software" "String Value" "dead beef"

## History

Added in NSIS v1.0f

---

[1]: WriteRegExpandStr.md