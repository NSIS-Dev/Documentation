# GetDrives

---

Find all available drives in the system.

## Syntax:

	${GetDrives} "[Option]" "Function"

	"[Option]"      ; [FDD+HDD+CDROM+NET+RAM]
	                ;   FDD    Floppy Disk Drives
	                ;   HDD    Hard Disk Drives 
	                ;   CDROM  CD-ROM Drives
	                ;   NET    Network Drives
	                ;   RAM    RAM Disk Drives
	                ;
	                ; [ALL]
	                ;   Find all drives by letter (default)
	                ;
	"Function"      ; Callback function when found

	Function "Function"
		; $9    "drive letter"  (a:\ c:\ ...)
		; $8    "drive type"    (FDD HDD ...)

		; $R0-$R9  are not used (save data in them).
		; ...

		Push $var    ; If $var="StopGetDrives" Then exit from function
	FunctionEnd

## Examples:

### Get floppy and CD-ROM drives

	Section
		${GetDrives} "FDD+CDROM" "Example1"
	SectionEnd

	Function Example1
		MessageBox MB_OK "$9  ($8 Drive)"

		Push $0
	FunctionEnd

### Get all drives

	Section
		${GetDrives} "ALL" "Example2"
	SectionEnd

	Function Example2
		MessageBox MB_OK "$9  ($8 Drive)"

		Push $0
	FunctionEnd

### Get type of drive

	Section
		StrCpy $R0 "D:\"      ;Drive letter
		StrCpy $R1 "invalid"

		${GetDrives} "ALL" "Example3"

		MessageBox MB_OK "Type of drive $R0 is $R1"
	SectionEnd

	Function Example3
		StrCmp $9 $R0 0 +3
		StrCpy $R1 $8
		StrCpy $0 StopGetDrives

		Push $0
	FunctionEnd

## Credits:

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor