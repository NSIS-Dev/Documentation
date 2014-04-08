# !endif

---

This command closes a block started with [`!if`][1], [`!ifdef`][2], [`!ifndef`][3], [`!ifmacrodef`][4] or [`!ifmacrondef`][5].

## Example:

	!ifdef VERSION
		OutFile installer-${VERSION}.exe
	!else
		sOutFile installer.exe
	!endif

	!ifmacrodef MACRO
		DetailPrint "Macro defined" 
	!else
		DetailPrint "Macro not defined" 
	!endif

## History:

Added in NSIS v1.1f

---

[1]: !if.markdown
[2]: !ifdef.markdown
[3]: !ifndef.markdown
[4]: !ifmacrodef.markdown
[5]: !ifmacrondef.markdown