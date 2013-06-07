# FileReadUTF16LE

---

This function is only available when building a [Unicode installer][1].

Reads a string (UTF-16LE characters) from a file opened with [`FileOpen`][2]. The string is read until either a newline (or carriage return newline pair) occurs, or until a null wide-character is read, or until maxlen is met (if specified). By default, strings are limited to 1024 characters (a special build with larger NSIS_MAX_STRLEN can be compiled or downloaded). If the end of file is read and no more data is available, the output string will be empty, and the error flag will be set.

## Parameters:

    handle user_var(output)

## Example:

	ClearErrors
	FileOpen $0 $INSTDIR\file.dat r
	IfErrors done
	FileReadByte $0 $1
	FileReadByte $0 $2
	DetailPrint "$1 $2"
	FileClose $0
	done:

## History:

Added in NSIS v3.0a0

---

[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
[2]: FileOpen.md