# DeleteINIStr

---

Deletes the string str\_name from section [section\_name] from ini\_filename. If the string could not be removed from the ini file, the error flag is set. It does not set the error flag if the string could not be found.

## Parameters:

    ini_filename section_name str_name

## Example:

	WriteINIStr $TEMP\something.ini section1 something 123
	WriteINIStr $TEMP\something.ini section1 somethingelse 1234
	DeleteINIStr $TEMP\something.ini section1 somethingelse

## History:

Added in NSIS v1.1u

---
