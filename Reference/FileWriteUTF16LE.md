# FileWriteUTF16LE

---

This function is only available when building a [Unicode installer][1].

Writes a Unicode (UTF-16LE) string to a file opened with [`FileOpen`][2]. If an error occurs writing, the error flag will be set.

## Parameters:

    handle string

## Example:

	ClearErrors
	FileOpen $0 $INSTDIR\file.dat w
	IfErrors done
	FileWriteUTF16LE $0 "some text"
	FileClose $0
	done:

## History:

Added in NSIS v3.0a0

---

[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
[2]: FileOpen.md