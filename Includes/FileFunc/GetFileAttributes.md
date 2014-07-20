# GetFileAttributes

---

Get attributes of file or directory.

## Syntax

	${GetFileAttributes} "[File]" "[Attributes]" $var

	"[File]"          ; File or directory
	                  ;
	"[Attributes]"    ; "ALL"  (default)
	                  ;  -all attributes of file combined with "|" to output
	                  ;
	                  ; "READONLY|HIDDEN|SYSTEM|DIRECTORY|ARCHIVE|
	                  ; DEVICE|NORMAL|TEMPORARY|SPARSE_FILE|REPARSE_POINT|
	                  ; COMPRESSED|OFFLINE|NOT_CONTENT_INDEXED|ENCRYPTED"
	                  ;  -file must have specified attributes
	                  ;
	$var              ; Result:
	                  ;    $var=attr1|attr2|... (if used "ALL")
	                  ;    $var=1   file has specified attributes
	                  ;    $var=0   file has no specified attributes

Note:

- Error flag if file doesn't exist

## Examples

### Get all file attributes

	Section
		${GetFileAttributes} "C:\MSDOS.SYS" "ALL" $R0
		; $R0=READONLY|HIDDEN|SYSTEM|ARCHIVE
	SectionEnd

### Get some file attributes

	Section
		${GetFileAttributes} "C:\MSDOS.SYS" "SYSTEM|HIDDEN" $R0
		; $R0=1
	SectionEnd

### Get file attribute "NORMAL"

	Section
		${GetFileAttributes} "C:\MSDOS.SYS" "NORMAL" $R0
		; $R0=0
	SectionEnd

## Credits

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor