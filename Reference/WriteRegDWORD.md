# WriteRegDWORD

---

This command writes a dword (32 bit integer) to the registry (a user variable can be specified). Valid values for root_key are listed under [`WriteRegStr`][1]. The error flag is set if the dword could not be written to the registry. If the registry key doesn't exist it will be created.

## Parameters:

    root_key subkey key_name value

## Example:

	WriteRegDWORD HKLM "Software\My Company\My Software" "DWORD Value" 0xDEADBEEF

## History:

Added in NSIS 1.0f

---

[1]: WriteRegStr.md