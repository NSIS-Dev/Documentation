# SetRegView

---

Sets the registry view affected by registry commands. On Windows x64 there are two views. One for 32-bit applications and one for x64 applications. By default, 32-bit applications running on x64 systems under WOW64 have access only to the 32-bit view. Using SetRegView 64 allows the installer to access keys in the x64 view of the registry.

Affects [`DeleteRegKey`][1], [`DeleteRegValue`][2], [`EnumRegKey`][3], [`EnumRegValue`][4], [`ReadRegDWORD`][5], [`ReadRegStr`][6], [`WriteRegBin`][7], [`WriteRegDWORD`][8], [`WriteRegStr`][9] and [`WriteRegExpandStr`][10].

Does not affect [`InstallDirRegKey`][11]. Instead, the registry can be read using [`ReadRegStr`][6] in [`.onInit`][12].

## Parameters:

    32|64|lastused

## Example:

	SetRegView 32
	ReadRegStr $0 HKLM Software\Microsoft\Windows\CurrentVersion ProgramFilesDir
	DetailPrint $0 # prints C:\Program Files (x86)
	SetRegView 64
	ReadRegStr $0 HKLM Software\Microsoft\Windows\CurrentVersion ProgramFilesDir
	DetailPrint $0 # prints C:\Program Files

	Function .onInit
		SetRegView 64
		ReadRegStr $INSTDIR HKLM Software\NSIS ""
		SetRegView 32
	FunctionEnd

## History:

Added in NSIS v2.26

---

[1]: DeleteRegKey.md
[2]: DeleteRegValue.md
[3]: EnumRegKey.md
[4]: EnumRegValue.md
[5]: ReadRegDWORD.md
[6]: ReadRegStr.md
[7]: WriteRegBin.md
[8]: WriteRegDWORD.md
[9]: WriteRegStr.md
[10]: WriteRegExpandStr.md
[11]: InstallDirRegKey.md
[12]: ../Functions/.onInit.md