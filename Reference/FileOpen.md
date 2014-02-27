# FileOpen

---

Opens a file named "filename", and sets the handle output variable with the handle. The openmode should be one of "r" (read) "w" (write, all contents of file are destroyed) or "a" (append, meaning opened for both read and write, contents preserved). In all open modes, the file pointer is placed at the beginning of the file. If the file cannot be opened, the handle output is set to empty, and the error flag is set.

If no absolute path is specified the current folder will be used. The current folder is the folder set using the last `SetOutPath` instruction. If you have not used [`SetOutPath`][1] the current folder is [`$EXEDIR`][1].

## Parameters:

    user_var(handle output) filename openmode

## Example:

	FileOpen $0 $INSTDIR\file.dat r
	FileClose $0

## History:

Added in NSIS v1.60

---

[1]: SetOutPath.md
[2]: ../Variables/EXEDIR.md