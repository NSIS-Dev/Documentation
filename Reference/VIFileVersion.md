# VIFileVersion

---

Sets the File Version in the VS\_FIXEDFILEINFO version information block (You should also set the FileVersion string with [`VIAddVersionKey`][1] so the information is displayed at the top of the Version Tab in the Properties of the file). If you don't provide a File Version the Product Version is used in the VS\_FIXEDFILEINFO block.

## Parameters:

    [version_string_X.X.X.X]

## Example:

	VIFileVersion 1.2.3.4

## History:

Added in NSIS v3.0a0

---

[1]: VIAddVersionKey.md
