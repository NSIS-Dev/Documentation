# Locate

---

Find files, directories and empty directories with mask and size options.

## Syntax:

	${Locate} "[Path]" "[Options]" "Function"

	"[Path]"      ; Disk or Directory
	              ;
	"[Options]"   ; /L=[FD|F|D|DE|FDE]
	              ;     /L=FD    - Locate Files and Directories (default)
	              ;     /L=F     - Locate Files only
	              ;     /L=D     - Locate Directories only
	              ;     /L=DE    - Locate Empty Directories only
	              ;     /L=FDE   - Locate Files and Empty Directories
	              ; /M=[mask]
	              ;     /M=*.*         - Locate all (default)
	              ;     /M=*.doc       - Locate Work.doc, 1.doc ...
	              ;     /M=Pho*        - Locate PHOTOS, phone.txt ...
	              ;     /M=win???.exe  - Locate winamp.exe, winver.exe ...
	              ;     /M=winamp.exe  - Locate winamp.exe only
	              ; /S=No:No[B|K|M|G]
	              ;     /S=      - Don't locate file size (faster) (default)
	              ;     /S=0:0B  - Locate only files of 0 Bytes exactly
	              ;     /S=5:9K  - Locate only files of 5 to 9 Kilobytes
	              ;     /S=:10M  - Locate only files of 10 Megabyte or less
	              ;     /S=1G    - Locate only files of 1 Gigabyte or more
	              ; /G=[1|0]
	              ;     /G=1     - Locate with subdirectories (default)
	              ;     /G=0     - Locate without subdirectories
	              ; /B=[0|1]
	              ;     /B=0     - Banner isn't used (default)
	              ;     /B=1     - Banner is used. Callback when function
	              ;                start to search in new directory
	"Function"    ; Callback function when found

	Function "Function"
		; $R9    "path\name"
		; $R8    "path"
		; $R7    "name"
		; $R6    "size"  ($R6="" if directory, $R6="0" if file with /S=)

		; $R0-$R5  are not used (save data in them).
		; ...

		Push $var    ; If $var="StopLocate" Then exit from function
	FunctionEnd

Note: 

- Error flag if disk or directory isn't exist 
- Error flag if syntax error 
- See also [Locate plugin](1)

## Examples:

### Find one file

	Section
		${Locate} "C:\ftp" "/L=F /M=RPC DCOM.rar /S=1K" "Example1"
		; 'RPC DCOM.rar' file in 'C:\ftp' with size 1 Kb or more

		IfErrors 0 +2
		MessageBox MB_OK "Error" IDOK +2
		MessageBox MB_OK "$$R0=$R0"
	SectionEnd

	Function Example1
		StrCpy $R0 $R9
		; $R0="C:\ftp\files\RPC DCOM.rar"

		MessageBox MB_YESNO '$R0$\n$\nFind next?' IDYES +2
		StrCpy $0 StopLocate

		Push $0
	FunctionEnd

### Write results to a text file

	Section
		GetTempFileName $R0
		FileOpen $R1 $R0 w
		${Locate} "C:\ftp" "/S=:2M /G=0" "Example2"
		; folders and all files with size 2 Mb or less
		; don't scan subdirectories
		FileClose $R1

		IfErrors 0 +2
		MessageBox MB_OK "Error" IDOK +2
		Exec '"notepad.exe" "$R0"'
	SectionEnd

	Function Example2
		StrCmp $R6 '' 0 +3
		FileWrite $R1 "Directory=$R9$\r$\n"
		goto +2
		FileWrite $R1 "File=$R9  Size=$R6 Mb$\r$\n"

		Push $0
	FunctionEnd

### Write results to an INI file

	Section
		GetTempFileName $R0
		${Locate} "C:\ftp" "/L=F /S=0K" "Example3"
		; all files in 'C:\ftp' with size detect in Kb

		IfErrors 0 +2
		MessageBox MB_OK "Error" IDOK +2
		Exec '"notepad.exe" "$R0"'
	SectionEnd

	Function Example3
		WriteINIStr $R0 "$R8" "$R7" "$R6 Kb"

		Push $0
	FunctionEnd

