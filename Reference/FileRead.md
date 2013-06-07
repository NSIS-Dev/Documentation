# FileRead

---

Reads a string (ANSI characters) from a file opened with [`FileOpen`][1]. The string is read until either a newline (or carriage return newline pair) occurs, or until a null byte is read, or until maxlen is met (if specified). By default, strings are limited to 1024 characters (a special build with larger NSIS_MAX_STRLEN can be compiled or downloaded). If the end of file is read and no more data is available, the output string will be empty, and the error flag will be set.

(If you are building a [Unicode installer][2], the function reads an ANSI string and makes the adequate conversion)

## Parameters:

    handle user_var(output) [maxlen]

## Example:

	ClearErrors
	FileOpen $0 $INSTDIR\file.dat r
	IfErrors done
	FileRead $0 $1
	DetailPrint $1
	FileClose $0
	done:

## History:

Added in NSIS v1.60

---

[1]: FileOpen.md
[2]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4