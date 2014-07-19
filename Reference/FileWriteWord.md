# FileWriteWord

---

This function is only available when building a [Unicode installer][1].

Writes the integer interpretation of 'string' as a WORD (2-bytes, range: 0-65535) to a file opened with [`FileOpen`][2]. Of course you can enter the integer value directly. The following code writes a "Carriage Return / Line Feed" - Enter to the file.

## Parameters:

    handle string

## Example:

	FileWriteWord file_handle "13"
	FileWriteWord file_handle "10"

If an error occurs while writing, the error flag will be set. Note that the low WORD of the integer is used, i.e. writing 65536 is the same as writing 0, etc.

## History:

Added in NSIS v3.0a0

---

[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
[2]: FileOpen.md