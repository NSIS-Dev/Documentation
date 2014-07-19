# FileWrite

---

Writes an ANSI string to a file opened with [`FileOpen`][1]. If an error occurs writing, the error flag will be set.

(If you are building a [Unicode installer][2], the function makes the adequate conversion and writes an ANSI string)

## Parameters:

    handle string

## Example:

	ClearErrors
	FileOpen $0 $INSTDIR\file.dat w
	IfErrors done
	FileWrite $0 "some text"
	FileClose $0
	done:

## History:

Added in NSIS v1.60

---

[1]: FileOpen.md
[2]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4