### Delete empty directories

	Section
		StrCpy $R2 0
		StrCpy $R3 0

		loop:
		StrCpy $R1 0
		${Locate} "C:\ftp" "/L=DE" "Example4"
		IntOp $R3 $R3 + 1
		IntOp $R2 $R2 + $R1
		StrCmp $R0 StopLocate +2
		StrCmp $R1 0 0 loop

		IfErrors 0 +2
		MessageBox MB_OK 'error' IDOK +2
		MessageBox MB_OK '$R2 directories were removed$\n$R3 loops'
	SectionEnd

	Function Example4
		MessageBox MB_YESNOCANCEL 'Delete empty "$R9"?' IDNO end IDCANCEL cancel
		RMDir $R9
		IntOp $R1 $R1 + 1
		goto end

		cancel:
		StrCpy $R0 StopLocate

		end:
		Push $R0
	FunctionEnd

### Move all files into one folder

	Section
		StrCpy $R0 "C:\ftp"   ;Directory move from
		StrCpy $R1 "C:\ftp2"  ;Directory move into

		StrCpy $R2 0
		StrCpy $R3 0
		${Locate} "$R0" "/L=F" "Example5"

		IfErrors 0 +2
		MessageBox MB_OK 'error' IDOK +4
		StrCmp $R3 0 0 +2
		MessageBox MB_OK '$R2 files were moved' IDOK +2
		MessageBox MB_OK '$R2 files were moved$\n$R3 files were NOT moved'
	SectionEnd

	Function Example5
		StrCmp $R8 $R1 +6
		IfFileExists '$R1\$R7' +4
		Rename $R9 '$R1\$R7'
		IntOp $R2 $R2 + 1
		goto +2
		IntOp $R3 $R3 + 1

		Push $0
	FunctionEnd

### Copy files with log

	Section
		StrCpy $R0 "C:\ftp"   ;Directory copy from
		StrCpy $R1 "C:\ftp2"  ;Directory copy into
		StrLen $R2 $R0

		GetTempFileName $0
		FileOpen $R3 $0 w
		${Locate} "$R0" "/L=FDE" "Example6"
		FileClose $R3

		IfErrors 0 +2
		MessageBox MB_OK 'error'

		Exec '"notepad.exe" "$0"'     ;view log
	SectionEnd

	Function Example6
		StrCpy $1 $R8 '' $R2

		StrCmp $R6 '' 0 +3
		CreateDirectory '$R1$1\$R7'
		goto end
		CreateDirectory '$R1$1'
		CopyFiles /SILENT $R9 '$R1$1'

		IfFileExists '$R1$1\$R7' 0 +3
		FileWrite $R3 "-old:$R9  -new:$R1$1\$R7  -success$\r$\n"
		goto +2
		FileWrite $R3 "-old:$R9  -new:$R1$1\$R7  -failed$\r$\n"

		end:
		Push $0
	FunctionEnd

### Recreate directory structure

	Section
		StrCpy $R0 "C:\ftp"     ;Directory structure from
		StrCpy $R1 "C:\ftp2"    ;Directory structure into
		StrLen $R2 $R0

		${Locate} "$R0" "/L=D" "Example7"

		IfErrors 0 +2
		MessageBox MB_OK 'error'
	SectionEnd

	Function Example7
		StrCpy $1 $R9 '' $R2
		CreateDirectory '$R1$1'

		Push $0
	FunctionEnd

### Locate with banner - NxS plugin required

	Section
		nxs::Show /NOUNLOAD `$(^Name) Setup` /top `Setup searching something$\r$\nPlease wait... If you can..` /h 1 /can 1 /end
		${Locate} "C:\WINDOWS" "/L=F /M=*.inf /B=1" "Example8"
		nxs::Destroy
	SectionEnd

	Function Example8
		StrCmp $R0 $R8 abortcheck
		StrCpy $R0 $R8
		nxs::Update /NOUNLOAD /sub "$R8" /pos 78 /end

		abortcheck:
		nxs::HasUserAborted /NOUNLOAD
		Pop $0
		StrCmp $0 1 0 +2
		StrCpy $0 StopLocate

		StrCmp $R9 '' end
		;...

		end:
		Push $0
	FunctionEnd

## Credits:

Written by [Instructor](2)

---

[1]: http://nsis.sourceforge.net/Locate_plugin
[2]: http://nsis.sourceforge.net/User:Instructor