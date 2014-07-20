# ReadINIStr

---

Reads from entry\_name in [section\_name] of ini\_filename and stores the value into user variable $x. The error flag will be set and $x will be assigned to an empty string if the entry is not found.

## Parameters

    user_var(output) ini_filename section_name entry_name

## Example

	ReadINIStr $0 $INSTDIR\winamp.ini winamp outname

## History

Added in NSIS v1.2g

---
