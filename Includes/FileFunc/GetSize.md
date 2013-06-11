# GetSize

---

* Find the size of a file, files mask or directory.
* Find the sum of the files, directories and subdirectories.

## Syntax:

	${GetSize} "[Path]" "[Options]" $var1 $var2 $var3

	"[Path]"      ; Disk or Directory
	              ;
	"[Options]"   ; /M=[mask]
	              ;     /M=*.*         - Find all (default)
	              ;     /M=*.doc       - Find Work.doc, 1.doc ...
	              ;     /M=Pho*        - Find PHOTOS, phone.txt ...
	              ;     /M=win???.exe  - Find winamp.exe, winver.exe ...
	              ;     /M=winamp.exe  - Find winamp.exe only
	              ; /S=No:No[B|K|M|G]
	              ;     /S=      - Don't find file size (faster) (default)
	              ;     /S=0:0B  - Find only files of 0 Bytes exactly
	              ;     /S=5:9K  - Find only files of 5 to 9 Kilobytes
	              ;     /S=:10M  - Find only files of 10 Megabyte or less
	              ;     /S=1G    - Find only files of 1 Gigabyte or more
	              ; /G=[1|0]
	              ;     /G=1     - Find with subdirectories (default)
	              ;     /G=0     - Find without subdirectories
	              ;
	$var1         ; Result1: Size
	$var2         ; Result2: Sum of files
	$var3         ; Result3: Sum of directories

Note: 

- Error flag if disk or directory isn't exist 
- Error flag if syntax error 
- See also [Locate plugin](1)

## Examples:

### Find file size in kilobytes

	Section
		${GetSize} "C:\WINDOWS" "/M=Explorer.exe /S=0K /G=0" $0 $1 $2
		; $0="220" Kb
		; $1="1"   files
		; $2=""    directories

		IfErrors 0 +2
		MessageBox MB_OK "Error"
	SectionEnd

### Find folder size in megabytes

	Section
		${GetSize} "C:\Installs\Reanimator\Drivers" "/S=0M" $0 $1 $2
		; $0="132" Mb
		; $1="555" files
		; $2="55"  directories

		IfErrors 0 +2
		MessageBox MB_OK "Error"
	SectionEnd

### Find sum of files and folders (no subfolders)

	Section
		${GetSize} "C:\WINDOWS" "/G=0" $0 $1 $2
		; $0=""    size
		; $1="253" files
		; $2="46"  directories

		IfErrors 0 +2
		MessageBox MB_OK "Error"
	SectionEnd

## Credits:

Written by [Instructor](2)

---

[1]: http://nsis.sourceforge.net/Locate_plugin
[2]: http://nsis.sourceforge.net/User:Instructor