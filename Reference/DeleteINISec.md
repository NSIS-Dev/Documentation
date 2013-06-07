# DeleteINISec

---

Delete file (which can be a file or wildcard, but should be specified with a full path) from the target system. If `/REBOOTOK is specified and the file cannot be deleted then the file is deleted when the system reboots -- if the file will be deleted on a reboot, the reboot flag will be set. The error flag is set if files are found and cannot be deleted. The error flag is not set from trying to delete a file that does not exist.

## Parameters:

    ini_filename section_name

## Example:

	WriteINIStr $TEMP\something.ini section1 something 123
	WriteINIStr $TEMP\something.ini section1 somethingelse 1234
	WriteINIStr $TEMP\something.ini section2 nsis true
	DeleteINISec $TEMP\something.ini section1

## History:

Added in NSIS v1.1u

---
