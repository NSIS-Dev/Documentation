# !else

---

This command allows to easily insert different code when different defines or macros are set. You can create blocks like [`!ifdef`][1]/`!else`/[`!endif`][2], [`!ifdef`][1]/`!else` [`!ifdef`][1]/`!else`/[`!endif`][2] etc.

## Parameters

    [if|ifdef|ifndef|ifmacrodef|ifmacrondef [...]]

## Example

	!ifdef VERSION
		OutFile installer-${VERSION}.exe
	!else
		sOutFile installer.exe
	!endif

## History

Added in NSIS v1.1f

---

[1]: !ifdef.md
[2]: !endif.md