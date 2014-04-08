# !searchparse

---

Parses source\_string\_or\_file (which is treated as a string, or as a filename if `/file` is set), looking for substring\_start. If substring\_start is found, then OUTPUTSYMBOL1 is defined to the rest of the string (minus any other substring that may be found). Any number of OUTPUTSYMBOLx may be specified, and the final substring is optional.
If `/noerrors` is specified, matching less than the full number of strings is allowed (all OUTPUTSYMBOLx after the not-found substring will be ignored).
If `/file` is specified, the file is treated as a series of lines. The file is searched until all substrings are matched. If `/noerrors` is specified and not all strings are matched, the first line with the most symbols matched is used.

## Parameters:

    [/ignorecase] [/noerrors] [/file] source_string_or_file substring_start OUTPUTSYMBOL1 [substring [OUTPUTSYMBOL2 [substring ...]]]

## Example:

	# search filename.cpp for a line '#define APP_VERSION "2.5"' and set ${VER_MAJOR} to 2, ${VER_MINOR} to 5.
	!searchparse /file filename.cpp `#define APP_VERSION "` VER_MAJOR `.` VER_MINOR `"`

## History:

Added in NSIS v2.39

---
