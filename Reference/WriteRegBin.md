# WriteRegBin

---

This command writes a block of binary data to the registry. Valid values for root_key are listed under `WriteRegStr`. Valuedata is in hexadecimal (e.g. DEADBEEF01223211151). The error flag is set if the binary data could not be written to the registry. If the registry key doesn't exist it will be created.

## Parameters:

    root_key subkey key_name valuedata

## Example:

	WriteRegBin HKLM "Software\My Company\My Software" "Binary Value" DEADBEEF01223211151

## History:

Added in NSIS 1.0f

---
