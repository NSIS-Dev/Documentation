# IfFileExists

---

Checks for existence of file(s) file\_to\_check\_for (which can be a wildcard, or a directory), and [`Goto`][1] jump\_if\_present if the file exists, otherwise [`Goto`][1] jump_otherwise. If you want to check to see if a file is a directory, use IfFileExists DIRECTORY\*

## Parameters:

    file_to_check_for jump_if_present [jump_otherwise]

## Example:

	IfFileExists $WINDIR\notepad.exe 0 +2
	MessageBox MB_OK "notepad is installed"

## History:

Added in NSIS v1.1n

---

[1]: Goto.markdown