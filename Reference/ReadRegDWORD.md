# ReadRegDWORD

---

Reads a 32 bit DWORD from the registry into the user variable $x. Valid values for root_key are listed under [`WriteRegStr`][1]. The error flag will be set and $x will be set to an empty string ("" which is 0) if the DWORD is not present. If the value is present, but is not a DWORD, it will be read as a string and the error flag will be set.

## Parameters:

    user_var(output) root_key sub_key name

## Example:

	ReadRegDWORD $0 HKLM Software\NSIS VersionBuild

## History:

Added in NSIS v1.50

---

[1]: WriteRegStr.markdown