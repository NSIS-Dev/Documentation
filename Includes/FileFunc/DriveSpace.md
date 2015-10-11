# DriveSpace

Get total, occupied or free space of the drive.

## Syntax

	${DriveSpace} "[Drive]" "[Options]" $var

	"[Drive]"     ; Disk to check
	              ;     
	"[Options]"   ; /D=[T|O|F]
	              ;     /D=T  - Total space (default)
	              ;     /D=O  - Occupied space
	              ;     /D=F  - Free space
	              ; /S=[B|K|M|G]
	              ;     /S=B  - size in Bytes (default)
	              ;     /S=K  - size in Kilobytes
	              ;     /S=M  - size in Megabytes
	              ;     /S=G  - size in Gigabytes
	              ;
	$var          ; Result: Size

Note: 

- Error flag if disk isn't exist or not ready 
- Error flag if syntax error

## Example

	Section
		${DriveSpace} "C:\" "/D=F /S=M" $R0
		; $R0="2530"   megabytes free on drive C:
	SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor