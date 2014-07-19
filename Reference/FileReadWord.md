# FileReadUTF16LE

---

This function is only available when building a [Unicode installer][1].

Reads a word (2-bytes) from a file opened with [`FileOpen`][2]. The word is stored in the output as an integer (0-65535). If the end of file is read and no more data is available, the output will be empty, and the error flag will be set.

## Parameters:

    handle user_var(output)

## Example:

	ClearErrors
	FileOpen $0 $INSTDIR\file.dat r
	IfErrors done
	FileReadWord $0 $1
	FileReadWord $0 $2
	DetailPrint "$1 $2"
	FileClose $0
	done:

## History:

Added in NSIS v3.0a0

---

[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
[2]: FileOpen.md