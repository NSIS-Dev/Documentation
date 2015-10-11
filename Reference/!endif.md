# !endif

This command closes a block started with [`!if`][1], [`!ifdef`][2], [`!ifndef`][3], [`!ifmacrodef`][4] or [`!ifmacrondef`][5].

## Example

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

## History

Added in NSIS v1.1f

[1]: !if.md
[2]: !ifdef.md
[3]: !ifndef.md
[4]: !ifmacrodef.md
[5]: !ifmacrondef.md