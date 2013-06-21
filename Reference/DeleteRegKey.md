# DeleteRegKey

---

Deletes a registry key. If `/ifempty` is specified, the registry key will only be deleted if it has no subkeys (otherwise, the whole registry tree will be removed). Valid values for root_key are listed under [`WriteRegStr`][1]. The error flag is set if the key could not be removed from the registry (or if it didn't exist to begin with).

## Parameters:

    [/ifempty] root_key subkey

## Example:

	DeleteRegKey HKLM "Software\My Company\My Software"
	DeleteRegKey /ifempty HKLM "Software\A key that might have subkeys"

## History:

Added in NSIS 1.0f

---

[1]: WriteRegStr.md