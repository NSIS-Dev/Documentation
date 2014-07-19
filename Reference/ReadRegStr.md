# ReadRegStr

---

Reads from the registry into the user variable $x. Valid values for root\_key are listed under [`WriteRegStr`][1]. The error flag will be set and $x will be set to an empty string ("") if the string is not present. If the value is present, but is of type REG\_DWORD, it will be read and converted to a string and the error flag will be set.

## Parameters:

    user_var(output) root_key sub_key name

## Example:

	ReadRegStr $0 HKLM Software\NSIS ""
	DetailPrint "NSIS is installed at: $0"

## History:

Added in NSIS v1.2g

---

[1]: WriteRegStr.markdown