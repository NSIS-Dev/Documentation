# IfFileExists

Checks for existence of file(s) file\_to\_check\_for (which can be a wildcard, or a directory), and [`Goto`][1] jump\_if\_present if the file exists, otherwise [`Goto`][1] jump_otherwise. If you want to check to see if a file is a directory, use IfFileExists DIRECTORY\*

## Parameters

    file_to_check_for jump_if_present [jump_otherwise]

## Example

	IfFileExists $WINDIR\notepad.exe 0 +2
	MessageBox MB_OK "notepad is installed"

You can also use labels, which may help make your code easier to read:

	IfFileExists $INSTDIR\somefile.txt file_found file_not_found
	
	file_found:
	MessageBox MB_OK "somefile.txt was found"
	Goto done
	
	file_not_found:
	MessageBox MB_OK "somefile.txt was not found"
	
	done:
	; ...

## History

Added in NSIS v1.1n

[1]: Goto.md
