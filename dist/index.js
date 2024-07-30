var al=Object.defineProperty;var ll=(sl,n)=>{for(var e in n)al(sl,e,{get:n[e],enumerable:!0});};var et={};ll(et,{FileFunc:()=>dl,LogicLib:()=>cl,Memento:()=>ml,StrFunc:()=>ul,TextFunc:()=>fl,WinVer:()=>pl,WordFunc:()=>hl,x64:()=>Sl});var t=`# \${BannerTrimPath}

Trim string path for banner.

## Syntax

    \${BannerTrimPath} "[PathString]" "[Option]" $var

    "[PathString]"    ;
                      ;
    "[Option]"        ; [Length][A|B|C|D]
                      ;
                      ; Length  -Maximum string length
                      ;   A     -Trim center path (default)
                      ;           (C:\\root\\...\\third path) 
                      ;           If A mode not possible Then will be used B mode
                      ;   B     -Trim right path
                      ;           (C:\\root\\second path\\...)
                      ;           If B mode not possible Then will be used C mode
                      ;   C     -Trim right string
                      ;           (C:\\root\\second path\\third p...)
                      ;   D     -Trim right string + filename
                      ;           (C:\\root\\second p...\\third path)
                      ;           If D mode not possible Then will be used C mode
                      ;
    $var              ; Result:  Trimmed path

## Examples

### Trim center path to 35 characters max

    Section
        \${BannerTrimPath} "C:\\Server\\Documents\\Terminal\\license.htm" "35A" $R0
        ;$R0=C:\\Server\\...\\Terminal\\license.htm
    SectionEnd

### Banner plugin

    !include "WinMessages.nsh"
    !include "FileFunc.nsh"

    Section
        Banner::show "Starting..."
        Banner::getWindow
        Pop $R1
        \${Locate} "$WINDIR" "/L=F /M=*.* /B=1" "LocateCallback"
        Banner::destroy
    SectionEnd

    Function LocateCallback
        StrCmp $R0 $R8 code
        StrCpy $R0 $R8
        \${BannerTrimPath} "$R8" "38B" $R8
        GetDlgItem $1 $R1 1030
        SendMessage $1 \${WM_SETTEXT} 0 "STR:$R8"

        code:
        StrCmp $R9 '' end
        ;...

        end:
        Push $0
    FunctionEnd

### NxS plugin

    !include "FileFunc.nsh"

    Section
        nxs::Show /NOUNLOAD \`$(^Name) Setup\`\\
          /top \`Setup searching something$\\nPlease wait$\\nIf you can...\`\\
          /h 1 /can 1 /end
        \${Locate} "$WINDIR" "/L=F /M=*.* /B=1" "LocateCallback"
        nxs::Destroy
    SectionEnd

    Function LocateCallback
        StrCmp $R0 $R8 abortcheck
        StrCpy $R0 $R8
        \${BannerTrimPath} "$R8" "55A" $R8
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

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var o=`# \${DirState}

Check directory full, empty or not exist.

## Syntax

    \${DirState} "[path]" $var

    "[path]"      ; Directory
    $var          ; Result:
                  ;    $var=0  (empty)
                  ;    $var=1  (full)
                  ;    $var=-1 (directory not found)

## Example

    Section
        \${DirState} "$TEMP" $R0
        ; $R0="1"  directory is full
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var i=`# \${DriveSpace}

Get total, occupied or free space of the drive.

## Syntax

    \${DriveSpace} "[Drive]" "[Options]" $var

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
        \${DriveSpace} "C:\\" "/D=F /S=M" $R0
        ; $R0="2530"   megabytes free on drive C:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var r=`# \${GetBaseName}

Get file name without extension.

## Syntax

    \${GetBaseName} "[FileString]" $var

## Example

    Section
        \${GetBaseName} "C:\\ftp\\program.exe" $R0
        ; $R0="program"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var s=`# \${GetDrives}

Find all available drives in the system.

## Syntax

    \${GetDrives} "[Option]" "Function"

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
        ; $9    "drive letter"  (a:\\ c:\\ ...)
        ; $8    "drive type"    (FDD HDD ...)

        ; $R0-$R9  are not used (save data in them).
        ; ...

        Push $var    ; If $var="StopGetDrives" Then exit from function
    FunctionEnd

## Examples

### Get floppy and CD-ROM drives

    Section
        \${GetDrives} "FDD+CDROM" "Example1"
    SectionEnd

    Function Example1
        MessageBox MB_OK "$9  ($8 Drive)"

        Push $0
    FunctionEnd

### Get all drives

    Section
        \${GetDrives} "ALL" "Example2"
    SectionEnd

    Function Example2
        MessageBox MB_OK "$9  ($8 Drive)"

        Push $0
    FunctionEnd

### Get type of drive

    Section
        StrCpy $R0 "D:\\"      ;Drive letter
        StrCpy $R1 "invalid"

        \${GetDrives} "ALL" "Example3"

        MessageBox MB_OK "Type of drive $R0 is $R1"
    SectionEnd

    Function Example3
        StrCmp $9 $R0 0 +3
        StrCpy $R1 $8
        StrCpy $0 StopGetDrives

        Push $0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var a=`# \${GetExeName}

Get installer filename (with valid case for Windows 98/Me).

## Syntax

    \${GetExeName} $var

## Example

    Section
        \${GetExeName} $R0
        ; $R0="C:\\ftp\\program.exe"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var l=`# \${GetExePath}

Get installer pathname ([\`$EXEDIR\`][1] with valid case for Windows 98/Me).

## Syntax

    \${GetExePath} $var

## Example

    Section
        \${GetExePath} $R0
        ; $R0="C:\\ftp"
    SectionEnd

## Credits

Written by [Instructor][2]

[1]: ../../Variables/EXEDIR.md
[2]: http://nsis.sourceforge.net/User:Instructor
`;var d=`# \${GetFileAttributes}

Get attributes of file or directory.

## Syntax

    \${GetFileAttributes} "[File]" "[Attributes]" $var

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
        \${GetFileAttributes} "C:\\MSDOS.SYS" "ALL" $R0
        ; $R0=READONLY|HIDDEN|SYSTEM|ARCHIVE
    SectionEnd

### Get some file attributes

    Section
        \${GetFileAttributes} "C:\\MSDOS.SYS" "SYSTEM|HIDDEN" $R0
        ; $R0=1
    SectionEnd

### Get file attribute "NORMAL"

    Section
        \${GetFileAttributes} "C:\\MSDOS.SYS" "NORMAL" $R0
        ; $R0=0
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var c=`# \${GetFileExt}

Get extension of file.

## Syntax

    \${GetFileExt} "[FileString]" $var

## Example

    Section
        \${GetFileExt} "C:\\ftp\\program.exe" $R0
        ; $R0="exe"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var m=`# \${GetFileName}

Get last part from directory path.

## Syntax

    \${GetFileName} "[PathString]" $var

## Example

    Section
        \${GetFileName} "C:\\Program Files\\Winamp\\uninstwa.exe" $R0
        ; $R0="uninstwa.exe"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var u=`# \${GetFileVersion}

Get version information from executable file.

## Syntax

    \${GetFileVersion} "[Executable]" $var

    "[Executable]"      ; Executable file (*.exe *.dll ...)
    $var                ; Result: Version number

Note:

- Error flag if file doesn't exist
- Error flag if file doesn't contain version information

## Example

    Section
        \${GetFileVersion} "C:\\ftp\\program.exe" $R0
        ; $R0="1.1.0.12"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var f=`# \${GetOptions}

Get options from command line parameters.

## Syntax

    \${GetOptions} "[Parameters]" "[Option]" $var

    "[Parameters]"     ; command line parameters
                       ;
    "[Option]"         ; option name
                       ;
    $var               ; Result: option string

Note:

- Error flag if option not found
- First option symbol it is delimiter

## Examples

### Example 1

    Section
        \${GetOptions} "/S /T" "/T"  $R0

        IfErrors 0 +2
        MessageBox MB_OK "Not found" IDOK +2
        MessageBox MB_OK "Found"
    SectionEnd

### Example 2

    Section
        \${GetOptions} "-INSTDIR=C:\\Program Files\\Common Files -SILENT=yes" "-INSTDIR="  $R0
        ;$R0=C:\\Program Files\\Common Files
    SectionEnd

### Example 3

    Section
        \${GetOptions} '/SILENT=yes /INSTDIR="C:/Program Files/Common Files" /ADMIN=password' "/INSTDIR="  $R0
        ;$R0=C:/Program Files/Common Files
    SectionEnd

### Example 4

    Section
        \${GetOptions} \`-SILENT=yes -INSTDIR='"C:/Program Files/Common Files"' -ADMIN=password\` "-INSTDIR="  $R0
        ;$R0="C:/Program Files/Common Files"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var p=`# \${GetOptionsS}

Get case-sensitive options from command line parameters.

## Syntax

    \${GetOptionsS} "[Parameters]" "[Option]" $var

    "[Parameters]"     ; command line parameters
                       ;
    "[Option]"         ; option name
                       ;
    $var               ; Result: option string

Note:

- Error flag if option not found
- First option symbol it is delimiter

## Examples

### Example 1

    Section
        \${GetOptionsS} "/S /T" "/T"  $R0

        IfErrors 0 +2
        MessageBox MB_OK "Not found" IDOK +2
        MessageBox MB_OK "Found"
    SectionEnd

### Example 2

    Section
        \${GetOptionsS} "-INSTDIR=C:\\Program Files\\Common Files -SILENT=yes" "-INSTDIR="  $R0
        ;$R0=C:\\Program Files\\Common Files
    SectionEnd

### Example 3

    Section
        \${GetOptionsS} '/SILENT=yes /INSTDIR="C:/Program Files/Common Files" /ADMIN=password' "/INSTDIR="  $R0
        ;$R0=C:/Program Files/Common Files
    SectionEnd

### Example 4

    Section
        \${GetOptionsS} \`-SILENT=yes -INSTDIR='"C:/Program Files/Common Files"' -ADMIN=password\` "-INSTDIR="  $R0
        ;$R0="C:/Program Files/Common Files"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var h=`# \${GetParameters}

Get command line parameters.

## Syntax

    \${GetParameters} $var

## Example

    Section
        \${GetParameters} $R0
        ; $R0="[parameters]"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var S=`# \${GetParent}

Get parent directory.

## Syntax

    \${GetParent} "[PathString]" $var

## Example

    Section
        \${GetParent} "C:\\Program Files\\Winamp\\uninstwa.exe" $R0
        ; $R0="C:\\Program Files\\Winamp"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var $=`# \${GetRoot}

Get root directory.

## Syntax

    \${GetRoot} "[FullPath]" $var

## Examples

### Get root of local folder

    Section
        \${GetRoot} "C:\\Program Files\\NSIS" $R0
        ; $R0="C:"
    SectionEnd

### Get root of network share

    Section
        \${GetRoot} "\\\\SuperPimp\\NSIS\\Source\\exehead\\Ui.c" $R0
        ; $R0="\\\\SuperPimp\\NSIS"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var g=`# \${GetSize}

* Find the size of a file, files mask or directory.
* Find the sum of the files, directories and subdirectories.

## Syntax

    \${GetSize} "[Path]" "[Options]" $var1 $var2 $var3

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
- See also [Locate plugin][1]

## Examples

### Find file size in kilobytes

    Section
        \${GetSize} "C:\\WINDOWS" "/M=Explorer.exe /S=0K /G=0" $0 $1 $2
        ; $0="220" Kb
        ; $1="1"   files
        ; $2=""    directories

        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

### Find folder size in megabytes

    Section
        \${GetSize} "C:\\Installs\\Reanimator\\Drivers" "/S=0M" $0 $1 $2
        ; $0="132" Mb
        ; $1="555" files
        ; $2="55"  directories

        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

### Find sum of files and folders (no subfolders)

    Section
        \${GetSize} "C:\\WINDOWS" "/G=0" $0 $1 $2
        ; $0=""    size
        ; $1="253" files
        ; $2="46"  directories

        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

## Credits

Written by [Instructor][2]

[1]: http://nsis.sourceforge.net/Locate_plugin
[2]: http://nsis.sourceforge.net/User:Instructor
`;var I=`# \${GetTime}

* Get local or system time.
* Get file time (access, creation and modification).

## Syntax

    \${GetTime} "[File]" "[Option]" $var1 $var2 $var3 $var4 $var5 $var6 $var7
    "[File]"        ; Ignored if "L" or "LS"
                    ;
    "[Option]"      ; [Options]
                    ;   L   Local time
                    ;   A   last Access file time
                    ;   C   Creation file time
                    ;   M   Modification file time
                    ;   LS  System time (UTC)
                    ;   AS  last Access file time (UTC)
                    ;   CS  Creation file time (UTC)
                    ;   MS  Modification file time (UTC)
                    ;
    $var1           ; Result1: day
    $var2           ; Result2: month
    $var3           ; Result3: year
    $var4           ; Result4: day of week name
    $var5           ; Result5: hour
    $var6           ; Result6: minute
    $var7           ; Result7: seconds

Note:

- Error flag if file isn't exist
- Error flag if syntax error
- See also [Time plugin][1]

## Examples

### Get local time

    Section
        \${GetTime} "" "L" $0 $1 $2 $3 $4 $5 $6
        ; $0="01"      day
        ; $1="04"      month
        ; $2="2005"    year
        ; $3="Friday"  day of week name
        ; $4="16"      hour
        ; $5="05"      minute
        ; $6="50"      seconds

        MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\\nTime=$4:$5:$6'
    SectionEnd

### Get file time

    Section
        \${GetTime} "$WINDIR\\Explorer.exe" "C" $0 $1 $2 $3 $4 $5 $6
        ; $0="12"       day
        ; $1="10"       month
        ; $2="2004"     year
        ; $3="Tuesday"  day of week name
        ; $4="2"        hour
        ; $5="32"       minute
        ; $6="03"       seconds

        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\\nTime=$4:$5:$6'
    SectionEnd

### Get system time

    Section
        \${GetTime} "" "LS" $0 $1 $2 $3 $4 $5 $6
        ; $0="01"      day
        ; $1="04"      month
        ; $2="2005"    year
        ; $3="Friday"  day of week name
        ; $4="11"      hour
        ; $5="05"      minute
        ; $6="50"      seconds

        MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\\nTime=$4:$5:$6'
    SectionEnd

### Convert time to 12-hour format AM/PM

    Section
        \${GetTime} "" "L" $0 $1 $2 $3 $4 $5 $6

        StrCmp $4 0 0 +3
        StrCpy $4 12
        goto +3
        StrCmp $4 12 +5
        IntCmp $4 12 0 0 +3
        StrCpy $7 AM
        goto +3
        IntOp $4 $4 - 12
        StrCpy $7 PM

        MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\\nTime=$4:$5:$6 $7'
    SectionEnd

## Credits

Written by [Instructor][2]

[1]: http://nsis.sourceforge.net/Time_plugin
[2]: http://nsis.sourceforge.net/User:Instructor
`;var b=`# \${Locate}

Find files, directories and empty directories with mask and size options.

## Syntax

    \${Locate} "[Path]" "[Options]" "Function"

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
        ; $R9    "path\\name"
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
- See also [Locate plugin][1]

## Examples

### Find one file

    Section
        \${Locate} "C:\\ftp" "/L=F /M=RPC DCOM.rar /S=1K" "Example1"
        ; 'RPC DCOM.rar' file in 'C:\\ftp' with size 1 Kb or more

        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        MessageBox MB_OK "$$R0=$R0"
    SectionEnd

    Function Example1
        StrCpy $R0 $R9
        ; $R0="C:\\ftp\\files\\RPC DCOM.rar"

        MessageBox MB_YESNO '$R0$\\n$\\nFind next?' IDYES +2
        StrCpy $0 StopLocate

        Push $0
    FunctionEnd

### Write results to a text file

    Section
        GetTempFileName $R0
        FileOpen $R1 $R0 w
        \${Locate} "C:\\ftp" "/S=:2M /G=0" "Example2"
        ; folders and all files with size 2 Mb or less
        ; don't scan subdirectories
        FileClose $R1

        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        Exec '"notepad.exe" "$R0"'
    SectionEnd

    Function Example2
        StrCmp $R6 '' 0 +3
        FileWrite $R1 "Directory=$R9$\\r$\\n"
        goto +2
        FileWrite $R1 "File=$R9  Size=$R6 Mb$\\r$\\n"

        Push $0
    FunctionEnd

### Write results to an INI file

    Section
        GetTempFileName $R0
        \${Locate} "C:\\ftp" "/L=F /S=0K" "Example3"
        ; all files in 'C:\\ftp' with size detect in Kb

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
        \${Locate} "C:\\ftp" "/L=DE" "Example4"
        IntOp $R3 $R3 + 1
        IntOp $R2 $R2 + $R1
        StrCmp $R0 StopLocate +2
        StrCmp $R1 0 0 loop

        IfErrors 0 +2
        MessageBox MB_OK 'error' IDOK +2
        MessageBox MB_OK '$R2 directories were removed$\\n$R3 loops'
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
        StrCpy $R0 "C:\\ftp"   ;Directory move from
        StrCpy $R1 "C:\\ftp2"  ;Directory move into

        StrCpy $R2 0
        StrCpy $R3 0
        \${Locate} "$R0" "/L=F" "Example5"

        IfErrors 0 +2
        MessageBox MB_OK 'error' IDOK +4
        StrCmp $R3 0 0 +2
        MessageBox MB_OK '$R2 files were moved' IDOK +2
        MessageBox MB_OK '$R2 files were moved$\\n$R3 files were NOT moved'
    SectionEnd

    Function Example5
        StrCmp $R8 $R1 +6
        IfFileExists '$R1\\$R7' +4
        Rename $R9 '$R1\\$R7'
        IntOp $R2 $R2 + 1
        goto +2
        IntOp $R3 $R3 + 1

        Push $0
    FunctionEnd

### Copy files with log

    Section
        StrCpy $R0 "C:\\ftp"   ;Directory copy from
        StrCpy $R1 "C:\\ftp2"  ;Directory copy into
        StrLen $R2 $R0

        GetTempFileName $0
        FileOpen $R3 $0 w
        \${Locate} "$R0" "/L=FDE" "Example6"
        FileClose $R3

        IfErrors 0 +2
        MessageBox MB_OK 'error'

        Exec '"notepad.exe" "$0"'     ;view log
    SectionEnd

    Function Example6
        StrCpy $1 $R8 '' $R2

        StrCmp $R6 '' 0 +3
        CreateDirectory '$R1$1\\$R7'
        goto end
        CreateDirectory '$R1$1'
        CopyFiles /SILENT $R9 '$R1$1'

        IfFileExists '$R1$1\\$R7' 0 +3
        FileWrite $R3 "-old:$R9  -new:$R1$1\\$R7  -success$\\r$\\n"
        goto +2
        FileWrite $R3 "-old:$R9  -new:$R1$1\\$R7  -failed$\\r$\\n"

        end:
        Push $0
    FunctionEnd

### Recreate directory structure

    Section
        StrCpy $R0 "C:\\ftp"     ;Directory structure from
        StrCpy $R1 "C:\\ftp2"    ;Directory structure into
        StrLen $R2 $R0

        \${Locate} "$R0" "/L=D" "Example7"

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
        nxs::Show /NOUNLOAD \`$(^Name) Setup\` /top \`Setup searching something$\\r$\\nPlease wait... If you can..\` /h 1 /can 1 /end
        \${Locate} "C:\\WINDOWS" "/L=F /M=*.inf /B=1" "Example8"
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

## Credits

Written by [Instructor][2]

[1]: http://nsis.sourceforge.net/Locate_plugin
[2]: http://nsis.sourceforge.net/User:Instructor
`;var y=`# \${RefreshShellIcons}

After changing file associations, you can call this function to refresh the shell immediately.

## Syntax

    \${RefreshShellIcons}

## Example

    Section
        WriteRegStr HKCR "Winamp.File\\DefaultIcon" "" "$PROGRAMFILES\\Winamp\\WINAMP.EXE,2"
        \${RefreshShellIcons}
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var x=`# \${AndIf}

Adds any number of extra conditions to [\`If\`][1], [\`IfNot\`][2], [\`Unless\`][3], [\`ElseIf\`][4], [\`ElseIfNot\`][5] and [\`ElseUnless\`][6] statements.

## Syntax

    \${AndIf} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true
    StrCpy $1 true

    \${If} $0 == true
    \${AndIf} $1 == true
        MessageBox MB_OK "Everything's true"
    \${EndIf}

### Integer tests

    \${If} 2 > 1
    \${AndIf} 2 < 3
        MessageBox MB_OK "2 is greater than 1 and smaller than 3"
    \${EndIf}

### File conditions

    \${If} \${FileExists} $SYSDIR\\calc.exe
    \${AndIf} \${FileExists} $SYSDIR\\notepad.exe
        MessageBox MB_OK "We have both"
    \${EndIf}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
[3]: Unless.md
[4]: ElseIf.md
[5]: ElseIfNot.md
[6]: ElseUnless.md
`;var E=`# \${AndIfNot}

Adds any number of extra conditions to [\`If\`][1], [\`IfNot\`][2], [\`Unless\`][3], [\`ElseIf\`][4], [\`ElseIfNot\`][5] and [\`ElseUnless\`][6] statements. \`\${AndIfNot}\` and [\`\${AndUnless}\`][7] are equivalent and interchangeable.

## Syntax

    \${AndIfNot} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true
    StrCpy $1 true

    \${If} $0 == true
    \${AndIfNot} $1 == false
        MessageBox MB_OK "Everything's true"
    \${EndIf}

### Integer tests

    \${If} 2 > 1
    \${AndIfNot} 2 < 1
        MessageBox MB_OK "2 is always greater than 1"
    \${EndIf}

### File conditions

    \${IfNot} \${FileExists} $SYSDIR\\calc.exe
    \${AndIfNot} \${FileExists} $SYSDIR\\notepad.exe
        MessageBox MB_OK "We have neither"
    \${EndIf}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
[3]: Unless.md
[4]: ElseIf.md
[5]: ElseIfNot.md
[6]: ElseUnless.md
[7]: AndUnless.md
`;var w=`# \${AndUnless}

Adds any number of extra conditions to [\`If\`][1], [\`IfNot\`][2], [\`Unless\`][3], [\`ElseIf\`][4], [\`ElseIfNot\`][5] and [\`ElseUnless\`][6] statements. [\`\${AndIfNot}\`][7] and \`\${AndUnless}\` are equivalent and interchangeable.

## Syntax

    \${AndUnless} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true
    StrCpy $1 true

    \${Unless} $0 == true
    \${AndUnless} $1 == true
        MessageBox MB_OK "Nothing's true"
    \${EndUnless}

### Integer tests

    \${Unless} 2 == 2
    \${AndUnless} 1 == 1
        MessageBox MB_OK "This will never show"
    \${EndUnless}

### File conditions

    \${Unless} \${FileExists} $SYSDIR\\calc.exe
    \${AndUnless} \${FileExists} $SYSDIR\\notepad.exe
        MessageBox MB_OK "We have neither"
    \${EndUnless}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
[3]: Unless.md
[4]: ElseIf.md
[5]: ElseIfNot.md
[6]: ElseUnless.md
[7]: AndIfNot.md
`;var R=`# \${Break}

Breaks a block of statements.

## Syntax

    \${Break}

## Examples

### Simple example

    \${For} $1 1 10
        \${Break}
        MessageBox MB_OK "This will never show"
    \${Next}

### In combination with a MessageBox

    \${For} $1 1 10
        \${IfCmd} MessageBox MB_YESNO "We're at $1, continue up to 10?" IDYES \${||} \${Break} \${|}
    \${Next}

## Credits

Written by dselkirk and eccles
`;var C=`# \${Case}

Executes one of several blocks of statements, depending on the value of an expression. Use [\`\${Break}\`][1] to prevent fall-through to the next \`\${Case}\` section.

## Syntax

    \${Case[2|3|4|5]} value(s)

## Example

    StrCpy $0 1

    \${Select} $0
        \${Case} "1"
            MessageBox MB_OK "$$0 is 1"
            \${Break}
        \${Case} "2"
            MessageBox MB_OK "$$0 isn't 2"
            \${Break}
        \${Case2} "3" "4"
            MessageBox MB_OK "$$0 isn't 3 or 4"
            \${Break}
        \${Case3} "5" "6" "7"
            MessageBox MB_OK "$$0 isn't 5, 6 or 7"
            \${Break}
        \${CaseElse}
            MessageBox MB_OK "$$0 isn't anything else"
    \${EndSelect}

## Credits

Written by dselkirk and eccles

[1]: Break.md
`;var v=`# \${CaseElse}

Executes one of several blocks of statements, depending on the value of an expression. \`\${CaseElse}\` and [\`\${Default}\`][1] are equivalent and interchangeable.

## Syntax

    \${CaseElse}

## Example

    StrCpy $0 1

    \${Select} $0
        \${Case} "1"
            MessageBox MB_OK "$$0 is 1"
        \${Case} "2"
            MessageBox MB_OK "$$0 isn't 2"
        \${CaseElse}
            MessageBox MB_OK "$$0 isn't anything else"
    \${EndSelect}

## Credits

Written by dselkirk and eccles

[1]: Default.md
`;var N=`# \${Continue}

Continues a block of statements.

## Syntax

    \${Continue}

## Example

    \${Do}
        MessageBox MB_YESNO "Stop this loop?" IDYES \${Break} ID_NO \${Continue}
    \${Loop}

## Credits

Written by dselkirk and eccles
`;var F=`# \${Default}

Executes one of several blocks of statements, depending on the value of an expression. [\`\${CaseElse}\`][1] and \`\${Default}\` are equivalent and interchangeable.

## Syntax

    \${Default}

## Example

    StrCpy $0 1

    \${Select} $0
        \${Case} "1"
            MessageBox MB_OK "$$0 is 1"
        \${Case} "2"
            MessageBox MB_OK "$$0 isn't 2"
        \${Default}
            MessageBox MB_OK "$$0 isn't anything else"
    \${EndSelect}

## Credits

Written by dselkirk and eccles

[1]: CaseElse.md
`;var T=`# \${Do}

Repeats a block of statements until stopped, or depending on the value of an expression.

## Syntax

    \${Do}

## Example

    StrCpy $0 0

    \${Do}
        IntOp $0 $0 + 1
        \${If} $0 > 10
            \${ExitDo}
        \${EndIf}
    \${Loop}

## Credits

Written by dselkirk and eccles
`;var D=`# \${DoUntil}

Repeats a block of statements until stopped, or depending on the value of an expression.

## Syntax

    \${DoUntil} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 0

    \${DoUntil} $0 > 10
        IntOp $0 $0 + 1
    \${Loop}

## Credits

Written by dselkirk and eccles
`;var A=`# \${DoWhile}

Repeats a block of statements until stopped, or depending on the value of an expression.  \`\${DoWhile}\` and [\`\${While}\`][1] are equivalent and interchangeable.

## Syntax

    \${DoWhile} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 0

    \${DoWhile} $0 > 5
        IntOp $0 $0 + 1
    \${EndWhile}

## Credits

Written by dselkirk and eccles

[1]: While.md
`;var _=`# \${Else}

Conditionally executes a block of statements, depending on the value of an expression. Requires opening condition [\`\${If}\`][1] or [\`\${IfNot}\`][2].

## Syntax

    \${Else}

## Examples

### Check if condition is met

    StrCpy $0 true

    \${If} $0 == true
        MessageBox MB_OK "$$0 is always true"
    \${Else}
        MessageBox MB_OK "$$0 is never false"
    \${EndIf}

### Integer tests

    \${If} 1 > 0
        MessageBox MB_OK "1 is greater than 0"
    \${Else}
        MessageBox MB_OK "Something went wrong!"
    \${EndIf}

### File conditions

    \${IfNot} \${FileExists} $SYSDIR\\notepad.exe
        MessageBox MB_OK "Could not find notepad.exe"
    \${Else}
        Exec $SYSDIR\\notepad.exe
    \${EndIf}

### Section test

    Section "My Section" mySection
        MessageBox MB_OK "Section is selected!""

        \${If} \${SectionIsSelected} \${mySection}
            MessageBox MB_OK "Section is selected (and we knew that already!)"
        \${Else}
            MessageBox MB_OK "This will never show, dummy!"
        \${EndIf}
    SectionEnd

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
`;var W=`# \${ElseIf}

Conditionally executes a block of statements, depending on the value of an expression. Requires opening condition [\`\${If}\`][1] or [\`\${IfNot}\`][2].

## Syntax

    \${ElseIf} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true

    \${If} $0 == true
        MessageBox MB_OK "It's true"
    \${ElseIf} $0 == pie
        MessageBox MB_OK "$0 will never be a pie"
    \${EndIf}

### Integer tests

    \${If} 1 > 0
        MessageBox MB_OK "1 is greater than 0"
    \${ElseIf} 1 < 0
        MessageBox MB_OK "1 will never be smaller than 0"
    \${EndIf}

### File conditions

    \${If} \${FileExists} $SYSDIR\\notepad.exe
        Exec $SYSDIR\\notepad.exe
    \${ElseIf} \${FileExists} $EXEDIR\\notepad.exe
        Exec $EXEDIR\\notepad.exe
    \${Else}
        MessageBox MB_OK "Could not find notepad.exe"
    \${EndIf}

### Section test

    Section "My Section" mySection
        MessageBox MB_OK "Executing section"

        \${If} \${SectionIsSelected} \${mySection}
        \${AndIf} \${SectionIsReadOnly} \${mySection}
            MessageBox MB_OK "Ready-only section was selected"
        \${ElseIf} \${SectionIsReadOnly} \${mySection}
        \${AndIfNot} \${SectionIsSelected} \${mySection}
            MessageBox MB_OK "This will never show, dummy!"
        \${EndIf}
    SectionEnd

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
`;var M=`# \${ElseIfNot}

Conditionally executes a block of statements, depending on the value of an expression. \`\${ElseIfNot}\` and [\`\${ElseUnless}\`][1] are equivalent and interchangeable, as are [\`\${IfNot}\`][2] and [\`\${Unless}\`][3]. Requires opening condition [\`\${If}\`][4] or [\`\${IfNot}\`][5].

## Syntax

    \${ElseIfNot} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true

    \${IfNot} $0 == true
        MessageBox MB_OK "$$0 is true"
    \${ElseIfNot} $0 == false
        MessageBox MB_OK "$$0 isn't false"
    \${EndIf}

### File conditions

    \${IfNot} \${FileExists} $SYSDIR\\notepad.exe
    \${AndIf} \${FileExists} $EXEDIR\\notepad.exe
        ; we found a copy in $EXEDIR
        Exec $EXEDIR\\notepad.exe
    \${ElseIfNot} \${FileExists} $SYSDIR\\notepad.exe
    \${AndIfNot} \${FileExists} $EXEDIR\\notepad.exe
        MessageBox MB_OK "Could not find any notepad.exe"
    \${ElseIf} \${FileExists} $SYSDIR\\notepad.exe
        ; we should've done that in the first place!
        Exec $SYSDIR\\notepad.exe
    \${EndIf}

## Credits

Written by dselkirk and eccles

[1]: ElseUnless.md
[2]: IfNot.md
[3]: Unless.md
[4]: If.md
[5]: IfNot.md
`;var O=`# \${ElseUnless}

Conditionally executes a block of statements, depending on the value of an expression. [\`\${ElseIfNot}\`][1] and \`\${ElseUnless}\` are equivalent and interchangeable, as are [\`\${IfNot}\`][2] and [\`\${Unless}\`][3]. Requires opening condition [\`\${If}\`][4] or [\`\${IfNot}\`][5].

## Syntax

    \${ElseUnless} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 true

    \${Unless} $0 == true
        MessageBox MB_OK "$$0 is true"
    \${ElseUnless} $0 == false
        MessageBox MB_OK "$$0 isn't false"
    \${EndUnless}

## Credits

Written by dselkirk and eccles

[1]: ElseIfNot.md
[2]: IfNot.md
[3]: Unless.md
[4]: If.md
[5]: IfNot.md
`;var P=`# \${EndIf}

Ends an open condition started by [\`\${If}\`][1] or [\`\${IfNot}\`][2].

## Syntax

    \${EndIf}

## Example

    StrCpy $0 true

    \${If} $0 == true
        MessageBox MB_OK "It's true"
    \${EndIf}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
`;var L=`# \${EndSelect}

Ends an open block of statements started by [\`\${Select}\`][1].

## Syntax

    \${EndSelect}

## Example

    StrCpy $0 1

    \${Select} $0
        \${Case} "1"
            MessageBox MB_OK "$$0 is 1"
        \${Case} "2"
            MessageBox MB_OK "$$0 isn't 2"
        \${CaseElse}
            MessageBox MB_OK "$$0 isn't anything else"
    \${EndSelect}

## Credits

Written by dselkirk and eccles

[1]: Select.md
`;var B=`# \${EndSwitch}

Ends an open block of labels started by [\`\${Switch}\`][1].

## Syntax

    \${EndSwitch}

## Example

    {For} $0 1 10
        \${Switch} $0
            \${Case} "1"
                MessageBox MB_OK "$$0 is 1"
            \${Case} "2"
                MessageBox MB_OK "$$0 is 2"
            \${Case2} "3" "5"
                MessageBox MB_OK "$$0 is 3 or 5"
            \${CaseElse}
                MessageBox MB_OK "$$0 is something else ($0)"
        \${EndSwitch}
    \${Next}

## Credits

Written by dselkirk and eccles

[1]: Switch.md
`;var k=`# \${ExitDo}

Exits a block of statements until started by [\`\${Do}\`][1], [\`\${DoUntil}\`][2] or [\`\${DoWhile}\`][3].

## Syntax

    \${ExitDo}

## Example

    StrCpy $0 0

    \${Do}
        IntOp $0 $0 + 1
        \${If} $0 > 10
            \${ExitDo}
        \${EndIf}
    \${Loop}

## Credits

Written by dselkirk and eccles

[1]: Do.md
[2]: DoUntil.md
[3]: DoWhile.md
`;var U=`# \${ExitFor}

Repeats a block of statements varying the value of a variable.

## Syntax

    \${ExitFor} expression

## Example

    StrCpy $0 ""

    \${For} $1 1 10
        StrCpy $0 $0$1
        \${If} $1 == 5
            ; let's interrupt this at 5
            \${ExitFor}
        \${EndIf}
    \${Next}

    ; $0 = 12345

## Credits

Written by dselkirk and eccles
`;var G=`# \${ExitWhile}

Exits a block of statements until started by [\`\${DoWhile}\`][1].

## Syntax

    \${ExitWhile}

## Example

    StrCpy $0 0
    ClearErrors

    \${DoWhile} $0 < 10
        IntOp $0 $0 + 1
        \${If} \${Errors}
            MessageBox MB_OK "An unexpected error occured!"
            \${ExitWhile}
        \${EndIf}
    \${Loop}

## Credits

Written by dselkirk and eccles

[1]: DoWhile.md
`;var H=`# \${For}

Repeats a block of statements varying the value of a variable.

## Syntax

    \${For} expression

## Example

    StrCpy $0 ""

    \${For} $1 1 5
        StrCpy $0 $0$1
    \${Next}

    ; $0 = 12345

## Credits

Written by dselkirk and eccles
`;var K=`# \${ForEach}

Repeats a block of statements varying the value of a variable.

## Syntax

    \${ForEach} expression

## Example

    StrCpy $0 ""

    \${ForEach} $1 9 0 - 1
        StrCpy $0 $0$1
    \${Next}

    ; $0 = 9876543210

## Credits

Written by dselkirk and eccles
`;var V=`# \${If}

Conditionally executes a block of statements, depending on the value of an expression.

## Syntax

    \${If} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true

    \${If} $0 == true
        MessageBox MB_OK "It's true"
    \${Else}
        MessageBox MB_OK "This will never be true"
    \${EndIf}

### Integer tests

    \${If} 1 > 0
        MessageBox MB_OK "1 is greater than 0"
    \${EndIf}

    \${If} 2 > 1
    \${AndIf} 2 < 3
        MessageBox MB_OK "2 is greater than 1 and smaller than 3"
    \${EndIf}

### File conditions

    \${If} \${FileExists} $SYSDIR\\notepad.exe
        Exec $SYSDIR\\notepad.exe
    \${Else}
        MessageBox MB_OK "Could not find notepad.exe"
    \${EndIf}

    \${If} \${FileExists} $PROGAMFILES\\*.*
        MessageBox MB_OK "Directory $$PROGRAMFILES exists"
    \${EndIf}

### Section test

    Section "My Section" mySection
        MessageBox MB_OK "Executing section"

        \${If} \${SectionIsSelected} \${mySection}
            MessageBox MB_OK "It's selected, dummy!"
        \${EndIf}
    SectionEnd

## Credits

Written by dselkirk and eccles
`;var X=`# \${IfCmd}

Conditionally executes an inline statement, depending on a true value of the provided NSIS function.

## Syntax

    \${IfCmd} expression statement

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $R2 ""
    
    \${IfCmd} MessageBox MB_YESNO "Please click Yes" IDYES \${||} StrCpy $R2 $R2A \${|}

    \${Unless} \${Cmd} \`MessageBox MB_YESNO|MB_DEFBUTTON2 "Please click No" IDYES\`
        StrCpy $R2 $R2B
    \${EndUnless}
    
    \${If} $R2 == "AB"
        DetailPrint "PASSED IfCmd/If Cmd test"
    \${Else}
        DetailPrint "FAILED IfCmd/If Cmd test"
    \${EndIf}

## Credits

Written by dselkirk and eccles
`;var Y=`# \${IfNot}

Conditionally executes a block of statements, depending on the value of an expression. \`\${IfNot}\` and [\`\${Unless}\`][1] are equivalent and interchangeable, as are [\`\${ElseIfNot}\`][2] and [\`\${ElseUnless}\`][3].

## Syntax

    \${IfNot} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true

    \${IfNot} $0 == true
        MessageBox MB_OK "It's false"
    \${EndIf}

    \${IfNot} $0 != true
        MessageBox MB_OK "It's true (but I'd use $\${If} $$0 == true)"
    \${EndIf}

### Integer tests

    \${IfNot} 1 > 0
        MessageBox MB_OK "This is never true"
    \${EndIf}

### File conditions

    \${IfNot} \${FileExists} $SYSDIR\\notepad.exe
        MessageBox MB_OK "Could not find notepad.exe"
    \${Else}
        Exec $SYSDIR\\notepad.exe
    \${EndIf}

    \${IfNot} \${FileExists} $PROGAMFILES\\*.*
        MessageBox MB_OK "Directory $$PROGRAMFILES doesn't exist"
    \${EndIf}

### Section test

    Section "My Section" mySection
        MessageBox MB_OK "Executing section"

        \${IfNot} \${SectionIsSelected} \${mySection}
            MessageBox MB_OK "This will never show, dummy!"
        \${EndIf}
    SectionEnd

## Credits

Written by dselkirk and eccles

[1]: Unless.md
[2]: ElseIfNot.md
[3]: ElseUnless.md
`;var z=`# \${IfNotThen}

Conditionally executes an inline statement, depending on the value of an expression.

## Syntax

    \${IfNotThen} expression statement

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 true

    \${IfNotThen} $0 == false \${|} StrCpy $1 false \${|}
        MessageBox MB_OK "Whenever $$0 is true, $$1 is false"
    \${EndIf}

## Credits

Written by dselkirk and eccles
`;var q=`# \${IfThen}

Conditionally executes an inline statement, depending on the value of an expression.

## Syntax

    \${IfThen} expression statement

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 true
    \${IfThen} $0 == true \${|} StrCpy $1 false \${|}

## Credits

Written by dselkirk and eccles
`;var j=`# \${Loop}

Loops a block of statements started by [\`\${Do}\`][1], [\`\${DoUntil}\`][2] or [\`\${DoWhile}\`][3].

## Syntax

    \${Loop}

## Example

    StrCpy $0 0

    \${Do}
        IntOp $0 $0 + 1
        \${If} $0 > 10
            \${ExitDo}
        \${EndIf}
    \${Loop}

## Credits

Written by dselkirk and eccles

[1]: Do.md
[2]: DoUntil.md
[3]: DoWhile.md
`;var Z=`# \${LoopUntil}

Loops a block of statements started by [\`\${Do}\`][1], depending on the value of an expression.

## Syntax

    \${LoopUntil} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 10

    \${Do}
        IntOp $0 $0 - 1
    \${LoopUntil} $0 == 0

## Credits

Written by dselkirk and eccles

[1]: Do.md
`;var J=`# \${LoopWhile}

Loops a block of statements started by [\`\${Do}\`][1], depending on the value of an expression.

## Syntax

    \${LoopWhile} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 0

    \${Do}
        IntOp $0 $0 + 1
    \${LoopWhile} $0 < 10

## Credits

Written by dselkirk and eccles

[1]: Do.md
`;var Q=`# \${OrIf}

Adds any number of extra conditions to [\`If\`][1], [\`IfNot\`][2], [\`Unless\`][3], [\`ElseIf\`][4], [\`ElseIfNot\`][5] and [\`ElseUnless\`][6] statements.

## Syntax

    \${OrIf} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true
    StrCpy $1 false

    \${If} $0 == true
    \${OrIf} $1 == false
        MessageBox MB_OK "Either way..."
    \${EndIf}

### Integer tests

    \${If} 2 > 1
    \${OrIf} 2 < 3
        MessageBox MB_OK "Either way..."
    \${EndIf}

### File conditions

    \${If} \${FileExists} $EXEDIR\\notepad.exe
    \${OrIf} \${FileExists} $SYSDIR\\notepad.exe
        MessageBox MB_OK "We have notepad.exe"
    \${EndIf}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
[3]: Unless.md
[4]: ElseIf.md
[5]: ElseIfNot.md
[6]: ElseUnless.md
`;var nn=`# \${OrIfNot}

Adds any number of extra conditions to [\`If\`][1], [\`IfNot\`][2], [\`Unless\`][3], [\`ElseIf\`][4], [\`ElseIfNot\`][5] and [\`ElseUnless\`][6] statements. \`\${OrIfNot}\` and [\`\${OrUnless}\`][7] are equivalent and interchangeable.

## Syntax

    \${OrIfNot} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 false
    StrCpy $1 false

    \${IfNot} $0 == true
    \${OrIfNot} $1 == true
        MessageBox MB_OK "Something's not true"
    \${EndIf}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
[3]: Unless.md
[4]: ElseIf.md
[5]: ElseIfNot.md
[6]: ElseUnless.md
[7]: OrUnless.md
`;var en=`# \${OrUnless}

Adds any number of extra conditions to [\`If\`][1], [\`IfNot\`][2], [\`Unless\`][3], [\`ElseIf\`][4], [\`ElseIfNot\`][5] and [\`ElseUnless\`][6] statements. [\`\${OrIfNot}\`][7] and \`\${OrUnless}\` are equivalent and interchangeable.

## Syntax

    \${OrUnless} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 false
    StrCpy $1 false

    \${Unless} $0 == true
    \${OrUnless} $1 == true
        MessageBox MB_OK "Something's not true"
    \${EndUnless}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md
[3]: Unless.md
[4]: ElseIf.md
[5]: ElseIfNot.md
[6]: ElseUnless.md
[7]: OrIfNot.md
`;var tn=`# \${Select}

Executes one of several blocks of statements, depending on the value of an expression.

## Syntax

    \${Select} expression

## Example

    StrCpy $0 1

    \${Select} $0
        \${Case} "1"
            MessageBox MB_OK "$$0 is 1"
        \${Case} "2"
            MessageBox MB_OK "$$0 isn't 2"
        \${Case2} "3" "4"
            MessageBox MB_OK "$$0 isn't 3 or 4"
        \${CaseElse}
            MessageBox MB_OK "$$0 isn't anything else"
    \${EndSelect}

## Credits

Written by dselkirk and eccles
`;var on=`# \${Switch}

Jumps to one of several labels, depending on the value of an expression. Use \${Break} to prevent fall-through to the next \${Case} section.

## Syntax

    \${Switch} expression

## Example

    {For} $0 1 10
        \${Switch} $0
            \${Case} "1"
                MessageBox MB_OK "$$0 is 1"
                \${Break}
            \${Case} "2"
                MessageBox MB_OK "$$0 is 2"
                \${Break}
            \${Case2} "3" "5"
                MessageBox MB_OK "$$0 is 3 or 5"
                \${Break}
            \${CaseElse}
                MessageBox MB_OK "$$0 is something else ($0)"
        \${EndSwitch}
    \${Next}

## Credits

Written by dselkirk and eccles
`;var rn=`# \${Unless}

Conditionally executes a block of statements, depending on the value of an expression. [\`\${IfNot}\`][1] and \`\${Unless}\` are equivalent and interchangeable, as are [\`\${ElseIfNot}\`][2] and [\`\${ElseUnless}\`][3].

## Syntax

    \${Unless} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true

    \${Unless} $0 == true
        MessageBox MB_OK "It's false"
    \${EndUnless}

    \${Unless} $0 != true
        MessageBox MB_OK "It's true (but I'd use $\${If} $$0 == true)"
    \${EndUnless}

### Integer tests

    \${Unless} 1 > 0
        MessageBox MB_OK "This is never true"
    \${EndUnless}

### File conditions

    \${Unless} \${FileExists} $SYSDIR\\notepad.exe
        MessageBox MB_OK "Could not find notepad.exe"
    \${Else}
        Exec $SYSDIR\\notepad.exe
    \${EndUnless}

    \${Unless} \${FileExists} $PROGAMFILES\\*.*
        MessageBox MB_OK "Directory $$PROGRAMFILES doesn't exist"
    \${EndUnless}

### Section test

    Section "My Section" mySection
        MessageBox MB_OK "Executing section"

        \${Unless} \${SectionIsSelected} \${mySection}
            MessageBox MB_OK "This will never show, dummy!"
        \${EndUnless}
    SectionEnd

## Credits

Written by dselkirk and eccles

[1]: IfNot.md
[2]: ElseIfNot.md
[3]: ElseUnless.md
`;var sn=`# \${While}

Repeats a block of statements until stopped, or depending on the value of an expression. [\`\${DoWhile}\`][1] and \`\${While}\` are equivalent and interchangeable.

## Syntax

    \${While} expression

The following "expressions" are available:

    Standard (built-in) string tests (which are case-insensitive):
         a == b; a != b
    Additional case-insensitive string tests (using System.dll):
         a S< b; a S>= b; a S> b; a S<= b
    Case-sensitive string tests:
         a S== b; a S!= b
    Standard (built-in) signed integer tests:
         a = b; a <> b; a < b; a >= b; a > b; a <= b
    Standard (built-in) unsigned integer tests:
         a U< b; a U>= b; a U> b; a U<= b
    64-bit integer tests (using System.dll):
        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b
    Built-in NSIS flag tests:
        \${Abort}; \${Errors}; \${RebootFlag}; \${Silent}
    Built-in NSIS other tests:
        \${FileExists} a
    Any conditional NSIS instruction test:
        \${Cmd} a
    Section flag tests:
        \${SectionIsSelected} a; \${SectionIsSectionGroup} a;
        \${SectionIsSectionGroupEnd} a; \${SectionIsBold} a;
        \${SectionIsReadOnly} a; \${SectionIsExpanded} a;
        \${SectionIsPartiallySelected} a

## Example

    StrCpy $0 0

    \${While} $0 > 5
        IntOp $0 $0 + 1
    \${EndWhile}

## Credits

Written by dselkirk and eccles

[1]: DoWhile.md
`;var an=`# \${MementoSection}

Replace [\`Section\`][1] with \`\${MementoSection}\` and [\`SectionEnd\`][2] with [\`\${MementoSectionEnd}\`][3]
for sections that whose state should be remembered by Memento.

For sections that should be unselected by default, use \`\${MementoSection}\`'s
brother - [\`\${MementoUnselectedSection}\`][4].

Sections that don't already have an identifier must be assigned one.

Section identifiers must stay the same across

## Syntax

    \${MementoSection} [section_name] [section_index_output]

## Example

    !include Memento.nsh

    !define MEMENTO_REGISTRY_ROOT HKLM
    !define MEMENTO_REGISTRY_KEY Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MyProgram

    Function .onInit
        \${MementoSectionRestore}
    FunctionEnd

    Function .onInstSuccess
        \${MementoSectionSave}
    FunctionEnd

    \${MementoSection} "name" "some_id"
        ; some code...
    \${MementoSectionEnd}

    SectionGroup /e group

        \${MementoSection} croc sec_croc
            ; some code...
        \${MementoSectionEnd}

        \${MementoSection} cow sec_cow
            ; some code...
        \${MementoSectionEnd}

    SectionGroupEnd

    \${MementoUnselectedSection} dinosaur sec_dinosaur
        ; some code...
    \${MementoSectionEnd}

    \${MementoSectionDone}

## Credits

Written by [kichik][5]

[1]: ../../Commands/Section.md
[2]: ../../Commands/SectionEnd.md
[3]: MementoSectionEnd.md
[4]: MementoUnselectedSection.md
[5]: http://nsis.sourceforge.net/User:Kichik
`;var ln=`# \${MementoSectionDone}

Use \`\${MementoSectionDone}\` after the last [\`\${MementoSection}\`][1].

## Syntax

    \${MementoSectionDone}

## Example

    !include Memento.nsh

    !define MEMENTO_REGISTRY_ROOT HKLM
    !define MEMENTO_REGISTRY_KEY Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MyProgram

    Function .onInit
        \${MementoSectionRestore}
    FunctionEnd

    Function .onInstSuccess
        \${MementoSectionSave}
    FunctionEnd

    \${MementoUnselectedSection} dinosaur sec_dinosaur
        ; some code...
    \${MementoSectionEnd}

    \${MementoSectionDone}

## Credits

Written by [kichik][2]

[1]: MementoSection.md
[2]: http://nsis.sourceforge.net/User:Kichik
`;var dn=`# \${MementoSectionEnd}

Replace [\`Section\`][1] with \`\${MementoSection}\` and [\`SectionEnd\`][2] with [\`\${MementoSectionEnd}\`][3]
for sections that whose state should be remembered by Memento.

## Syntax

    \${MementoSectionEnd}

## Example

    !include Memento.nsh

    !define MEMENTO_REGISTRY_ROOT HKLM
    !define MEMENTO_REGISTRY_KEY Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MyProgram

    Function .onInit
        \${MementoSectionRestore}
    FunctionEnd

    Function .onInstSuccess
        \${MementoSectionSave}
    FunctionEnd

    \${MementoSection} "name" "some_id"
        ; some code...
    \${MementoSectionEnd}

    \${MementoUnselectedSection} dinosaur sec_dinosaur
        ; some code...
    \${MementoSectionEnd}

    \${MementoSectionDone}

## Credits

Written by [kichik][4]

[1]: ../../Commands/Section.md
[2]: ../../Commands/SectionEnd.md
[3]: MementoSectionEnd.md
[4]: http://nsis.sourceforge.net/User:Kichik
`;var cn=`# \${MementoSectionRestore}

Add a call to \`\${MementoSectionRestore}\` to [\`.onInit\`][1] to restore the state of all sections from the registry.

## Syntax

    \${MementoSectionRestore}

## Example

    Function .onInit
        \${MementoSectionRestore}
    FunctionEnd

## Credits

Written by [kichik][2]

[1]: ../../Callbacks/onInit.md
[2]: http://nsis.sourceforge.net/User:Kichik
`;var mn=`# \${MementoSectionSave}

Add a call to \`\${MementoSectionSave}\` to [\`.onInstSuccess\`][1] to save the stateof all sections to the registry.

## Syntax

    \${MementoSectionSave}

## Example

    Function .onInstSuccess
        \${MementoSectionSave}
    FunctionEnd

## Credits

Written by [kichik][2]

[1]: ../../Callbacks/onInstSuccess.md
[2]: http://nsis.sourceforge.net/User:Kichik
`;var un=`# \${MementoUnselectedSection}

Replace [\`Section\`][1] with [\`\${MementoSection}\`][2] and [\`SectionEnd\`][3] with [\`\${MementoSectionEnd}\`][4]
for sections that whose state should be remembered by Memento.

For sections that should be unselected by default, use [\`\${MementoSection}\`][2]'s
brother - \`\${MementoUnselectedSection}\`.

Sections that don't already have an identifier must be assigned one.

Section identifiers must stay the same across

## Syntax

    \${MementoUnselectedSection} [section_name] [section_index_output]

## Example

    !include Memento.nsh

    !define MEMENTO_REGISTRY_ROOT HKLM
    !define MEMENTO_REGISTRY_KEY Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MyProgram

    Function .onInit
        \${MementoSectionRestore}
    FunctionEnd

    Function .onInstSuccess
        \${MementoSectionSave}
    FunctionEnd

    \${MementoUnselectedSection} dinosaur sec_dinosaur
        ; some code...
    \${MementoSectionEnd}

    \${MementoSectionDone}

## Credits

Written by [kichik][5]

[1]: ../../Commands/Section.md
[2]: MementoSection.md
[3]: ../../Commands/SectionEnd.md
[4]: MementoSectionEnd.md
[5]: http://nsis.sourceforge.net/User:Kichik
`;var fn=`# \${StrCase}

Converts "String" to "Type" Case. Uses [LogicLib][1].

## Syntax

    ResultVar String Type(|L|U|T|S|<>)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String to convert to "Type" case.
    
    Type
    Type of string case to convert to:

      - "" = Original Case (same as "String")
      - L = Lower Case (this is just an example. a very simple one.)
      - U = Upper Case (THIS IS JUST AN EXAMPLE. A VERY SIMPLE ONE.)
      - T = Title Case (This Is Just An Example. A Very Simple One.)
      - S = Sentence Case (This is just an example. A very simple one.)
      - <> = Switch Case (This is just an example. A very simple one.)
      
    Default value is "" (Original Case).

## Example

    \${StrCase} $0 '"Voc\xEA" is "You" in English.' "U"
    $0 = '"VOC\xCA" IS "YOU" IN ENGLISH.'

## Credits

Written by [deguix][2]

[1]: ../LogicLib
[2]: http://nsis.sourceforge.net/User:Deguix
`;var pn=`# \${StrClb}

Makes an action with the clipboard depending on value of parameter "Action".  Uses [LogicLib][1].

## Syntax

    ResultVar String Action(|>|<|<>)

## Parameters

    String
    If "Action" = ">" or "<>" - String to put on the clipboard.

    Action
    Can be one of the following values:

      - "" = Cleans the clipboard.
      - ">" = Set string to clipboard.
      - "<" = Get string from clipboard.
      - "<>" = Swap string with clipboard's.

## Credits

Written by [deguix][2]

[1]: ../LogicLib
[2]: http://nsis.sourceforge.net/User:Deguix
`;var hn=`# \${StrIOToNSIS}

Convert "String" from Install Options plugin to be supported by NSIS. Escape, back-slash, carriage return, line feed and tab characters are converted.

## Syntax

    ResultVar String

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String to convert to be supportable for NSIS.

## Example

    \${StrIOToNSIS} $0 "\\r\\n\\t\\\\This is just an example\\\\"
    $0 = "$\\r$\\n$\\t\\This is just an example\\"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var Sn=`# \${StrLoc}

Searches for "StrToSearchFor" in "String" and returns its location, according to "CounterDirection".

## Syntax

    ResultVar String StrToSearchFor CounterDirection(>|<)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "StrToSearchFor".

    StrToSearchFor
    String to search in "String".

    CounterDirection(>|<)
    Direction where the counter increases to. Default is ">".
    (> = increases from left to right, < = increases from right to left)

## Example

    \${StrLoc} $0 "This is just an example" "just" "<"
    $0 = "11"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var $n=`# \${StrNSISToIO}

Converts "String" from NSIS to be supported by Install Options plugin. Escape, back-slash, carriage return, line feed and tab characters are converted.

## Syntax

    ResultVar String

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String to convert to be supportable for Install Options plugin.

## Example

    \${StrNSISToIO} $0 "$\\r$\\n$\\t\\This is just an example\\"
    $0 = "\\r\\n\\t\\\\This is just an example\\\\"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var gn=`# \${StrRep}

Searches for all "StrToReplace" in "String" replacing those with "ReplacementString".

## Syntax

    ResultVar String StrToReplace ReplacementString

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "StrToReplace".

    StrToReplaceFor
    String to search in "String".

    StringToBeReplacedWith
    String to replace "StringToReplace" when it is found in "String".

## Example

    \${StrRep} $0 "This is just an example" "an" "one"
    $0 = "This is just one example"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var In=`# \${StrSort}

Searches for "CenterStr" in "String", and returns only the value between "LeftStr" and "RightStr", including or not the "CenterStr" using "IncludeCenterStr" and/or the "LeftStr" using "IncludeLeftStr" and "RightStr" using "IncludeRightStr".

## Syntax

    ResultVar String LeftStr CenterStr RightStr IncludeLeftStr(1|0) IncludeCenterStr(1|0) IncludeRightStr(1|0)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "CenterStr".

    LeftStr
    The first occurrence of "LeftStr" on the left of "CenterStr".
    If it is an empty value, or was not found, will return
    everything on the left of "CenterStr".

    CenterStr
    String to search in "String".

    RightStr
    The first occurrence of "RightStr" on the right of "CenterStr".
    If it is an empty value, or was not found, will return
    everything on the right of "CenterStr".

    IncludeLeftStr(1|0)
    Include or not the "LeftStr" in the result value. Default is 1
    (True). (1 = True, 0 = False)

    IncludeCenterStr(1|0)
    Include or not the "CenterStr" in the result value. Default is 1
    (True). (1 = True, 0 = False)

    IncludeRightStr(1|0)
    Include or not the "RightStr" in the result value. Default is 1
    (True). (1 = True, 0 = False)

## Example

    \${StrSort} $0 "This is just an example" " just" "" "ple" "0" "0" "0"
    $0 = "This is an exam"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var bn=`# \${StrStr}

Searches for "StrToSearchFor" in "String".

## Syntax

    ResultVar String StrToSearchFor

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "StrToSearchFor".

    StrToSearchFor
    String to search in "String".

## Example

    \${StrStr} $0 "This is just an example" "just"
    $0 = "just an example"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var yn=`# \${StrStrAdv}

Searches for "StrToSearchFor" in "String" in the direction specified by "SearchDirection" and looping "Loops" times.

## Syntax

    ResultVar String StrToSearchFor SearchDirection(>|<) ResultStrDirection(>|<) DisplayStrToSearch(1|0) Loops CaseSensitive(0|1)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "StrToSearchFor".

    StrToSearchFor
    String to search in "String".

    SearchDirection (>|<)
    Where do you want to direct the search. Default is ">" (to right).
    (< = To left, > = To right)

    ResultStrDirection (>|<)
    Where the result string will be based on in relation of
    "StrToSearchFor"
    position. Default is ">" (to right). (< = To left, > = To right)

    DisplayStrToSearch (1|0)
    Display "StrToSearchFor" in the result. Default is "1" (True).
    (1 = True, 0 = False)

    Loops
    Number of times the code will search "StrToSearchFor" in "String" not
    including the original execution. Default is "0" (1 code execution).

    CaseSensitive(0|1)
    If "1" the search will be case-sensitive (differentiates between cases).
    If "0" it is case-insensitive (does not differentiate between cases).
    Default is "0" (Case-Insensitive).

## Example

    \${StrStrAdv} $0 "This IS really just an example" "IS " ">" ">" "0" "0" "1"
    $0 = "really just an example"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var xn=`# \${StrTok}

Returns the part "ResultPart" between two "Separators" inside "String".

## Syntax

    ResultVar String Separators ResultPart[L] SkipEmptyParts(1|0)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search for "Separators".

    Separators
    Characters to find on "String".

    ResultPart[L]
    The part want to be found on "StrToTokenize" between two "Separators".
    Can be any number, starting at 0, and "L" that is the last part.
    Default is L (Last part).

    SkipEmptyParts(1|0)
    Skips empty string parts between two "Separators". Default is 1 (True).
    (1 = True, 0 = False)

## Example

    \${StrTok} $0 "This is, or is not, just an example" " ," "4" "1"
    $0 = "not"
    
    \${StrTok} $0 "This is, or is not, just an example" " ," "4" "0"
    $0 = "is"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var En=`# \${StrTrimNewLines}

Deletes unnecessary new lines at end of "String".

## Syntax

    ResultVar String

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search unnecessary new lines at end of "String".

## Example

    \${StrTrimNewLines} $0 "$\\r$\\nThis is just an example$\\r$\\n$\\r$\\n"
    $0 = "$\\r$\\nThis is just an example"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
`;var wn=`# \${ConfigRead}

Read value from entry name in config file.

## Syntax

    \${ConfigRead} "[File]" "[Entry]" $var
    "[File]"      ; config file
                  ;
    "[Entry]"     ; entry name
                  ;
    $var          ; Result:  Value

Note:

- Error flag if entry not found
- Error flag if file doesn't exist

## Examples

### Example 1

    Section
        \${ConfigRead} "C:\\AUTOEXEC.BAT" "SET winbootdir=" $R0
        ;$R0=C:\\WINDOWS
    SectionEnd

### Example 2

    Section
        \${ConfigRead} "C:\\apache\\conf\\httpd.conf" "Timeout " $R0
        ;$R0=30
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Rn=`# \${ConfigReadS}

Read value from entry name in config file, case sensitive

## Syntax

    \${ConfigReadS} "[File]" "[Entry]" $var
    "[File]"      ; config file
                  ;
    "[Entry]"     ; entry name
                  ;
    $var          ; Result:  Value

Note:

- Error flag if entry not found
- Error flag if file doesn't exist

## Examples

### Example 1

    Section
        \${ConfigReadS} "C:\\AUTOEXEC.BAT" "SET winbootdir=" $R0
        ;$R0=C:\\WINDOWS
    SectionEnd

### Example 2

    Section
        \${ConfigReadS} "C:\\apache\\conf\\httpd.conf" "Timeout " $R0
        ;$R0=30
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Cn=`# \${ConfigWrite}

Write value from entry name in config file.

## Syntax

    \${ConfigWrite} "[File]" "[Entry]" "[Value]" $var

    "[File]"      ; config file
                  ;
    "[Entry]"     ; entry name
                  ;
    "[Value]"     ; value name
                  ;  if "" then delete Entry
                  ;
    $var          ; Result:
                  ;    $var=CHANGED  Value is written
                  ;    $var=DELETED  Entry is deleted
                  ;    $var=ADDED    Entry and Value are added
                  ;    $var=SAME     Entry and Value already exist

Note:

- Error flag if file doesn't exist
- Error flag if file can't be opened

## Examples

### Example 1

    Section
        \${ConfigWrite} "C:\\AUTOEXEC.BAT" "SET winbootdir=" "D:\\WINDOWS" $R0
        ;$R0=CHANGED
    SectionEnd

### Example 2

    Section
        \${ConfigWrite} "C:\\apache\\conf\\httpd.conf" "Timeout " "30" $R0
        ;$R0=SAME
    SectionEnd

### Example 3

    Section
        \${ConfigWrite} "C:\\apache\\conf\\httpd.conf" "Timeout " "" $R0
        ;$R0=DELETED
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var vn=`# \${ConfigWriteS}

Write value from entry name in config file, case sensitive.

## Syntax

    \${ConfigWriteS} "[File]" "[Entry]" "[Value]" $var

    "[File]"      ; config file
                  ;
    "[Entry]"     ; entry name
                  ;
    "[Value]"     ; value name
                  ;  if "" then delete Entry
                  ;
    $var          ; Result:
                  ;    $var=CHANGED  Value is written
                  ;    $var=DELETED  Entry is deleted
                  ;    $var=ADDED    Entry and Value are added
                  ;    $var=SAME     Entry and Value already exist

Note:

- Error flag if file doesn't exist
- Error flag if file can't be opened

## Examples

### Example 1

    Section
        \${ConfigWriteS} "C:\\AUTOEXEC.BAT" "SET winbootdir=" "D:\\WINDOWS" $R0
        ;$R0=CHANGED
    SectionEnd

### Example 2

    Section
        \${ConfigWriteS} "C:\\apache\\conf\\httpd.conf" "Timeout " "30" $R0
        ;$R0=SAME
    SectionEnd

### Example 3

    Section
        \${ConfigWriteS} "C:\\apache\\conf\\httpd.conf" "Timeout " "" $R0
        ;$R0=DELETED
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Nn=`# \${FileJoin}

Join two files in one.

## Syntax

    \${FileJoin} "[File1]" "[File2]" "[File3]"
    "[File1]"     ; Input File1
    "[File2]"     ; Input File2
    "[File3]"     ; Output File3
                  ;  If [File3]="" Then add [File2] to [File1]

Note:

- Error flag if input files don't exist
- Error flag if output file path doesn't exist

## Examples

### Join a.log + b.log = Z.log

    Section
        \${FileJoin} "C:\\a.log" "C:\\logs\\b.log" "C:\\Z.log"
    SectionEnd

### Add a.log + b.log = a.log

    Section
        \${FileJoin} "C:\\a.log" "C:\\logs\\b.log" "C:\\a.log"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Fn=`# \${FileReadFromEnd}

Read text file from end line by line.

## Syntax

    \${FileReadFromEnd} "[File]" "Function"

    "[File]"      ; Input text file
    "Function"    ; Callback function

    Function "Function"
        ; $9       current line
        ; $8       current line number
        ; $7       current line negative number

        ; $R0-$R9  are not used (save data in them).
        ; ...

        Push $var      ; If $var="StopFileReadFromEnd"  Then exit from function
    FunctionEnd

Note:

- Error flag if input file doesn't exist

## Examples

### Read and display lines

    Section
        \${FileReadFromEnd} "C:\\a.log" "Example1"

        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example1
        MessageBox MB_OKCANCEL '"Line"=[$9]$\\n   "#"=[$8]$\\n  "-#"=[$7]' IDOK +2
        StrCpy $0 StopFileReadFromEnd

        Push $0
    FunctionEnd

### Reverse text file

    Section
        GetTempFileName $R0
        FileOpen $R1 $R0 w
        \${FileReadFromEnd} "C:\\a.log" "Example2"
        FileClose $R1

        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        Exec '"notepad.exe" "$R0"'
    SectionEnd

    Function Example2
        StrCmp $7 -1 0 +5
        StrCpy $1 $9 1 -1
        StrCmp $1 '$\\n' +3
        StrCmp $1 '$\\r' +2
        StrCpy $9 '$9$\\r$\\n'

        FileWrite $R1 "$9"

        Push $0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Tn=`# \${FileRecode}

Recode text file from DOS to Windows format and vice-versa.

## Syntax

    \${FileRecode} "[File]" "[Format]"

    "[File]"        ;
                    ;
    "[Format]"      ; OemToChar   -from DOS to Windows
                    ; CharToOem   -from Windows to DOS

Note:

- Error flag if file doesn't exist
- Error flag if syntax error

## Example

    Section
        \${FileRecode} "C:\\SCANDISK.LOG" "CharToOem"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Dn=`# \${LineFind}

Find specified lines in text file, and edit or view these lines in callback function.

## Syntax

    \${LineFind} "[File1]" "[File2|/NUL]" "[LineNumbers]" "Function"

    "[File1]"         ; Input text file
                      ;
    "[File2|/NUL]"    ; [File2]
                      ;   Output text file
                      ;   If empty then File2=File1
                      ; [/NUL]
                      ;   No output text file (only read File1)
                      ;
    "[LineNumbers]"   ; [No|-No|No:No|{No}|{-No}|{No:No}]
                      ;   1:-1     all lines to change (default)
                      ;   2        second line from start
                      ;   -3       third line from end
                      ;   5:9      range of lines from 5 to 9
                      ;   {2}      only second line from start to output
                      ;   {-3}     only third line from end to output
                      ;   {5:9}    only range of lines from 5 to 9 to output
                      ;
    "Function"        ; Callback function for specified lines

    Function "Function"
        ; $R9       current line
        ; $R8       current line number
        ; $R7       current line negative number
        ; $R6       current range of lines
        ; $R5       handle of a file opened to read
        ; $R4       handle of a file opened to write ($R4="" if "/NUL")

        ; you can use any string functions
        ; $R0-$R3  are not used (save data in them).
        ; ...

        Push $var      ; If $var="StopLineFind"  Then exit from function
                       ; If $var="SkipWrite"     Then skip current line (ignored if "/NUL")
    FunctionEnd

Note:

- Error flag if input file doesn't exist
- Error flag if output file path doesn't exist
- Ranges must be specified on growth (2 4:5 9:-8 -5:-4 -2:-1)
- Output file will not be updated if no changes made.

## Examples:

### Delete first two symbols

    Section
        \${LineFind} "C:\\a.log" "C:\\a-edited.log" "3:-1" "Example1"
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example1
        \${TrimNewLines} '$R9' $R9
        StrCpy $R9 $R9 '' 2
        StrCpy $R9 '$R9$\\r$\\n'
        ;start from 3 line and delete first two symbols

        Push $0
    FunctionEnd

### Show changed lines

    Section
        \${LineFind} "C:\\a.log" "a.log" "{5:12 15 -6:-5 -1}" "Example2"
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example2
        \${TrimNewLines} '$R9' $R9
        StrCpy $R9 "$R9   ~Changed line ($R8)~$\\r$\\n"

        Push $0
    FunctionEnd

### Delete lines

    Section
        \${LineFind} "C:\\a.log" "\\logs\\a.log" "2:3 10:-5 -3:-2" "Example3"
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example3
        StrCpy $0 SkipWrite

        Push $0
    FunctionEnd

### Insert lines

    Section
        \${LineFind} "C:\\a.log" "" "10" "Example4
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example4
        FileWrite $R4 "---First Line---$\\r$\\n"
        FileWrite $R4 "---Second Line ...---$\\r$\\n"

        Push $0
    FunctionEnd

### Replace in file with count of changes - "WordFunc.nsh" required

    !include "WordFunc.nsh"

    Section
        StrCpy $R0 0
        \${LineFind} "C:\\a.log" "C:\\logs\\a.log" "1:-1" "Example5"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        MessageBox MB_OK "Changed lines=$R0"
    SectionEnd

    Function Example5
        StrCpy $1 $R9

        \${WordReplace} '$R9' ' ' '_' '+*' $R9

        StrCmp $1 $R9 +2
        IntOp $R0 $R0 + 1
        ;$R0   count of changed lines

        Push $0
    FunctionEnd

### Line string to cut or delete

    Section
        \${LineFind} "\\a.log" "C:\\logs\\a.log" "" "Example6"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        MessageBox MB_OK "Processed lines=$R1:$R2"
    SectionEnd

    Function Example6
        ;(Cut lines from a line to another line (also including that line))
        StrCmp $R0 finish stop
        StrCmp $R0 start finish
        StrCmp $R9 'Start Line$\\r$\\n' 0 skip
        StrCpy $R0 start
        StrCpy $R1 $R8
        goto code
        finish:
        StrCmp $R9 'Finish Line$\\r$\\n' 0 code
        StrCpy $R0 finish
        StrCpy $R2 $R8
        goto code
        skip:
        StrCpy $0 SkipWrite
        goto output
        stop:
        StrCpy $0 StopLineFind
        goto output

        ;;(Delete lines from a line to another line (also including that line))
        ; StrCmp $R0 finish code
        ; StrCmp $R0 start finish
        ; StrCmp $R9 'Start Line$\\r$\\n' 0 code
        ; StrCpy $R0 start
        ; StrCpy $R1 $R8
        ; goto skip
        ; finish:
        ; StrCmp $R9 'Finish Line$\\r$\\n' 0 skip
        ; StrCpy $R0 finish
        ; StrCpy $R2 $R8
        ; skip:
        ; StrCpy $0 SkipWrite
        ; goto output

        code:
        ;...

        output:
        Push $0
    FunctionEnd

### Read lines

    Section
        \${LineFind} "C:\\a.log" "/NUL" "1:-1" "Example7"
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example7
        MessageBox MB_OKCANCEL '$$R9  "Line"=[$R9]$\\n$$R8     "#" =[$R8]' IDOK +2
        StrCpy $0 StopLineFind

        Push $0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var An=`# \${LineRead}

Get line in file specified with number.

## Syntax

    \${LineRead} "[File]" "[LineNumber]" $var

    "[File]"         ; Input text file
                     ;
    "[LineNumber]"   ; [No|-No]
                     ;   3    line number from start
                     ;   -5   line number from end
                     ;
    $var             ; Result: Line

Note:

- Error flag if input file doesn't exist
- Error flag if line number not found

## Example

    Section
        \${LineRead} "C:\\a.log" "-1" $R0
        ; $R0="Last line$\\r$\\n"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var _n=`# \${LineSum}

Get sum of lines in text file.

## Syntax

    \${LineSum} "[File]" $var

    "[File]"      ; Input file
    $var          ; Result: Sum of lines

Note:

- Error flag if input file doesn't exist

## Example

    Section
        \${LineSum} "C:\\a.log" $R0
        ; $R0="54"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Wn=`# \${TextCompare}

Compare two text files.

## Syntax

    \${TextCompare} "[File1]" "[File2]" "[Option]" "Function"

    "[File1]"     ; File1      Compare these lines
    "[File2]"     ; File2      Compare with these lines
    "[Options]"   ; (line-by-line):
                  ; FastDiff   Compare line N (File1) with line N (File2)
                  ;            Call function if Different lines found
                  ; FastEqual  Compare line N (File1) with line N (File2)
                  ;            Call function if Equal lines found
                  ; (line number independent):
                  ; SlowDiff   Compare line N (File1) with all lines (File2)
                  ;            Call function if line N (File1) Different
                  ; SlowEqual  Compare line N (File1) with all lines (File2)
                  ;            Call function if line N (File1) Equal
    "Function"    ; Callback function

    Function "Function"
        ; $9    "Line File1"
        ; $8    "Line number"
        ; $7    "Line File2"  (empty if SlowDiff)
        ; $6    "Line number" (empty if SlowDiff)

        ; $R0-$R9  are not used (save data in them).
        ; ...

        Push $var    ; If $var="StopTextCompare"  Then exit from function
    FunctionEnd

Note:

- Error flag if File1 or File2 doesn't exist
- Error flag if syntax error

## Examples

### Different or Equal

    Section
        StrCpy $R0 ''
        \${TextCompare} "C:\\1.txt" "C:\\2.txt" "FastDiff" "Example1"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +4

        StrCmp $R0 NotEqual 0 +2
        MessageBox MB_OK "Files differ" IDOK +2
        MessageBox MB_OK "Files identical"
    SectionEnd

    Function Example1
        StrCpy $R0 NotEqual
        StrCpy $0 StopTextCompare

        Push $0
    FunctionEnd

### Compare line-by-line - Different

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\\r$\\n"
        \${TextCompare} "$R0" "$R1" "FastDiff" "Example2"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2

        Exec "notepad.exe $R2"
    FunctionEnd

    Function Example2
        FileWrite $R3 '$8=$9'
        FileWrite $R3 '$6=$7$\\r$\\n'

        Push $0
    FunctionEnd

### Compare line-by-line - Equal

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\\r$\\n"
        \${TextCompare} "$R0" "$R1" "FastEqual" "Example3"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2

        Exec "notepad.exe $R2"
    FunctionEnd

    Function Example3
        FileWrite $R3 '$8|$6=$9'

        Push $0
    FunctionEnd

### Compare all lines - Different

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\\r$\\n"
        \${TextCompare} "$R0" "$R1" "SlowDiff" "Example4"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK end

        FileWrite $R3 "$\\r$\\n$R1 | $R0$\\r$\\n"
        \${TextCompare} "$R1" "$R0" "SlowDiff" "Example4"
        FileClose $R3
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK end

        Exec "notepad.exe $R2"

        end:
    FunctionEnd

    Function Example4
        FileWrite $R3 '$8=$9'

        Push $0
    FunctionEnd

### Compare all lines - Equal

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\\r$\\n"
        \${TextCompare} "$R0" "$R1" "SlowEqual" "Example5"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2

        Exec "notepad.exe $R2"
    FunctionEnd

    Function Example5
        FileWrite $R3 '$8|$6=$9'

        Push $0
    FunctionEnd

### Show variables

    Section
        \${TextCompare} "C:\\1.txt" "C:\\2.txt" "FastDiff" "Example6"

        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example6
        MessageBox MB_OKCANCEL '$$9    "Line File1" =[$9]$\\n$$8    "Line #"      =[$8]$\\n$$7    "Line File2" =[$7]$\\n$$6    "Line #"      =[$6]' IDOK +2
        StrCpy $0 StopTextCompare

        Push $0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Mn=`# \${TextCompareS}

Compare two text files, case sensitive

## Syntax

    \${TextCompareS} "[File1]" "[File2]" "[Option]" "Function"

    "[File1]"     ; File1      Compare these lines
    "[File2]"     ; File2      Compare with these lines
    "[Options]"   ; (line-by-line):
                  ; FastDiff   Compare line N (File1) with line N (File2)
                  ;            Call function if Different lines found
                  ; FastEqual  Compare line N (File1) with line N (File2)
                  ;            Call function if Equal lines found
                  ; (line number independent):
                  ; SlowDiff   Compare line N (File1) with all lines (File2)
                  ;            Call function if line N (File1) Different
                  ; SlowEqual  Compare line N (File1) with all lines (File2)
                  ;            Call function if line N (File1) Equal
    "Function"    ; Callback function

    Function "Function"
        ; $9    "Line File1"
        ; $8    "Line number"
        ; $7    "Line File2"  (empty if SlowDiff)
        ; $6    "Line number" (empty if SlowDiff)

        ; $R0-$R9  are not used (save data in them).
        ; ...

        Push $var    ; If $var="StopTextCompare"  Then exit from function
    FunctionEnd

Note:

- Error flag if File1 or File2 doesn't exist
- Error flag if syntax error

## Examples

### Different or Equal

    Section
        StrCpy $R0 ''
        \${TextCompareS} "C:\\1.txt" "C:\\2.txt" "FastDiff" "Example1"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +4

        StrCmp $R0 NotEqual 0 +2
        MessageBox MB_OK "Files differ" IDOK +2
        MessageBox MB_OK "Files identical"
    SectionEnd

    Function Example1
        StrCpy $R0 NotEqual
        StrCpy $0 StopTextCompare

        Push $0
    FunctionEnd

### Compare line-by-line - Different

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\\r$\\n"
        \${TextCompareS} "$R0" "$R1" "FastDiff" "Example2"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2

        Exec "notepad.exe $R2"
    FunctionEnd

    Function Example2
        FileWrite $R3 '$8=$9'
        FileWrite $R3 '$6=$7$\\r$\\n'

        Push $0
    FunctionEnd

### Compare line-by-line - Equal

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\\r$\\n"
        \${TextCompareS} "$R0" "$R1" "FastEqual" "Example3"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2

        Exec "notepad.exe $R2"
    FunctionEnd

    Function Example3
        FileWrite $R3 '$8|$6=$9'

        Push $0
    FunctionEnd

### Compare all lines - Different

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\\r$\\n"
        \${TextCompareS} "$R0" "$R1" "SlowDiff" "Example4"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK end

        FileWrite $R3 "$\\r$\\n$R1 | $R0$\\r$\\n"
        \${TextCompareS} "$R1" "$R0" "SlowDiff" "Example4"
        FileClose $R3
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK end

        Exec "notepad.exe $R2"

        end:
    FunctionEnd

    Function Example4
        FileWrite $R3 '$8=$9'

        Push $0
    FunctionEnd

### Compare all lines - Equal

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\\r$\\n"
        \${TextCompareS} "$R0" "$R1" "SlowEqual" "Example5"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2

        Exec "notepad.exe $R2"
    FunctionEnd

    Function Example5
        FileWrite $R3 '$8|$6=$9'

        Push $0
    FunctionEnd

### Show variables

    Section
        \${TextCompareS} "C:\\1.txt" "C:\\2.txt" "FastDiff" "Example6"

        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example6
        MessageBox MB_OKCANCEL '$$9    "Line File1" =[$9]$\\n$$8    "Line #"      =[$8]$\\n$$7    "Line File2" =[$7]$\\n$$6    "Line #"      =[$6]' IDOK +2
        StrCpy $0 StopTextCompare

        Push $0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var On=`# \${TrimNewLines}

Trim newlines in a string.

## Syntax

    \${TrimNewLines} "[string]" $var

    "[string]"    ; Input string
    $var          ; Result: String without '$\\r' and '$\\n' at the end

Note:

- Error flag if file doesn't exist
- Error flag if syntax error

## Example

    Section
        \${TrimNewLines} "Text line$\\r$\\n" $R0
        ; $R0="Text line"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Pn=`# \${IsDomainController}

Checks if the server is a domain controller

## Syntax

    logic_lib_statement \${IsDomainController}

## Example

    \${If} \${IsDomainController}
        DetailPrint "Running on a domain controller."
    \${Else}
        DetailPrint "Not running on a domain controller."
    \${EndIf}

## Credits

*unknown*
`;var Ln=`# \${AtLeastServicePack}

Checks if the installer is running on Windows service pack version at least as specified.

## Syntax

    logic_lib_statement \${AtLeastServicePack} service_pack_version

## Example

    \${If} \${IsWinXP}
    \${AndIf} \${AtLeastServicePack} 1
        DetailPrint "Windows XP with SP1 (or higher)"
    \${Else}
        DetailPrint "Not Windows XP, or no service pack installed"
    \${EndIf}

## Credits

*unknown*
`;var Bn=`# \${AtLeastWin7}

Checks if the installer is running on Windows 7.

## Syntax

    logic_lib_statement \${AtLeastWin7}

## Example

    \${If} \${AtLeastWin7}
        DetailPrint "Windows 7 or higher"
    \${EndIf}

## Credits

*unknown*
`;var kn=`# \${AtLeastWin8.1}

Checks if the installer is running on Windows 8.1.

## Syntax

    logic_lib_statement \${AtLeastWin8.1}

## Example

    \${If} \${AtLeastWin8.1}
        DetailPrint "Windows 8.1 or higher"
    \${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0a2
`;var Un=`# \${AtLeastWin8}

Checks if the installer is running on Windows 8.

## Syntax

    logic_lib_statement \${AtLeastWin8}

## Example

    \${If} \${AtLeastWin8}
        DetailPrint "Windows 8 or higher"
    \${EndIf}

## Credits

*unknown*
`;var Gn=`# \${AtLeastWin10}

Checks if the installer is running on Windows 10.

## Syntax

    logic_lib_statement \${AtLeastWin10}

## Example

    \${If} \${AtLeastWin10}
        DetailPrint "Windows 10 or higher"
    \${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0b2
`;var Hn=`# \${AtLeastWin95}

Checks if the installer is running on Windows 95.

## Syntax

    logic_lib_statement \${AtLeastWin95}

## Example

    \${If} \${AtLeastWin95}
        DetailPrint "Windows 95 or higher"
    \${EndIf}

## Credits

*unknown*
`;var Kn=`# \${AtLeastWin98}

Checks if the installer is running on Windows 98.

## Syntax

    logic_lib_statement \${AtLeastWin98}

## Example

    \${If} \${AtLeastWin98}
        DetailPrint "Windows 98 or higher"
    \${EndIf}

## Credits

*unknown*
`;var Vn=`# \${AtLeastWin2000}

Checks if the installer is running on Windows 2000.

## Syntax

    logic_lib_statement \${AtLeastWin2000}

## Example

    \${If} \${AtLeastWin2000}
        DetailPrint "Windows 2000 or higher"
    \${EndIf}

## Credits

*unknown*
`;var Xn=`# \${AtLeastWin2003}

Checks if the installer is running on Windows Server 2003.

## Syntax

    logic_lib_statement \${AtLeastWin2003}

## Example

    \${If} \${AtLeastWin2003}
        DetailPrint "Windows Server 2003 or higher"
    \${EndIf}

## Credits

*unknown*
`;var Yn=`# \${AtLeastWin2008}

Checks if the installer is running on Windows Server 2008.

## Syntax

    logic_lib_statement \${AtLeastWin2008}

## Example

    \${If} \${AtLeastWin2008}
        DetailPrint "Windows Server 2008 or higher"
    \${EndIf}

## Credits

*unknown*
`;var zn=`# \${AtLeastWin2008R2}

Checks if the installer is running on Windows Server 2008 R2.

## Syntax

    logic_lib_statement \${AtLeastWin2008R2}

## Example

    \${If} \${AtLeastWin2008R2}
        DetailPrint "Windows Server 2008 R2 or higher"
    \${EndIf}

## Credits

*unknown*
`;var qn=`# \${AtLeastWinME}

Checks if the installer is running on Windows ME.

## Syntax

    logic_lib_statement \${AtLeastWinME}

## Example

    \${If} \${AtLeastWinME}
        DetailPrint "Windows ME or higher"
    \${EndIf}

## Credits

*unknown*
`;var jn=`# \${AtLeastWinNT4}

Checks if the installer is running on Windows NT4.

## Syntax

    logic_lib_statement \${AtLeastWinNT4}

## Example

    \${If} \${AtLeastWinNT4}
        DetailPrint "Windows NT 4 or higher"
    \${EndIf}

## Credits

*unknown*
`;var Zn=`# \${AtLeastWinVista}

Checks if the installer is running on Windows Vista.

## Syntax

    logic_lib_statement \${AtLeastWinVista}

## Example

    \${If} \${AtLeastWinVista}
        DetailPrint "Windows Vista or higher"
    \${EndIf}

## Credits

*unknown*
`;var Jn=`# \${AtLeastWinXP}

Checks if the installer is running on Windows XP.

## Syntax

    logic_lib_statement \${AtLeastWinXP}

## Example

    \${If} \${AtLeastWinXP}
        DetailPrint "Windows XP or higher"
    \${EndIf}

## Credits

*unknown*
`;var Qn=`# \${AtMostServicePack}

Checks if the installer is running on Windows service version pack at most as specified.

## Syntax

    logic_lib_statement \${AtMostServicePack} service_pack_version

## Example

    \${If} \${IsWinXP}
    \${AndIf} \${AtMostServicePack} 2
        DetailPrint "Windows XP with SP2 (or lower)"
    \${Else}
        DetailPrint "Not Windows XP, or higher service pack installed"
    \${EndIf}

## Credits

*unknown*
`;var ne=`# \${AtMostWin7}

Checks if the installer is running on Windows 7 at most.

## Syntax

    logic_lib_statement \${AtMostWin7}

## Example

    \${If} \${AtMostWin7}
        DetailPrint "Windows 7 or lower"
    \${EndIf}

## Credits

*unknown*
`;var ee=`# \${AtMostWin8.1}

Checks if the installer is running on Windows 8.1 at most.

## Syntax

    logic_lib_statement \${AtMostWin8.1}

## Example

    \${If} \${AtMostWin8.1}
        DetailPrint "Windows 8.1 or lower"
    \${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0a2

`;var te=`# \${AtMostWin8}

Checks if the installer is running on Windows 8 at most.

## Syntax

    logic_lib_statement \${AtMostWin8}

## Example

    \${If} \${AtMostWin8}
        DetailPrint "Windows 8 or lower"
    \${EndIf}

## Credits

*unknown*
`;var oe=`# \${AtMostWin10}

Checks if the installer is running on Windows 10 at most.

## Syntax

    logic_lib_statement \${AtMostWin10}

## Example

    \${If} \${AtMostWin10}
        DetailPrint "Windows 10 or lower"
    \${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0b2
`;var ie=`# \${AtMostWin95}

Checks if the installer is running on Windows 95 at most.

## Syntax

    logic_lib_statement \${AtMostWin95}

## Example

    \${If} \${AtMostWin95}
        DetailPrint "Windows 95 or lower"
    \${EndIf}

## Credits

*unknown*
`;var re=`# \${AtMostWin98}

Checks if the installer is running on Windows 98 at most.

## Syntax

    logic_lib_statement \${AtMostWin98}

## Example

    \${If} \${AtMostWin98}
        DetailPrint "Windows 98 or lower"
    \${EndIf}

## Credits

*unknown*
`;var se=`# \${AtMostWin2000}

Checks if the installer is running on Windows 2000 at most.

## Syntax

    logic_lib_statement \${AtMostWin2000}

## Example

    \${If} \${AtMostWin2000}
        DetailPrint "Windows 2000 or lower"
    \${EndIf}

## Credits

*unknown*
`;var ae=`# \${AtMostWin2003}

Checks if the installer is running on Windows Server 2003 at most.

## Syntax

    logic_lib_statement \${AtMostWin2003}

## Example

    \${If} \${AtMostWin2003}
        DetailPrint "Windows Server 2003 or lower"
    \${EndIf}

## Credits

*unknown*
`;var le=`# \${AtMostWin2008}

Checks if the installer is running on Windows Server 2008 at most.

## Syntax

    logic_lib_statement \${AtMostWin2008}

## Example

    \${If} \${AtMostWin2008}
        DetailPrint "Windows Server 2008 or lower"
    \${EndIf}

## Credits

*unknown*
`;var de=`# \${AtMostWin2008R2}

Checks if the installer is running on Windows Server 2008 R2 at most.

## Syntax

    logic_lib_statement \${AtMostWin2008R2}

## Example

    \${If} \${AtMostWin2008R2}
        DetailPrint "Windows Server 2008 R2 or lower"
    \${EndIf}

## Credits

*unknown*
`;var ce=`# \${AtMostWin2012}

Checks if the installer is running on Windows Server 2012 at most.

## Syntax

    logic_lib_statement \${AtMostWin2012}

## Example

    \${If} \${AtMostWin2012}
        DetailPrint "Windows Server 2012 or lower"
    \${EndIf}

## Credits

*unknown*
`;var me=`# \${AtMostWin2012R2}

Checks if the installer is running on Windows Server 2012 R2 at most.

## Syntax

    logic_lib_statement \${AtMostWin2012R2}

## Example

    \${If} \${AtMostWin2012R2}
        DetailPrint "Windows Server 2012 R2 or lower"
    \${EndIf}

## Credits

*unknown*
`;var ue=`# \${AtMostWinME}

Checks if the installer is running on Windows ME at most.

## Syntax

    logic_lib_statement \${AtMostWinME}

## Example

    \${If} \${AtMostWinME}
        DetailPrint "Windows ME or lower"
    \${EndIf}

## Credits

*unknown*
`;var fe=`# \${AtMostWinNT4}

Checks if the installer is running on Windows NT4 at most.

## Syntax

    logic_lib_statement \${AtMostWinNT4}

## Example

    \${If} \${AtMostWinNT4}
        DetailPrint "Windows NT4 or lower"
    \${EndIf}

## Credits

*unknown*
`;var pe=`# \${AtMostWinVista}

Checks if the installer is running on Windows Vista at most.

## Syntax

    logic_lib_statement \${AtMostWinVista}

## Example

    \${If} \${AtMostWinVista}
        DetailPrint "Windows Vista or lower"
    \${EndIf}

## Credits

*unknown*
`;var he=`# \${AtMostWinXP}

Checks if the installer is running on Windows XP at most.

## Syntax

    logic_lib_statement \${AtMostWinXP}

## Example

    \${If} \${AtMostWinXP}
        DetailPrint "Windows XP or lower"
    \${EndIf}

## Credits

*unknown*
`;var Se=`# \${IsNT}

Checks if the installer is running on Windows NT family (NT4, 2000, XP, etc.)

## Syntax

    logic_lib_statement \${IsNT}

## Example

    \${If} \${IsNT}
        DetailPrint "Running on NT. Installing Unicode enabled application."
    \${Else}
        DetailPrint "Not running on NT. Installing ANSI application."
    \${EndIf}

## Credits

*unknown*
`;var $e=`# \${IsServerOS}

Checks if the installer is running on a server version of Windows (NT4, 2003, 2008, etc.)

## Syntax

    logic_lib_statement \${IsServerOS}

## Example

    \${If} \${IsServerOS}
        DetailPrint "Running on Windows Server."
    \${Else}
        DetailPrint "Not running on Windows Server."
    \${EndIf}

## Credits

*unknown*
`;var ge=`# \${IsServicePack}

Checks if the installer is running on Windows service pack version exactly as specified.

## Syntax

    logic_lib_statement \${IsServicePack} service_pack_version

## Example

    \${If} \${IsWinXP}
    \${AndIf} \${IsServicePack} 2
        DetailPrint "Windows XP with SP2"
    \${Else}
        DetailPrint "Not Windows XP, or different service pack installed"
    \${EndIf}

## Credits

*unknown*
`;var Ie=`# \${IsWin7}

Checks if the installer is running on Windows 7 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin7}

## Example

    \${If} \${IsWin7}
        DetailPrint "Running on Windows 7"
    \${Else}
        DetailPrint "Not running on Windows 7"
    \${EndIf}

## Credits

*unknown*
`;var be=`# \${IsWin8.1}

Checks if the installer is running on Windows 8.1 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin8.1}

## Example

    \${If} \${IsWin8.1}
        DetailPrint "Running on Windows 8.1"
    \${Else}
        DetailPrint "Not running on Windows 8.1"
    \${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0a2
`;var ye=`# \${IsWin8}

Checks if the installer is running on Windows 8 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin8}

## Example

    \${If} \${IsWin8}
        DetailPrint "Running on Windows 8"
    \${Else}
        DetailPrint "Not running on Windows 8"
    \${EndIf}

## Credits

*unknown*
`;var xe=`# \${IsWin10}

Checks if the installer is running on Windows 10 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin10}

## Example

    \${If} \${IsWin10}
        DetailPrint "Running on Windows 10"
    \${Else}
        DetailPrint "Not running on Windows 10"
    \${EndIf}

## Credits

*unknown*

## History

Added in NSIS v3.0b2
`;var Ee=`# \${IsWin95}

Checks if the installer is running on Windows 95 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin95}

## Example

    \${If} \${IsWin95}
        DetailPrint "Running on Windows 95"
    \${Else}
        DetailPrint "Not running on Windows 95"
    \${EndIf}

## Credits

*unknown*
`;var we=`# \${IsWin98}

Checks if the installer is running on Windows 98 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin98}

## Example

    \${If} \${IsWin98}
        DetailPrint "Running on Windows 98"
    \${Else}
        DetailPrint "Not running on Windows 98"
    \${EndIf}

## Credits

*unknown*
`;var Re=`# \${IsWin2000}

Checks if the installer is running on Windows 2000 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin2000}

## Example

    \${If} \${IsWin2000}
        DetailPrint "Running on Windows 2000"
    \${Else}
        DetailPrint "Not running on Windows 2000"
    \${EndIf}

## Credits

*unknown*
`;var Ce=`# \${IsWin2003}

Checks if the installer is running on Windows Server 2003 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin2003}

## Example

    \${If} \${IsWin2003}
        DetailPrint "Running on Windows Server 2003"
    \${Else}
        DetailPrint "Not running on Windows Server 2003"
    \${EndIf}

## Credits

*unknown*
`;var ve=`# \${IsWin2008}

Checks if the installer is running on Windows Server 2008 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin2008}

## Example

    \${If} \${IsWin2008}
        DetailPrint "Running on Windows Server 2008"
    \${Else}
        DetailPrint "Not running on Windows Server 2008"
    \${EndIf}

## Credits

*unknown*
`;var Ne=`# \${IsWin2008R2}

Checks if the installer is running on Windows Server 2008 R2 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin2008R2}

## Example

    \${If} \${IsWin2008R2}
        DetailPrint "Running on Windows Server 2008 R2"
    \${Else}
        DetailPrint "Not running on Windows Server 2008 R2"
    \${EndIf}

## Credits

*unknown*
`;var Fe=`# \${IsWin2012}

Checks if the installer is running on Windows Server 2012 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin2012}

## Example

    \${If} \${IsWin2012}
        DetailPrint "Running on Windows Server 2012"
    \${Else}
        DetailPrint "Not running on Windows Server 2012"
    \${EndIf}

## Credits

*unknown*
`;var Te=`# \${IsWin2012R2}

Checks if the installer is running on Windows Server 2012 R2 exactly as specified.

## Syntax

    logic_lib_statement \${IsWin2012R2}

## Example

    \${If} \${IsWin2012R2}
        DetailPrint "Running on Windows Server 2012 R2"
    \${Else}
        DetailPrint "Not running on Windows Server 2012 R2"
    \${EndIf}

## Credits

*unknown*
`;var De=`# \${IsWinME}

Checks if the installer is running on Windows ME exactly as specified.

## Syntax

    logic_lib_statement \${IsWinME}

## Example

    \${If} \${IsWinME}
        DetailPrint "Running on Windows ME"
    \${Else}
        DetailPrint "Not running on Windows ME"
    \${EndIf}

## Credits

*unknown*
`;var Ae=`# \${IsWinNT4}

Checks if the installer is running on Windows NT4 exactly as specified.

## Syntax

    logic_lib_statement \${IsWinNT4}

## Example

    \${If} \${IsWinNT4}
        DetailPrint "Running on Windows NT4"
    \${Else}
        DetailPrint "Not running on Windows NT4"
    \${EndIf}

## Credits

*unknown*
`;var _e=`# \${IsWinVista}

Checks if the installer is running on Windows Vista exactly as specified.

## Syntax

    logic_lib_statement \${IsWinVista}

## Example

    \${If} \${IsWinVista}
        DetailPrint "Running on Windows Vista"
    \${Else}
        DetailPrint "Not running on Windows Vista"
    \${EndIf}

## Credits

*unknown*
`;var We=`# \${IsWinXP}

Checks if the installer is running on Windows XP exactly as specified.

## Syntax

    logic_lib_statement \${IsWinXP}

## Example

    \${If} \${IsWinXP}
        DetailPrint "Running on Windows XP"
    \${Else}
        DetailPrint "Not running  Windows XP"
    \${EndIf}

## Credits

*unknown*
`;var Me=`# \${StrFilter}

* Convert string to uppercase or lowercase.
* Set symbol filter.

## Syntax

    \${StrFilter} "[string]" "[options]" "[symbols1]" "[symbols2]" $var

    "[string]"       ;[string]
                     ;  input string
                     ;
    "[options]"      ;[+|-][1|2|3|12|23|31][eng|rus]
                     ;  +   : convert string to uppercase
                     ;  -   : convert string to lowercase
                     ;  1   : only Digits
                     ;  2   : only Letters
                     ;  3   : only Special
                     ;  12  : only Digits  + Letters
                     ;  23  : only Letters + Special
                     ;  31  : only Special + Digits
                     ;  eng : English symbols (default)
                     ;  rus : Russian symbols
                     ;
    "[symbols1]"     ;[symbols1]
                     ;  symbols include (not changeable)
                     ;
    "[symbols2]"     ;[symbols2]
                     ;  symbols exclude
                     ;
    $var             ;output (result)

Note:

- Error flag if syntax error
- Same symbol to include & to exclude = to exclude

## Examples

### UpperCas

    Section
        \${StrFilter} "123abc 456DEF 7890|%#" "+" "" "" $R0
        ; $R0="123ABC 456DEF 7890|%#"
    SectionEnd

### LowerCase

    Section
        \${StrFilter} "123abc 456DEF 7890|%#" "-" "ef" "" $R0
        ; $R0="123abc 456dEF 7890|%#"
    SectionEnd

### Filter 1

    Section
        \${StrFilter} "123abc 456DEF 7890|%#" "2" "|%" "" $R0
        ; $R0="abcDEF|%"       ;only Letters + |%
    SectionEnd

### Filter 2

    Section
        \${StrFilter} "123abc 456DEF 7890|%#" "13" "af" "4590" $R0
        ; $R0="123a 6F 78|%#"  ;only Digits + Special + af - 4590
    SectionEnd

### Filter 3

    Section
        \${StrFilter} "123abc 456DEF 7890|%#" "+12" "b" "def" $R0
        ; $R0="123AbC4567890"  ;only Digits + Letters + b - def
    SectionEnd

### Filter 4

    Section
        \${StrFilter} "123abc\xC0\xC1\xC2 456DEF\xE3\xE4\xE5 7890|%#" "+12rus" "\xE4" "\xE3\xE5" $R0
        ; $R0="123\xC0\xC1\xC2456\xE47890"  ;only Digits + Letters + \xE4 - \xE3\xE5
    SectionEnd

### English + Russian Letters

    Section
        \${StrFilter} "123abc\xC0\xC1\xC2 456DEF\xE3\xE4\xE5 7890|%#" "2rus" "" "" $R0
        ; $R0="\xC0\xC1\xC2\xE3\xE4\xE5"        ;only Russian Letters
        \${StrFilter} "123abc\xC0\xC1\xC2 456DEF\xE3\xE4\xE5 7890|%#" "2" "$R0" "" $R0
        ; $R0="abc\xC0\xC1\xC2DEF\xE3\xE4\xE5"  ;only English + Russian Letters
    SectionEnd

### Word Capitalize

    Section
        Push "_01-PERPETUOUS_DREAMER__-__THE_SOUND_OF_GOODBYE_(ORIG._MIX).MP3_"
        Call Capitalize
        Pop $R0
        ; $R0="_01-Perpetuous_Dreamer__-__The_Sound_Of_Goodbye_(Orig._Mix).mp3_"

        \${WordReplace} "$R0" "_" " " "+*" $R0
        ; $R0=" 01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3 "

        \${WordReplace} "$R0" " " "" "{}" $R0
        ; $R0="01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3"
    SectionEnd

    Function Capitalize
        Exch $R0
        Push $0
        Push $1
        Push $2

        \${StrFilter} '$R0' '-eng' '' '' $R0
        \${StrFilter} '$R0' '-rus' '' '' $R0

        StrCpy $0 0

        loop:
        IntOp $0 $0 + 1
        StrCpy $1 $R0 1 $0
        StrCmp $1 '' end
        StrCmp $1 ' ' +5
        StrCmp $1 '_' +4
        StrCmp $1 '-' +3
        StrCmp $1 '(' +2
        StrCmp $1 '[' 0 loop
        IntOp $0 $0 + 1
        StrCpy $1 $R0 1 $0
        StrCmp $1 '' end

        \${StrFilter} '$1' '+eng' '' '' $1
        \${StrFilter} '$1' '+rus' '' '' $1

        StrCpy $2 $R0 $0
        IntOp $0 $0 + 1
        StrCpy $R0 $R0 '' $0
        IntOp $0 $0 - 2
        StrCpy $R0 '$2$1$R0'
        goto loop

        end:
        Pop $2
        Pop $1
        Pop $0
        Exch $R0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Oe=`# \${VersionCompare}

* Convert string to uppercase or lowercase.
* Set symbol filter.

## Syntax

    \${StrFilterS} "[string]" "[options]" "[symbols1]" "[symbols2]" $var

    "[string]"       ;[string]
                     ;  input string
                     ;
    "[options]"      ;[+|-][1|2|3|12|23|31][eng|rus]
                     ;  +   : convert string to uppercase
                     ;  -   : convert string to lowercase
                     ;  1   : only Digits
                     ;  2   : only Letters
                     ;  3   : only Special
                     ;  12  : only Digits  + Letters
                     ;  23  : only Letters + Special
                     ;  31  : only Special + Digits
                     ;  eng : English symbols (default)
                     ;  rus : Russian symbols
                     ;
    "[symbols1]"     ;[symbols1]
                     ;  symbols include (not changeable)
                     ;
    "[symbols2]"     ;[symbols2]
                     ;  symbols exclude
                     ;
    $var             ;output (result)

Note:

- Error flag if syntax error
- Same symbol to include & to exclude = to exclude

## Examples

### UpperCase

    Section
        \${StrFilterS} "123abc 456DEF 7890|%#" "+" "" "" $R0
        ; $R0="123ABC 456DEF 7890|%#"
    SectionEnd

### LowerCase

    Section
        \${StrFilterS} "123abc 456DEF 7890|%#" "-" "ef" "" $R0
        ; $R0="123abc 456dEF 7890|%#"
    SectionEnd

### Filter 1

    Section
        \${StrFilterS} "123abc 456DEF 7890|%#" "2" "|%" "" $R0
        ; $R0="abcDEF|%"       ;only Letters + |%
    SectionEnd

### Filter 2

    Section
        \${StrFilterS} "123abc 456DEF 7890|%#" "13" "af" "4590" $R0
        ; $R0="123a 6F 78|%#"  ;only Digits + Special + af - 4590
    SectionEnd

### Filter 3

    Section
        \${StrFilterS} "123abc 456DEF 7890|%#" "+12" "b" "def" $R0
        ; $R0="123AbC4567890"  ;only Digits + Letters + b - def
    SectionEnd

### Filter 4

    Section
        \${StrFilterS} "123abc\xC0\xC1\xC2 456DEF\xE3\xE4\xE5 7890|%#" "+12rus" "\xE4" "\xE3\xE5" $R0
        ; $R0="123\xC0\xC1\xC2456\xE47890"  ;only Digits + Letters + \xE4 - \xE3\xE5
    SectionEnd

### English + Russian Letters

    Section
        \${StrFilterS} "123abc\xC0\xC1\xC2 456DEF\xE3\xE4\xE5 7890|%#" "2rus" "" "" $R0
        ; $R0="\xC0\xC1\xC2\xE3\xE4\xE5"        ;only Russian Letters
        \${StrFilterS} "123abc\xC0\xC1\xC2 456DEF\xE3\xE4\xE5 7890|%#" "2" "$R0" "" $R0
        ; $R0="abc\xC0\xC1\xC2DEF\xE3\xE4\xE5"  ;only English + Russian Letters
    SectionEnd

### Word Capitalize

    Section
        Push "_01-PERPETUOUS_DREAMER__-__THE_SOUND_OF_GOODBYE_(ORIG._MIX).MP3_"
        Call Capitalize
        Pop $R0
        ; $R0="_01-Perpetuous_Dreamer__-__The_Sound_Of_Goodbye_(Orig._Mix).mp3_"

        \${WordReplace} "$R0" "_" " " "+*" $R0
        ; $R0=" 01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3 "

        \${WordReplace} "$R0" " " "" "{}" $R0
        ; $R0="01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3"
    SectionEnd

    Function Capitalize
        Exch $R0
        Push $0
        Push $1
        Push $2

        \${StrFilterS} '$R0' '-eng' '' '' $R0
        \${StrFilterS} '$R0' '-rus' '' '' $R0

        StrCpy $0 0

        loop:
        IntOp $0 $0 + 1
        StrCpy $1 $R0 1 $0
        StrCmp $1 '' end
        StrCmp $1 ' ' +5
        StrCmp $1 '_' +4
        StrCmp $1 '-' +3
        StrCmp $1 '(' +2
        StrCmp $1 '[' 0 loop
        IntOp $0 $0 + 1
        StrCpy $1 $R0 1 $0
        StrCmp $1 '' end

        \${StrFilterS} '$1' '+eng' '' '' $1
        \${StrFilterS} '$1' '+rus' '' '' $1

        StrCpy $2 $R0 $0
        IntOp $0 $0 + 1
        StrCpy $R0 $R0 '' $0
        IntOp $0 $0 - 2
        StrCpy $R0 '$2$1$R0'
        goto loop

        end:
        Pop $2
        Pop $1
        Pop $0
        Exch $R0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Pe=`# \${VersionCompare}

Compare version numbers.

## Syntax

    \${VersionCompare} "[Version1]" "[Version2]" $var

    "[Version1]"        ; First version
    "[Version2]"        ; Second version
    $var                ; Result:
                        ;    $var=0  Versions are equal
                        ;    $var=1  Version1 is newer
                        ;    $var=2  Version2 is newer

## Example

    Section
        \${VersionCompare} "1.1.1.9" "1.1.1.01" $R0
        ; $R0="1"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Le=`# \${VersionConvert}

Convert version in the numerical format which can be compared.

## Syntax

    \${VersionConvert} "[Version]" "[CharList]" $var

    "[Version]"         ; Version
                        ;
    "[CharList]"        ; List of characters, which will be replaced by numbers
                        ; "abcdefghijklmnopqrstuvwxyz" (default)
                        ;
    $var                ; Result: converted version

Note:

- Converted letters are separated with dot
- If character is non-digit and not in list then it will be converted to dot

## Examples

### Example 1

    Section
        \${VersionConvert} "9.0a" "" $R0
        ; $R0="9.0.01"

        \${VersionConvert} "9.0c" "" $R1
        ; $R1="9.0.03"

        \${VersionCompare} "$R0" "$R1" $R2
        ; $R2="2"   version2 is newer
    SectionEnd

### Example 2

    Section
        \${VersionConvert} "0.15c-9m" "" $R0
        ; $R0="0.15.03.9.13"

        \${VersionConvert} "0.15c-1n" "" $R1
        ; $R1="0.15.03.1.14"

        \${VersionCompare} "$R0" "$R1" $R2
        ; $R2="1"   version1 is newer
    SectionEnd

### Example 3

    Section
        \${VersionConvert} "0.15c+" "abcdefghijklmnopqrstuvwxyz+" $R0
        ; $R0="0.15.0327"

        \${VersionConvert} "0.15c" "abcdefghijklmnopqrstuvwxyz+" $R1
        ; $R1="0.15.03"

        \${VersionCompare} "$R0" "$R1" $R2
        ; $R2="1"   version1 is newer
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Be=`# \${WordAdd}

Add words to string1 from string2 if not exist or delete words if exist.

## Syntax

    \${WordAdd} "[string1]" "[delimiter]" "[E][options]" $var

    "[string1]"          ;[string1]
                         ;  string for addition or removing
    "[delimiter]"        ;[delimiter]
                         ;  one or several symbols
    "[E][options]"       ;[options]
                         ;  +string2 : words to add
                         ;  -string2 : words to delete
                         ;
                         ;[E]
                         ;  with errorlevel output
                         ;  IfErrors:
                         ;     $var=1  delimiter is empty
                         ;     $var=3  syntax error (use: +text,-text)
                         ;[]
                         ;  no errorlevel output (default)
                         ;  If some errors found then (result=input string)
                         ;
    $var                 ;output (result)

## Examples

### add

    Section
        \${WordAdd} "C:\\io.sys C:\\WINDOWS" " " "+C:\\WINDOWS C:\\config.sys" $R0
        ; $R0="C:\\io.sys C:\\WINDOWS C:\\config.sys"
    SectionEnd

### delete

    Section
        \${WordAdd} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "-C:\\WINDOWS C:\\config.sys C:\\IO.SYS" $R0
        ; $R0="C:\\logo.sys"
    SectionEnd

### add to one

    Section
        \${WordAdd} "C:\\io.sys" " " "+C:\\WINDOWS C:\\config.sys C:\\IO.SYS" $R0
        ; $R0="C:\\io.sys C:\\WINDOWS C:\\config.sys"
    SectionEnd

### delete one

    Section
        \${WordAdd} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "-C:\\WINDOWS" $R0
        ; $R0="C:\\io.sys C:\\logo.sys"
    SectionEnd

### No new words found

    Section
        \${WordAdd} "C:\\io.sys C:\\logo.sys" " " "+C:\\logo.sys" $R0
        StrCmp $R0 "C:\\io.sys C:\\logo.sys" 0 +2
        MessageBox MB_OK "No new words found to add"
    SectionEnd

### No words deleted

    Section
        \${WordAdd} "C:\\io.sys C:\\logo.sys" " " "-C:\\config.sys" $R0
        StrCmp $R0 "C:\\io.sys C:\\logo.sys" 0 +2
        MessageBox MB_OK "No words found to delete"
    SectionEnd

### With errorlevel output

    Section
        \${WordAdd} "C:\\io.sys C:\\logo.sys" "" "E-C:\\logo.sys" $R0
        ; $R0="1" (delimiter is empty "")

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var ke=`# \${WordInsert}

Insert word in string.

## Syntax

    \${WordInsert} "[string]" "[delimiter]" "[word]" "[E][options]" $var
---
    "[string]"          ;[string]
                        ;  input string
    "[delimiter]"       ;[delimiter]
                        ;  one or several symbols
    "[word]"            ;[word]
                        ;  word to insert
    "[E][options]"      ;[options]
                        ;  +number  : word number from start
                        ;  -number  : word number from end
                        ;
                        ;[E]
                        ;  with errorlevel output
                        ;  IfErrors:
                        ;     $var=1  delimiter is empty
                        ;     $var=2  wrong word number
                        ;     $var=3  syntax error (Use: +1,-1)
                        ;[]
                        ;  no errorlevel output (default)
                        ;  If some errors found then (result=input string)
                        ;
    $var                ;output (result)

## Examples

### add

    Section
        \${WordAddS} "C:\\io.sys C:\\WINDOWS" " " "+C:\\WINDOWS C:\\config.sys" $R0
        ; $R0="C:\\io.sys C:\\WINDOWS C:\\config.sys"
    SectionEnd

### delete

    Section
        \${WordAddS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "-C:\\WINDOWS C:\\config.sys C:\\IO.SYS" $R0
        ; $R0="C:\\logo.sys"
    SectionEnd

### add to one

    Section
        \${WordAddS} "C:\\io.sys" " " "+C:\\WINDOWS C:\\config.sys C:\\IO.SYS" $R0
        ; $R0="C:\\io.sys C:\\WINDOWS C:\\config.sys"
    SectionEnd

### delete one

    Section
        \${WordAddS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "-C:\\WINDOWS" $R0
        ; $R0="C:\\io.sys C:\\logo.sys"
    SectionEnd

### No new words found

    Section
        \${WordAddS} "C:\\io.sys C:\\logo.sys" " " "+C:\\logo.sys" $R0
        StrCmp $R0 "C:\\io.sys C:\\logo.sys" 0 +2
        MessageBox MB_OK "No new words found to add"
    SectionEnd

### No words deleted

    Section
        \${WordAddS} "C:\\io.sys C:\\logo.sys" " " "-C:\\config.sys" $R0
        StrCmp $R0 "C:\\io.sys C:\\logo.sys" 0 +2
        MessageBox MB_OK "No words found to delete"
    SectionEnd

### With errorlevel output

    Section
        \${WordAddS} "C:\\io.sys C:\\logo.sys" "" "E-C:\\logo.sys" $R0
        ; $R0="1" (delimiter is empty "")

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Ue=`# \${WordFind}

Multi-features string function.

## Syntax

    \${WordFind} "[string]" "[delimiter]" "[E][options]" $var

    "[string]"         ;[string]
                       ;  input string
    "[delimiter]"      ;[delimiter]
                       ;  one or several symbols
    "[E][options]"     ;[options]
                       ;  +number   : word number from start
                       ;  -number   : word number from end
                       ;  +number}  : delimiter number from start
                       ;              all space after this
                       ;              delimiter to output
                       ;  +number{  : delimiter number from start
                       ;              all space before this
                       ;              delimiter to output
                       ;  +number}} : word number from start
                       ;              all space after this word
                       ;              to output
                       ;  +number{{ : word number from start
                       ;              all space before this word
                       ;              to output
                       ;  +number{} : word number from start
                       ;              all space before and after
                       ;              this word (word exclude)
                       ;  +number*} : word number from start
                       ;              all space after this
                       ;              word to output with word
                       ;  +number{* : word number from start
                       ;              all space before this
                       ;              word to output with word
                       ;  #         : sum of words to output
                       ;  *         : sum of delimiters to output
                       ;  /word     : number of word to output
                       ;
                       ;[E]
                       ;  with errorlevel output
                       ;  IfErrors:
                       ;     $var=1  delimiter not found
                       ;     $var=2  no such word number
                       ;     $var=3  syntax error (Use: +1,-1},#,*,/word,...)
                       ;[]
                       ;  no errorlevel output (default)
                       ;  If some errors found then (result=input string)
                       ;
    $var               ;output (result)

Notes:

- Accepted numbers 1,01,001,...

## Examples

### Find word by number

    Section
        \${WordFind} "C:\\io.sys C:\\Program Files C:\\WINDOWS" " C:\\" "-02" $R0
        ; $R0="Program Files"
    SectionEnd

### Delimiter exclude

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" "sys" "-2}" $R0
        ; $R0=" C:\\logo.sys C:\\WINDOWS"
    SectionEnd

### Sum of words

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " C:\\" "#" $R0
        ; $R0="3"
    SectionEnd

### Sum of delimiters

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" "sys" "*" $R0
        ; $R0="2"
    SectionEnd

### Find word number

    Section
        \${WordFind} "C:\\io.sys C:\\Program Files C:\\WINDOWS" " " "/Files" $R0
        ; $R0="3"
    SectionEnd

### }}

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "+2}}" $R0
        ; $R0=" C:\\WINDOWS"
    SectionEnd

### {}

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "+2{}" $R0
        ; $R0="C:\\io.sys C:\\WINDOWS"
    SectionEnd

### *}

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "+2*}" $R0
        ; $R0="C:\\logo.sys C:\\WINDOWS"
    SectionEnd

### Get parent directory

    Section
        StrCpy $R0 "C:\\Program Files\\NSIS\\NSIS.chm"
    ;               "C:\\Program Files\\NSIS\\Include\\"
    ;               "C:\\\\Program Files\\\\NSIS\\\\NSIS.chm"

        \${WordFind} "$R0" "\\" "-2{*" $R0
        ; $R0="C:\\Program Files\\NSIS"
        ;     "C:\\\\Program Files\\\\NSIS"
    SectionEnd

### Coordinates

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" ":\\lo" "E+1{" $R0
        ; $R0="C:\\io.sys C"
        IfErrors end

        StrLen $0 $R0             ; $0 = Start position of word (11)
        StrLen $1 ':\\lo'          ; $1 = Word length (4)
        ; StrCpy $R0 $R1 $1 $0    ; $R0 = :\\lo

        end:
    SectionEnd

### With errorlevel output

    Section
        \${WordFind} "[string]" "[delimiter]" "E[options]" $R0

        IfErrors 0 end
        StrCmp $R0 1 0 +2       ; errorlevel 1?
        MessageBox MB_OK 'delimiter not found' IDOK end
        StrCmp $R0 2 0 +2       ; errorlevel 2?
        MessageBox MB_OK 'no such word number' IDOK end
        StrCmp $R0 3 0 +2       ; errorlevel 3?
        MessageBox MB_OK 'syntax error'

        end:
    SectionEnd

### Without errorlevel output

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys" "_" "+1" $R0

        ; $R0="C:\\io.sys C:\\logo.sys" (error: delimiter "_" not found)
    SectionEnd

### If found

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys" ":\\lo" "E+1{" $R0

        IfErrors notfound found
        found:
        MessageBox MB_OK 'Found' IDOK end
        notfound:
        MessageBox MB_OK 'Not found'

        end:
    SectionEnd

### If found 2

    Section
        \${WordFind} "C:\\io.sys C:\\logo.sys" ":\\lo" "+1{" $R0

        StrCmp $R0 "C:\\io.sys C:\\logo.sys" notfound found        ; error?
        found:
        MessageBox MB_OK 'Found' IDOK end
        notfound:
        MessageBox MB_OK 'Not found'

        end:
    SectionEnd

### To accept one word in string if delimiter not found

    Section
        StrCpy $0 'OneWord'
        StrCpy $1 1

        loop:
        \${WordFind} "$0" " " "E+$1" $R0
        IfErrors 0 code
        StrCmp $1$R0 11 0 error
        StrCpy $R0 $0
        goto end

        code:
        ; ...
        IntOp $1 $1 + 1
        goto loop

        error:
        StrCpy $1 ''
        StrCpy $R0 ''

        end:
        ; $R0="OneWord"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Ge=`# \${WordFind2X}

Find word between two delimiters.

## Syntax

    \${WordFind2X} "[string]" "[delimiter1]" "[delimiter2]" "[E][options]" $var

    "[string]"         ;[string]
                       ;  input string
    "[delimiter1]"     ;[delimiter1]
                       ;  first delimiter
    "[delimiter2]"     ;[delimiter2]
                       ;  second delimiter
    "[E][options]"     ;[options]
                       ;  +number   : word number from start
                       ;  -number   : word number from end
                       ;  +number}} : word number from start all space
                       ;              after this word to output
                       ;  +number{{ : word number from end all space
                       ;              before this word to output
                       ;  +number{} : word number from start
                       ;              all space before and after
                       ;              this word (word exclude)
                       ;  +number*} : word number from start
                       ;              all space after this
                       ;              word to output with word
                       ;  +number{* : word number from start
                       ;              all space before this
                       ;              word to output with word
                       ;  #         : sum of words to output
                       ;  /word     : number of word to output
                       ;
                       ;[E]
                       ;  with errorlevel output
                       ;  IfErrors:
                       ;     $var=1  no words found
                       ;     $var=2  no such word number
                       ;     $var=3  syntax error (Use: +1,-1,#)
                       ;[]
                       ;  no errorlevel output (default)
                       ;  If some errors found then (result=input string)
                       ;
    $var               ;output (result)

## Examples

### Example 1

    Section
        \${WordFind2X} "[C:\\io.sys];[C:\\logo.sys];[C:\\WINDOWS]" "[C:\\" "];" "+2" $R0
        ; $R0="logo.sys"
    SectionEnd

### Example 2

    Section
        \${WordFind2X} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "-1" $R0
        ; $R0="logo"
    SectionEnd

### Example 3

    Section
        \${WordFind2X} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "-1{{" $R0
        ; $R0="C:\\WINDOWS C:\\io.sys C:"
    SectionEnd

### Example 4

    Section
        \${WordFind2X} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "-1{}" $R0
        ; $R0="C:\\WINDOWS C:\\io.sys C:sys"
    SectionEnd

### Example 5

    Section
        \${WordFind2X} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "-1{*" $R0
        ; $R0="C:\\WINDOWS C:\\io.sys C:\\logo."
    SectionEnd

### Example 6

    Section
        \${WordFind2X} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "/logo" $R0
        ; $R0="2"
    SectionEnd

### With errorlevel output

    Section
        \${WordFind2X} "[io.sys];[C:\\logo.sys]" "\\" "];" "E+1" $R0
        ; $R0="1" ("\\...];" not found)

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var He=`# \${WordFind2XS}

Find word between two delimiters, case sensitive

## Syntax

    \${WordFind2XS} "[string]" "[delimiter1]" "[delimiter2]" "[E][options]" $var

    "[string]"         ;[string]
                       ;  input string
    "[delimiter1]"     ;[delimiter1]
                       ;  first delimiter
    "[delimiter2]"     ;[delimiter2]
                       ;  second delimiter
    "[E][options]"     ;[options]
                       ;  +number   : word number from start
                       ;  -number   : word number from end
                       ;  +number}} : word number from start all space
                       ;              after this word to output
                       ;  +number{{ : word number from end all space
                       ;              before this word to output
                       ;  +number{} : word number from start
                       ;              all space before and after
                       ;              this word (word exclude)
                       ;  +number*} : word number from start
                       ;              all space after this
                       ;              word to output with word
                       ;  +number{* : word number from start
                       ;              all space before this
                       ;              word to output with word
                       ;  #         : sum of words to output
                       ;  /word     : number of word to output
                       ;
                       ;[E]
                       ;  with errorlevel output
                       ;  IfErrors:
                       ;     $var=1  no words found
                       ;     $var=2  no such word number
                       ;     $var=3  syntax error (Use: +1,-1,#)
                       ;[]
                       ;  no errorlevel output (default)
                       ;  If some errors found then (result=input string)
                       ;
    $var               ;output (result)

## Examples

### Example 1

    Section
        \${WordFind2XS} "[C:\\io.sys];[C:\\logo.sys];[C:\\WINDOWS]" "[C:\\" "];" "+2" $R0
        ; $R0="logo.sys"
    SectionEnd

### Example 2

    Section
        \${WordFind2XS} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "-1" $R0
        ; $R0="logo"
    SectionEnd

### Example 3

    Section
        \${WordFind2XS} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "-1{{" $R0
        ; $R0="C:\\WINDOWS C:\\io.sys C:"
    SectionEnd

### Example 4

    Section
        \${WordFind2XS} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "-1{}" $R0
        ; $R0="C:\\WINDOWS C:\\io.sys C:sys"
    SectionEnd

### Example 5

    Section
        \${WordFind2XS} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "-1{*" $R0
        ; $R0="C:\\WINDOWS C:\\io.sys C:\\logo."
    SectionEnd

### Example 6

    Section
        \${WordFind2XS} "C:\\WINDOWS C:\\io.sys C:\\logo.sys" "\\" "." "/logo" $R0
        ; $R0="2"
    SectionEnd

### With errorlevel output

    Section
        \${WordFind2XS} "[io.sys];[C:\\logo.sys]" "\\" "];" "E+1" $R0
        ; $R0="1" ("\\...];" not found)

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Ke=`# \${WordFind3X}

Find a word that contains a string, between two delimiters.

## Syntax

    \${WordFind3X} "[string]" "[delimiter1]" "[center]" "[delimiter2]" "[E][options]" $var

    "[string]"         ;[string]
                       ;  input string
    "[delimiter1]"     ;[delimiter1]
                       ;  first delimiter
    "[center]"         ;[center]
                       ;  center string
    "[delimiter2]"     ;[delimiter2]
                       ;  second delimiter
    "[E][options]"     ;[options]
                       ;  +number   : word number from start
                       ;  -number   : word number from end
                       ;  +number}} : word number from start all space
                       ;              after this word to output
                       ;  +number{{ : word number from end all space
                       ;              before this word to output
                       ;  +number{} : word number from start
                       ;              all space before and after
                       ;              this word (word exclude)
                       ;  +number*} : word number from start
                       ;              all space after this
                       ;              word to output with word
                       ;  +number{* : word number from start
                       ;              all space before this
                       ;              word to output with word
                       ;  #         : sum of words to output
                       ;  /word     : number of word to output
                       ;
                       ;[E]
                       ;  with errorlevel output
                       ;  IfErrors:
                       ;     $var=1  no words found
                       ;     $var=2  no such word number
                       ;     $var=3  syntax error (Use: +1,-1,#)
                       ;[]
                       ;  no errorlevel output (default)
                       ;  If some errors found then (result=input string)
                       ;
    $var               ;output (result)

## Examples

### Example 1

    Section
        \${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "+1" $R0
        ; $R0="1.AAB"
    SectionEnd

### Example 2

    Section
        \${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1" $R0
        ; $R0="2.BAA"
    SectionEnd

### Example 3

    Section
        \${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{{" $R0
        ; $R0="[1.AAB];"
    SectionEnd

### Example 4

    Section
        \${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{}" $R0
        ; $R0="[1.AAB];[3.BBB];"
    SectionEnd

### Example 5

    Section
        \${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{*" $R0
        ; $R0="[1.AAB];[2.BAA];"
    SectionEnd

### Example 6

    Section
        \${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "/2.BAA" $R0
        ; $R0="2"
    SectionEnd

### With errorlevel output

    Section
        \${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "XX" "];" "E+1" $R0
        ; $R0="1" ("[...XX...];" not found)

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Ve=`# \${WordFind3XS}

Find a word that contains a string, between two delimiters, case sensitive.

## Syntax

    \${WordFind3XS} "[string]" "[delimiter1]" "[center]" "[delimiter2]" "[E][options]" $var

    "[string]"         ;[string]
                       ;  input string
    "[delimiter1]"     ;[delimiter1]
                       ;  first delimiter
    "[center]"         ;[center]
                       ;  center string
    "[delimiter2]"     ;[delimiter2]
                       ;  second delimiter
    "[E][options]"     ;[options]
                       ;  +number   : word number from start
                       ;  -number   : word number from end
                       ;  +number}} : word number from start all space
                       ;              after this word to output
                       ;  +number{{ : word number from end all space
                       ;              before this word to output
                       ;  +number{} : word number from start
                       ;              all space before and after
                       ;              this word (word exclude)
                       ;  +number*} : word number from start
                       ;              all space after this
                       ;              word to output with word
                       ;  +number{* : word number from start
                       ;              all space before this
                       ;              word to output with word
                       ;  #         : sum of words to output
                       ;  /word     : number of word to output
                       ;
                       ;[E]
                       ;  with errorlevel output
                       ;  IfErrors:
                       ;     $var=1  no words found
                       ;     $var=2  no such word number
                       ;     $var=3  syntax error (Use: +1,-1,#)
                       ;[]
                       ;  no errorlevel output (default)
                       ;  If some errors found then (result=input string)
                       ;
    $var               ;output (result)

## Examples

### Example 1

    Section
        \${WordFind3XS} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "+1" $R0
        ; $R0="1.AAB"
    SectionEnd

### Example 2

    Section
        \${WordFind3XS} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1" $R0
        ; $R0="2.BAA"
    SectionEnd

### Example 3

    Section
        \${WordFind3XS} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{{" $R0
        ; $R0="[1.AAB];"
    SectionEnd

### Example 4

    Section
        \${WordFind3XS} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{}" $R0
        ; $R0="[1.AAB];[3.BBB];"
    SectionEnd

### Example 5

    Section
        \${WordFind3XS} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{*" $R0
        ; $R0="[1.AAB];[2.BAA];"
    SectionEnd

### Example 6

    Section
        \${WordFind3XS} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "/2.BAA" $R0
        ; $R0="2"
    SectionEnd

### With errorlevel output

    Section
        \${WordFind3XS} "[1.AAB];[2.BAA];[3.BBB];" "[" "XX" "];" "E+1" $R0
        ; $R0="1" ("[...XX...];" not found)

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Xe=`# \${WordFindS}

Multi-features string function, case sensitive

## Syntax

    \${WordFindS} "[string]" "[delimiter]" "[E][options]" $var

    "[string]"         ;[string]
                       ;  input string
    "[delimiter]"      ;[delimiter]
                       ;  one or several symbols
    "[E][options]"     ;[options]
                       ;  +number   : word number from start
                       ;  -number   : word number from end
                       ;  +number}  : delimiter number from start
                       ;              all space after this
                       ;              delimiter to output
                       ;  +number{  : delimiter number from start
                       ;              all space before this
                       ;              delimiter to output
                       ;  +number}} : word number from start
                       ;              all space after this word
                       ;              to output
                       ;  +number{{ : word number from start
                       ;              all space before this word
                       ;              to output
                       ;  +number{} : word number from start
                       ;              all space before and after
                       ;              this word (word exclude)
                       ;  +number*} : word number from start
                       ;              all space after this
                       ;              word to output with word
                       ;  +number{* : word number from start
                       ;              all space before this
                       ;              word to output with word
                       ;  #         : sum of words to output
                       ;  *         : sum of delimiters to output
                       ;  /word     : number of word to output
                       ;
                       ;[E]
                       ;  with errorlevel output
                       ;  IfErrors:
                       ;     $var=1  delimiter not found
                       ;     $var=2  no such word number
                       ;     $var=3  syntax error (Use: +1,-1},#,*,/word,...)
                       ;[]
                       ;  no errorlevel output (default)
                       ;  If some errors found then (result=input string)
                       ;
    $var               ;output (result)

Notes:

- Accepted numbers 1,01,001,...

## Examples

### Find word by number

    Section
        \${WordFindS} "C:\\io.sys C:\\Program Files C:\\WINDOWS" " C:\\" "-02" $R0
        ; $R0="Program Files"
    SectionEnd

### Delimiter exclude

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" "sys" "-2}" $R0
        ; $R0=" C:\\logo.sys C:\\WINDOWS"
    SectionEnd

### Sum of words

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " C:\\" "#" $R0
        ; $R0="3"
    SectionEnd

### Sum of delimiters

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" "sys" "*" $R0
        ; $R0="2"
    SectionEnd

### Find word number

    Section
        \${WordFindS} "C:\\io.sys C:\\Program Files C:\\WINDOWS" " " "/Files" $R0
        ; $R0="3"
    SectionEnd

### }}

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "+2}}" $R0
        ; $R0=" C:\\WINDOWS"
    SectionEnd

### {}

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "+2{}" $R0
        ; $R0="C:\\io.sys C:\\WINDOWS"
    SectionEnd

### *}

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" " " "+2*}" $R0
        ; $R0="C:\\logo.sys C:\\WINDOWS"
    SectionEnd

### Get parent directory

    Section
        StrCpy $R0 "C:\\Program Files\\NSIS\\NSIS.chm"
    ;               "C:\\Program Files\\NSIS\\Include\\"
    ;               "C:\\\\Program Files\\\\NSIS\\\\NSIS.chm"

        \${WordFindS} "$R0" "\\" "-2{*" $R0
        ; $R0="C:\\Program Files\\NSIS"
        ;     "C:\\\\Program Files\\\\NSIS"
    SectionEnd

### Coordinates

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" ":\\lo" "E+1{" $R0
        ; $R0="C:\\io.sys C"
        IfErrors end

        StrLen $0 $R0             ; $0 = Start position of word (11)
        StrLen $1 ':\\lo'          ; $1 = Word length (4)
        ; StrCpy $R0 $R1 $1 $0    ; $R0 = :\\lo

        end:
    SectionEnd

### With errorlevel output

    Section
        \${WordFindS} "[string]" "[delimiter]" "E[options]" $R0

        IfErrors 0 end
        StrCmp $R0 1 0 +2       ; errorlevel 1?
        MessageBox MB_OK 'delimiter not found' IDOK end
        StrCmp $R0 2 0 +2       ; errorlevel 2?
        MessageBox MB_OK 'no such word number' IDOK end
        StrCmp $R0 3 0 +2       ; errorlevel 3?
        MessageBox MB_OK 'syntax error'

        end:
    SectionEnd

### Without errorlevel output

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys" "_" "+1" $R0

        ; $R0="C:\\io.sys C:\\logo.sys" (error: delimiter "_" not found)
    SectionEnd

### If found

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys" ":\\lo" "E+1{" $R0

        IfErrors notfound found
        found:
        MessageBox MB_OK 'Found' IDOK end
        notfound:
        MessageBox MB_OK 'Not found'

        end:
    SectionEnd

### If found 2

    Section
        \${WordFindS} "C:\\io.sys C:\\logo.sys" ":\\lo" "+1{" $R0

        StrCmp $R0 "C:\\io.sys C:\\logo.sys" notfound found        ; error?
        found:
        MessageBox MB_OK 'Found' IDOK end
        notfound:
        MessageBox MB_OK 'Not found'

        end:
    SectionEnd

### To accept one word in string if delimiter not found

    Section
        StrCpy $0 'OneWord'
        StrCpy $1 1

        loop:
        \${WordFindS} "$0" " " "E+$1" $R0
        IfErrors 0 code
        StrCmp $1$R0 11 0 error
        StrCpy $R0 $0
        goto end

        code:
        ; ...
        IntOp $1 $1 + 1
        goto loop

        error:
        StrCpy $1 ''
        StrCpy $R0 ''

        end:
        ; $R0="OneWord"
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Ye=`# \${WordInsert}

Insert word in string.

## Syntax

    \${WordInsert} "[string]" "[delimiter]" "[word]" "[E][options]" $var

    "[string]"          ;[string]
                        ;  input string
    "[delimiter]"       ;[delimiter]
                        ;  one or several symbols
    "[word]"            ;[word]
                        ;  word to insert
    "[E][options]"      ;[options]
                        ;  +number  : word number from start
                        ;  -number  : word number from end
                        ;
                        ;[E]
                        ;  with errorlevel output
                        ;  IfErrors:
                        ;     $var=1  delimiter is empty
                        ;     $var=2  wrong word number
                        ;     $var=3  syntax error (Use: +1,-1)
                        ;[]
                        ;  no errorlevel output (default)
                        ;  If some errors found then (result=input string)
                        ;
    $var                ;output (result)

## Examples

### Example 1

    Section
        \${WordInsert} "C:\\io.sys C:\\WINDOWS" " " "C:\\logo.sys" "-2" $R0
        ; $R0="C:\\io.sys C:\\logo.sys C:\\WINDOWS"
    SectionEnd

### Example 2

    Section
        \${WordInsert} "C:\\io.sys" " " "C:\\WINDOWS" "+2" $R0
        ; $R0="C:\\io.sys C:\\WINDOWS"
    SectionEnd

### Example (3)

    Section
        \${WordInsert} "" " " "C:\\WINDOWS" "+1" $R0
        ; $R0="C:\\WINDOWS "
    SectionEnd

### With errorlevel output

    Section
        \${WordInsert} "C:\\io.sys C:\\logo.sys" " " "C:\\logo.sys" "E+4" $R0
        ; $R0="2" (wrong word number "+4")

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var ze=`# \${WordInsertS}

Insert word in string.

## Syntax

    \${WordInsertS} "[string]" "[delimiter]" "[word]" "[E][options]" $var

    "[string]"          ;[string]
                        ;  input string
    "[delimiter]"       ;[delimiter]
                        ;  one or several symbols
    "[word]"            ;[word]
                        ;  word to insert
    "[E][options]"      ;[options]
                        ;  +number  : word number from start
                        ;  -number  : word number from end
                        ;
                        ;[E]
                        ;  with errorlevel output
                        ;  IfErrors:
                        ;     $var=1  delimiter is empty
                        ;     $var=2  wrong word number
                        ;     $var=3  syntax error (Use: +1,-1)
                        ;[]
                        ;  no errorlevel output (default)
                        ;  If some errors found then (result=input string)
                        ;
    $var                ;output (result)

## Examples

### Example 1

    Section
        \${WordInsertS} "C:\\io.sys C:\\WINDOWS" " " "C:\\logo.sys" "-2" $R0
        ; $R0="C:\\io.sys C:\\logo.sys C:\\WINDOWS"
    SectionEnd

### Example 2

    Section
        \${WordInsertS} "C:\\io.sys" " " "C:\\WINDOWS" "+2" $R0
        ; $R0="C:\\io.sys C:\\WINDOWS"
    SectionEnd

### Example (3)

    Section
        \${WordInsertS} "" " " "C:\\WINDOWS" "+1" $R0
        ; $R0="C:\\WINDOWS "
    SectionEnd

### With errorlevel output

    Section
        \${WordInsertS} "C:\\io.sys C:\\logo.sys" " " "C:\\logo.sys" "E+4" $R0
        ; $R0="2" (wrong word number "+4")

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var qe=`# \${WordReplace}

Replace or delete word from string.

## Syntax

    \${WordReplace} "[string]" "[word1]" "[word2]" "[E][options]" $var

    "[string]"         ;[string]
                       ;  input string
    "[word1]"          ;[word1]
                       ;  word to replace or delete
    "[word2]"          ;[word2]
                       ;  replace with (if empty delete)
    "[E][options]"     ;[options]
                       ;  +number  : word number from start
                       ;  -number  : word number from end
                       ;  +number* : word number from start multiple-replace
                       ;  -number* : word number from end multiple-replace
                       ;  +        : replace all results
                       ;  +*       : multiple-replace all results
                       ;  {        : if exists replace all delimiters
                       ;               from left edge
                       ;  }        : if exists replace all delimiters
                       ;               from right edge
                       ;  {}       : if exists replace all delimiters
                       ;               from edges
                       ;  {*       : if exists multiple-replace all
                       ;               delimiters from left edge
                       ;  }*       : if exists multiple-replace all
                       ;               delimiters from right edge
                       ;  {}*      : if exists multiple-replace all
                       ;               delimiters from edges
                       ;
                       ;[E]
                       ;  with errorlevel output
                       ;  IfErrors:
                       ;     $var=1  word to replace not found
                       ;     $var=2  no such word number
                       ;     $var=3  syntax error (Use: +1,-1,+1*,-1*,+,+*,{},{}*)
                       ;[]
                       ;  no errorlevel output (default)
                       ;  If some errors found then (result=input string)
                       ;
    $var               ;output (result)

## Examples

### replace

    Section
        \${WordReplace} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" "SYS" "bmp" "+2" $R0
        ; $R0="C:\\io.sys C:\\logo.bmp C:\\WINDOWS"
    SectionEnd

### delete

    Section
        \${WordReplace} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" "SYS" "" "+" $R0
        ; $R0="C:\\io. C:\\logo. C:\\WINDOWS"
    SectionEnd

### multiple-replace 1

    Section
        \${WordReplace} "C:\\io.sys      C:\\logo.sys   C:\\WINDOWS" " " " " "+1*" $R0
        ; +1* or +2* or +3* or +4* or +5* or +6*
        ; $R0="C:\\io.sys C:\\logo.sys   C:\\WINDOWS"
    SectionEnd

### multiple-replace 2

    Section
        \${WordReplace} "C:\\io.sys C:\\logo.sysSYSsys C:\\WINDOWS" "sys" "bmp" "+*" $R0
        ; $R0="C:\\io.bmp C:\\logo.bmp C:\\WINDOWS"
    SectionEnd

### multiple-replace 3

    Section
        \${WordReplace} "sysSYSsysC:\\io.sys C:\\logo.sys C:\\WINDOWSsysSYSsys" "sys" "|" "{}*" $R0
        ; $R0="|C:\\io.sys C:\\logo.sys C:\\WINDOWS|"
    SectionEnd

### With errorlevel output

    Section
        \${WordReplace} "C:\\io.sys C:\\logo.sys" "sys" "bmp" "E+3" $R0
        ; $R0="2" (no such word number "+3")

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var je=`# \${WordReplaceS}

Replace or delete word from string, case sensitive.

## Syntax

    \${WordReplaceS} "[string]" "[word1]" "[word2]" "[E][options]" $var

    "[string]"         ;[string]
                       ;  input string
    "[word1]"          ;[word1]
                       ;  word to replace or delete
    "[word2]"          ;[word2]
                       ;  replace with (if empty delete)
    "[E][options]"     ;[options]
                       ;  +number  : word number from start
                       ;  -number  : word number from end
                       ;  +number* : word number from start multiple-replace
                       ;  -number* : word number from end multiple-replace
                       ;  +        : replace all results
                       ;  +*       : multiple-replace all results
                       ;  {        : if exists replace all delimiters
                       ;               from left edge
                       ;  }        : if exists replace all delimiters
                       ;               from right edge
                       ;  {}       : if exists replace all delimiters
                       ;               from edges
                       ;  {*       : if exists multiple-replace all
                       ;               delimiters from left edge
                       ;  }*       : if exists multiple-replace all
                       ;               delimiters from right edge
                       ;  {}*      : if exists multiple-replace all
                       ;               delimiters from edges
                       ;
                       ;[E]
                       ;  with errorlevel output
                       ;  IfErrors:
                       ;     $var=1  word to replace not found
                       ;     $var=2  no such word number
                       ;     $var=3  syntax error (Use: +1,-1,+1*,-1*,+,+*,{},{}*)
                       ;[]
                       ;  no errorlevel output (default)
                       ;  If some errors found then (result=input string)
                       ;
    $var               ;output (result)

## Examples

### replace

    Section
        \${WordReplaceS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" "SYS" "bmp" "+2" $R0
        ; $R0="C:\\io.sys C:\\logo.bmp C:\\WINDOWS"
    SectionEnd

### delete

    Section
        \${WordReplaceS} "C:\\io.sys C:\\logo.sys C:\\WINDOWS" "SYS" "" "+" $R0
        ; $R0="C:\\io. C:\\logo. C:\\WINDOWS"
    SectionEnd

### multiple-replace 1

    Section
        \${WordReplaceS} "C:\\io.sys      C:\\logo.sys   C:\\WINDOWS" " " " " "+1*" $R0
        ; +1* or +2* or +3* or +4* or +5* or +6*
        ; $R0="C:\\io.sys C:\\logo.sys   C:\\WINDOWS"
    SectionEnd

### multiple-replace 2

    Section
        \${WordReplaceS} "C:\\io.sys C:\\logo.sysSYSsys C:\\WINDOWS" "sys" "bmp" "+*" $R0
        ; $R0="C:\\io.bmp C:\\logo.bmp C:\\WINDOWS"
    SectionEnd

### multiple-replace 3

    Section
        \${WordReplaceS} "sysSYSsysC:\\io.sys C:\\logo.sys C:\\WINDOWSsysSYSsys" "sys" "|" "{}*" $R0
        ; $R0="|C:\\io.sys C:\\logo.sys C:\\WINDOWS|"
    SectionEnd

### With errorlevel output

    Section
        \${WordReplaceS} "C:\\io.sys C:\\logo.sys" "sys" "bmp" "E+3" $R0
        ; $R0="2" (no such word number "+3")

        IfErrors 0 noerrors
        MessageBox MB_OK 'Errorlevel=$R0' IDOK end

        noerrors:
        MessageBox MB_OK 'No errors'

        end:
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
`;var Ze=`# \${DisableX64FSRedirection}

Disables file system redirection.

## Syntax

    \${DisableX64FSRedirection}

## Example

    SetOutPath $SYSDIR
    \${DisableX64FSRedirection}
    File some.dll # extracts to C:\\Windows\\System32

## Credits

*unknown*
`;var Je=`# \${EnableX64FSRedirection}

Enables file system redirection.

## Syntax

    \${EnableX64FSRedirection}

## Example

    SetOutPath $SYSDIR
    \${EnableX64FSRedirection}
    File some.dll # extracts to C:\\Windows\\SysWOW64

## Credits

*unknown*
`;var Qe=`# \${IsWow64}

Checks if the installer is a 32-bit application running on a 64-bit OS. Requires [LogicLib][1].

## Syntax

    logic_lib_statement \${IsWow64}

## Example

    \${If} \${IsWow64}
        MessageBox MB_OK "running on x64"
    \${EndIf}

## Credits

*unknown*

[1]: https://github.com/NSIS-Handbook/Documentation/tree/master/Includes/LogicLib
`;var nt=`# \${RunningX64}

Checks if the installer is running on x64. Requires [LogicLib][1].

## Syntax

    logic_lib_statement \${RunningX64}

## Example

    \${If} \${RunningX64}
        MessageBox MB_OK "running on x64"
    \${EndIf}

## Credits

*unknown*

[1]: https://github.com/NSIS-Handbook/Documentation/tree/master/Includes/LogicLib
`;var dl={BannerTrimPath:{name:"${BannerTrimPath}",content:t},DirState:{name:"${DirState}",content:o},DriveSpace:{name:"${DriveSpace}",content:i},GetBaseName:{name:"${GetBaseName}",content:r},GetDrives:{name:"${GetDrives}",content:s},GetExeName:{name:"${GetExeName}",content:a},GetExePath:{name:"${GetExePath}",content:l},GetFileAttributes:{name:"${GetFileAttributes}",content:d},GetFileExt:{name:"${GetFileExt}",content:c},GetFileName:{name:"${GetFileName}",content:m},GetFileVersion:{name:"${GetFileVersion}",content:u},GetOptions:{name:"${GetOptions}",content:f},GetOptionsS:{name:"${GetOptionsS}",content:p},GetParameters:{name:"${GetParameters}",content:h},GetParent:{name:"${GetParent}",content:S},GetRoot:{name:"${GetRoot}",content:$},GetSize:{name:"${GetSize}",content:g},GetTime:{name:"${GetTime}",content:I},Locate:{name:"${Locate}",content:b},RefreshShellIcons:{name:"${RefreshShellIcons}",content:y}},cl={AndIf:{name:"${AndIf}",content:x},AndIfNot:{name:"${AndIfNot}",content:E},AndUnless:{name:"${AndUnless}",content:w},Break:{name:"${Break}",content:R},Case:{name:"${Case}",content:C},CaseElse:{name:"${CaseElse}",content:v},Continue:{name:"${Continue}",content:N},Default:{name:"${Default}",content:F},Do:{name:"${Do}",content:T},DoUntil:{name:"${DoUntil}",content:D},DoWhile:{name:"${DoWhile}",content:A},Else:{name:"${Else}",content:_},ElseIf:{name:"${ElseIf}",content:W},ElseIfNot:{name:"${ElseIfNot}",content:M},ElseUnless:{name:"${ElseUnless}",content:O},EndIf:{name:"${EndIf}",content:P},EndSelect:{name:"${EndSelect}",content:L},EndSwitch:{name:"${EndSwitch}",content:B},ExitDo:{name:"${ExitDo}",content:k},ExitFor:{name:"${ExitFor}",content:U},ExitWhile:{name:"${ExitWhile}",content:G},For:{name:"${For}",content:H},ForEach:{name:"${ForEach}",content:K},If:{name:"${If}",content:V},IfCmd:{name:"${IfCmd}",content:X},IfNot:{name:"${IfNot}",content:Y},IfNotThen:{name:"${IfNotThen}",content:z},IfThen:{name:"${IfThen}",content:q},Loop:{name:"${Loop}",content:j},LoopUntil:{name:"${LoopUntil}",content:Z},LoopWhile:{name:"${LoopWhile}",content:J},OrIf:{name:"${OrIf}",content:Q},OrIfNot:{name:"${OrIfNot}",content:nn},OrUnless:{name:"${OrUnless}",content:en},Select:{name:"${Select}",content:tn},Switch:{name:"${Switch}",content:on},Unless:{name:"${Unless}",content:rn},While:{name:"${While}",content:sn}},ml={MementoSection:{name:"${MementoSection}",content:an},MementoSectionDone:{name:"${MementoSectionDone}",content:ln},MementoSectionEnd:{name:"${MementoSectionEnd}",content:dn},MementoSectionRestore:{name:"${MementoSectionRestore}",content:cn},MementoSectionSave:{name:"${MementoSectionSave}",content:mn},MementoUnselectedSection:{name:"${MementoUnselectedSection}",content:un}},ul={StrCase:{name:"${StrCase}",content:fn},StrClb:{name:"${StrClb}",content:pn},StrIOToNSIS:{name:"${StrIOToNSIS}",content:hn},StrLoc:{name:"${StrLoc}",content:Sn},StrNSISToIO:{name:"${StrNSISToIO}",content:$n},StrRep:{name:"${StrRep}",content:gn},StrSort:{name:"${StrSort}",content:In},StrStr:{name:"${StrStr}",content:bn},StrStrAdv:{name:"${StrStrAdv}",content:yn},StrTok:{name:"${StrTok}",content:xn},StrTrimNewLines:{name:"${StrTrimNewLines}",content:En}},fl={ConfigRead:{name:"${ConfigRead}",content:wn},ConfigReadS:{name:"${ConfigReadS}",content:Rn},ConfigWrite:{name:"${ConfigWrite}",content:Cn},ConfigWriteS:{name:"${ConfigWriteS}",content:vn},FileJoin:{name:"${FileJoin}",content:Nn},FileReadFromEnd:{name:"${FileReadFromEnd}",content:Fn},FileRecode:{name:"${FileRecode}",content:Tn},LineFind:{name:"${LineFind}",content:Dn},LineRead:{name:"${LineRead}",content:An},LineSum:{name:"${LineSum}",content:_n},TextCompare:{name:"${TextCompare}",content:Wn},TextCompareS:{name:"${TextCompareS}",content:Mn},TrimNewLines:{name:"${TrimNewLines}",content:On}},pl={AtLeastServicePack:{name:"${AtLeastServicePack}",content:Ln},AtLeastWin10:{name:"${AtLeastWin10}",content:Gn},AtLeastWin2000:{name:"${AtLeastWin2000}",content:Vn},AtLeastWin2003:{name:"${AtLeastWin2003}",content:Xn},AtLeastWin2008:{name:"${AtLeastWin2008}",content:Yn},AtLeastWin2008R2:{name:"${AtLeastWin2008R2}",content:zn},AtLeastWin7:{name:"${AtLeastWin7}",content:Bn},AtLeastWin8_1:{name:"${AtLeastWin8.1}",content:kn},AtLeastWin8:{name:"${AtLeastWin8}",content:Un},AtLeastWin95:{name:"${AtLeastWin95}",content:Hn},AtLeastWin98:{name:"${AtLeastWin98}",content:Kn},AtLeastWinME:{name:"${AtLeastWinME}",content:qn},AtLeastWinNT4:{name:"${AtLeastWinNT4}",content:jn},AtLeastWinVista:{name:"${AtLeastWinVista}",content:Zn},AtLeastWinXP:{name:"${AtLeastWinXP}",content:Jn},AtMostServicePack:{name:"${AtMostServicePack}",content:Qn},AtMostWin10:{name:"${AtMostWin10}",content:oe},AtMostWin2000:{name:"${AtMostWin2000}",content:se},AtMostWin2003:{name:"${AtMostWin2003}",content:ae},AtMostWin2008:{name:"${AtMostWin2008}",content:le},AtMostWin2008R2:{name:"${AtMostWin2008R2}",content:de},AtMostWin2012:{name:"${AtMostWin2012}",content:ce},AtMostWin2012R2:{name:"${AtMostWin2012R2}",content:me},AtMostWin7:{name:"${AtMostWin7}",content:ne},AtMostWin8_1:{name:"${AtMostWin8.1}",content:ee},AtMostWin8:{name:"${AtMostWin8}",content:te},AtMostWin95:{name:"${AtMostWin95}",content:ie},AtMostWin98:{name:"${AtMostWin98}",content:re},AtMostWinME:{name:"${AtMostWinME}",content:ue},AtMostWinNT4:{name:"${AtMostWinNT4}",content:fe},AtMostWinVista:{name:"${AtMostWinVista}",content:pe},AtMostWinXP:{name:"${AtMostWinXP}",content:he},IsDomainController:{name:"${IsDomainController}",content:Pn},IsNT:{name:"${IsNT}",content:Se},IsServerOS:{name:"${IsServerOS}",content:$e},IsServicePack:{name:"${IsServicePack}",content:ge},IsWin10:{name:"${IsWin10}",content:xe},IsWin2000:{name:"${IsWin2000}",content:Re},IsWin2003:{name:"${IsWin2003}",content:Ce},IsWin2008:{name:"${IsWin2008}",content:ve},IsWin2008R2:{name:"${IsWin2008R2}",content:Ne},IsWin2012:{name:"${IsWin2012}",content:Fe},IsWin2012R2:{name:"${IsWin2012R2}",content:Te},IsWin7:{name:"${IsWin7}",content:Ie},IsWin8_1:{name:"${IsWin8.1}",content:be},IsWin8:{name:"${IsWin8}",content:ye},IsWin95:{name:"${IsWin95}",content:Ee},IsWin98:{name:"${IsWin98}",content:we},IsWinME:{name:"${IsWinME}",content:De},IsWinNT4:{name:"${IsWinNT4}",content:Ae},IsWinVista:{name:"${IsWinVista}",content:_e},IsWinXP:{name:"${IsWinXP}",content:We}},hl={StrFilter:{name:"${StrFilter}",content:Me},StrFilterS:{name:"${StrFilterS}",content:Oe},VersionCompare:{name:"${VersionCompare}",content:Pe},VersionConvert:{name:"${VersionConvert}",content:Le},WordAdd:{name:"${WordAdd}",content:Be},WordAddS:{name:"${WordAddS}",content:ke},WordFind:{name:"${WordFind}",content:Ue},WordFind2X:{name:"${WordFind2X}",content:Ge},WordFind2XS:{name:"${WordFind2XS}",content:He},WordFind3X:{name:"${WordFind3X}",content:Ke},WordFind3XS:{name:"${WordFind3XS}",content:Ve},WordFindS:{name:"${WordFindS}",content:Xe},WordInsert:{name:"${WordInsert}",content:Ye},WordInsertS:{name:"${WordInsertS}",content:ze},WordReplace:{name:"${WordReplace}",content:qe},WordReplaceS:{name:"${WordReplaceS}",content:je}},Sl={DisableX64FSRedirection:{name:"${DisableX64FSRedirection}",content:Ze},EnableX64FSRedirection:{name:"${EnableX64FSRedirection}",content:Je},IsWow64:{name:"${IsWow64}",content:Qe},RunningX64:{name:"${RunningX64}",content:nt}};var tt=`# .onGUIEnd

This callback is called right after the installer window closes. Use it to free any user interface related plug-ins if needed.
`;var ot=`# .onGUIInit

This callback will be called just before the first page is loaded and the installer dialog is shown, allowing you to tweak the user interface.

## Example

    !include "WinMessages.nsh"

    Function .onGUIInit
        # 1028 is the id of the branding text control
        GetDlgItem $R0 $HWNDPARENT 1028
        CreateFont $R1 "Tahoma" 10 700
        SendMessage $R0 \${WM_SETFONT} $R1 0
        # set background color to white and text color to red
        SetCtlColors $R0 FFFFFF FF0000
    FunctionEnd
`;var it=`# .onInit

This callback will be called when the installer is nearly finished initializing. If the \`.onInit\` function calls [\`Abort\`][1], the installer will quit instantly.

## Example

    Function .onInit
        MessageBox MB_YESNO "This will install. Continue?" IDYES NoAbort
        Abort ; causes installer to quit.
        NoAbort:
    FunctionEnd

or:

    Function .onInit
        ReadINIStr $INSTDIR $WINDIR\\wincmd.ini Configuration InstallDir
        StrCmp $INSTDIR "" 0 NoAbort
        MessageBox MB_OK "Windows Commander not found. Unable to get install path."
        Abort ; causes installer to quit.
        NoAbort:
    FunctionEnd

[1]: ../Commands/Abort.md
`;var rt=`# .onInstFailed

This callback is called when the user hits the 'cancel' button after the install has failed (if it could not extract a file, or the install script used the Abort command).

## Example

    Function .onInstFailed
        MessageBox MB_OK "Better luck next time."
    FunctionEnd
`;var st=`# .onInstSuccess

This callback is called when the install was successful, right before the install window closes (which may be after the user clicks 'Close' if [\`AutoCloseWindow\`][1] or [\`SetAutoClose\`][2] is set to false).

## Example

    Function .onInstSuccess
        MessageBox MB_YESNO "Congrats, it worked. View readme?" IDNO NoReadme
        Exec notepad.exe ; view readme or whatever, if you want.
        NoReadme:
    FunctionEnd

[1]: ../Commands/AutoCloseWindow.md
[2]: ../Commands/SetAutoClose.md
`;var at=`# .onMouseOverSection

This callback is called whenever the mouse position over the sections tree has changed. This allows you to set a description for each section for example. The section id on which the mouse is over currently is stored, temporarily, in $0.

## Example

    Function .onMouseOverSection
        FindWindow $R0 "#32770" "" $HWNDPARENT
        GetDlgItem $R0 $R0 1043 ; description item (must be added to the UI)

        StrCmp $0 0 "" +2
        SendMessage $R0 \${WM_SETTEXT} 0 "STR:first section description"

        StrCmp $0 1 "" +2
        SendMessage $R0 \${WM_SETTEXT} 0 "STR:second section description"
    FunctionEnd
`;var lt=`# .onRebootFailed

This callback is called if [\`Reboot\`][1] fails. [\`WriteUninstaller\`][2], plug-ins, [\`File\`][3] and [\`WriteRegBin\`][4] should not be used in this callback.

## Example

    Function .onRebootFailed
        MessageBox MB_OK|MB_ICONSTOP "Reboot failed. Please reboot manually." /SD IDOK
    FunctionEnd

[1]: ../Commands/Reboot.md
[2]: ../Commands/WriteUninstaller.md
[3]: ../Commands/File.md
[4]: ../Commands/WriteRegBin.md
`;var dt=`# .onSelChange

Called when the selection changes on the component page. Useful for using with [\`SectionSetFlags\`][1] and [\`SectionGetFlags\`][2].

Selection changes include both section selection and installation type change.

[1]: ../Commands/SectionSetFlags.md
[2]: ../Commands/SectionGetFlags.md
`;var ct=`# .onUserAbort

This callback is called when the user hits the 'cancel' button, and the install hasn't already failed. If this function calls [\`Abort\`][1], the install will not be aborted.

Example:

    Function .onUserAbort
        MessageBox MB_YESNO "Abort install?" IDYES NoCancelAbort
        Abort ; causes installer to not quit.
        NoCancelAbort:
    FunctionEnd

[1]: ../Commands/Abort.md
`;var mt=`# .onVerifyInstDir

This callback enables control over whether or not an installation path is valid for your installer. This code will be called every time the user changes the install directory, so it shouldn't do anything crazy with [\`MessageBox\`][1] or the likes. If this function calls [\`Abort\`][2], the installation path in [\`$INSTDIR\`][3] is deemed invalid.

Example:

    Function .onVerifyInstDir
        IfFileExists $INSTDIR\\Winamp.exe PathGood
        Abort ; if $INSTDIR is not a winamp directory, don't let us install there
        PathGood:
    FunctionEnd

[1]: ../Commands/MessageBox.md
[2]: ../Commands/Abort.md
[3]: ../Variables/INSTDIR.md
`;var ut=`# un.onGUIEnd

This callback is called right after the uninstaller window closes. Use it to free any user interface related plug-ins if needed.
`;var ft=`# un.onGUIInit

This callback will be called just before the first page is loaded and the installer dialog is shown, allowing you to tweak the user interface.

## Example

    !include "WinMessages.nsh"

    Function un.onGUIInit
        # 1028 is the id of the branding text control
        GetDlgItem $R0 $HWNDPARENT 1028
        CreateFont $R1 "Tahoma" 10 700
        SendMessage $R0 \${WM_SETFONT} $R1 0
        # set background color to white and text color to red
        SetCtlColors $R0 FFFFFF FF0000
    FunctionEnd
`;var pt=`# un.onInit

This callback will be called when the uninstaller is nearly finished initializing. If the \`un.onInit\` function calls [\`Abort\`][2], the uninstaller will quit instantly. Note that this function can verify and/or modify [\`$INSTDIR\`][3] if necessary.

## Example

    Function un.onInit
        MessageBox MB_YESNO "This will uninstall. Continue?" IDYES NoAbort
        Abort ; causes uninstaller to quit.
        NoAbort:
    FunctionEnd

or:

    Function un.onInit
        IfFileExists $INSTDIR\\myfile.exe found
        Messagebox MB_OK "Uninstall path incorrect"
        Abort
        found:
    FunctionEnd

[1]: ../Commands/Abort.md
[2]: ../Variables/INSTDIR.md
`;var ht=`# un.onRebootFailed

This callback is called if [\`Reboot\`][1] fails. [\`WriteUninstaller\`][2], plug-ins, [\`File\`][3] and [\`WriteRegBin\`][4] should not be used in this callback.

## Example

    Function un.onRebootFailed
        MessageBox MB_OK|MB_ICONSTOP "Reboot failed. Please reboot manually." /SD IDOK
    FunctionEnd

[1]: ../Commands/Reboot.md
[2]: ../Commands/WriteUninstaller.md
[3]: ../Commands/File.md
[4]: ../Commands/WriteRegBin.md
`;var St=`# un.onSelChange

Called when the selection changes on the component page. Useful for using with [\`SectionSetFlags\`][1] and [\`SectionGetFlags\`][2].

Selection changes include both section selection and installation type change.

[1]: ../Commands/SectionSetFlags.md
[2]: ../Commands/SectionGetFlags.md
`;var $t=`# un.onUninstFailed

This callback is called when the user hits the 'cancel' button after the uninstall has failed (if it used the [\`Abort\`][1] command or otherwise failed).

## Example

    Function un.onUninstFailed
        MessageBox MB_OK "Better luck next time."
    FunctionEnd

[1]: ../Commands/Abort.md
`;var gt=`# un.onUninstSuccess

This callback is called when the uninstall was successful, right before the install window closes (which may be after the user clicks 'Close' if [\`SetAutoClose\`][1] is set to false)..

## Example

    Function un.onUninstSuccess
        MessageBox MB_OK "Congrats, it's gone."
    FunctionEnd

[1]: ../Commands/SetAutoClose.md
`;var It=`# un.onUserAbort

This callback is called when the user hits the 'cancel' button and the uninstall hasn't already failed. If this function calls [\`Abort\`][1], the install will not be aborted.

## Example

    Function un.onUserAbort
        MessageBox MB_YESNO "Abort uninstall?" IDYES NoCancelAbort
        Abort ; causes uninstaller to not quit.
        NoCancelAbort:
    FunctionEnd

[1]: ../Commands/Abort.md
`;var $l={onGUIEnd:{name:".onGUIEnd",content:tt},onGUIInit:{name:".onGUIInit",content:ot},onInit:{name:".onInit",content:it},onInstFailed:{name:".onInstFailed",content:rt},onInstSuccess:{name:".onInstSuccess",content:st},onMouseOverSection:{name:".onMouseOverSection",content:at},onRebootFailed:{name:".onRebootFailed",content:lt},onSelChange:{name:".onSelChange",content:dt},onUserAbort:{name:".onUserAbort",content:ct},onVerifyInstDir:{name:".onVerifyInstDir",content:mt},unOnGUIEnd:{name:"un.onGUIEnd",content:ut},unOnGUIInit:{name:"un.onGUIInit",content:ft},unOnInit:{name:"un.onInit",content:pt},unOnRebootFailed:{name:"un.onRebootFailed",content:ht},unOnSelChange:{name:"un.onSelChange",content:St},unOnUninstFailed:{name:"un.onUninstFailed",content:$t},unOnUninstSuccess:{name:"un.onUninstSuccess",content:gt},unOnUserAbort:{name:"un.onUserAbort",content:It}};var bt=`# !addincludedir

Adds another include directory to the include directories list. This list is searched when [\`!include\`](!include.md) is used. This list's initial value is \`\${NSISDIR}\\Include\` alone.

## Parameters

    directory

## Example

    !addincludedir ..\\include
    !include something.nsh

## History

Added in NSIS v2.0 Beta 1
`;var yt=`# !addplugindir

Causes the NSIS compiler to scan the given directory for plug-in DLLs.

## Parameters

    directory

## Example

    !addplugindir myplugin
    MyPlugin::SomeFunction

## History

Added in NSIS v2.0 Beta 1
`;var xt=`# !appendfile

Appends text to file. The text is written as ANSI (ACP) unless the file already has a BOM. Using \`/CHARSET\` will force a specific character encoding. \`$\\n\` will be translated to \`$\\r$\\n\` on Windows unless you specify \`/RawNL\`.

## Parameters

    [/CHARSET=ACP|OEM|CP#|UTF8[SIG]|UTF16<LE|BE>[BOM]] [/RawNL] file text file text

## Example

    !tempfile FILE
    !appendfile "\${FILE}" "XPStyle on$\\n"
    !appendfile "\${FILE}" "Name 'test'$\\n"
    !include "\${FILE}"
    !delfile "\${FILE}"
    !undef FILE

## History

Added in NSIS v2.11
`;var Et=`# !cd

This command will change the compiler to the new directory, \`new_path\`. \`new_path\` can be relative or absolute.

## Parameters

    new_path

## Example

    !cd ..\\more-scripts\\new

## History

Added in NSIS v1.4
`;var wt=`# !define

This command will add gflag to the global define list. This will have a similar effect as using the \`/D\` switch on the command line (the define only becomes effective after the \`!define\` command).
If \`/date\` or \`/utcdate\` are used, value will be passed into strftime and the result will be used as the value of gflag. strftime converts special symbols into certain parts of the current time or date. For example, %H will be converted into the current hour in 24-hour format. For a complete list of available symbols, search for strftime on [MSDN][1]. On POSIX, you can get the list by using man strftime.
If \`/math\` is used, the result of 'val1 OP val2', where OP may be +,-,*,&,|,^,/ or % , will be used as the value of gflag. Note that val1 AND val2 MUST be integer values!
If \`/file\` is used, the entire text file specified (including whitespace and newlines) will be read and stuffed into gflag.

## Parameters

    [/ifndef | /redef] ([/date|/utcdate] gflag [value]) | (/math gflag val1 OP val2) | (/file gflag filename.txt)

## Example

    !define USE_SOMETHING
    !define VERSION 1.2
    !define /date NOW "%H:%M:%S %d %b, %Y"
    !define /math RESULT 3 + 10
    !define /math REST 15 % \${RESULT}
    !define /file BUNCHASTUFF somesourcefile.cpp
    !define /redef USE_SOMETHING \${RESULT} ;redefine USE_SOMETHING

## History

Added in NSIS v1.1f

[1]: http://msdn.microsoft.com/
`;var Rt=`# !delfile

This command deletes a file on compile time.

## Parameters

    file

## Example

    !tempfile FILE
    !delfile "\${FILE}"
    !undef FILE

## History

Added in NSIS v2.11
`;var Ct=`# !echo

This command will echo a message to the user compiling the script.

## Parameters

    message

## Example

    !echo "hello world"

## History

Added in NSIS v2.0 Alpha 2
`;var vt=`# !else

This command allows to easily insert different code when different defines or macros are set. You can create blocks like [\`!ifdef\`][1]/\`!else\`/[\`!endif\`][2], [\`!ifdef\`][1]/\`!else\` [\`!ifdef\`][1]/\`!else\`/[\`!endif\`][2] etc.

## Parameters

    [if|ifdef|ifndef|ifmacrodef|ifmacrondef [...]]

## Example

    !ifdef VERSION
        OutFile installer-\${VERSION}.exe
    !else
        OutFile installer.exe
    !endif

## History

Added in NSIS v1.1f

[1]: !ifdef.md
[2]: !endif.md
`;var Nt=`# !endif

This command closes a block started with [\`!if\`][1], [\`!ifdef\`][2], [\`!ifndef\`][3], [\`!ifmacrodef\`][4] or [\`!ifmacrondef\`][5].

## Example

    !ifdef VERSION
        OutFile installer-\${VERSION}.exe
    !else
        OutFile installer.exe
    !endif

    !ifmacrodef MACRO
        DetailPrint "Macro defined" 
    !else
        DetailPrint "Macro not defined" 
    !endif

## History

Added in NSIS v1.1f

[1]: !if.md
[2]: !ifdef.md
[3]: !ifndef.md
[4]: !ifmacrodef.md
[5]: !ifmacrondef.md
`;var Ft=`# !error

This command will issue an error to the script compiler and will stop execution of the script. You can also add a message to this error.

## Parameters

    message

## Example

    !ifdef VERSION & NOVERSION
        !error "both VERSION and NOVERSION are defined"
    !endif

## History

Added in NSIS v1.1u
`;var Tt=`# !execute

This command will execute 'command' using a call to _CreateProcess()_. Unlike [\`!system\`][1], it does not use the command line processor, so input/output redirection and commands like 'cd', 'dir' and 'type' can not be used. \`!execute\` also ignores the return value of the executed command. Currently, the only known advantage of \`!execute\` over [\`!system\`][1] is that it does not give trouble when the current working directory is specified using UNC.
On POSIX platforms, \`!execute\` will use _system()_ just like [\`!system\`][1].

## Parameters

    command

## Example

    !execute '"%WINDIR%\\notepad.exe" "\${NSISDIR}\\license.txt"'

## History

Added in NSIS v2.01

[1]: !system.md
`;var Dt=`# !finalize

This option will execute 'command' using a call to _system()_ after the output EXE has been generated. You can typically use it to sign (Authenticode) your installer. If 'command' contains a '%1' it will be replaced by the executable filename.
On POSIX platforms, \`!execute\` will use _system()_ just like [\`!system\`][1].

## Parameters

    command

## Example

    !finalize 'sign.bat "%1" "Product Installer" http://example.com'

## History

Added in NSIS v3.0a0

[1]: !system.md
`;var At=`# !getdllversion

This is similar to [\`GetDLLVersionLocal\`][1], only it stores the version number in defines and can therefore be used anywhere, not just inside functions and sections.

## Parameters

    localfilename define_basename

## Example

    !getdllversion "$%windir%\\explorer.exe" expv_
    !echo "Explorer.exe version is \${expv_1}.\${expv_2}.\${expv_3}.\${expv_4}"

## History

Added in NSIS v3.0a0

[1]: GetDLLVersionLocal.md
`;var _t=`# !gettlbversion

Get the version information from a .TLB file.

## Parameters

    [/noerrors] [/packed] localfilename define_basename

## Example

    !gettlbversion /packed "$%WINDIR%\\System32\\stdole32.tlb" TLBVER_
    !echo "\${TLBVER_HIGH}.\${TLBVER_LOW}"

## History

Added in NSIS v3.03
`;var Wt=`# !if

This command, when paired with an [\`!endif\`][1] command, will tell the compiler whether or not to compile the lines in between the two lines. If value is non-zero, or the comparison of value and value2 depending on the operator results in true, the contained lines will be compiled. Otherwise, they will be skipped. op can be either \`==\` or \`!=\` (string comparison), \`<=\`, \`< >\` or \`>=\` (float comparison), \`&\` (bitwise AND comparison), \`&&\` or \`||\` (boolean comparison). If [!] is set, return value will be switched from true to false and vice versa.

## Parameters

    [!] value [op value2]

## Example

    !if 1 < 2
      !echo "1 is smaller than 2!!"
    !else if ! 3.1 > 1.99
      !error "this line should never appear"
    !else
      !error "neither should this"
    !endif

## History

Added in NSIS v2.15

[1]: !endif.md
`;var Mt=`# !ifdef

This command, when paired with an [\`!endif\`][1] command, will tell the compiler whether or not to compile the lines in between the two lines. If gflag is globally defined (using [\`!define\`][2] or the \`/D\` switch), then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as \`&\` (boolean and) or \`|\` (boolean or) along with more gflags -- precedence is simple, left to right.

## Parameters

    gflag [bcheck gflag [...]]]

## Example

    !define SOMETHING
    !ifdef SOMETHING
        !echo "SOMETHING is defined"
    !endif

    !undef SOMETHING
    !ifdef SOMETHING
        !echo "SOMETHING is defined" # will never be printed
    !endif

## History

Added in NSIS v1.1f

[1]: !endif.md
[2]: !define.md
`;var Ot=`# !ifmacrodef

This command, when paired with an [\`!endif\`][1] command, will tell the compiler whether or not to compile the lines in between the two lines. If the macro gflag exists, then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as \`&\` (boolean and) or \`|\` (boolean or) along with more gflags -- precedence is simple, left to right.

## Parameters

    gflag [bcheck gflag [...]]]

## Example

    !macro SomeMacro
    !macroend
    !ifmacrodef SomeMacro
      !echo "SomeMacro is defined"
    !endif

## History

Added in NSIS v2.0

[1]: !endif.md
`;var Pt=`# !ifmacrondef

The opposite of [\`!ifmacrodef\`][1]. The lines will be compiled when the macro gflag does not exist. This command, when paired with an [\`!endif\`][2] command, will tell the compiler whether or not to compile the lines in between the two lines. If the macro gflag exists, then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as \`&\` (boolean and) or \`|\` (boolean or) along with more gflags -- precedence is simple, left to right.

## Parameters

    gflag [bcheck gflag [...]]]

## Example

    !ifmacrondef SomeMacro
        !echo "SomeMacro is not defined"
    !endif

## History

Added in NSIS v2.0

[1]: !ifmacrodef.md
[2]: !endif.md
`;var Lt=`# !ifndef

The opposite of [\`!ifdef\`][1]. This command, when paired with an [\`!endif\`][2] command, will tell the compiler whether or not to compile the lines in between the two lines. If gflag is globally defined (using [\`!define\`][3] or the \`/D\` switch), then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as \`&\` (boolean and) or \`|\` (boolean or) along with more gflags -- precedence is simple, left to right.

## Parameters

    gflag [bcheck gflag [...]]]

## Example

    !define SOMETHING
    !ifdef SOMETHING
        !echo "SOMETHING is defined"
    !endif

    !undef SOMETHING
    !ifndef SOMETHING
        !echo "SOMETHING is not defined"
    !endif

## History

Added in NSIS v1.1f

[1]: !ifdef.md
[2]: !endif.md
[3]: !define.md
`;var Bt=`# !include

This command will include 'file' as if it was part of the original script. Note that if a file is included in another directory, the current directory is still where the script was compiled from (not where the included file resides). If the compiler can't find the file it will look for it in every include directory. See [\`!addincludedir\`][1] for more information. If the \`/NONFATAL\` switch is used and no files are found, a warning will be issued instead of an error.

## Parameters

    [/NONFATAL] file

## Example

    !include WinMessages.nsh
    !include Library.nsh
    !include C:\\MyConfig.nsi
    !include ..\\MyConfig.nsh
    !include /NONFATAL file_that_may_exist_or_not.nsh

## History

Added in NSIS v1.1d

[1]: !addincludedir.md
`;var kt=`# !insertmacro

Inserts the contents of a macro that was created with [\`!macro\`][1]. If the macro was created with parameters, then you must pass as many parameters to the macro as it requires.

## Parameters

    macro_name [parameter] [...]

## Example

    !macro Print text
        DetailPrint "\${text}"
    !macroend
    !insertmacro Print "some text"
    !insertmacro Print "some more text"

## History

Added in NSIS v1.8b3

[1]: !macro.md
`;var Ut=`# !macro

Creates a macro named 'macro_name'. All lines between the \`!macro\` and the [\`!macroend\`][1] will be saved. To insert the macro later on, use [\`!insertmacro\`][2]. \`!macro\` definitions can have one or more parameters defined. The parameters may be accessed the same way a [\`!define\`][3] would (e.g. \`\${PARAMNAME}\`) from inside the macro.

## Parameters

    \`macro_name [parameter] [...]\`

## Example

    !macro SomeMacro parm1 parm2 parm3
        DetailPrint "\${parm1}"
        MessageBox MB_OK "\${parm2}"
        File "\${parm3}"
    !macroend

## History

Added in NSIS v1.8b3

[1]: !macroend.md
[2]: !insertmacro.md
[3]: !define.md
`;var Gt=`# !macroend

Ends a macro that was started with [\`!macro\`][1].

## Example

    !macro SomeMacro parm1 parm2 parm3
        DetailPrint "\${parm1}"
        MessageBox MB_OK "\${parm2}"
        File "\${parm3}"
    !macroend

## History

Added in NSIS v1.8b3

[1]: !macro.md
`;var Ht=`# !makensis

This command will [\`!execute\`][1] a new instance of MakeNSIS with the parameters you specify.

## Parameters

    parameters [compare comparevalue | symbol]

## Example

    !makensis '-DGENERATEUNINST "\${__FILE__}"' = 0
    !system '"signtool" sign ...' = 0

## History

Added in NSIS v3.0b1

[1]: !execute.md
`;var Kt=`# !packhdr

This option makes the compiler use an external EXE packer (such as [Petite][1] or [UPX][2]) to compress the executable header. Specify a temporary file name (such as "temp.dat") and a command line (such as "C:\\program files\\upx\\upx -9 temp.dat") to compress the header.

## Parameters

    tempfile command

## Example

    !packhdr "$%TEMP%\\exehead.tmp" '"C:\\Program Files\\UPX\\upx.exe" "$%TEMP%\\exehead.tmp"'

## History

Added in NSIS v1.32

[1]: http://www.un4seen.com/petite/
[2]: http://upx.sourceforge.net/
`;var Vt=`# !pragma

The pragma commands allows you to change compiler features and behavior.

## Parameters

    /REGEDIT5 root_key subkey key_name value

## Example

    !pragma warning disable 9000 ; Disable warning about using "Setup.exe" as the name
    OutFile "Setup.exe"

## History

Added in NSIS v3.02

[1]: http://www.un4seen.com/petite/
[2]: http://upx.sourceforge.net/
`;var Xt=`# !searchparse

Parses source\\_string\\_or\\_file (which is treated as a string, or as a filename if \`/file\` is set), looking for substring\\_start. If substring\\_start is found, then OUTPUTSYMBOL1 is defined to the rest of the string (minus any other substring that may be found). Any number of OUTPUTSYMBOLx may be specified, and the final substring is optional.
If \`/noerrors\` is specified, matching less than the full number of strings is allowed (all OUTPUTSYMBOLx after the not-found substring will be ignored).
If \`/file\` is specified, the file is treated as a series of lines. The file is searched until all substrings are matched. If \`/noerrors\` is specified and not all strings are matched, the first line with the most symbols matched is used.

## Parameters

    [/ignorecase] [/noerrors] [/file] source_string_or_file substring_start OUTPUTSYMBOL1 [substring [OUTPUTSYMBOL2 [substring ...]]]

## Example

    # search filename.cpp for a line '#define APP_VERSION "2.5"' and set \${VER_MAJOR} to 2, \${VER_MINOR} to 5.
    !searchparse /file filename.cpp \`#define APP_VERSION "\` VER_MAJOR \`.\` VER_MINOR \`"\`

## History

Added in NSIS v2.39
`;var Yt=`# !searchreplace

Searches source\\_string, looking for searchfor and replacing all instances of it with replacewith. Unlike [\`!define\`][1], \`!searchreplace\` allows you to redefine symbol_out without warning or error.

## Parameters

    [/ignorecase] symbol_out source_string searchfor replacewith

## Example

    # defines \${blah} to "i like ponies"
    !searchreplace blah "i love ponies" "love" "like"

## History

Added in NSIS v2.42

[1]: !define.md
`;var zt=`# !system

This command will execute 'command' using a call to system(), and if the return value compared (using 'compare') to 'comparevalue' is false, execution will halt. 'compare' can be '<' or '>' or '<>' or '='.

## Parameters

    command [compare comparevalue]

## Example

    !system '"%WINDIR%\\notepad.exe" "\${NSISDIR}\\license.txt"'
    !system 'echo !define something > newinclude.nsh'
    !include newinclude.nsh
    !ifdef something
        !echo "something is defined"
    !endif

## History

Added in NSIS v1.1d
`;var qt=`# !tempfile

This command creates a temporary file. It puts its path into a define, named symbol.

## Parameters

    symbol

## Example

    !tempfile PACKHDRTEMP
    !packhdr "\${PACKHDRTEMP}" '"C:\\Program Files\\UPX\\upx.exe" "\${PACKHDRTEMP}"'
    !tempfile FILE
    !define /date DATE "%H:%M:%S %d %b, %Y"
    !system 'echo built on \${DATE} > "\${FILE}"'
    File /oname=build.txt "\${FILE}"
    !delfile "\${FILE}"
    !undef FILE
    !undef DATE

## History

Added in NSIS v2.11
`;var jt=`# !undef

Removes an item from the global define list. Note that \`\${SYMBOL}\` where SYMBOL is undefined will be translated to \`\${SYMBOL}\`.

## Parameters

    gflag

## Example

    !define SOMETHING
    !undef SOMETHING

## History

Added in NSIS v1.51
`;var Zt=`# !verbose

This command will set the level of verbosity. 4=all, 3=no script, 2=no info, 1=no warnings, 0=none.

Passing push will cause \`!verbose\` to push the current verbosity level on a special stack. Passing pop will cause \`!verbose\` to pop the current verbosity level from the same stack and use it.

## Parameters

    level | push | pop

## Example

    !verbose push
    !verbose 1
    !include WinMessages.nsh
    !verbose pop

## History

Added in NSIS v2.0 Alpha 2
`;var Jt=`# !warning

This command will issue a warning to the script compiler. You can also add a message to this warning.

## Parameters

    [message]

## Example

    !ifdef USE_DANGEROUS_STUFF
        !warning "using dangerous stuff"
    !endif

## History

Added in NSIS v1.1u
`;var Qt=`# Abort

Cancels the install, stops execution of script, and displays user_message in the status display. Note: you can use this from [Callback functions][1] to do special things. [Page callbacks][2] also uses Abort for special purposes.

## Parameters

    user_message

## Example

    Abort
    Abort "can't install"

## History

Added in NSIS v1.1t

[1]: http://nsis.sourceforge.net/Docs/Chapter4.html#4.7.2
[2]: http://nsis.sourceforge.net/Docs/Chapter4.html#4.5
`;var no=`# AddBrandingImage

Adds a branding image on the top, bottom, left, or right of the installer. Its size will be set according to the width/height specified, the installer width/height and the installers font. The final size will not always be what you requested; have a look at the output of the command for the actual size. Because this depends on the installers, you should use [\`SetFont\`][1] before \`AddBrandingImage\`. The default padding value is 2.

\`AddBrandingImage\` only adds a placeholder for an image. To set the image itself at runtime, use [\`SetBrandingImage\`][2].

## Parameters

    (left|right|top|bottom) (width|height) [padding]

## Example

    AddBrandingImage left 100
    AddBrandingImage right 50
    AddBrandingImage top 20
    AddBrandingImage bottom 35
    AddBrandingImage left 100 5

## History

Added in NSIS v2.0 Alpha 2

[1]: SetFont.md
[2]: SetBrandingImage.md
`;var eo=`# AddSize

Tells the installer that the current section needs an additional "size_kb" kilobytes of disk space. Only valid within a section (will have no effect outside of a section or in a function).

## Parameters

    size_kb

## Example

    Section
        AddSize 500
    SectionEnd

## History

Added in NSIS v1.53
`;var to=`# AllowRootDirInstall

Controls whether or not installs are allowed in the root directory of a drive, or directly into a network share. Set to 'true' to change the safe behavior, which prevents users from selecting C:\\ or \\\\Server\\Share as an install (and later on, uninstall) directory. For additional directory selection page customizability, see [\`.onVerifyInstDir\`][1].

## Parameters

    true|false

## History

Added in NSIS v1.80

[1]: ../Callbacks/onVerifyInstDir.md
`;var oo=`# AllowSkipFiles

This command specifies whether the user should be able to skip a file or not. A user has an option to skip a file if [\`SetOverwrite\`][1] is set to on (default) and the installer fails to open a file for writing when trying to extract a file. If off is used the ignore button which allows the user to skip the file will not show and the user will only have an option to abort the installation (Cancel button) or retry opening the file for writing (Retry button). If on is used the user will have an option to skip the file (error flag will be set - see [\`SetOverwrite\`][1]).

## Parameters

    on|off

## History

Added in NSIS v2.0 Beta 4

[1]: SetOverwrite.md
`;var io=`# AutoCloseWindow

Sets whether or not the install window automatically closes when completed. This is overrideable from a section using [\`SetAutoClose\`][1].

## Parameters

    true|false

## History

Added in NSIS v1.1a

[1]: SetAutoClose.md
`;var ro=`# BGFont

Specifies the font used to show the text on the background gradient. To set the color use [\`BGGradient\`][1]. The default font will be used if no parameters are specified. The default font is bold and italic Times New Roman.

## Parameters

    [font_face [height [weight] [/ITALIC] [/UNDERLINE] [/STRIKE]]]

## History

Added in NSIS v2.01

[1]: BGGradient.md
`;var so=`# BGGradient

Specifies whether or not to use a gradient background window. If 'off', the installer will not show a background window, if no parameters are specified, the default black to blue gradient is used, and otherwise the top\\_color or bottom\\_color are used to make a gradient. top\\_color and bottom\\_color are specified using the form RRGGBB (in hexadecimal, as in HTML, only minus the leading '#', since # can be used for comments). 'textcolor' can be specified as well, or 'notext' can be specified to turn the big background text off.

## Parameters

    [off|(topc botc [textcolor|notext])]

## History

Added in NSIS v1.2f
`;var ao=`# BrandingText

Sets the text that is shown at the bottom of the install window (by default it is 'Nullsoft Install System vX.XX') at the bottom of the install window. Setting this to an empty string ("") uses the default; to set the string to blank, use " " (a space). If it doesn't matter to you, leave it the default so that everybody can know why the installer didn't suck. heh. Use \`/TRIMLEFT\`, \`/TRIMRIGHT\` or \`/TRIMCENTER\` to trim down the size of the control to the size of the string.

## Parameters

    /TRIM(LEFT|RIGHT|CENTER) text

## History

Added in NSIS v1.57

[1]: BGGradient.md
`;var lo=`# BringToFront

Makes the installer window visible and brings it to the top of the window list. If an application was executed that shows itself in front of the installer, a BringToFront would bring the installer back in focus.

Recent Windows versions restrict the setting of foreground windows. If the user is working with another application during installation, the user may be notified using a different method.

## History

Added in NSIS v1.1a
`;var co=`# Call

Calls the function named function\\_name, the label named label\\_name, or a variable that specifies an address. An address is returned by [\`GetCurrentAddress\`][1], [\`GetFunctionAddress\`][2] or [\`GetLabelAddress\`][3]. A call returns when it encounters a [\`Return\`][4] instruction. Sections and functions are automatically ended with a Return instruction. Uninstall functions cannot be called from installer functions and sections, and vice-versa.

## Parameters

    function_name | :label_name | user_var(input)

## Example

    Function func
          Call :label
          DetailPrint "#1: This will only appear 1 time."
        label:
          DetailPrint "#2: This will appear before and after message #1."
          Call :.global_label
    FunctionEnd
     
    Section
          Call func
          Return
         
        .global_label:
          DetailPrint "#3: The global label was called"
    SectionEnd

## History

Added in NSIS v1.3

[1]: GetCurrentAddress.md
[2]: GetFunctionAddress.md
[3]: GetLabelAddress.md
[4]: Return.md
`;var mo=`# CallInstDLL

Calls a function named function_name inside a NSIS extension DLL, a plug-in. See the example plugin for how to make one. Extension DLLs can access the stack and variables. Note: To automatically extract and call plug-in DLLs, use a plug-in command instead of \`CallInstDLL\`.

## Parameters

    dllfile function_name

## Example

    Push "a parameter"
    Push "another parameter"
    CallInstDLL $INSTDIR\\somedll.dll somefunction

## History

Added in NSIS v1.7b
`;var uo=`# Caption

When used outside a [\`PageEx\`][1] block: Sets the text for the titlebar of the installer. By default, it is '$(^Name) Setup', where [\`Name\`][2] is specified by the [\`Name\`][2] instruction. You can, however, override it with 'MyApp Installer' or whatever. If you specify an empty string (""), the default will be used (you can however specify " " to simulate an empty string).

When used inside a [\`PageEx\`][1] block: Sets the subcaption of the current page.

Accepts variables. If variables are used, they must be initialized on [\`.onInit\`][3].

## Parameters

    caption

## Example

    PageEx license
        Caption "This is a license page"
    PageExEnd

## History

Added in NSIS v1.2f

[1]: PageEx.md
[2]: Name.md
[3]: ../Callbacks/onInit.md
`;var fo=`# ChangeUI

Replaces dialog (IDD\\_LICENSE, IDD\\_DIR, IDD\\_SELCOM, IDD\\_INST, IDD\\_INSTFILES, IDD\\_UNINST or IDD\\_VERIFY)  with a dialog from ui_file.exe\`. You can also specify 'all' as the dialog if you wish to replace all 7 of the dialogs at once from the same UI file. For some example UIs look at Contrib\\UIs under your NSIS directory.

* IDD\\_LICENSE must contain IDC\\_EDIT1 (RICHEDIT control).
* IDD\\_DIR must contain IDC\\_DIR (edit box), IDC\\_BROWSE (button) and IDC\\_CHECK1 (checkbox).
* IDD\\_SELCOM must contain IDC\\_TREE1 (SysTreeView32 control), and IDC\\_COMBO1 (combo box).
* IDD\\_INST must contain IDC\\_BACK (button), IDC\\_CHILDRECT (static control the size of all other dialogs), IDC\\_VERSTR (static), IDOK (button), and IDCANCEL (button). If an image control (static with SS\\_BITMAP style) will be found in this dialog it will be used as the default for [\`SetBrandingImage\`][1].
* IDD\\_INSTFILES must contain IDC\\_LIST1 (SysListView32 control), IDC\\_PROGRESS (msctls_progress32 control), and IDC\\_SHOWDETAILS (button).
* IDD\\_UNINST must contain IDC\\_EDIT1 (edit box).
* IDD\\_VERIFY must contain IDC\\_STR (static).

## Parameters

    dialog ui_file.exe

## Example

    ChangeUI all "\${NSISDIR}\\Contrib\\UIs\\sdbarker_tiny.exe"

## History

Added in NSIS v2.0 Alpha 2

[1]: SetBrandingImage.md
`;var po=`# CheckBitmap

Specifies the bitmap with the checkbox images used in the component-selection page treeview.

This bitmap should have a size of 96x16 pixels, no more than 8bpp (256 colors) and contain six 16x16 images for the different states (in order: selection mask, not checked, checked, greyed out, unchecked & read-only, checked & read-only). Use magenta as mask color (this area will be transparent).

## Parameters

    bitmap.bmp

## History

Added in NSIS v2.0 Alpha 0
`;var ho=`# ClearErrors

Clears the error flag.

## Example

    ClearErrors
    IfErrors 0 +2
    MessageBox MB_OK "this message box will never show"

## History

Added in NSIS v1.2g
`;var So=`# CompletedText

Replaces the default text ("Completed") that is printed at the end of the install if parameter is specified. Otherwise, the default is used.

Accepts variables. If variables are used, they must be initialized before the message is printed.

## Parameters

    text

## History

Added in NSIS v1.60
`;var $o=`# ComponentText

Used to change the default text on the component page.

The default string will be used if a string is empty ("").

Accepts variables. If variables are used, they must be initialized before the components page is created.

## Parameters

    [text [subtext] [subtext2]]

* text: Text above the controls, to the right of the installation icon.
* subtext: Text next to the installation type selection.
* subtext2: Text to the left of the components list and below the installation type.

## History

Added in NSIS v1.0f
`;var go=`# CopyFiles

Copies files from the source to the destination on the installing system. Useful with [\`$EXEDIR\`][1] if you want to copy from installation media, or to copy from one place to another on the system. You might see a Windows status window of the copy operation if the operation takes a lot of time (to disable this, use \`/SILENT\`). The last parameter can be used to specify the size of the files that will be copied (in kilobytes), so that the installer can approximate the disk space requirements. On error, or if the user cancels the copy (only possible when \`/SILENT\` was omitted), the error flag is set. The error flag is not set if a destination file already exists; instead, the destination file is overwritten. If \`/FILESONLY\` is specified, only files are copied.

Fully-qualified path names should always be used with this instruction. Using relative paths will have unpredictable results.

## Parameters

    [/SILENT] [/FILESONLY] filespec_on_destsys destination_path [size_of_files_in_kb]

## Example

    CreateDirectory $INSTDIR\\backup
    CopyFiles $INSTDIR\\*.dat $INSTDIR\\backup

## History

Added in NSIS v1.1a

[1]: ../Variables/EXEDIR.md
`;var Io=`# CRCCheck

Specifies whether or not the installer will perform a CRC on itself before allowing an install. Note that if the user uses \`/NCRC\` on the command line when executing the installer, and you didn't specify 'force', the CRC will not occur, and the user will be allowed to install a (potentially) corrupted installer.

## Parameters

    on|off|force

## History

Added in NSIS v1.0f
`;var bo=`# CreateDirectory

Creates (recursively if necessary) the specified directory. The error flag is set if the directory couldn't be created.
You should always specify an absolute path.

## Parameters

    path_to_create

## Example

    CreateDirectory $INSTDIR\\some\\directory

## History

Added in NSIS v1.1a
`;var yo=`# CreateFont

Creates a font and puts its handle into user_var. For more information about the different parameters have a look at MSDN's page about the Win32 API function [CreateFont()][1].
You can get the current font used by NSIS using the ^Font and ^FontSize [\`LangString\`][2].

## Parameters

    user_var(handle output) face_name [height] [weight] [/ITALIC] [/UNDERLINE] [/STRIKE]

## Example

    CreateDirectory $INSTDIR\\some\\directory

## History

Added in NSIS v2.0 Alpha 7

[1]: http://msdn.microsoft.com/library/default.asp?url=/library/en-us/gdi/fontext_8fp0.asp
[2]: LangString.md
`;var xo=`# CreateShortCut

Creates a shortcut 'link.lnk' that links to 'target.file', with optional parameters 'parameters'. The icon used for the shortcut is 'icon.file,icon\\_index\\_number'; for default icon settings use empty strings for both icon.file and icon\\_index\\_number. start\\_options should be one of: SW\\_SHOWNORMAL, SW\\_SHOWMAXIMIZED, SW\\_SHOWMINIMIZED, or an empty string. keyboard_shortcut should be in the form of 'flag|c' where flag can be a combination (using |) of: ALT, CONTROL, EXT, or SHIFT. c is the character to use (a-z, A-Z, 0-9, F1-F24, etc). Note that no spaces are allowed in this string. A good example is "ALT|CONTROL|F8". [\`$OUTDIR\`][1] is used for the working directory. You can change it by using [\`SetOutPath\`][2] before creating the Shortcut. description should be the description of the shortcut, or comment as it is called under XP. The error flag is set if the shortcut cannot be created (i.e. either of the paths (link or target) does not exist, or some other error).

## Parameters

    link.lnk target.file [parameters [icon.file [icon_index_number [start_options [keyboard_shortcut [description]]]]]]

## Example

    CreateDirectory $INSTDIR\\some\\directory

## History

Added in NSIS v1.0f

[1]: ../Variables/OUTDIR.md
[2]: SetOutPath.md
`;var Eo=`# Delete

Delete file (which can be a file or wildcard, but should be specified with a full path) from the target system. If \`/REBOOTOK\` is specified and the file cannot be deleted then the file is deleted when the system reboots -- if the file will be deleted on a reboot, the reboot flag will be set. The error flag is set if files are found and cannot be deleted. The error flag is not set from trying to delete a file that does not exist.

## Parameters

    [/REBOOTOK] file

## Example

    Delete $INSTDIR\\somefile.dat

## History

Added in NSIS v1.0f
`;var wo=`# DeleteINISec

Delete file (which can be a file or wildcard, but should be specified with a full path) from the target system. If \`/REBOOTOK\` is specified and the file cannot be deleted then the file is deleted when the system reboots -- if the file will be deleted on a reboot, the reboot flag will be set. The error flag is set if files are found and cannot be deleted. The error flag is not set from trying to delete a file that does not exist.

## Parameters

    ini_filename section_name

## Example

    WriteINIStr $TEMP\\something.ini section1 something 123
    WriteINIStr $TEMP\\something.ini section1 somethingelse 1234
    WriteINIStr $TEMP\\something.ini section2 nsis true
    DeleteINISec $TEMP\\something.ini section1

## History

Added in NSIS v1.1u
`;var Ro=`# DeleteINIStr

Deletes the string str\\_name from section [section\\_name] from ini\\_filename. If the string could not be removed from the ini file, the error flag is set. It does not set the error flag if the string could not be found.

## Parameters

    ini_filename section_name str_name

## Example

    WriteINIStr $TEMP\\something.ini section1 something 123
    WriteINIStr $TEMP\\something.ini section1 somethingelse 1234
    DeleteINIStr $TEMP\\something.ini section1 somethingelse

## History

Added in NSIS v1.1u
`;var Co=`# DeleteRegKey

Deletes a registry key. If \`/ifempty\` is specified, the registry key will only be deleted if it has no subkeys (otherwise, the whole registry tree will be removed). Valid values for root_key are listed under [\`WriteRegStr\`][1]. The error flag is set if the key could not be removed from the registry (or if it didn't exist to begin with).

## Parameters

    [/ifempty] root_key subkey

## Example

    DeleteRegKey HKLM "Software\\My Company\\My Software"
    DeleteRegKey /ifempty HKLM "Software\\A key that might have subkeys"

## History

Added in NSIS v1.0f

[1]: WriteRegStr.md
`;var vo=`# DeleteRegValue

Deletes a registry value. Valid values for root_key are listed under [\`WriteRegStr\`][1]. The error flag is set if the value could not be removed from the registry (or if it didn't exist to begin with).

## Parameters

    root_key subkey key_name

## Example

    DeleteRegValue HKLM "Software\\My Company\\My Software" "some value"

## History

Added in NSIS v1.0f

[1]: WriteRegStr.md
`;var No=`# DetailPrint

Adds the string "user_message" to the details view of the installer.

## Parameters

    user_message

## Example

    DetailPrint "this message will show on the installation window"

## History

Added in NSIS v1.32
`;var Fo=`# DetailsButtonText

Replaces the default details button text of "Show details", if parameter is specified (otherwise the default is used).
Accepts variables. If variables are used, they must be initialized before the install log (instfiles) page is created.

## Parameters

    show_details_text

## Example

    DetailPrint "this message will show on the installation window"

## History

Added in NSIS v1.60
`;var To=`# DirText

Used to change the default text on the directory page.

The default string will be used if a string is empty ("").

Accepts variables. If variables are used, they must be initialized before the directory page is created.

## Parameters

    [text] [subtext] [browse_button_text] [browse_dlg_text]

* text: Text above the controls, to the right of the installation icon.
* subtext: Text on the directory selection frame.
* browse\\_button\\_text: Text on the Browse button.
* browse\\_dlg\\_text: Text on the "Browse For Folder" dialog, appears after clicking on "Browse" button.

## Example

    DetailPrint "this message will show on the installation window"

## History

Added in NSIS v1.0f
`;var Do=`# DirVar

Specifies which variable is to be used to contain the directory selected. This variable should be initialized with a default value. This allows you to easily create two different directory pages that will not require you to move values in and out of [\`$INSTDIR\`][1]. The default variable is [\`$INSTDIR\`][1]. This can only be used in [\`PageEx\`][2] and for directory and uninstConfirm pages.

## Parameters

    user_var(dir input/output)

## Example

    Var ANOTHER_DIR
    PageEx directory
        DirVar $ANOTHER_DIR
    PageExEnd
     
    Section
        SetOutPath $INSTDIR
        File "a file.dat"
        SetOutPath $ANOTHER_DIR
        File "another file.dat"
    SectionEnd

## History

Added in NSIS v2.0 Beta 4

[1]: ../Variables/INSTDIR.md
[2]: PageEx.md
`;var Ao=`# DirVerify

If 'DirVerify leave' is used, the Next button will not be disabled if the installation directory is not valid or there is not enough space. A flag that you can read in the leave function using [\`GetInstDirError\`][1] will be set instead.

## Parameters

    auto|leave

## Example

    PageEx directory
        DirVerify leave
        PageCallbacks "" "" dirLeave
    PageExEnd

## History

Added in NSIS v2.0 Release Candidate 1

[1]: GetInstDirError.md
`;var _o=`# EnableWindow

Enables or disables mouse and keyboard input to the specified window or control. Possible states are 0 (disabled) or 1 (enabled).

## Parameters

    hwnd (1|0)

## Example

    GetDlgItem $0 $HWNDPARENT 1
    EnableWindow $0 0
    Sleep 1000
    EnableWindow $0 1

## History

Added in NSIS v2.0
`;var Wo=`# EnumRegKey

Set user variable $x with the name of the 'index'th registry key in root\\_key\\Subkey. Valid values for root\\_key are listed under [\`WriteRegStr\`][1]. Returns an empty string if there are no more keys, and returns an empty string and sets the error flag if there is an error.

## Parameters

    user_var(output) root_key subkey index

## Example

    StrCpy $0 0
    loop:
      EnumRegKey $1 HKLM Software $0
      StrCmp $1 "" done
      IntOp $0 $0 + 1
      MessageBox MB_YESNO|MB_ICONQUESTION "$1$\\n$\\nMore?" IDYES loop
    done:

## History

Added in NSIS v1.50

[1]: WriteRegStr.md
`;var Mo=`# EnumRegValue

Set user variable $x with the name of the 'index'th registry value in root\\_key\\Subkey. Valid values for root\\_key are listed under [\`WriteRegStr\`][1]. Returns an empty string and sets the error flag if there are no more values or if there is an error.

## Parameters

    user_var(output) root_key subkey index

## Example

    StrCpy $0 0
    loop:
      ClearErrors
      EnumRegValue $1 HKLM Software\\Microsoft\\Windows\\CurrentVersion $0
      IfErrors done
      IntOp $0 $0 + 1
      ReadRegStr $2 HKLM Software\\Microsoft\\Windows\\CurrentVersion $1
      MessageBox MB_YESNO|MB_ICONQUESTION "$1 = $2$\\n$\\nMore?" IDYES loop
    done:

## History

Added in NSIS v1.50

[1]: WriteRegStr.md
`;var Oo=`# Exch

When no parameter is specified, exchanges the top two elements of the stack. When a parameter is specified and is a user variable, exchanges the top element of the stack with the parameter. When a parameter is specified and is a positive integer, \`Exch\` will swap the item on the top of the stack with the item that is specified by the offset from the top of the stack in the parameter. If there are not enough items on the stack to accomplish the exchange, a fatal error will occur (to help you debug your code :).

## Parameters

    [user_var | stack_index]

## Example

    Push 1
    Push 2
    Exch
    Pop $0 # = 1
    Push 1
    Push 2
    Push 3
    Exch 2
    Pop $0 # = 1
    StrCpy $0 1
    Push 2
    Exch $0 # = 2
    Pop $1 # = 1

## History

Added in NSIS v1.58

[1]: WriteRegStr.md
`;var Po=`# Exec

Execute the specified program and continue immediately. Note that the file specified must exist on the target system, not the compiling system. [\`$OUTDIR\`][1] is used for the working directory.

The error flag is set if the process could not be launched. Note, if the command could have spaces, you should put it in quotes to delimit it from parameters. e.g.: Exec '"$INSTDIR\\command.exe" parameters'. If you don't put it in quotes it will not work on Windows 9x with or without parameters.

## Parameters

    command

## Example

    Exec '"$INSTDIR\\someprogram.exe"'
    Exec '"$INSTDIR\\someprogram.exe" some parameters'

## History

Added in NSIS v1.0f

[1]: ../Variables/OUTDIR.md
`;var Lo=`# ExecShell

Execute the specified program using ShellExecute. Note that action is usually "open", "print", etc, but can be an empty string to use the default action. Parameters and the show type are optional. [\`$OUTDIR\`][1] is used for the working directory. The error flag is set if the process could not be launched.

## Parameters

    action command [parameters] [SW_SHOWDEFAULT | SW_SHOWNORMAL | SW_SHOWMAXIMIZED | SW_SHOWMINIMIZED | SW_HIDE]

## Example

    ExecShell "open" "http://nsis.sf.net/"
    ExecShell "open" "$INSTDIR\\readme.txt"
    ExecShell "print" "$INSTDIR\\readme.txt"

## History

Added in NSIS v1.1b

[1]: ../Variables/OUTDIR.md
`;var Bo=`# ExecShellWait

Execute the specified program and continue immediately. Note that the file specified must exist on the target system, not the compiling system. [\`$OUTDIR\`][1] is used as the working directory. The error flag is set if the process could not be launched. Note, if the command could have spaces, you should put it in quotes to delimit it from parameters. e.g.: \`Exec '"$INSTDIR\\command.exe" parameters'\`. If you don't put it in quotes it will not work on Windows 9x with or without parameters.

## Parameters

    [/INVOKEIDLIST] action command [parameters] [SW_SHOWDEFAULT | SW_SHOWNORMAL | SW_SHOWMAXIMIZED | SW_SHOWMINIMIZED | SW_HIDE]

## Example

    ExecShellWait "open" "http://nsis.sf.net/"
    ExecShellWait "open" "$INSTDIR\\readme.txt"
    ExecShellWait "print" "$INSTDIR\\readme.txt"

## History

Added in NSIS v3.02

[1]: ../Variables/OUTDIR.md
`;var ko=`# ExecWait

Execute the specified program and wait for the executed process to quit. See [\`Exec\`][1] for more information. If no output variable is specified \`ExecWait\` sets the error flag if the program executed returns a nonzero error code, or if there is an error. If an output variable is specified, \`ExecWait\` sets the variable with the exit code (and only sets the error flag if an error occurs; if an error occurs the contents of the user variable are undefined). Note, if the command could have spaces, you should put it in quotes to delimit it from parameters. e.g.: ExecWait '"$INSTDIR\\command.exe" parameters'. If you don't put it in quotes it will not work on Windows 9x with or without parameters.

## Parameters

    command [user_var(exit code)]

## Example

    ExecWait '"$INSTDIR\\someprogram.exe"'
    ExecWait '"$INSTDIR\\someprogram.exe"' $0
    DetailPrint "some program returned $0"

## History

Added in NSIS v1.0i

[1]: Exec.md
`;var Uo=`# ExpandEnvStrings

Expands environment variables in string into the user variable $x. If an environment variable doesn't exist, it will not be replaced. For example, if you use "%var%" and var doesn't exists, the result will be "%var". If there is an error, the variable is set to empty, and the error flag is set.

## Parameters

    user_var(output) string

## Example

    ExpandEnvStrings $0 "WINDIR=%WINDIR%$\\nTEMP=%TEMP%"

## History

Added in NSIS v1.60
`;var Go=`# File

Adds file(s) to be extracted to the current output path ([\`$OUTDIR\`][1]).

* Note that the output file name is $OUTDIR\\filename\\_portion\\_of\\_file.
* Use \`/oname=X\` switch to change the output name. X may contain variables and can be a fully qualified path or a relative path in which case it will be appended to [\`$OUTDIR\`][1] set by [\`SetOutPath\`][2]. When using this switch, only one file can be specified. If the output name contains spaces, quote the entire parameter, including /oname, as shown in the examples below.
* Wildcards are supported.
* If the \`/r\` switch is used, matching files and directories are recursively searched for in subdirectories. If just one path segment is specified (e.g. File /r something), the current directory will be recursively searched. If more than one segment is specified (e.g. File /r something\\*.*), the last path segment will be used as the matching condition and the rest for the directory to search recursively. If a directory name matches, all of its contents is added recursively. Directory structure is preserved.
* Use the \`/x\`switch to exclude files or directories.
* If the \`/a\` switch is used, the attributes of the file(s) added will be preserved.
* The \`File\` command sets the error flag if overwrite mode is set to 'try' and the file could not be overwritten, or if the overwrite mode is set to 'on' and the file could not be overwritten and the user selects ignore.
* If the \`/nonfatal\` switch is used and no files are found, a warning will be issued instead of an error.

## Parameters

    [/nonfatal] [/a] ([/r] [/x file|wildcard [...]] (file|wildcard) [...] | /oname=file.dat infile.dat)

## Example

    File something.exe
    File /a something.exe
    File *.exe
    File /r *.dat
    File /r data
    File /oname=temp.dat somefile.ext
    File /oname=$TEMP\\temp.dat somefile.ext
    File "/oname=$TEMP\\name with spaces.dat" somefile.ext
    File /nonfatal "a file that might not exist"
    File /r /x CVS myproject\\*.*
    File /r /x *.res /x *.obj /x *.pch source\\*.*

**Note:** when using the \`/r\` switch, both matching directories and files will be searched. This is always done with or without the use of wildcards, even if the given path perfectly matches one directory. That means, the following directory structure:

    something/
    \u251C\u2500\u2500 file.dat
    \u2514\u2500\u2500 another.dat
    dir/
    \u251C\u2500\u2500 something
    \u251C\u2500\u2500 dir2/
    \u2502   \u2514\u2500\u2500 file2.dat
    \u2514\u2500\u2500 another/
        \u2514\u2500\u2500 something/
            \u2514\u2500\u2500 readme.txt

with the following \`File\` usage:

    File /r something

will match the directory named something on the root directory, the file named something in the directory named dir and the directory named something in the directory named another. To match only the directory named something on the root directory, use the following:

    File /r something\\*.*

When adding \\*.*, it will be used as the matching condition and something will be used as the directory to search. When only something is specified, the current directory will be recursively searched for every and directory named something and another\\something will be matched.

## History

Added in NSIS v1.0f

[1]: ../Variables/OUTDIR.md
[2]: SetOutPath.md
`;var Ho=`# FileBufSize

This command sets the size of the compiler's internal file buffers. This command allows you to control the compiler's memory usage by limiting how much of a given file it will load into memory at once. Since the compiler needs both input and output, twice the memory size specified could be used at any given time for file buffers. This command does not limit the compression buffers which could take another couple of MB, neither does it limit the compiler's other internal buffers, but those shouldn't normally top 1MB anyway. Specifying a very small number could decrease performance. Specifying a very large number could exhaust system resources and force the compiler to cancel the compilation process. The default value is 32MB.

## Parameters

    buffer_size_in_mb

## History

Added in NSIS v2.0 Beta 4
`;var Ko=`# FileClose

Closes a file handle opened with [\`FileOpen\`][1].

## Parameters

    handle

## Example

    FileOpen $0 $INSTDIR\\file.dat r
    FileClose $0

## History

Added in NSIS v1.60

[1]: FileOpen.md
`;var Vo=`# FileErrorText

Replaces the default text that comes up when a file cannot be written to. This string can contain a reference to \`$0\`, which is the filename (\`$0\` is temporarily changed to this value). Example: "Can not write to file $\\r$\\n$0$\\r$\\ngood luck.".

Accepts variables. If variables are used, they must be initialized before [\`File\`][1] is used.

## Parameters

    text

## History

Added in NSIS v1.63beta

[1]: File.md
`;var Xo=`# FileOpen

Opens a file named "filename", and sets the handle output variable with the handle. The openmode should be one of "r" (read) "w" (write, all contents of file are destroyed) or "a" (append, meaning opened for both read and write, contents preserved). In all open modes, the file pointer is placed at the beginning of the file. If the file cannot be opened, the handle output is set to empty, and the error flag is set.

If no absolute path is specified the current folder will be used. The current folder is the folder set using the last \`SetOutPath\` instruction. If you have not used [\`SetOutPath\`][1] the current folder is [\`$EXEDIR\`][1].

## Parameters

    user_var(handle output) filename openmode

## Example

    FileOpen $0 $INSTDIR\\file.dat r
    FileClose $0

## History

Added in NSIS v1.60

[1]: SetOutPath.md
[2]: ../Variables/EXEDIR.md
`;var Yo=`# FileRead

Reads a string (ANSI characters) from a file opened with [\`FileOpen\`][1]. The string is read until either a newline (or carriage return newline pair) occurs, or until a null byte is read, or until maxlen is met (if specified). By default, strings are limited to 1024 characters (a special build with larger NSIS\\_MAX\\_STRLEN can be compiled or downloaded). If the end of file is read and no more data is available, the output string will be empty, and the error flag will be set.

(If you are building a [Unicode installer][2], the function reads an ANSI string and makes the adequate conversion)

## Parameters

    handle user_var(output) [maxlen]

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\\file.dat r
    IfErrors done
    FileRead $0 $1
    DetailPrint $1
    FileClose $0
    done:

## History

Added in NSIS v1.60

[1]: FileOpen.md
[2]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
`;var zo=`# FileReadByte

Reads a byte from a file opened with [\`FileOpen\`][1]. The byte is stored in the output as an integer (0-255). If the end of file is read and no more data is available, the output will be empty, and the error flag will be set.

## Parameters

    handle user_var(output)

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\\file.dat r
    IfErrors done
    FileReadByte $0 $1
    FileReadByte $0 $2
    DetailPrint "$1 $2"
    FileClose $0
    done:

## History

Added in NSIS v1.80

[1]: FileOpen.md
`;var qo=`# FileReadUTF16LE

This function is only available when building a [Unicode installer][1].

Reads a string (UTF-16LE characters) from a file opened with [\`FileOpen\`][2]. The string is read until either a newline (or carriage return newline pair) occurs, or until a null wide-character is read, or until maxlen is met (if specified). By default, strings are limited to 1024 characters (a special build with larger NSIS\\_MAX\\_STRLEN can be compiled or downloaded). If the end of file is read and no more data is available, the output string will be empty, and the error flag will be set.

## Parameters

    handle user_var(output)

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\\file.dat r
    IfErrors done
    FileReadByte $0 $1
    FileReadByte $0 $2
    DetailPrint "$1 $2"
    FileClose $0
    done:

## History

Added in NSIS v3.0a0

[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
[2]: FileOpen.md
`;var jo=`# FileReadUTF16LE

This function is only available when building a [Unicode installer][1].

Reads a word (2-bytes) from a file opened with [\`FileOpen\`][2]. The word is stored in the output as an integer (0-65535). If the end of file is read and no more data is available, the output will be empty, and the error flag will be set.

## Parameters

    handle user_var(output)

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\\file.dat r
    IfErrors done
    FileReadWord $0 $1
    FileReadWord $0 $2
    DetailPrint "$1 $2"
    FileClose $0
    done:

## History

Added in NSIS v3.0a0

[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
[2]: FileOpen.md
`;var Zo=`# FileSeek

Seeks a file opened with [\`FileOpen\`][1]. If mode is omitted or specified as SET, the file is positioned to "offset", relative to the beginning of the file. If mode is specified as CUR, then the file is positioned to "offset", relative to the current file position. If mode is specified as END, then the file is positioned to "offset", relative to the end of the file. If the final parameter "new position" is specified, the new file position will be stored to that variable.

## Parameters

    handle offset [mode] [user_var(new position)]

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\\file.dat r
    IfErrors done
    FileSeek $0 -5 END
    FileRead $0 $1
    DetailPrint $1
    FileClose $0
    done:

## History

Added in NSIS v1.60

[1]: FileOpen.md
`;var Jo=`# FileWrite

Writes an ANSI string to a file opened with [\`FileOpen\`][1]. If an error occurs writing, the error flag will be set.

(If you are building a [Unicode installer][2], the function makes the adequate conversion and writes an ANSI string)

## Parameters

    handle string

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\\file.dat w
    IfErrors done
    FileWrite $0 "some text"
    FileClose $0
    done:

## History

Added in NSIS v1.60

[1]: FileOpen.md
[2]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
`;var Qo=`# FileWrite

Writes an ANSI string to a file opened with [\`FileOpen\`][1]. If an error occurs writing, the error flag will be set.

(If you are building a [Unicode installer][2], the function makes the adequate conversion and writes an ANSI string)

## Parameters

    handle string

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\\file.dat w
    IfErrors done
    FileWrite $0 "some text"
    FileClose $0
    done:

## History

Added in NSIS v1.60

[1]: FileOpen.md
[2]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
`;var ni=`# FileWriteUTF16LE

This function is only available when building a [Unicode installer][1].

Writes a Unicode (UTF-16LE) string to a file opened with [\`FileOpen\`][2]. If an error occurs writing, the error flag will be set.

## Parameters

    handle string

## Example

    ClearErrors
    FileOpen $0 $INSTDIR\\file.dat w
    IfErrors done
    FileWriteUTF16LE $0 "some text"
    FileClose $0
    done:

## History

Added in NSIS v3.0a0

[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
[2]: FileOpen.md
`;var ei=`# FileWriteWord

This function is only available when building a [Unicode installer][1].

Writes the integer interpretation of 'string' as a WORD (2-bytes, range: 0-65535) to a file opened with [\`FileOpen\`][2]. Of course you can enter the integer value directly. The following code writes a "Carriage Return / Line Feed" - Enter to the file.

## Parameters

    handle string

## Example

    FileWriteWord file_handle "13"
    FileWriteWord file_handle "10"

If an error occurs while writing, the error flag will be set. Note that the low WORD of the integer is used, i.e. writing 65536 is the same as writing 0, etc.

## History

Added in NSIS v3.0a0

[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4
[2]: FileOpen.md
`;var ti=`# FindClose

Closes a search opened with [\`FindFirst\`][1].

## Parameters

    handle

## Example

    FindFirst $0 $1 $INSTDIR\\*.txt
    loop:
      StrCmp $1 "" done
      DetailPrint $1
      FindNext $0 $1
      Goto loop
    done:
    FindClose $0

## History

Added in NSIS v1.60

[1]: FindFirst.md
`;var oi=`# FindFirst

Performs a search for 'filespec', placing the first file found in filename\\_output (a user variable). It also puts the handle of the search into handle\\_output (also a user variable). If no files are found, both outputs are set to empty, and the error flag is set. Best used with [\`FindNext\`][1] and [\`FileClose\`][2]. Note that the filename output is without path.

## Parameters

    user_var(handle output) user_var(filename output) filespec

## Example

    FindFirst $0 $1 $INSTDIR\\*.txt
    loop:
      StrCmp $1 "" done
      DetailPrint $1
      FindNext $0 $1
      Goto loop
    done:
    FindClose $0

## History

Added in NSIS v1.60

[1]: FindNext.md
[2]: FileClose.md
`;var ii=`# FindNext

Continues a search began with [\`FindFirst\`][1]. handle should be the handle\\_output\\_variable returned by [\`FindFirst\`][1]. If the search is completed (there are no more files), filename\\_output is set to empty, and the error flag is set. Note that the filename output is without path.

## Parameters

    handle user_var(filename_output)

## Example

    FindFirst $0 $1 $INSTDIR\\*.txt
    loop:
      StrCmp $1 "" done
      DetailPrint $1
      FindNext $0 $1
      Goto loop
    done:
    FindClose $0

## History

Added in NSIS v1.60

[1]: FindFirst.md
`;var ri=`# FindWindow

Searches for a window. Behaves like the win32 FindWindowEx(). Searches by windowclass (and/or windowtitle if specified). If windowparent or childafter are specified, the search will be restricted as such. If windowclass or windowtitle is specified as "", they will not be used for the search. If the window is not found, the user variable returned is 0. To accomplish old-style FindWindow behavior, use FindWindow with [\`SendMessage\`][1].

## Parameters

    user_var(hwnd output) windowclass [windowtitle] [windowparent] [childafter]

## Example

    FindWindow $0 "#32770" "" $HWNDPARENT
    FindWindow $0 "my window class" "my window title"

## History

Added in NSIS v1.0f

[1]: SendMessage.md
`;var si=`# FlushINI

Flushes the INI file's buffers. Windows 9x keeps all changes to the INI file in memory. This command causes the changes to be written to the disk immediately. Use it if you edit the INI manually, delete it, move it or copy it right after you change it with [\`WriteINIStr\`][1], [\`DeleteINISec\`][2] or [\`DeleteINStr\`][3].

## Parameters

    ini_filename

## Example

    WriteINIStr $TEMP\\something.ini test test test
    FlushINI $TEMP\\something.ini
    Delete $TEMP\\something.ini

## History

Added in NSIS v2.0 Beta 3

[1]: WriteINIStr.md
[2]: DeleteINISec.md
[3]: DeleteINIStr.md
`;var ai=`# Function

Begins and opens a new function. Function names beginning with "." (e.g. ".Whatever") are generally reserved for callback functions. Function names beginning with "un." are functions that will be generated in the Uninstaller. Hence, normal install Sections and functions cannot call uninstall functions, and the Uninstall Section and uninstall functions cannot call normal functions.

## Parameters

    [function_name]

## Example

    Function func
        # some commands
    FunctionEnd

    Section
        Call func
    SectionEnd

## History

Added in NSIS v1.3
`;var li=`# FunctionEnd

This command closes the current open [\`Function\`][1].

## Example

    Function func
        # some commands
    FunctionEnd

    Section
        Call func
    SectionEnd

## History

Added in NSIS v1.3

[1]: Function.md
`;var di=`# GetCurInstType

Get the current [\`InstType\`][1] and stores it in user\\_var. If the first install type is selected, 0 will be put in user\\_var. If the second install type is selected, 1 will be put in user\\_var, and so on. The value of \`\${NSIS_MAX_INST_TYPES}\` (32 by default) means that the custom install type was selected.

## Parameters

    user_var

## History

Added in NSIS v2.0 Beta 4

[1]: InstType.md
`;var ci=`# GetCurrentAddress

Gets the address of the current instruction and stores it in the output user variable. This user variable then can be passed to [\`Call\`][1] or [\`Goto\`][2].

## Parameters

    user_var(output)

## Example

    Function func
        DetailPrint "function"
        IntOp $0 $0 + 2
        Call $0
        DetailPrint "function end"
    FunctionEnd
     
    Section
      DetailPrint "section"
      DetailPrint "section"
      GetCurrentAddress $0
      Goto callFunc
     
      DetailPrint "back to section"
      Return
     
    callFunc:
      Call func
      DetailPrint "section end"
    SectionEnd

## History

Added in NSIS v1.80

[1]: Call.md
[2]: Goto.md
`;var mi=`# GetDlgItem

Retrieves the handle of a control identified by item_id in the specified dialog box dialog. If you want to get the handle of a control on the inner dialog, first use

    FindWindow user_var(output) "#32770" "" \`$HWNDPARENT

to get the handle of the inner dialog.

## Parameters

    user_var(output) dialog item_id

## Example

    GetDlgItem $0 $HWNDPARENT 1 # next/install button

## History

Added in NSIS v2.0

[1]: Call.md
[2]: Goto.md
`;var ui=`# GetDLLVersion

Gets the version information from the DLL (or any other executable containing version information) in "filename". Sets the user output variables with the high and low dwords of version information on success; on failure the outputs are empty and the error flag is set.

## Parameters

    filename user_var(high dword output) user_var(low dword output)

## Example

The following example reads the DLL version and copies a human readable version of it into \`$0:

    GetDlgItem $0 $HWNDPARENT 1 # next/install button

## History

Added in NSIS v1.60
`;var fi=`# GetDLLVersionLocal

This is similar to [\`GetDLLVersion\`][1], only it acts on the system building the installer (it actually compiles into two [\`StrCpy\`][2] commands). Sets the two output variables with the DLL version information of the DLL on the build system.

## Parameters

    localfilename user_var(high dword output) user_var(low dword output)

## History

Added in NSIS v1.60

[1]: GetDLLVersion.md
[2]: StrCpy.md
`;var pi=`# GetErrorLevel

Returns the last error level set by [\`SetErrorLevel\`][1] or -1 if it was never used.

## Parameters

    user_var(error level output)

## Example

    GetErrorLevel $0
    IntOp $0 $0 + 1
    SetErrorLevel $0

## History

Added in NSIS v2.02

[1]: SetErrorLevel.md
`;var hi=`# GetFileTime

Gets the last write time of "filename". Sets the user output variables with the high and low dwords of the timestamp on success; on failure the outputs are empty and the error flag is set.

## Parameters

    filename user_var(high dword output) user_var(low dword output)

## History

Added in NSIS v1.60
`;var Si=`# GetFileTimeLocal

This is similar to [\`GetFileTime\`][1], only it acts on the system building the installer (it actually compiles into two [\`StrCpy\`][2] commands). Sets the two output variables with the file timestamp of the file on the build system.

## Parameters

    filename user_var(high dword output) user_var(low dword output)

## History

Added in NSIS v1.60

[1]: GetFileTime.md
[2]: StrCpy.md
`;var $i=`# GetFullPathName

Assign to the user variable $x, the full path of the file specified. If the path portion of the parameter is not found, the error flag will be set and $x will be empty. If \`/SHORT\` is specified, the path is converted to the short filename form. However, if \`/SHORT\` is not specified, the path isn't converted to its long filename form. To get the long filename, call GetLongPathName using the System plug-in. Note that GetLongPathName is only available on Windows 98, Windows 2000 and above.

## Parameters

    [/SHORT] user_var(output) path_or_file

## Example

    StrCpy $INSTDIR $PROGRAMFILES\\NSIS
    SetOutPath $INSTDIR
    GetFullPathName $0 ..
    DetailPrint $0 # will print C:\\Program Files
    GetFullPathName /SHORT $0 $INSTDIR
    DetailPrint $0 # will print C:\\Progra~1\\NSIS

Using GetLongPathName:

    StrCpy $0 C:\\Progra~1\\NSIS
    System::Call 'kernel32::GetLongPathName(t r0, t .r1, i \${NSIS_MAX_STRLEN}) i .r2'
    StrCmp $2 error +2
    StrCpy $0 $1
    DetailPrint $0 # will print C:\\Program Files\\NSIS, where supported

## History

Added in NSIS v1.70
`;var gi=`# GetFunctionAddress

Gets the address of the function and stores it in the output user variable. This user variable then can be passed to [\`Call\`][1] or [\`Goto\`][2]. Note that if you [\`Goto\`][2] an address which is the output of \`GetFunctionAddress\`, your function will never be returned to (when the function you Goto'd to returns, you return instantly).

## Parameters

    user_var(output) function_name

## Example

    Function func
        DetailPrint "function"
    FunctionEnd
     
    Section
        GetFunctionAddress $0 func
        Call $0
    SectionEnd

## History

Added in NSIS v1.80

[1]: Call.md
[2]: Goto.md
`;var Ii=`# GetInstDirError

Use in the leave function of a directory page. Reads the flag set if 'DirVerify leave' is used. Possible values:

* 0: No error
* 1: Invalid installation directory
* 2: Not enough space on installation drive

## Parameters

    user_var(error output)

## Example

    !include LogicLib.nsh
    PageEx directory
        DirVerify leave
        PageCallbacks "" "" dirLeave
    PageExEnd
     
    Function dirLeave
        GetInstDirError $0
        \${Switch} $0
            \${Case} 0
                MessageBox MB_OK "valid installation directory"
                \${Break}
            \${Case} 1
                MessageBox MB_OK "invalid installation directory!"
                Abort
                \${Break}
            \${Case} 2
                MessageBox MB_OK "not enough free space!"
                Abort
                \${Break}
        \${EndSwitch}
    FunctionEnd

## History

Added in NSIS v2.0 Release Candidate 1
`;var bi=`# GetKnownFolderPath

Get the path of a [known folder][1]. The error flag is set and the output variable is empty if the call fails or the \`knownfolderid\` guid is not available. This function is only able to resolve known folders on Windows Vista or higher.

## Parameters

    user_var(output) knownfolderid

## Example

    !include WinCore.nsh
    !include LogicLib.nsh

    Function .onInit
        \${If} $InstDir == ""
            GetKnownFolderPath $InstDir \${FOLDERID_UserProgramFiles} ; This exists on Win7+
            StrCmp $InstDir "" 0 +2 
            StrCpy $InstDir "$LocalAppData\\Programs" ; Fallback directory
            StrCpy $InstDir "$InstDir\\$(^Name)"
        \${EndIf}
    FunctionEnd

## History

Added in NSIS v3.06

[1]: https://docs.microsoft.com/en-us/windows/win32/shell/knownfolderid
`;var yi=`# GetLabelAddress

Gets the address of the label and stores it in the output user variable. This user variable then can be passed to [\`Call\`][1] or [\`Goto\`][2]. Note that you may only call this with labels accessible from your function, but you can call it from anywhere (which is potentially dangerous). Note that if you [\`Call\`][1] the output of \`GetLabelAddress\`, code will be executed until it [\`Return\`][3]'s (explicitly or implicitly at the end of a function), and then you will be returned to the statement after the [\`Call\`][1].

## Parameters

    user_var(output) label

## Example

    !include LogicLib.nsh
    PageEx directory
        DirVerify leave
        PageCallbacks "" "" dirLeave
    PageExEnd
     
    Function dirLeave
        GetInstDirError $0
        \${Switch} $0
            \${Case} 0
                MessageBox MB_OK "valid installation directory"
                \${Break}
            \${Case} 1
                MessageBox MB_OK "invalid installation directory!"
                Abort
                \${Break}
            \${Case} 2
                MessageBox MB_OK "not enough free space!"
                Abort
                \${Break}
        \${EndSwitch}
    FunctionEnd

## History

Added in NSIS v1.80

[1]: Call.md
[2]: Goto.md
[3]: Return.md
`;var xi=`# GetTempFileName

Assign to the user variable $x, the name of a temporary file. The file will have been created, so you can then overwrite it with what you please. The name of the temporary file is guaranteed to be unique. If to want the temporary file to be created in another directory than the Windows temp directory, specify a base_dir. [\`Delete\`][1] the file when done with it.

## Parameters

    user_var(output) base_dir

## Example

    GetTempFileName $0
    File /oname=$0 something.dat
    # do something with something.dat
    Delete $0

## History

Added in NSIS v1.90

[1]: Delete.md
`;var Ei=`# GetWinVer

Gets the Windows version as reported by GetVersionEx. \`WinVer.nsh\` is the preferred method for performing Windows version checks.

## Parameters

    user_var(output) Major|Minor|Build|ServicePack

## Example

    GetWinVer $1 Build

## History

Added in NSIS v3.08
`;var wi=`# Goto

If label is specified, goto the label 'label_to_jump_to:'.

If \`+offset\` or \`-offset\` is specified, jump is relative by offset instructions. Goto +1 goes to the next instruction, Goto -1 goes to the previous instruction, etc.

If a user variable is specified, jumps to absolute address (generally you will want to get this value from a function like [\`GetLabelAddress\`][1]). Compiler flag commands and SectionIn aren't instructions so jumping over them has no effect.

## Parameters

    label_to_jump_to | +offset| -offset| user_var(target)

## Example

    Goto label
    Goto +2
    Goto -2
    Goto $0

## History

Added in NSIS v1.4 Beta

[1]: GetLabelAddress.md
`;var Ri=`# HideWindow

Hides the installer.

## History

Added in NSIS v1.1b
`;var Ci=`# Icon

Sets the icon of the installer. Every image in the icon file will be included in the installer. Use [\`UninstallIcon\`][1] to set the uninstaller icon.

## Parameters

    [path\\]icon.ico

## History

Added in NSIS v1.0f

[1]: UninstallIcon.md
`;var vi=`# IfAbort

If [\`Abort\`][1] is called it will "return" true. This can happen if the user chose abort on a file that failed to create (or overwrite) or if the user aborted by hand. This function can only be called from the leave function of the instfiles page.

## Parameters

    label_to_goto_if_abort [label_to_goto_if_no_abort]

## Example

    Page instfiles "" "" instfilesLeave
     
    Function instfilesLeave
        IfAbort 0 +2
        MessageBox MB_OK "user aborted"
    FunctionEnd

## History

Added in NSIS v2.0

[1]: Abort.md
`;var Ni=`# IfErrors

Checks and clears the error flag, and if it is set, it will [\`Goto\`][1] jumpto\\_iferror, otherwise it will [\`Goto\`][1] jumpto\\_ifnoerror. The error flag is set by other instructions when a recoverable error (such as trying to delete a file that is in use) occurs.

## Parameters

    jumpto_iferror [jumpto_ifnoerror]

## Example

    ClearErrors
    File file.dat
    IfErrors 0 +2
    Call ErrorHandler

## History

Added in NSIS v1.2g

[1]: Goto.md
`;var Fi=`# IfFileExists

Checks for existence of file(s) file\\_to\\_check\\_for (which can be a wildcard, or a directory), and [\`Goto\`][1] jump\\_if\\_present if the file exists, otherwise [\`Goto\`][1] jump_otherwise. If you want to check to see if a file is a directory, use IfFileExists DIRECTORY\\*

## Parameters

    file_to_check_for jump_if_present [jump_otherwise]

## Example

    IfFileExists $WINDIR\\notepad.exe 0 +2
    MessageBox MB_OK "notepad is installed"

You can also use labels, which may help make your code easier to read:

    IfFileExists $INSTDIR\\somefile.txt file_found file_not_found
    
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
`;var Ti=`# IfRebootFlag

Checks the reboot flag, and jumps to jump\\_if\\_set if the reboot flag is set, otherwise jumps to jump\\_if\\_not_set. The reboot flag can be set by [\`Delete\`][1] and [\`Rename\`][2], or manually with [\`SetRebootFlag\`][3].

## Parameters

    jump_if_set [jump_if_not_set]

## Example

    IfRebootFlag 0 noreboot
    MessageBox MB_YESNO "A reboot is required to finish the installation. Do you wish to reboot now?" IDNO noreboot
    Reboot
    noreboot:

## History

Added in NSIS v1.70

[1]: Delete.md
[2]: Rename.md
[3]: SetRebootFlag.md
`;var Di=`# IfRtlLanguage

Checks if active language is a RTL language.

**Warning:** Do not call this in \`[un].onInit\` because the language file has not been fully initialized.

## Parameters

    jump_if_true [jump_if_false]

## History

Added in NSIS v3.06
`;var Ai=`# IfShellVarContextAll

Checks if [\`SetShellVarContext\`][1] is set to all.

**Warning:** Do not call this in \`[un].onInit\` because the language file has not been fully initialized.

## Parameters

    jump_if_true [jump_if_false]

## History

Added in NSIS v3.06

[1]: SetShellVarContext.md
`;var _i=`# IfSilent

Checks the silent flag, and jumps to jump\\_if\\_silent if the installer is silent, otherwise jumps to jump\\_if\\_not. The silent flag can be set by [\`SilentInstall\`][1], [\`SilentUninstall\`][2], [\`SetSilent\`][3] and by the user passing \`/S\` on the command line.

## Parameters

    jump_if_set [jump_if_not_set]

## Example

    IfSilent +2
    ExecWait '"$INSTDIR\\nonsilentprogram.exe"'

## History

Added in NSIS v2.0 Beta 4

[1]: SilentInstall.md
[2]: SilentUnInstall.md
[3]: SetSilent.md
`;var Wi=`# InitPluginsDir

Initializes the plug-ins directory [\`$PLUGINSDIR\`][1] if not already initialized.

## Example

    InitPluginsDir
    File /oname=$PLUGINSDIR\\image.bmp image.bmp

## History

Added in NSIS v2.0 Beta 0

[1]: ../Variables/PLUGINSDIR.md
`;var Mi=`# InstallButtonText

If parameter is specified, overrides the default install button text (of "Install") with the specified text.

Accepts variables. If variables are used, they must be initialized before the install button shows.

## Parameters

    install_button_text

## History

Added in NSIS v1.60
`;var Oi=`# InstallColors

Sets the colors to use for the install info screen (the default is 00FF00 000000. Use the form RRGGBB (in hexadecimal, as in HTML, only minus the leading '#', since # can be used for comments). Note that if \`/windows\` is specified as the only parameter, the default windows colors will be used.

## Parameters

    /windows | (foreground_color background_color)

## History

Added in NSIS v1.2f
`;var Pi=`# InstallDir

Sets the default installation directory. See the variables section for variables that can be used to make this string (especially [\`$PROGRAMFILES\`][1]). Note that the part of this string following the last \\ will be used if the user selects 'browse', and may be appended back on to the string at install time (to disable this, end the directory with a \\ (which will require the entire parameter to be enclosed with quotes). If this doesn't make any sense, play around with the browse button a bit.

## Parameters

    definstdir

## History

Added in NSIS v1.0f

[1]: ../Variables/PROGRAMFILES.md
`;var Li=`# InstallDirRegKey

This attribute tells the installer to check a string in the registry and use it as the install dir if that string is valid. If this attribute is present, it will override the [\`InstallDir\`][1] attribute if the registry key is valid, otherwise it will fall back to the [\`InstallDir\`][1] value. When querying the registry, this command will automatically remove any quotes. If the string ends in ".exe", it will automatically remove the filename component of the string (i.e. if the string is "C:\\\\Program Files\\\\Foo\\\\app.exe", it will know to use "C:\\\\Program Files\\\\Foo"). For more advanced install directory configuration, set [\`$INSTDIR\`][2] in [\`.onInit\`][3].

Language strings and variables cannot be used with \`InstallDirRegKey\`.

## Parameters

    root_key subkey key_name

## Example

    InstallDirRegKey HKLM Software\\NSIS ""
    InstallDirRegKey HKLM Software\\ACME\\Thingy InstallLocation

## History

Added in NSIS v1.0f

[1]: InstallDir.md
[2]: ../Variables/INSTDIR.md
[3]: ../Callbacks/onInit.md
`;var Bi=`# InstProgressFlags

Valid values for flag are "smooth" (smooth the progress bar) or "colored" (color the progress bar with the colors set by [\`InstallColors\`][1].

Note: neither "smooth" or "colored" work with [\`XPStyle\`][2] on when the installer runs on Windows XP with a modern theme.

## Parameters

    [flag [...]]

## Example

    InstProgressFlags #default old-school windows look
    InstProgressFlags smooth" #new smooth look
    InstProgressFlags smooth colored #colored smooth look whee

## History

Added in NSIS v1.60

[1]: InstallColors.md
[2]: XPStyle.md
`;var ki=`# InstType

Adds an install type to the install type list, or disables the custom install type. There can be as many as 32 types, each one specifying the name of the install type. If the name is prefixed with 'un.' it is an uninstaller install type. The name can contain variables which will be processed at runtime before the components page shows. Another way of changing the InstType name during runtime is the [\`InstTypeSetText\`][1] command. The difference is that with [\`InstTypeSetText\`][1] you are saving your precious user variables. The first type is the default (generally 'Typical'). If the \`/NOCUSTOM\` switch is specified, then the "custom" install type is disabled, and the user has to choose one of the pre-defined install types. Alternatively, if the \`/CUSTOMSTRING\` switch is specified, the parameter will override the "Custom" install type text. Alternatively, if the \`/COMPONENTSONLYONCUSTOM\` flag is specified, the component list will only be shown if the "Custom" install type is selected.

Accepts variables for type names. If variables are used, they must be initialized before the components page is created.

## Parameters

    install_type_name | /NOCUSTOM | /CUSTOMSTRING=str | /COMPONENTSONLYONCUSTOM

## History

Added in NSIS v1.0f

[1]: InstTypeSetText.md
`;var Ui=`# InstTypeGetText

Gets the Text of the specified [\`InstType\`][1].

## Parameters

    inst_type_idx user_var

## Example

    InstType a
    InstType b
     
    Function .onInit
        InstTypeGetText 0 $0
        DetailPrint $0 # prints 'a'
        InstTypeGetText 1 $0
        DetailPrint $0 # prints 'b'
    FunctionEnd

## History

Added in NSIS v2.0

[1]: InstType.md
`;var Gi=`# InstTypeSetText

Sets the Text of the specified [\`InstType\`][1]. If the Text is empty than the [\`InstType\`][1] is removed. By using a previously unused inst\\_type\\_idx number you can create new [\`InstType\`][1]. To add/remove [\`Section\`][2] to this new [\`InstType\`][1] see [\`SectionSetInstTypes\`][3]. Unlike [\`SectionIn\`][4] the index is zero based, which means the first install type's index is 0.

Gets the Text of the specified [\`InstType\`][1].

## Parameters

    inst_type_idx text

## Example

    InstType a
    InstType b
     
    Function .onInit
        InstTypeGetText 0 $0
        DetailPrint $0 # prints 'a'
        InstTypeGetText 1 $0
        DetailPrint $0 # prints 'b'
    FunctionEnd

## History

Added in NSIS v2.0

[1]: InstType.md
[2]: Section.md
[3]: SectionSetInstTypes.md
[4]: SectionIn.md
`;var Hi=`# Int64Cmp

*This function is only available when building a 64-bit installer.*

Compares two integers val1 and val2. If val1 and val2 are equal, [\`Goto\`][1] jump\\_if\\_equal, otherwise if val1 < val2, [\`Goto\`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [\`Goto\`][1] jump\\_if\\_val1_more. Same as [IntCmp][2], but treats the values as 64-bit integers.

## Parameters

    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]

## History

Added in NSIS v3.03

[1]: Goto.md
[2]: IntCmp.md
`;var Ki=`# Int64CmpU

*This function is only available when building a 64-bit installer.*

Compares two unsigned integers val1 and val2. If val1 and val2 are equal, [\`Goto\`][1] jump\\_if\\_equal, otherwise if val1 < val2, [\`Goto\`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [\`Goto\`][1] jump\\_if\\_val1\\_more. Performs the comparison as unsigned integers. Same as [IntCmpU][2], but treats the values as 64-bit integers.

## Parameters

    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]

## History

Added in NSIS v3.03

[1]: Goto.md
[2]: IntCmpU.md
`;var Vi=`# Int64Fmt

*This function is only available when building a 64-bit installer.*

Formats the number in "numberstring" using the format "format", and sets the output to user variable $x. Example format strings include "%08X" "%u"

## Parameters

    user_var(output) format numberstring

## Example

    Int64Fmt $0 "%I64x" 244837743786702

## History

Added in NSIS v3.03
`;var Xi=`# IntCmp

Compares two integers val1 and val2. If val1 and val2 are equal, [\`Goto\`][1] jump\\_if\\_equal, otherwise if val1 < val2, [\`Goto\`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [\`Goto\`][1] jump\\_if\\_val1_more.

## Parameters

    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]

## Example

    IntCmp $0 5 is5 lessthan5 morethan5
    is5:
      DetailPrint "$$0 == 5"
      Goto done
    lessthan5:
      DetailPrint "$$0 < 5"
      Goto done
    morethan5:
      DetailPrint "$$0 > 5"
      Goto done
    done:

## History

Added in NSIS v1.50

[1]: Goto.md
`;var Yi=`# IntCmpU

Compares two unsigned integers val1 and val2. If val1 and val2 are equal, [\`Goto\`][1] jump\\_if\\_equal, otherwise if val1 < val2, [\`Goto\`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [\`Goto\`][1] jump\\_if\\_val1\\_more. Performs the comparison as unsigned integers.

## Parameters

    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]

## History

Added in NSIS v1.60

[1]: Goto.md
`;var zi=`# IntFmt

Formats the number in "numberstring" using the format "format", and sets the output to user variable $x. Example format strings include "%08X" "%u"

## Parameters

    user_var(output) format numberstring

## Example

    IntFmt $0 "0x%08X" 195948557
    IntFmt $0 "%c" 0x41

## History

Added in NSIS v1.60b
`;var qi=`# IntOp

Combines value1 and (depending on OP) value2 into the specified user variable (user_var). OP is defined as one of the following:

* "+" ADDs value1 and value2
* "-" SUBTRACTs value2 from value1
* "\u2217" MULTIPLIEs value1 and value2
* "/" DIVIDEs value1 by value2
* "%" MODULUSs value1 by value2
* "|" BINARY ORs value1 and value2
* "&" BINARY ANDs value1 and value2
* "^" BINARY XORs value1 and value2
* ">>" RIGHT SHIFTs value1 by value2
* "<<" LEFT SHIFTs value1 by value2
* "~" BITWISE NEGATEs value1 (i.e. 7 becomes 4294967288)
* "!" LOGICALLY NEGATEs value1 (i.e. 7 becomes 0)
* "||" LOGICALLY ORs value1 and value2
* "&&" LOGICALLY ANDs value1 and value2

## Parameters

    user_var(output) value1 OP [value2]

## Example

    IntOp $0 1 + 1
    IntOp $0 $0 + 1
    IntOp $0 $0 << 2
    IntOp $0 $0 ~
    IntOp $0 $0 & 0xF

## History

Added in NSIS v1.50
`;var ji=`# IntPtrCmp

Compares two integers val1 and val2. If val1 and val2 are equal, [\`Goto\`][1] jump\\_if\\_equal, otherwise if val1 < val2, [\`Goto\`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [\`Goto\`][1] jump\\_if\\_val1_more. Same as [IntCmp][2], but treats the values as pointer sized integers.

## Parameters

    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]

## History

Added in NSIS v3.03

[1]: Goto.md
[2]: IntCmp.md
`;var Zi=`# IntPtrCmpU

Compares two integers val1 and val2. If val1 and val2 are equal, [\`Goto\`][1] jump\\_if\\_equal, otherwise if val1 < val2, [\`Goto\`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [\`Goto\`][1] jump\\_if\\_val1_more. Same as [IntCmpU][2], but treats the values as pointer sized integers.

## Parameters

    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]

## History

Added in NSIS v3.03

[1]: Goto.md
[2]: IntCmpU.md
`;var Ji=`# IntPtrOp

Combines value1 and (depending on OP) value2 into the specified user variable (\`user_var\`). OP is the same list of operators as supported by [\`IntOp\`][1].

## Parameters

    user_var(output) value1 OP [value2]

## History

Added in NSIS v3.03

[1]: IntOp.md
`;var Qi=`# IsWindow

If HWND is a window, [\`Goto\`][1] jump\\_if\\_window, otherwise, [\`Goto\`][1] jump\\_if\\_not_window (if specified).

## Parameters

    HWND jump_if_window [jump_if_not_window]

## Example

    GetDlgItem $0 $HWNDPARENT 1
    IsWindow $0 0 +3
    MessageBox MB_OK "found a window"
    Goto +2
    MessageBox MB_OK "no window"

## History

Added in NSIS v1.51

[1]: Goto.md
`;var nr=`# LangString

Defines a multilingual string. This means its value may be different (or not, it's up to you) for every language. It allows you to easily make your installer multilingual without the need to add massive switches to the script.

Each language string has a name that identifies it and a value for each language used by the installer. They can be used in any runtime string in the script. To use a language string all you need to add to the string is \`$(LangString_name_here)\` where you want the \`LangString\` to be inserted.

Notes:

* Unlike defines that use curly braces - {}, language strings use parenthesis - ().
* If you change the language in the [\`.onInit\`][1] function, note that language strings in [\`.onInit\`][1] will still use the detected language based on the user's default Windows language, because the language is initialized after [\`.onInit\`][1].
* Always set language strings for every language in your script.
* If you set the language ID to 0 the last used language by \`LangString\` or [\`LoadLanguageFile\`][2] will be used.

## Parameters

    name language_id string

## Example

    LangString message \${LANG_ENGLISH} "English message"
    LangString message \${LANG_FRENCH} "French message"
    LangString message \${LANG_KOREAN} "Korean message"

    MessageBox MB_OK "A translated message: $(message)"

## History

Added in NSIS v2.0 Release Candidate 2

[1]: ../Callbacks/onInit.md
[2]: LoadLanguageFile.md
`;var er=`# LicenseBkColor

Sets the background color of the license data. Color is specified using the form RRGGBB (in hexadecimal, as in HTML, only minus the leading '#', since # can be used for comments). Default is \`/gray\`. You can also use the Windows OS defined color by using \`/windows\`.

## Parameters

    color | /gray | /windows

## History

Added in NSIS v2.0 Alpha 2
`;var tr=`# LicenseData

Specifies a text file or a RTF file to use for the license that the user can read. Omit this to not have a license displayed. Note that the file must be in DOS text format (\\\\r\\\\n). To define a multilingual license data use [\`LicenseLangString\`][1].

If you are using a RTF file it is recommended that you edit it with WordPad and not MS Word. Using WordPad will result in a much smaller file.

Use [\`LicenseLangString\`][1] to show a different license for every language.

## History

Added in NSIS v1.0f

[1]: LicenseLangString.md
`;var or=`# LicenseForceSelection

Specifies if the displayed license must be accept explicit or not. This can be done either by a checkbox or by radiobuttons. By default the "next button" is disabled and will only be enabled if the checkbox is enabled or the correct radio button is selected. If off is specified the "next button" is enabled by default.

## Parameters

    (checkbox [accept_text] | radiobuttons [accept_text] [decline_text] | off)

## Example

    LicenseForceSelection checkbox
    LicenseForceSelection checkbox "i accept"
    LicenseForceSelection radiobuttons
    LicenseForceSelection radiobuttons "i accept"
    LicenseForceSelection radiobuttons "i accept" "i decline"
    LicenseForceSelection radiobuttons "" "i decline"
    LicenseForceSelection off

## History

Added in NSIS v2.0 Beta 4
`;var ir=`# LicenseLangString

Does the same as [\`LangString\`][1] only it loads the string from a text/RTF file and defines a special [\`LangString\`][1] that can be used only by [\`LicenseData\`][2].

## Parameters

    name language_id license_path

## Example

    LicenseLangString license \${LANG_ENGLISH} license-english.txt
    LicenseLangString license \${LANG_FRENCH} license-french.txt
    LicenseLangString license \${LANG_GERMAN} license-german.txt
    LicenseData $(license)

## History

Added in NSIS v2.0 Beta 4

[1]: LangString.md
[2]: LicenseData.md
`;var rr=`# LicenseText

Used to change the default text on the license page.

The default string will be used if a string is empty ("").

Accepts variables. If variables are used, they must be initialized before the license page is created.

## Parameters

    [text [button_text]]

* text: Text above the controls, to the right of the installation icon.
* button_text: Text on the "I Agree" button.

## History

Added in NSIS v1.0f
`;var sr=`# PERemoveResource

Removes a resource added with [\`PEAddResource\`][PEAddResource].

## Parameters

    [/NOERRORS] restype resname reslang|ALL

## Example

    PERemoveResource "#Icon" "#200" ALL

## History

Added in NSIS v3.05

[PEAddResource]: PEAddResource.md
`;var ar=`# LoadLanguageFile

Loads a language file for the construction of a language table. All of the language files that come with NSIS are in Contrib\\Language Files
After you have inserted the language file \`\${LANG_langfile}\` will be defined as the language id (for example, \`\${LANG_ENGLISH}\` will be defined as 1033). Use it with [\`LangString\`][1], [\`LicenseLangString\`][2], [\`LangDLL\`][3] and [\`VIAddVersionKey\`][4].

## Parameters

    language_file.nlf

## History

Added in NSIS v2.0 Alpha 3

[1]: LangString.md
[2]: LicenseLangString.md
[3]: LangDLL.md
[4]: VIAddVersionKey.md
`;var lr=`# LockWindow

\`LockWindow\` on prevents the main window from redrawing itself upon changes. When \`LockWindow off\` is used, all controls that weren't redrawn since \`LockWindow on\` will be redrawn. This makes the pages flickering look nicer because now it flickers a group of controls at the same time, instead of one control at a time. The individual control flickering is more noticeable on old computers.

## Parameters

    on|off

## History

Added in NSIS v2.0
`;var dr=`# LogSet

Sets whether install logging to install.log will happen. [\`$INSTDIR\`][1] must have a value before you call this function or it will not work. Note that the NSIS\\_CONFIG\\_LOG build setting must be set (scons NSIS\\_CONFIG\\_LOG=yes) on compile time (it is not by default) to support this.

See [Building NSIS][2] for more information about recompiling NSIS.

## Parameters

    on|off

## History

Added in NSIS v1.98

[1]: ../Variables/INSTDIR.md
[2]: http://nsis.sourceforge.net/Docs//AppendixG.html#G
`;var cr=`# LogText

If installer logging is enabled, inserts text "text" into the log file.

## Parameters

    text

## Example

    IfFileExists $WINDIR\\notepad.exe 0 +2
    LogText "$$WINDIR\\notepad.exe exists"

## History

Added in NSIS v2.0 Release Candidate 2
`;var mr=`# ManifestDPIAware

Declare that the installer is DPI-aware. A DPI-aware application is not scaled by the DWM (DPI virtualization) so the text is never blurry. NSIS does not scale the bitmap used by the tree control on the component page and some plugins might have compatibility issues so make sure that you test your installer at different DPI settings if you select true.

See [MSDN][1] for more information about DPI-aware applications.

## Parameters

    notset|true|false

## History

Added in NSIS v3.0a0

[1]: http://msdn.microsoft.com/en-us/library/dd464660
`;var ur=`# ManifestLongPathAware

Declare that the installer can handle paths longer than \`MAX_PATH\`. Only supported on Windows 10 Anniversary Update and later.

**Note:** Instructions like [\`CopyFiles\`][CopyFiles] and [\`CreateShortcut\`][CreateShortcut] do not support long paths!

## Parameters

    notset|true|false

## History

Added in NSIS v3.05

[CopyFiles]: CopyFiles.md
[CreateShortcut]: CreateShortcut.md
`;var fr=`# ManifestMaxVersionTested

## Parameters

    maj.min.bld.rev

## History

Added in NSIS v3.05
`;var pr=`# ManifestSupportedOS

Declare that the installer is compatible with the specified Windows version(s). This adds a SupportedOS entry in the compatibility section of the application manifest. The default is Win7+8+8.1+10. none is the default if [\`RequestExecutionLevel\`][1] is set to none for compatibility reasons.

You can read more about the changes in behavior on [MSDN][2].

## Parameters

    none|all|WinVista|Win7|Win8|Win10|{GUID} [...]

## History

Added in NSIS v3.0a0

[1]: RequestExecutionLevel.md
[2]: http://msdn.microsoft.com/en-us/library/windows/desktop/hh848036
`;var hr=`# MessageBox

Displays a \`MessageBox\` containing the text "messagebox\\_text". mb\\_option\\_list must be one or more of the following, delimited by |s (e.g. MB\\_YESNO|MB\\_ICONSTOP).

* MB_OK - Display with an OK button
* MB_OKCANCEL - Display with an OK and a cancel button
* MB_ABORTRETRYIGNORE - Display with abort, retry, ignore buttons
* MB_RETRYCANCEL - Display with retry and cancel buttons
* MB_YESNO - Display with yes and no buttons
* MB_YESNOCANCEL - Display with yes, no, cancel buttons
* MB_ICONEXCLAMATION - Display with exclamation icon
* MB_ICONINFORMATION - Display with information icon
* MB_ICONQUESTION - Display with question mark icon
* MB_ICONSTOP - Display with stop icon
* MB_USERICON - Display with installer's icon
* MB_TOPMOST - Make messagebox topmost
* MB_SETFOREGROUND - Set foreground
* MB_RIGHT - Right align text
* MB_RTLREADING - RTL reading order
* MB_DEFBUTTON1 - Button 1 is default
* MB_DEFBUTTON2 - Button 2 is default
* MB_DEFBUTTON3 - Button 3 is default
* MB_DEFBUTTON4 - Button 4 is default

Return_check can be 0 (or empty, or left off), or one of the following:

* IDABORT - Abort button
* IDCANCEL - Cancel button
* IDIGNORE - Ignore button
* IDNO - No button
* IDOK - OK button
* IDRETRY - Retry button
* IDYES - Yes button

If the return value of the \`MessageBox\` is return_check, the installer will [\`Goto\`][1] jumpto.
Use the \`/SD\` parameter with one of the return_check values above to specify the option that will be used when the installer is silent. See section [4.12][2] for more information.

## Parameters

    mb_option_list messagebox_text [/SD return] [return_check jumpto] [return_check_2 jumpto_2]

## Example

    MessageBox MB_OK "simple message box"
    MessageBox MB_YESNO "is it true?" IDYES true IDNO false
    true:
      DetailPrint "it's true!"
      Goto next
    false:
      DetailPrint "it's false"
    next:
    MessageBox MB_YESNO "is it true? (defaults to yes on silent installations)" /SD IDYES IDNO false2
      DetailPrint "it's true (or silent)!"
      Goto next2
    false2:
      DetailPrint "it's false"
    next2:

## History

Added in NSIS v1.0f

[1]: Goto.md
[2]: http://nsis.sourceforge.net/Docs//Chapter4.html#4.12
`;var Sr=`# MiscButtonText

Replaces the default text strings for the four buttons (< Back, Next >, Cancel and Close). If parameters are omitted, the defaults are used.
Accepts variables. If variables are used, they must be initialized in [\`.onInit\`][1].

## Parameters

    [back_button_text [next_button_text] [cancel_button_text] [close_button_text]]

## History

Added in NSIS v1.60

[1]: ../Callbacks/onInit.md
`;var $r=`# Name

Sets the name of the installer. The name is usually simply the product name such as 'MyApp' or 'CrapSoft MyApp'. If you have one or more ampersands (&) in the name, set the second parameter to the same name, only with doubled ampersands.

Accepts variables. If variables are used, they must be initialized in [\`.onInit\`][1].

## Parameters

    name [name_doubled_ampersands]

## Example

    Name "Foobar"

If your product's name is "Foo & Bar", use:

    Name "Foo & Bar" "Foo && Bar"

If you have ampersands in the name and use a [\`LangString\`][2] for the name, you will have to create another one with doubled ampersands to use as the second parameter.

## History

Added in NSIS v1.0f

[1]: ../Callbacks/onInit.md
[2]: LangString.md
`;var gr=`# Nop

Does nothing.

## History

Added in NSIS v1.1n
`;var Ir=`# OutFile

Specifies the output file that the MakeNSIS should write the installer to. This is just the file that MakeNSIS writes, it doesn't affect the contents of the installer.

## Parameters

    [path\\]install.exe

## History

Added in NSIS v1.0f
`;var br=`# Page

Adds an installer page. See the above sections for more information about built-in versus custom pages and about callback functions.

internal_page_type can be:

* license - license page
* components - components selection page
* directory - installation directory selection page
* instfiles - installation page where the sections are executed
* uninstConfirm - uninstall confirmation page

The last page of the installer has its cancel button disabled to prevent confusion. To enable it anyway, use \`/ENABLECANCEL\`.

## Parameters

    custom [creator_function] [leave_function] [caption] [/ENABLECANCEL]

    internal_page_type [pre_function] [show_function] [leave_function] [/ENABLECANCEL]

## History

Added in NSIS v2.0 Beta 0
`;var yr=`# PageCallbacks

Sets the callback functions for a page defined using [\`PageEx\`][1]. Can only be used inside a [\`PageEx\`][1] block. See the above sections for more information about callback functions.

## Parameters

    ([creator_function] [leave_function]) | ([pre_function] [show_function] [leave_function])

## Example

    PageEx license
        PageCallbacks licensePre licenseShow licenseLeave
    PageExEnd

## History

Added in NSIS v2.0 Beta 0

[1]: PageEx.md
`;var xr=`# PageEx

Adds an installer page or an uninstaller page if the un. prefix was used. Every \`PageEx\` must have a matching [\`PageExEnd\`][1]. In a \`PageEx\` block you can set options that are specific to this page and will not be used for other pages. Options that are not set will revert to what was set outside the \`PageEx\` block or the default if nothing was set. To set the sub-caption for a page use [\`Caption\`][2] or [\`SubCaption\`][3] to set the default. To set the callback functions for a page set with \`PageEx\` use [\`PageCallbacks\`][4]. See the above sections for more information about built-in versus custom pages.

## Parameters

    [un.](custom|uninstConfirm|license|components|directory|instfiles)

## Example

    PageEx license
        LicenseText "Readme"
        LicenseData readme.rtf
    PageExEnd

    PageEx license
        LicenseData license.txt
        LicenseForceSelection checkbox
    PageExEnd

## History

Added in NSIS v2.0 Beta 4

[1]: PageExEnd.md
[2]: Caption.md
[3]: SubCaption.md
[4]: PageCallbacks.md
`;var Er=`# PageEx

Ends a [\`PageEx\`][1] block.

## Example

    PageEx license
        LicenseText "Readme"
        LicenseData readme.rtf
    PageExEnd

## History

Added in NSIS v2.0 Beta 4

[1]: PageEx.md
`;var wr=`# PEAddResource

Adds \`file\` as a resource to the installer and uninstaller. \`restype\` specifies the resource type and can be any string or # followed by a standard type or number. \`resname\` must be # followed by a number. \`reslang\` is optional and specifies the language id of the resource. Replacing standard NSIS resources is not supported, you should use [\`Icon\`][Icon] and [\`ChangeUI\`][ChangeUI] instead.

## Parameters

    [/OVERWRITE|/REPLACE] file restype resname [reslang]

## Example

    PEAddResource 0x020 0

## History

Added in NSIS v3.05

[Icon]: Icon.md
[ChangeUI]: ChangeUI.md
`;var Rr=`# PEDllCharacteristics

*This command has not yet been officially documented*

## Parameters

    addbits removebits

## Example

    PEDllCharacteristics 0x020 0

## History

Added in NSIS v3.0 Beta 1
`;var Cr=`# PERemoveResource

Removes a resource added with [\`PEAddResource\`][PEAddResource].

## Parameters

    [/NOERRORS] restype resname reslang|ALL

## Example

    PERemoveResource "#Icon" "#200" ALL

## History

Added in NSIS v3.05

[PEAddResource]: PEAddResource.md
`;var vr=`# PESubsysVer

*This command has not yet been officially documented*

## Parameters

    major.minor

## Example

    PESubsysVer 1.2

## History

Added in NSIS v3.0 Beta 2
`;var Nr=`# Pop

Pops a string off of the stack into user variable \`$var\`. If the stack is empty, the error flag will be set.

## Parameters

    user_var(out)

## Example

    Push 1
    Pop $0 # = 1

## History

Added in NSIS v1.50
`;var Fr=`# Push

Pushes a string onto the stack. The string can then be popped off of the stack using the [\`Pop\`][1] command.

## Parameters

    string

## Example

    Push "a string"

## History

Added in NSIS v1.50

[1]: Pop.md
`;var Tr=`# Quit

Causes the installer to exit as soon as possible. After \`Quit\` is called, the installer will exit (no callback functions will get a chance to run).

## History

Added in NSIS v1.90b2
`;var Dr=`# ReadEnvStr

Reads from the environment string "name" and sets the value into the user variable $x. If there is an error reading the string, the user variable is set to empty, and the error flag is set.

## Parameters

    user_var(output) name

## Example

    ReadEnvStr $0 WINDIR
    ReadEnvStr $1 TEMP

## History

Added in NSIS v1.58
`;var Ar=`# ReadINIStr

Reads from entry\\_name in [section\\_name] of ini\\_filename and stores the value into user variable $x. The error flag will be set and $x will be assigned to an empty string if the entry is not found.

## Parameters

    user_var(output) ini_filename section_name entry_name

## Example

    ReadINIStr $0 $INSTDIR\\winamp.ini winamp outname

## History

Added in NSIS v1.2g
`;var _r=`# ReadRegDWORD

Reads a 32 bit DWORD from the registry into the user variable $x. Valid values for root_key are listed under [\`WriteRegStr\`][1]. The error flag will be set and $x will be set to an empty string ("" which is 0) if the DWORD is not present. If the value is present, but is not a DWORD, it will be read as a string and the error flag will be set.

## Parameters

    user_var(output) root_key sub_key name

## Example

    ReadRegDWORD $0 HKLM Software\\NSIS VersionBuild

## History

Added in NSIS v1.50

[1]: WriteRegStr.md
`;var Wr=`# ReadRegStr

Reads from the registry into the user variable $x. Valid values for root\\_key are listed under [\`WriteRegStr\`][1]. The error flag will be set and $x will be set to an empty string ("") if the string is not present. If the value is present, but is of type REG\\_DWORD, it will be read and converted to a string and the error flag will be set.

## Parameters

    user_var(output) root_key sub_key name

## Example

    ReadRegStr $0 HKLM Software\\NSIS ""
    DetailPrint "NSIS is installed at: $0"

## History

Added in NSIS v1.2g

[1]: WriteRegStr.md
`;var Mr=`# Reboot

Reboots the computer. Be careful with this one. If it fails, [\`.onRebootFailed\`][1] is called. In any case, this instruction never returns, just like [\`Quit\`][2].

## Example

    MessageBox MB_YESNO|MB_ICONQUESTION "Do you wish to reboot the system?" IDNO +2
    Reboot

## History

Added in NSIS v1.70

[1]: ../Callbacks/onRebootFailed.md
[2]: Quit.md
`;var Or=`# ReadRegStr

Loads the specified DLL and calls DllRegisterServer (or entrypoint\\_name if specified). The error flag is set if an error occurs (i.e. it can't load the DLL, initialize OLE, find the entry point, or the function returned anything other than ERROR\\_SUCCESS (=0)).

Use [\`SetOutPath\`][1] to set the current directory for DLLs that depend on other DLLs that are now in the path or in the Windows directory

## Parameters

    dllfile [entrypoint_name]

## Example

If foo.dll depends on bar.dll which is located in $INSTDIR use:

    SetOutPath $INSTDIR
    RegDLL $INSTDIR\\foo.dll

## History

Added in NSIS v1.0i

[1]: SetOutPath.md
`;var Pr=`# Rename

Rename source\\_file to dest\\_file. You can use it to move a file from anywhere on the system to anywhere else and you can move a directory to somewhere else on the same drive. The destination file must not exist or the move will fail (unless you are using \`/REBOOTOK\`). If \`/REBOOTOK\` is specified, and the file cannot be moved (if, for example, the destination exists), then the file is moved when the system reboots. If the file will be moved on a reboot, the reboot flag will be set. The error flag is set if the file cannot be renamed (and \`/REBOOTOK\` is not used) or if the source file does not exist.

If no absolute path is specified the current folder will be used. The current folder is the folder set using the last [\`SetOutPath\`][1] instruction. If you have not used [\`SetOutPath\`][1] the current folder is [\`$EXEDIR\`][1].

## Parameters

    [/REBOOTOK] source_file dest_file

## Example

    Rename $INSTDIR\\file.ext $INSTDIR\\file.dat

## History

Added in NSIS v1.2

[1]: SetOutPath.md
[2]: ../Variables/EXEDIR.md
`;var Lr=`# RequestExecutionLevel

Specifies the requested execution level for Windows Vista and Windows 7. The value is embedded in the installer and uninstaller's XML manifest and tells Vista/7, and probably future versions of Windows, what privileges level the installer requires. *user* requests a normal user's level with no administrative privileges. *highest* will request the highest execution level available for the current user and will cause Windows to prompt the user to verify privilege escalation. The prompt might request for the user's password. *admin* requests administrator level and will cause Windows to prompt the user as well. Specifying none, which is also the default, will keep the manifest empty and let Windows decide which execution level is required. Windows Vista/7 automatically identifies NSIS installers and decides administrator privileges are required. Because of this, none and admin have virtually the same effect.

It's recommended that every application is marked with a required execution level. Unmarked installers are subject to compatibility mode. Workarounds of this mode include automatically moving any shortcuts created in the user's start menu to all users' start menu. Installers that don't install anything into system folders nor write to the local machine registry (HKLM) should specify \\e{user} execution level.

More information about this topic can be found at [MSDN][1]. Keywords include "UAC", "requested execution level", "vista manifest" and "vista security".

## Parameters

    none|user|highest|admin

## History

Added in NSIS v2.21

[1]: http://msdn.microsoft.com/en-us/library/bb756929
`;var Br=`# ReserveFile

Reserves a file in the data block for later use. Files are added to the compressed data block in the order they appear in the script. Functions, however, are not necessarily called in the order they appear in the script. Therefore, if you add a file in a function called early but put the function at the end of the script, all of the files added earlier will have to be decompressed to get to the required file. This process can take a long time if there a lot of files. [\`.onInit\`][1] is one such function. It is called at the very beginning, before anything else appears. If you put it at the very end of the script, extract some files in it and have lots of files added before it, the installer might take a very long time to load. This is where this command comes useful, allowing you to speed up the loading process by including the file at the top of the data block instead of letting NSIS seek all the way down to the bottom of the compressed data block.

See [\`File\`][2] for more information about the parameters.

## Parameters

    [/nonfatal] [/r] [/x file|wildcard [...]] file [file...]

## History

Added in NSIS v2.0 Beta 0

[1]: ../Callbacks/onInit.md
[2]: File.md
`;var kr=`# Rename

Returns from a [\`Function\`][1] or [\`Section\`][2].

## Example

    Function func
        StrCmp $0 "return now" 0 +2
        Return
        # do stuff
    FunctionEnd

    Section
        Call func
        ;"Return" will return here
    SectionEnd

## History

Added in NSIS v1.80

[1]: Function.md
[2]: Section.md
`;var Ur=`# RMDir

Remove the specified directory (fully qualified path with no wildcards). Without \`/r\`, the directory will only be removed if it is completely empty. If \`/r\` is specified, the directory will be removed recursively, so all directories and files in the specified directory will be removed. If \`/REBOOTOK\` is specified, any file or directory which could not have been removed during the process will be removed on reboot -- if any file or directory will be removed on a reboot, the reboot flag will be set. The error flag is set if any file or directory cannot be removed.

**Warning:** using RMDir /r $INSTDIR in the uninstaller is not safe. Though it is unlikely, the user might select to install to the Program Files folder and so this command will wipe out the entire Program Files folder, including other programs that has nothing to do with the uninstaller. The user can also put other files but the program's files and would expect them to get deleted with the program. Solutions are [available][2] for easily uninstalling only files which were installed by the installer.

## Parameters

    [/r] [/REBOOTOK] directory_name

## Example

    RMDir $INSTDIR
    RMDir $INSTDIR\\data
    RMDir /r /REBOOTOK $INSTDIR
    RMDir /REBOOTOK $INSTDIR\\DLLs

Note that the current working directory can not be deleted. The current working directory is set by [\`SetOutPath\`][1]. For example, the following example will not delete the directory.

    SetOutPath $TEMP\\dir
    RMDir $TEMP\\dir

The next example will succeed in deleting the directory.

    SetOutPath $TEMP\\dir
    SetOutPath $TEMP
    RMDir $TEMP\\dir

## History

Added in NSIS v1.0f

[1]: SetOutPath.md
[2]: http://nsis.sourceforge.net/Uninstall_only_installed_files
`;var Gr=`# SearchPath

Assign to the user variable $x, the full path of the file named by the second parameter. The error flag will be set and $x will be empty if the file cannot be found. Uses SearchPath() to search the system paths for the file.

## Parameters

    user_var(output) filename

## History

Added in NSIS v1.70
`;var Hr=`# Section

Begins and opens a new section. If section\\_name is empty, omitted, or begins with a -, then it is a hidden section and the user will not have the option of disabling it. If the section name is 'Uninstall' or is prefixed with 'un.', then it is a an uninstaller section. If section\\_index\\_output is specified, the parameter will be [\`!define\`][1]d with the section index (that can be used for [\`SectionSetText\`][2] etc). If the section name begins with a !, the section will be displayed as bold. If the /o switch is specified, the section will be unselected by default.

## Parameters

    [/o] [([!]|[-])section_name] [section_index_output]

## Example

    Section "-hidden section"
    SectionEnd
     
    Section # hidden section
    SectionEnd
     
    Section "!bold section"
    SectionEnd
     
    Section /o "optional"
    SectionEnd
     
    Section "install something" SEC_IDX
    SectionEnd

To access the section index, curly brackets must be used and the code must be located below the section in the script.

    Section test1 sec1_id
    SectionEnd
     
    Section test2 sec2_id
    SectionEnd
     
    Function .onInit
        SectionGetText \${sec2_id} $0
        MessageBox MB_OK "name of \${sec2_id}:$\\n$0" # will correctly display 'name of 1: test2'
    FunctionEnd

    Function .onInit
        SectionGetText \${sec2_id} $0
        MessageBox MB_OK "name of \${sec2_id}:$\\n$0" # will incorrectly display 'name of \${sec2_id}: test1'
        # plus a warning stating:
        #   unknown variable/constant "{sec2_id}" detected, ignoring
    FunctionEnd
     
    Section test1 sec1_id
    SectionEnd
     
    Section test2 sec2_id
    SectionEnd

## History

Added in NSIS v1.0f

[1]: !define.md
[2]: SectionSetText.md
`;var Kr=`# SectionEnd

This command closes the current open [\`Section\`][1].

## Example

    Section "install something" SEC_IDX
    SectionEnd

## History

Added in NSIS v1.3

[1]: Section.md
`;var Vr=`# SectionGetFlags

Retrieves the section's flags. See above for a description of the flag. The error flag will be set if an out of range section is specified.

## Parameters

    section_index user_var(output)

## Example

    Section test test_section_id
    SectionEnd

    Function .onSelChange
        # keep section 'test' selected
        SectionGetFlags \${test_section_id} $0
        IntOp $0 $0 | \${SF_SELECTED}
        SectionSetFlags \${test_section_id} $0
    FunctionEnd

## History

Added in NSIS v1.98
`;var Xr=`# SectionGetInstTypes

Retrieves the install types flags array of a section. See the explanation about [\`SectionSetInstTypes\`][1] for a description of how to deal with the output. The error flag will be set if the section index specified is out of range.

## Parameters

    section_index user_var(output)

## Example

    Section test test_section_id
    SectionEnd

    Function .onInit
        # associate section 'test' with installation types 5, on top of its existing associations
        SectionGetInstTypes \${test_section_id} $0
        IntOp $0 $0 | 16
        SectionSetInstTypes \${test_section_id} $0
    FunctionEnd

## History

Added in NSIS v2.0 Beta 3

[1]: SectionSetInstTypes.md
`;var Yr=`# SectionGetSize

Gets the Size of the section specified by section_index and stores the value in the given User Variable. Note that the Index starts with Zero.

## Parameters

    section_index user_var

## Example

    Section test test_section_id
    SectionEnd

    Function .onInit
        # increase required size of section 'test' by 100 bytes
        SectionGetSize \${test_section_id} $0
        IntOp $0 $0 + 100
        SectionSetSize \${test_section_id} $0
    FunctionEnd

## History

Added in NSIS v2.0 Beta 4
`;var zr=`# SectionGetText

Stores the text description of the section section_index into the output. If the section is hidden, stores an empty string. The error flag will be set if an out of range section is specified.

## Parameters

    section_index user_var(output)

## Example

    Function .onInit
        # append $WINDIR to section's name
        SectionGetText \${test_section_id} $0
        StrCpy $0 "$0 - $WINDIR"
        SectionSetText \${test_section_id} $0
    FunctionEnd

## History

Added in NSIS v1.98
`;var qr=`# SectionGroup

This command inserts a section group. The section group must be closed with [\`SectionGroupEnd\`][1], and should contain 1 or more sections. If the section group name begins with a !, its name will be displayed with a bold font. If \`/e\` is present, the section group will be expanded by default. If index_output is specified, the parameter will be [\`!define\`][2]d with the section index (that can be used for [\`SectionSetText\`][3] etc). If the name is prefixed with 'un.' the section group is an uninstaller section group.

## Parameters

    [/e] section_group_name [index_output]

## Example

    SectionGroup "some stuff"
        Section "a section"
        SectionEnd

        Section "another section"
        SectionEnd
    SectionGroupEnd

## History

Added in NSIS v2.05

[1]: SectionGroupEnd.md
[2]: !define.md
[3]: SectionSetText.md
`;var jr=`# SectionGroupEnd

Closes a section group opened with [\`SectionGroup\`][1].

## Example

    SectionGroup "some stuff"
        Section "a section"
        SectionEnd

        Section "another section"
        SectionEnd
    SectionGroupEnd

## History

Added in NSIS v2.05

[1]: SectionGroup.md
`;var Zr=`# SectionIn

This command specifies which install types (see [\`InstType\`][1]) the current section defaults to the enabled state in. Multiple \`SectionIn\` commands can be specified (they are combined). If you specify \`$RO\` as a parameter, then the section will be read-only, meaning the user won't be able to change its state. The first install type defined using [\`InstType'][1] is indexed 1, the next 2 and so on.

## Parameters

    insttype_index [insttype_index] [RO]

## Example

    InstType "full"
    InstType "minimal"
     
    Section "a section"
        SectionIn 1 2
    SectionEnd
     
    Section "another section"
        SectionIn 1
    SectionEnd

## History

Added in NSIS v1.0f

[1]: InstType.md
`;var Jr=`# SectionSetFlags

Sets the section's flags. The flag is a 32 bit integer. The first bit (lowest) represents whether the section is currently selected, the second bit represents whether the section is a section group (don't modify this unless you really know what you are doing), the third bit represents whether the section is a section group end (again, don't modify), the fourth bit represents whether the section is shown in bold or not, the fifth bit represents whether the section is read-only, the sixth bit represents whether the section group is to be automatically expanded, the seventh bit is set for section groups which are partially selected, the eighth bit is internally used for partially selected section group toggling and the ninth bit is used for reflecting section name changes. The error flag will be set if an out of range section is specified.

## Parameters

    section_index section_flags

## Example

Each flag has a name, prefixed with \`SF_\`:

    !define SF_SELECTED   1
    !define SF_SECGRP     2
    !define SF_SECGRPEND  4
    !define SF_BOLD       8
    !define SF_RO         16
    !define SF_EXPAND     32
    !define SF_PSELECTED  64

For an example of usage please see the [one-section.nsi][1] example.

For more useful macros and definitions, see Include\\Sections.nsh.

    Section test test_section_id
    SectionEnd
     
    Function .onInit
      # set section 'test' as selected and read-only
      IntOp $0 \${SF_SELECTED} | \${SF_RO}
      SectionSetFlags \${test_section_id} $0
    FunctionEnd

## History

Added in NSIS v1.98

[1]: http://nsis.sourceforge.net/Docs/Examples/one-section.nsi
`;var Qr=`# SectionSetInstTypes

Sets the install types the section specified by section\\_index defaults to the enabled state in. Note that the section index starts with zero. Every bit of inst\\_types is a flag that tells if the section is in that install type or not. For example, if you have 3 install types and you want the first section to be included in install types 1 and 3, then the command should look like this:

## Parameters

    section_index inst_types

## Example

    SectionSetInstTypes 0 5
    # because the binary value for 5 is "00000101". The error flag will be set if the section index specified is out of range.

    Section test test_section_id
    SectionEnd

    Function .onInit
        # associate section 'test' with installation types 3 and 4
        SectionSetInstTypes \${test_section_id} 12
    FunctionEnd

## History

Added in NSIS v2.0 Beta 3
`;var ns=`# SectionSetSize

Sets the Size of the section specified by section_index. Note that the Index starts with Zero. The Value for Size must be entered in KiloByte and supports only whole numbers.

## Parameters

    section_index new_size

## Example

    Section test test_section_id
    SectionEnd

    Function .onInit
        # set required size of section 'test' to 100 bytes
        SectionSetSize \${test_section_id} 100
    FunctionEnd

## History

Added in NSIS v2.0 Beta 4
`;var es=`# SectionSetText

Sets the description for the section section_index. If the text is set to "" then the section will be hidden. The error flag will be set if an out of range section is specified.

## Parameters

    section_index section_text

## Example

    Section "" test_section_id
    SectionEnd

    Function .onInit
        # change section's name to $WINDIR
        SectionSetText \${test_section_id} $WINDIR
    FunctionEnd

## History

Added in NSIS v1.98
`;var ts=`# SendMessage

Sends a message to HWND. If a user variable $x is specified as the last parameter (or one before the last if you use \`/TIMEOUT\`), the return value of \`SendMessage\` will be stored to it. Note that when specifying 'msg' you must just use the integer value of the message. If you wish to send strings use "STR:a string" as wParam or lParam where needed.

WM_CLOSE 16
WM_COMMAND 273
WM_USER 1024

Include WinMessages.nsh to have all of Windows messages defined in your script.

To send a string param, put STR: before the parameter, for example: "STR:Some string".

Use /TIMEOUT=time\\_in\\_ms to specify the duration, in milliseconds, of the time-out period.

## Parameters

    HWND msg wparam lparam [user_var(return value)] [/TIMEOUT=time_in_ms]

## Example

    !include WinMessages.nsh
    FindWindow $0 "Winamp v1.x"
    SendMessage $0 \${WM_CLOSE} 0 0

## History

Added in NSIS v1.51
`;var os=`# SetAutoClose

Overrides the default auto window-closing flag (specified for the installer using [\`AutoCloseWindow\`][1], and false for the uninstaller). Specify 'true' to have the install window immediately disappear after the install has completed, or 'false' to make it require a manual close.

## Parameters

    true|false

## History

Added in NSIS v1.42

[1]: AutoCloseWindow.md
`;var is=`# SetBrandingImage

Sets the current bitmap file displayed as the branding image. If no IMGID is specified, the first image control found will be used, or the image control created by [\`AddBrandingImage\`][1]. Note that this bitmap must be present on the user's machine. Use [\`File\`][2] first to put it there. If \`/RESIZETOFIT\` is specified the image will be automatically resized (very poorly) to the image control size. If you used [\`AddBrandingImage\`][1] you can get this size, by compiling your script and watching for [\`AddBrandingImage\`][1] output, it will tell you the size. \`SetBrandingImage\` will not work when called from [\`.onInit\`][3]!

## Parameters

    [/IMGID=item_id_in_dialog] [/RESIZETOFIT] path_to_bitmap_file.bmp

## History

Added in NSIS v2.0 Alpha 2

[1]: AddBrandingImage.md
[2]: File.md
[3]: ../Callbacks/onInit.md
`;var rs=`# SetCompress

This command sets the compress flag which is used by the installer to determine whether or not data should be compressed. Typically the \`SetCompress\` flag will affect the commands after it, and the last \`SetCompress\` command in the file also determines whether or not the install info section and uninstall data of the installer is compressed. If compressflag is 'auto', then files are compressed if the compressed size is smaller than the uncompressed size. If compressflag is set to 'force', then the compressed version is always used. If compressflag is 'off' then compression is not used (which can be faster).

Note that this option has no effect when solid compression is used.

## Parameters

    auto|force|off

## History

Added in NSIS v1.0f
`;var ss=`# SetCompressor

This command sets the compression algorithm used to compress files/data in the installer. It can only be used outside of sections and functions and before any data is compressed. Different compression methods can not be used for different files in the same installer. It is recommended to use it on the very top of the script to avoid compilation errors.

Three compression methods are supported: ZLIB, BZIP2 and LZMA.

ZLIB (the default) uses the deflate algorithm, it is a quick and simple method. With the default compression level it uses about 300 KB of memory.

BZIP2 usually gives better compression ratios than ZLIB, but it is a bit slower and uses more memory. With the default compression level it uses about 4 MB of memory.

LZMA is a new compression method that gives very good compression ratios. The decompression speed is high (10-20 MB/s on a 2 GHz CPU), the compression speed is lower. The memory size that will be used for decompression is the dictionary size plus a few KBs, the default is 8 MB.

If \`/FINAL\` is used, subsequent calls to SetCompressor will be ignored.

If \`/SOLID\` is used, all of the installer data is compressed in one block. This results in greater compression ratios.

## Parameters

    [/SOLID] [/FINAL] zlib|bzip2|lzma

## History

Added in NSIS v2.0 Alpha 2
`;var as=`# SetCompressorDictSize

Sets the dictionary size in megabytes (MB) used by the LZMA compressor (default is 8 MB).

## Parameters

    dict_size_mb

## History

Added in NSIS v2.0
`;var ls=`# SetCtlColors

Sets a background color and the text color for a static control, edit control, button or a dialog. text\\_color and bg\\_color don't accept variables. Use [\`GetDlgItem\`][1] to get the handle (HWND) of the control. To make the control transparent specify "transparent" as the background color value. You can also specify \`/BRANDING\` with or without text color and background color to make the control completely gray (or any other color you choose). This is used by the branding text control in the MUI.

Warning: setting the background color of check boxes to "transparent" may not function properly when using [\`XPStyle\`][2] on. The background may be completely black, instead of transparent, when using certain Windows themes.

## Parameters

    hwnd [/BRANDING] [text_color] [transparent|bg_color]

## Example

    FindWindow $0 "#32770" "" $HWNDPARENT
    GetDlgItem $0 $0 1006
    SetCtlColors $0 0xFF0000 0x00FF00

## History

Added in NSIS v2.0 Release Candidate 2

[1]: GetDlgItem.md
[2]: XPStyle.md
`;var ds=`# SetCurInstType

Sets the current [\`InstType\`][1]. inst\\_type\\_idx should be between 0 and 31. The Error Flag is not set if an out of range [\`InstType\`][1] was used.

## Parameters

    inst_type_idx

## History

Added in NSIS v2.0 Beta 4

[1]: InstType.md
`;var cs=`# SetDatablockOptimize

This command tells the compiler whether or not to do datablock optimizations. Datablock optimizations have the compiler check to see if any data being added to the data block is already in the data block, and if so, it is simply referenced as opposed to added (can save a little bit of size). It is highly recommended to leave this option on.

## Parameters

    on|off

## History

Added in NSIS v1.1i
`;var ms=`# SetDateSave

This command sets the file date/time saving flag which is used by the File command to determine whether or not to save the last write date and time of the file, so that it can be restored on installation. Valid flags are 'on' and 'off'. 'on' is the default.

## Parameters

    on|off

## History

Added in NSIS v1.1a
`;var us=`# SetDetailsPrint

Sets mode at which commands print their status. None has commands be quiet, listonly has status text only added to the listbox, textonly has status text only printed to the status bar, and both enables both (the default). For extracting many small files, textonly is recommended (especially on Windows 9x with smooth scrolling enabled).

## Parameters

    none|listonly|textonly|both|lastused

## Example

    SetDetailsPrint none
    File "secret file.dat"
    SetDetailsPrint both

## History

Added in NSIS v1.62
`;var fs=`# SetDetailsView

Shows or hides the details, depending on which parameter you pass. Overrides the default details view, which is set via [\`ShowInstDetails\`][1].

## Parameters

    show|hide

## History

Added in NSIS v1.1t

[1]: ShowInstDetails.md
`;var ps=`# SetErrorLevel

Sets the error level of the installer or uninstaller to error_level. See Error Levels for more information.

## Parameters

    error_level

## Example

    IfRebootFlag 0 +2
    SetErrorLevel 4

## History

Added in NSIS v2.02
`;var hs=`# SetErrors

Sets the error flag.

## Example

    SetErrors
    IfErrors 0 +2
    MessageBox MB_OK "this message box will always show"

## History

Added in NSIS v1.2g
`;var Ss=`# SetFileAttributes

Sets the file attributes of 'filename'. Valid attributes can be combined with | and are:

* NORMAL or FILE_ATTRIBUTE_NORMAL (you can use 0 to abbreviate this)
* ARCHIVE or FILE_ATTRIBUTE_ARCHIVE
* HIDDEN or FILE_ATTRIBUTE_HIDDEN
* OFFLINE or FILE_ATTRIBUTE_OFFLINE
* READONLY or FILE_ATTRIBUTE_READONLY
* SYSTEM or FILE_ATTRIBUTE_SYSTEM
* TEMPORARY or FILE_ATTRIBUTE_TEMPORARY

The error flag will be set if the file's attributes cannot be set (i.e. the file doesn't exist, or you don't have the right permissions). You can only set attributes. It's not possible to unset them. If you want to remove an attribute use NORMAL. This way all attributes are erased. This command doesn't support wildcards.

## Parameters

    filename attribute1|attribute2|...

## History

Added in NSIS v1.2c
`;var $s=`# SetFont

Sets the installer font. Please remember that the font you choose must be present on the user's machine as well. Don't use rare fonts that only you have.

Use the \`/LANG\` switch if you wish to set a different font for each language.

There are two LangStrings named ^Font and ^FontSize which contain the font and font size for every language.

## Parameters

    [/LANG=lang_id] font_face_name font_size

## Example

     SetFont /LANG=\${LANG_ENGLISH} "English Font" 9
     SetFont /LANG=\${LANG_FRENCH} "French Font" 10

## History

Added in NSIS v1.3
`;var gs=`# SetOutPath

Sets the output path ([\`$OUTDIR\`][1]) and creates it (recursively if necessary), if it does not exist. Must be a full pathname, usually is just [\`$INSTDIR\`][2] (you can specify [\`$INSTDIR\`][2] if you are lazy with a single "-").

## Parameters

    outpath

## Example

    SetOutPath $INSTDIR
    File program.exe

## History

Added in NSIS v1.0f

[1]: ../Variables/OUTDIR.md
[2]: ../Variables/INSTDIR.md
`;var Is=`# SetOverwrite

This command sets the overwrite flag which is used by the [\`File\`][1] command to determine whether or not the file should overwrite any existing files that are present. If overwriteflag is 'on', files are overwritten (this is the default). If overwriteflag is 'off', files that are already present are not overwritten. If overwriteflag is 'try', files are overwritten if possible (meaning that if the file is not able to be written to, it is skipped without any user interaction). If overwriteflag is 'ifnewer', then files are only overwritten if the existing file is older than the new file. If overwriteflag is 'ifdiff', then files are only overwritten if the existing file is older or newer than the new file. Note that when in 'ifnewer' or 'ifdiff' mode, the destination file's date is set, regardless of what [\`SetDateSave\`][2] is set to.

## Parameters

    on|off|try|ifnewer|ifdiff|lastused

## Example

    SetOverwrite off
    File program.cfg # config file we don't want to overwrite
    SetOverwrite on

## History

Added in NSIS v1.0f

[1]: File.md
[2]: SetDateSave.md
`;var bs=`# SetRebootFlag

Sets the reboot flag to either true or false. The flag's value can be read using [\`IfRebootFlag\`][1].

## Parameters

    true|false

## Example

    SetRebootFlag true
    IfRebootFlag 0 +2
    MessageBox MB_OK "this message box will always show"

## History

Added in NSIS v1.70

[1]: IfRebootFlag.md
`;var ys=`# SetRegView

Sets the registry view affected by registry commands. On Windows x64 there are two views. One for 32-bit applications and one for x64 applications. By default, 32-bit applications running on x64 systems under WOW64 have access only to the 32-bit view. Using SetRegView 64 allows the installer to access keys in the x64 view of the registry.

Affects [\`DeleteRegKey\`][1], [\`DeleteRegValue\`][2], [\`EnumRegKey\`][3], [\`EnumRegValue\`][4], [\`ReadRegDWORD\`][5], [\`ReadRegStr\`][6], [\`WriteRegBin\`][7], [\`WriteRegDWORD\`][8], [\`WriteRegStr\`][9] and [\`WriteRegExpandStr\`][10].

Does not affect [\`InstallDirRegKey\`][11]. Instead, the registry can be read using [\`ReadRegStr\`][6] in [\`.onInit\`][12].

## Parameters

    32|64|lastused

## Example

    SetRegView 32
    ReadRegStr $0 HKLM Software\\Microsoft\\Windows\\CurrentVersion ProgramFilesDir
    DetailPrint $0 # prints C:\\Program Files (x86)
    SetRegView 64
    ReadRegStr $0 HKLM Software\\Microsoft\\Windows\\CurrentVersion ProgramFilesDir
    DetailPrint $0 # prints C:\\Program Files

    Function .onInit
        SetRegView 64
        ReadRegStr $INSTDIR HKLM Software\\NSIS ""
        SetRegView 32
    FunctionEnd

## History

Added in NSIS v2.26

[1]: DeleteRegKey.md
[2]: DeleteRegValue.md
[3]: EnumRegKey.md
[4]: EnumRegValue.md
[5]: ReadRegDWORD.md
[6]: ReadRegStr.md
[7]: WriteRegBin.md
[8]: WriteRegDWORD.md
[9]: WriteRegStr.md
[10]: WriteRegExpandStr.md
[11]: InstallDirRegKey.md
[12]: ../Callbacks/onInit.md
`;var xs=`# SetShellVarContext

Sets the context of [\`$SMPROGRAMS\`][1] and other shell folders. If set to 'current' (the default), the current user's shell folders are used. If set to 'all', the 'all users' shell folder is used. The all users folder may not be supported on all OSes. If the all users folder is not found, the current user folder will be used. Please take into consideration that a "normal user" has no rights to write in the all users area. Only admins have full access rights to the all users area. You can check this by using the UserInfo plug-in. See Contrib\\UserInfo\\UserInfo.nsi for an example.

Note that, if used in installer code, this will only affect the installer, and if used in uninstaller code, this will only affect the uninstaller. To affect both, it needs to be used in both.

## Parameters

    current|all

## Example

    SetShellVarContext current
    StrCpy $0 $DESKTOP
    SetShellVarContext all
    StrCpy $1 $DESKTOP
    MessageBox MB_OK $0$\\n$1

## History

Added in NSIS v1.98

[1]: ../Variables/SMPROGRAMS.md
`;var Es=`# SetSilent

Sets the installer to silent mode or normal mode. See [\`SilentInstall\`][1] for more information about silent installations. Can only be used in [\`.onInit\`][2].

## Parameters

    silent | normal

## History

Added in NSIS v2.0 Beta 4

[1]: SilentInstall.md
[2]: ../Callbacks/onInit.md
`;var ws=`# ShowInstDetails

Sets whether or not the details of the install are shown. Can be 'hide' to hide the details by default, allowing the user to view them, or 'show' to show them by default, or 'nevershow', to prevent the user from ever seeing them. Note that sections can override this using [\`SetDetailsView\`][1].

## Parameters

    hide|show|nevershow

## History

Added in NSIS v1.1a

[1]: SetDetailsView.md
`;var Rs=`# ShowUninstDetails

Sets whether or not the details of the uninstall are shown. Can be 'hide' to hide the details by default, allowing the user to view them, or 'show' to show them by default, or 'nevershow', to prevent the user from ever seeing them. Note that sections can override this using [\`SetDetailsView\`][1].

## Parameters

    hide|show|nevershow

## History

Added in NSIS v1.60

[1]: SetDetailsView.md
`;var Cs=`# ShowWindow

Sets the visibility of a window. Possible show\\_states are the same as [Windows ShowWindow][1] function. SW\\_* constants are defined in [Include\\WinMessages.nsh][2].

## Parameters

    hwnd show_state

## Example

    !include WinMessages.nsh
    GetDlgItem $0 $HWNDPARENT 1
    ShowWindow $0 \${SW_HIDE}
    Sleep 1000
    ShowWindow $0 \${SW_SHOW}

## History

Added in NSIS v2.0

[1]: http://msdn2.microsoft.com/en-us/library/ms633548
[2]: http://nsis.sourceforge.net/Docs/Include/WinMessages.nsh
`;var vs=`# SilentInstall

Specifies whether or not the installer should be silent. If it is 'silent' or 'silentlog', all sections that have the SF_SELECTED flag are installed quietly (you can set this flag using [\`SectionSetFlags\`][1]), with no screen output from the installer itself (the script can still display whatever it wants, use [\`MessageBox\`][2]'s \`/SD\` to specify a default for silent installers). Note that if this is set to 'normal' and the user runs the installer with \`/S\` (case sensitive) on the command line, it will behave as if \`SilentInstall\` 'silent' was used.

Note: see also [\`LogSet\`][3].

## Parameters

    normal|silent|silentlog

## History

Added in NSIS v1.0f

[1]: SectionSetFlags.md
[2]: MessageBox.md
[3]: LogSet.md
`;var Ns=`# SilentUnInstall

Specifies whether or not the uninstaller should be silent. If it is 'silent' the uninstall sections will run quietly, with no screen output from the uninstaller itself (the script can still display whatever it wants, use [\`MessageBox\`][1]'s \`/SD\` to specify a default for silent uninstallers). Note that if this is set to 'normal' and the user runs the uninstaller with \`/S\` on the command line, it will behave as if \`SilentUnInstall 'silent' was used.

Note: see also [\`LogSet\`][2].

## Parameters

    normal|silent

## History

Added in NSIS v1.7b2

[1]: MessageBox.md
[2]: LogSet.md
`;var Fs=`# Sleep

Pauses execution in the installer for \`sleeptime_in_ms\` milliseconds. \`sleeptime_in_ms\` can be a variable, e.g. "$0" or a number, i.e. "666".

## Parameters

    sleeptime_in_ms

## Example

    DetailPrint "sleeping..."
    Sleep 3000
    DetailPrint "back to work"

## History

Added in NSIS v1.1a
`;var Ts=`# SpaceTexts

If parameters are specified, overrides the space required and space available text ("Space required: " and "Space available: " by default). If 'none' is specified as the required text no space texts will be shown.

Accepts variables. If variables are used, they must be initialized before the components page is created.

## Parameters

    [req_text [avail_text]]

## History

Added in NSIS v2.0 Alpha 0
`;var Ds=`# StrCmp

Compares (case insensitively) str1 to str2. If str1 and str2 are equal, [\`Goto\`][1] jump\\_if\\_equal, otherwise [\`Goto\`][1] jump\\_if\\_not\\_equal.

## Parameters

    str1 str2 jump_if_equal [jump_if_not_equal]

## Example

    StrCmp $0 "a string" 0 +3
    DetailPrint '$$0 == "a string"'
    Goto +2
    DetailPrint '$$0 != "a string"'

## History

Added in NSIS v1.2g

[1]: Goto.md
`;var As=`# StrCmpS

Compares (case sensitively) str1 to str2. If str1 and str2 are equal, [\`Goto\`][1] jump_if_equal, otherwise [\`Goto\`][1] jump_if_not_equal.

## Parameters

    str1 str2 jump_if_equal [jump_if_not_equal]

## Example

    StrCmp $0 "a string" 0 +3
    DetailPrint '$$0 == "a string"'
    Goto +2
    DetailPrint '$$0 != "a string"'

## History

Added in NSIS v2.13

[1]: Goto.md
`;var _s=`# StrCpy

Sets the user variable $x with str. Note that str can contain other variables, or the user variable being set (concatenating strings this way is possible, etc). If maxlen is specified, the string will be a maximum of maxlen characters (if maxlen is negative, the string will be truncated abs(maxlen) characters from the end). If start\\_offset is specified, the source is offset by it (if start\\_offset is negative, it will start abs(start_offset) from the end of the string).

## Parameters

    user_var(destination) str [maxlen] [start_offset]

## Example

    StrCpy $0 "a string" # = "a string"
    StrCpy $0 "a string" 3 # = "a s"
    StrCpy $0 "a string" -1 # = "a strin"
    StrCpy $0 "a string" "" 2 # = "string"
    StrCpy $0 "a string" "" -3 # = "ing"
    StrCpy $0 "a string" 3 -4 # = "rin"

## History

Added in NSIS v1.2g
`;var Ws=`# StrLen

Sets user variable $x with the length of str.

## Parameters

    user_var(length output) str

## Example

    StrLen $0 "123456" # = 6

## History

Added in NSIS v1.60
`;var Ms=`# SubCaption

Overrides the subcaptions for each of the installer pages (0=": License Agreement",1=": Installation Options",2=": Installation Directory", 3=": Installing Files", 4=": Completed"). If you specify an empty string (""), the default will be used (you can however specify " " to achieve a blank string).

You can also set a subcaption (or override the default) using [\`Caption\`][1] inside a [\`PageEx\`][2] block.

Accepts variables. If variables are used, they must be initialized before the relevant page is created.

## Parameters

    [page_number subcaption]

## History

Added in NSIS v1.56

[1]: Caption.md
[2]: PageEx.md
`;var Os=`# Unicode

Generate a Unicode installer. It can only be used outside of sections and functions and before any data is compressed.

## Parameters

    true|false

## History

Added in NSIS v3.0a
`;var Ps=`# UninstallButtonText

Changes the text of the button that by default says "Uninstall" in the uninstaller. If no parameter is specified, the default text is used.

Accepts variables. If variables are used, they must be initialized before the uninstall button shows.

## Parameters

    text

## History

Added in NSIS v1.60

[1]: WriteUninstaller.md
`;var Ls=`# UninstallCaption

Sets what the titlebars of the uninstaller will display. By default it is '$(^Name) Uninstall', where [\`Name\`][1] is specified with the Name command. You can, however, override it with 'MyApp uninstaller' or whatever. If you specify an empty string (""), the default will be used (you can specify " " to simulate a empty string).

Accepts variables. If variables are used, they must be initialized in [\`un.onInit\`][2].

## Parameters

    caption

## History

Added in NSIS v1.56

[1]: Name.md
[2]: ../Callbacks/un.onInit.md
`;var Bs=`# UninstallIcon

Sets the icon of the uninstaller.

## Parameters

    [path\\]icon.ico

## History

Added in NSIS v1.0f
`;var ks=`# UninstallSubCaption

Sets the default subcaptions for the uninstaller pages (0=": Confirmation",1=": Uninstalling Files",2=": Completed"). If you specify an empty string (""), the default will be used (you can however specify " " to simulate an empty string).

You can also set a subcaption (or override the default) using [\`Caption\`][1] inside a [\`PageEx\`][2] block.

Accepts variables. If variables are used, they must be initialized before the relevant page is created.

## Parameters

    page_number subcaption

## History

Added in NSIS v1.56

[1]: Caption.md
[2]: PageEx.md
`;var Us=`# UninstallText

Specifies the texts on the uninstaller confirm page.

Accepts variables. If variables are used, they must be initialized before the uninstaller confirm page is created.

## Parameters

    text [subtext]

* text: Text above the controls
* subtext: Text next to the uninstall location

## History

Added in NSIS v1.0f
`;var Gs=`# UninstPage

Adds an uninstaller page. See the above sections for more information about built-in versus custom pages and about callback functions.

## Parameters

    custom [creator_function] [leave_function] [caption] [/ENABLECANCEL]
    internal_page_type [pre_function] [show_function] [leave_function] [/ENABLECANCEL]

internal_page_type can be:

* license - license page
* components - components selection page
* directory - installation directory selection page
* instfiles - installation page where the sections are executed
* uninstConfirm - uninstall confirmation page

## History

Added in NSIS v2.0 Beta 0
`;var Hs=`# UnRegDLL

Loads the specified DLL and calls DllUnregisterServer. The error flag is set if an error occurs (i.e. it can't load the DLL, initialize OLE, find the entry point, or the function returned anything other than ERROR_SUCCESS (=0)).

## Parameters

    dllfile

## History

Added in NSIS v1.0i
`;var Ks=`# Var

Declare a user variable. Allowed characters for variables names: [a-z][A-Z][0-9] and '_'. All defined variables are global, even if defined in a section or a function. To make this clear, variables defined in a section or a function must use the \`/GLOBAL\` flag. The \`/GLOBAL\` flag is not required outside of sections and functions.

## Parameters

    [/GLOBAL] var_name

## Example

    Var example
 
    Function testVar
        Var /GLOBAL example2

        StrCpy $example "example value"
        StrCpy $example2 "another example value"
    FunctionEnd

## History

Added in NSIS v2.0 Beta 4
`;var Vs=`# VIAddVersionKey

Adds a field in the Version Tab of the File Properties. This can either be a field provided by the system or a user defined field. The following fields are provided by the System:

* ProductName
* Comments
* CompanyName
* LegalCopyright
* FileDescription
* FileVersion
* ProductVersion
* InternalName
* LegalTrademarks
* OriginalFilename
* PrivateBuild
* SpecialBuild

The name of these fields are translated on the target system, whereas user defined fields remain untranslated.

## Parameters

    [/LANG=lang_id] keyname value

## Example

    VIAddVersionKey /LANG=\${LANG_ENGLISH} "ProductName" "Test Application"
    VIAddVersionKey /LANG=\${LANG_ENGLISH} "Comments" "A test comment"
    VIAddVersionKey /LANG=\${LANG_ENGLISH} "CompanyName" "Fake company"
    VIAddVersionKey /LANG=\${LANG_ENGLISH} "LegalTrademarks" "Test Application is a trademark of Fake company"
    VIAddVersionKey /LANG=\${LANG_ENGLISH} "LegalCopyright" "\xA9 Fake company"
    VIAddVersionKey /LANG=\${LANG_ENGLISH} "FileDescription" "Test Application"
    VIAddVersionKey /LANG=\${LANG_ENGLISH} "FileVersion" "1.2.3"

## History

Added in NSIS v2.0 Beta 4
`;var Xs=`# VIFileVersion

Sets the File Version in the VS\\_FIXEDFILEINFO version information block (You should also set the FileVersion string with [\`VIAddVersionKey\`][1] so the information is displayed at the top of the Version Tab in the Properties of the file). If you don't provide a File Version the Product Version is used in the VS\\_FIXEDFILEINFO block.

## Parameters

    [version_string_X.X.X.X]

## Example

    VIFileVersion 1.2.3.4

## History

Added in NSIS v3.0a0

[1]: VIAddVersionKey.md
`;var Ys=`# VIProductVersion

Adds the Product Version on top of the Version Tab in the Properties of the file.

## Parameters

    [version_string_X.X.X.X]

## Example

    VIProductVersion "1.2.3.4"

## History

Added in NSIS v2.0
`;var zs=`# WindowIcon

Sets whether or not the installer's icon is displayed on certain pages.

## Parameters

    on|off

## History

Added in NSIS v1.70
`;var qs=`# WriteINIStr

Writes entry\\_name=value into [section\\_name] of ini\\_filename. The error flag is set if the string could not be written to the ini file.

## Parameters

    ini_filename section_name entry_name value

## Example

    WriteINIStr $TEMP\\something.ini section1 something 123
    WriteINIStr $TEMP\\something.ini section1 somethingelse 1234
    WriteINIStr $TEMP\\something.ini section2 nsis true

## History

Added in NSIS v1.0f
`;var js=`# WriteRegBin

This command writes a block of binary data to the registry. Valid values for root_key are listed under \`WriteRegStr\`. Valuedata is in hexadecimal (e.g. DEADBEEF01223211151). The error flag is set if the binary data could not be written to the registry. If the registry key doesn't exist it will be created.

## Parameters

    root_key subkey key_name valuedata

## Example

    WriteRegBin HKLM "Software\\My Company\\My Software" "Binary Value" DEADBEEF01223211151

## History

Added in NSIS v1.0f
`;var Zs=`# WriteRegDWORD

This command writes a dword (32 bit integer) to the registry (a user variable can be specified). Valid values for root_key are listed under [\`WriteRegStr\`][1]. The error flag is set if the dword could not be written to the registry. If the registry key doesn't exist it will be created.

## Parameters

    root_key subkey key_name value

## Example

    WriteRegDWORD HKLM "Software\\My Company\\My Software" "DWORD Value" 0xDEADBEEF

## History

Added in NSIS v1.0f

[1]: WriteRegStr.md
`;var Js=`# WriteRegExpandStr

Write a string to the registry. root\\_key must be one of:

* HKCR or HKEY\\_CLASSES\\_ROOT
* HKLM or HKEY\\_LOCAL\\_MACHINE
* HKCU or HKEY\\_CURRENT\\_USER
* HKU or HKEY_USERS
* HKCC or HKEY\\_CURRENT\\_CONFIG
* HKDD or HKEY\\_DYN\\_DATA
* HKPD or HKEY\\_PERFORMANCE\\_DATA
* SHCTX or SHELL_CONTEXT

If root\\_key is SHCTX or SHELL\\_CONTEXT, it will be replaced with HKLM if [\`SetShellVarContext\`][1] is set to all and with HKCU if [\`SetShellVarContext\`][1] is set to current.

The error flag is set if the string could not be written to the registry. The type of the string will be REG\\_SZ for [\`WriteRegStr\`][2], or REG\\_EXPAND\\_STR for [\`WriteRegExpandStr\`][3]. If the registry key doesn't exist it will be created.

## Parameters

    root_key subkey key_name value

## History

Added in NSIS v1.6beta2

[1]: SetShellVarContext.md
[2]: WriteRegStr.md
[3]: WriteRegExpandStr.md
`;var Qs=`# WriteRegMultiStr

Writes a multi-string value. The \`/REGEDIT5\` switch must be used and specifies that the data is in the hex format used by \`.reg\` files on Windows 2000 and later.

## Parameters

    root_key subkey key_name value

## Example

    WriteRegMultiStr HKLM "Software\\My Company\\My Software" "String Value" "dead beef"

## History

Added in NSIS v3.02
`;var na=`# WriteRegStr

Write a string to the registry. See [\`WriteRegExpandStr\`][1] for more details.

## Parameters

    root_key subkey key_name value

## Example

    WriteRegStr HKLM "Software\\My Company\\My Software" "String Value" "dead beef"

## History

Added in NSIS v1.0f

[1]: WriteRegExpandStr.md
`;var ea=`# WriteUninstaller

Writes the uninstaller to the filename (and optionally path) specified. Only valid from within an install section or function, and requires that you have an uninstall section in your script. See also Uninstall configuration. You can call this one or more times to write out one or more copies of the uninstaller.

## Parameters

    [Path\\]exename.exe

## Example

    WriteUninstaller $INSTDIR\\uninstaller.exe

## History

Added in NSIS v1.80
`;var ta=`# XPStyle

Sets whether or not a XP visual style manifest will be added to the installer. This manifest makes the installers controls use the new visual styles when running on Windows XP and later. This affects the uninstaller too.

## Parameters

    on|off

## Example

    WriteUninstaller $INSTDIR\\uninstaller.exe

## History

Added in NSIS v2.0 Alpha 2
`;var gl={_addincludedir:{name:"!addincludedir",content:bt},_addplugindir:{name:"!addplugindir",content:yt},_appendfile:{name:"!appendfile",content:xt},_cd:{name:"!cd",content:Et},_define:{name:"!define",content:wt},_delfile:{name:"!delfile",content:Rt},_echo:{name:"!echo",content:Ct},_else:{name:"!else",content:vt},_endif:{name:"!endif",content:Nt},_error:{name:"!error",content:Ft},_execute:{name:"!execute",content:Tt},_finalize:{name:"!finalize",content:Dt},_getdllversion:{name:"!getdllversion",content:At},_gettlbversion:{name:"!gettlbversion",content:_t},_if:{name:"!if",content:Wt},_ifdef:{name:"!ifdef",content:Mt},_ifmacrodef:{name:"!ifmacrodef",content:Ot},_ifmacrondef:{name:"!ifmacrondef",content:Pt},_ifndef:{name:"!ifndef",content:Lt},_include:{name:"!include",content:Bt},_insertmacro:{name:"!insertmacro",content:kt},_macro:{name:"!macro",content:Ut},_macroend:{name:"!macroend",content:Gt},_makensis:{name:"!makensis",content:Ht},_packhdr:{name:"!packhdr",content:Kt},_pragma:{name:"!pragma",content:Vt},_searchparse:{name:"!searchparse",content:Xt},_searchreplace:{name:"!searchreplace",content:Yt},_system:{name:"!system",content:zt},_tempfile:{name:"!tempfile",content:qt},_undef:{name:"!undef",content:jt},_verbose:{name:"!verbose",content:Zt},_warning:{name:"!warning",content:Jt},Abort:{name:"Abort",content:Qt},AddBrandingImage:{name:"AddBrandingImage",content:no},AddSize:{name:"AddSize",content:eo},AllowRootDirInstall:{name:"AllowRootDirInstall",content:to},AllowSkipFiles:{name:"AllowSkipFiles",content:oo},AutoCloseWindow:{name:"AutoCloseWindow",content:io},BGFont:{name:"BGFont",content:ro},BGGradient:{name:"BGGradient",content:so},BrandingText:{name:"BrandingText",content:ao},BringToFront:{name:"BringToFront",content:lo},Call:{name:"Call",content:co},CallInstDLL:{name:"CallInstDLL",content:mo},Caption:{name:"Caption",content:uo},ChangeUI:{name:"ChangeUI",content:fo},CheckBitmap:{name:"CheckBitmap",content:po},ClearErrors:{name:"ClearErrors",content:ho},CompletedText:{name:"CompletedText",content:So},ComponentText:{name:"ComponentText",content:$o},CopyFiles:{name:"CopyFiles",content:go},CRCCheck:{name:"CRCCheck",content:Io},CreateDirectory:{name:"CreateDirectory",content:bo},CreateFont:{name:"CreateFont",content:yo},CreateShortCut:{name:"CreateShortCut",content:xo},Delete:{name:"Delete",content:Eo},DeleteINISec:{name:"DeleteINISec",content:wo},DeleteINIStr:{name:"DeleteINIStr",content:Ro},DeleteRegKey:{name:"DeleteRegKey",content:Co},DeleteRegValue:{name:"DeleteRegValue",content:vo},DetailPrint:{name:"DetailPrint",content:No},DetailsButtonText:{name:"DetailsButtonText",content:Fo},DirText:{name:"DirText",content:To},DirVar:{name:"DirVar",content:Do},DirVerify:{name:"DirVerify",content:Ao},EnableWindow:{name:"EnableWindow",content:_o},EnumRegKey:{name:"EnumRegKey",content:Wo},EnumRegValue:{name:"EnumRegValue",content:Mo},Exch:{name:"Exch",content:Oo},Exec:{name:"Exec",content:Po},ExecShell:{name:"ExecShell",content:Lo},ExecShellWait:{name:"ExecShellWait",content:Bo},ExecWait:{name:"ExecWait",content:ko},ExpandEnvStrings:{name:"ExpandEnvStrings",content:Uo},File:{name:"File",content:Go},FileBufSize:{name:"FileBufSize",content:Ho},FileClose:{name:"FileClose",content:Ko},FileErrorText:{name:"FileErrorText",content:Vo},FileOpen:{name:"FileOpen",content:Xo},FileRead:{name:"FileRead",content:Yo},FileReadByte:{name:"FileReadByte",content:zo},FileReadUTF16LE:{name:"FileReadUTF16LE",content:qo},FileReadWord:{name:"FileReadWord",content:jo},FileSeek:{name:"FileSeek",content:Zo},FileWrite:{name:"FileWrite",content:Jo},FileWriteByte:{name:"FileWriteByte",content:Qo},FileWriteUTF16LE:{name:"FileWriteUTF16LE",content:ni},FileWriteWord:{name:"FileWriteWord",content:ei},FindClose:{name:"FindClose",content:ti},FindFirst:{name:"FindFirst",content:oi},FindNext:{name:"FindNext",content:ii},FindWindow:{name:"FindWindow",content:ri},FlushINI:{name:"FlushINI",content:si},Function:{name:"Function",content:ai},FunctionEnd:{name:"FunctionEnd",content:li},GetCurInstType:{name:"GetCurInstType",content:di},GetCurrentAddress:{name:"GetCurrentAddress",content:ci},GetDlgItem:{name:"GetDlgItem",content:mi},GetDLLVersion:{name:"GetDLLVersion",content:ui},GetDLLVersionLocal:{name:"GetDLLVersionLocal",content:fi},GetErrorLevel:{name:"GetErrorLevel",content:pi},GetFileTime:{name:"GetFileTime",content:hi},GetFileTimeLocal:{name:"GetFileTimeLocal",content:Si},GetFullPathName:{name:"GetFullPathName",content:$i},GetFunctionAddress:{name:"GetFunctionAddress",content:gi},GetInstDirError:{name:"GetInstDirError",content:Ii},GetKnownFolderPath:{name:"GetKnownFolderPath",content:bi},GetLabelAddress:{name:"GetLabelAddress",content:yi},GetTempFileName:{name:"GetTempFileName",content:xi},GetWinVer:{name:"GetWinVer",content:Ei},Goto:{name:"Goto",content:wi},HideWindow:{name:"HideWindow",content:Ri},Icon:{name:"Icon",content:Ci},IfAbort:{name:"IfAbort",content:vi},IfErrors:{name:"IfErrors",content:Ni},IfFileExists:{name:"IfFileExists",content:Fi},IfRebootFlag:{name:"IfRebootFlag",content:Ti},IfRtlLanguage:{name:"IfRtlLanguage",content:Di},IfShellVarContextAll:{name:"IfShellVarContextAll",content:Ai},IfSilent:{name:"IfSilent",content:_i},InitPluginsDir:{name:"InitPluginsDir",content:Wi},InstallButtonText:{name:"InstallButtonText",content:Mi},InstallColors:{name:"InstallColors",content:Oi},InstallDir:{name:"InstallDir",content:Pi},InstallDirRegKey:{name:"InstallDirRegKey",content:Li},InstProgressFlags:{name:"InstProgressFlags",content:Bi},InstType:{name:"InstType",content:ki},InstTypeGetText:{name:"InstTypeGetText",content:Ui},InstTypeSetText:{name:"InstTypeSetText",content:Gi},Int64Cmp:{name:"Int64Cmp",content:Hi},Int64CmpU:{name:"Int64CmpU",content:Ki},Int64Fmt:{name:"Int64Fmt",content:Vi},IntCmp:{name:"IntCmp",content:Xi},IntCmpU:{name:"IntCmpU",content:Yi},IntFmt:{name:"IntFmt",content:zi},IntOp:{name:"IntOp",content:qi},IntPtrCmp:{name:"IntPtrCmp",content:ji},IntPtrCmpU:{name:"IntPtrCmpU",content:Zi},IntPtrOp:{name:"IntPtrOp",content:Ji},IsWindow:{name:"IsWindow",content:Qi},LangString:{name:"LangString",content:nr},LicenseBkColor:{name:"LicenseBkColor",content:er},LicenseData:{name:"LicenseData",content:tr},LicenseForceSelection:{name:"LicenseForceSelection",content:or},LicenseLangString:{name:"LicenseLangString",content:ir},LicenseText:{name:"LicenseText",content:rr},LoadAndSetImage:{name:"LoadAndSetImage",content:sr},LoadLanguageFile:{name:"LoadLanguageFile",content:ar},LockWindow:{name:"LockWindow",content:lr},LogSet:{name:"LogSet",content:dr},LogText:{name:"LogText",content:cr},ManifestDPIAware:{name:"ManifestDPIAware",content:mr},ManifestLongPathAware:{name:"ManifestLongPathAware",content:ur},ManifestMaxVersionTested:{name:"ManifestMaxVersionTested",content:fr},ManifestSupportedOS:{name:"ManifestSupportedOS",content:pr},MessageBox:{name:"MessageBox",content:hr},MiscButtonText:{name:"MiscButtonText",content:Sr},Name:{name:"Name",content:$r},Nop:{name:"Nop",content:gr},OutFile:{name:"OutFile",content:Ir},Page:{name:"Page",content:br},PageCallbacks:{name:"PageCallbacks",content:yr},PageEx:{name:"PageEx",content:xr},PageExEnd:{name:"PageExEnd",content:Er},PEAddResource:{name:"PEAddResource",content:wr},PEDllCharacteristics:{name:"PEDllCharacteristics",content:Rr},PERemoveResource:{name:"PERemoveResource",content:Cr},PESubsysVer:{name:"PESubsysVer",content:vr},Pop:{name:"Pop",content:Nr},Push:{name:"Push",content:Fr},Quit:{name:"Quit",content:Tr},ReadEnvStr:{name:"ReadEnvStr",content:Dr},ReadINIStr:{name:"ReadINIStr",content:Ar},ReadRegDWORD:{name:"ReadRegDWORD",content:_r},ReadRegStr:{name:"ReadRegStr",content:Wr},Reboot:{name:"Reboot",content:Mr},RegDLL:{name:"RegDLL",content:Or},Rename:{name:"Rename",content:Pr},RequestExecutionLevel:{name:"RequestExecutionLevel",content:Lr},ReserveFile:{name:"ReserveFile",content:Br},Return:{name:"Return",content:kr},RMDir:{name:"RMDir",content:Ur},SearchPath:{name:"SearchPath",content:Gr},Section:{name:"Section",content:Hr},SectionEnd:{name:"SectionEnd",content:Kr},SectionGetFlags:{name:"SectionGetFlags",content:Vr},SectionGetInstTypes:{name:"SectionGetInstTypes",content:Xr},SectionGetSize:{name:"SectionGetSize",content:Yr},SectionGetText:{name:"SectionGetText",content:zr},SectionGroup:{name:"SectionGroup",content:qr},SectionGroupEnd:{name:"SectionGroupEnd",content:jr},SectionIn:{name:"SectionIn",content:Zr},SectionSetFlags:{name:"SectionSetFlags",content:Jr},SectionSetInstTypes:{name:"SectionSetInstTypes",content:Qr},SectionSetSize:{name:"SectionSetSize",content:ns},SectionSetText:{name:"SectionSetText",content:es},SendMessage:{name:"SendMessage",content:ts},SetAutoClose:{name:"SetAutoClose",content:os},SetBrandingImage:{name:"SetBrandingImage",content:is},SetCompress:{name:"SetCompress",content:rs},SetCompressor:{name:"SetCompressor",content:ss},SetCompressorDictSize:{name:"SetCompressorDictSize",content:as},SetCtlColors:{name:"SetCtlColors",content:ls},SetCurInstType:{name:"SetCurInstType",content:ds},SetDatablockOptimize:{name:"SetDatablockOptimize",content:cs},SetDateSave:{name:"SetDateSave",content:ms},SetDetailsPrint:{name:"SetDetailsPrint",content:us},SetDetailsView:{name:"SetDetailsView",content:fs},SetErrorLevel:{name:"SetErrorLevel",content:ps},SetErrors:{name:"SetErrors",content:hs},SetFileAttributes:{name:"SetFileAttributes",content:Ss},SetFont:{name:"SetFont",content:$s},SetOutPath:{name:"SetOutPath",content:gs},SetOverwrite:{name:"SetOverwrite",content:Is},SetRebootFlag:{name:"SetRebootFlag",content:bs},SetRegView:{name:"SetRegView",content:ys},SetShellVarContext:{name:"SetShellVarContext",content:xs},SetSilent:{name:"SetSilent",content:Es},ShowInstDetails:{name:"ShowInstDetails",content:ws},ShowUninstDetails:{name:"ShowUninstDetails",content:Rs},ShowWindow:{name:"ShowWindow",content:Cs},SilentInstall:{name:"SilentInstall",content:vs},SilentUnInstall:{name:"SilentUnInstall",content:Ns},Sleep:{name:"Sleep",content:Fs},SpaceTexts:{name:"SpaceTexts",content:Ts},StrCmp:{name:"StrCmp",content:Ds},StrCmpS:{name:"StrCmpS",content:As},StrCpy:{name:"StrCpy",content:_s},StrLen:{name:"StrLen",content:Ws},SubCaption:{name:"SubCaption",content:Ms},Unicode:{name:"Unicode",content:Os},UninstallButtonText:{name:"UninstallButtonText",content:Ps},UninstallCaption:{name:"UninstallCaption",content:Ls},UninstallIcon:{name:"UninstallIcon",content:Bs},UninstallSubCaption:{name:"UninstallSubCaption",content:ks},UninstallText:{name:"UninstallText",content:Us},UninstPage:{name:"UninstPage",content:Gs},UnRegDLL:{name:"UnRegDLL",content:Hs},Var:{name:"Var",content:Ks},VIAddVersionKey:{name:"VIAddVersionKey",content:Vs},VIFileVersion:{name:"VIFileVersion",content:Xs},VIProductVersion:{name:"VIProductVersion",content:Ys},WindowIcon:{name:"WindowIcon",content:zs},WriteINIStr:{name:"WriteINIStr",content:qs},WriteRegBin:{name:"WriteRegBin",content:js},WriteRegDWORD:{name:"WriteRegDWORD",content:Zs},WriteRegExpandStr:{name:"WriteRegExpandStr",content:Js},WriteRegMultiStr:{name:"WriteRegMultiStr",content:Qs},WriteRegStr:{name:"WriteRegStr",content:na},WriteUninstaller:{name:"WriteUninstaller",content:ea},XPStyle:{name:"XPStyle",content:ta}};var oa=`# AdvSplash.dll

A small (5.5k), simple plug-in that lets you throw up a splash-screen in NSIS installers with cool fading effects (Windows 2000 or later) and transparency.

Create a Windows Bitmap (\`.bmp\`) image to be used as your splash screen. Optionally, you can also create a Wave (\`.wav\`) audio file to play while the image is being displayed.

By calling the plug-in in [\`.onInit\`][1], your splash-screen will be displayed before the setup interface shows up.

## Parameters

    delay fadeIn fadeOut keyColor fileName

Parameter | Description
----------|------------
\`delay\`   | length to show the screen for (in milliseconds)
\`fadeIn\`  | length to show the fadein scene (in milliseconds) (not included in \`delay\`, Windows 2000 or later)
\`fadeOut\` | length to show the fadeout scene (in milliseconds) (not included in \`delay\`, Windows 2000 or later)
\`keyColor\`| alpha key RGB values (e.g. \`0xffff00\` for yellow), use -1 when no transparency is used
\`fileName\`| Bitmap file-name (without \`.bmp\` extension). The file name of the optional audio must match (e.g. \`mySplash.bmp\` and \`mySplash.wav\`)

## Example

Simple splash:

    Function .onInit
      SetOutPath $PLUGINSDIR
      
      File /oname=spltmp.bmp "my_splash.bmp"

      AdvSplash::show 1000 600 400 -1 "$TEMP\\spltmp"

    # $0 has '1' if the user closed the splash screen early,
    # '0' if everything closed normally, and '-1' if some error occurred.
      Pop $0

      Delete "$TEMP\\spltmp.bmp"
    FunctionEnd

Transparent with sound:

    Function .onInit
      SetOutPath $PLUGINSDIR
      
      File /oname=spltmp.bmp "my_splash.bmp"
      File /oname=spltmp.wav "my_splashshit.wav"

      AdvSplash::show 1000 600 400 0xf00fee "$TEMP\\spltmp"

    # $0 has '1' if the user closed the splash screen early,
    # '0' if everything closed normally, and '-1' if some error occurred.
      Pop $0

      Delete "$TEMP\\spltmp.bmp"
      Delete "$TEMP\\spltmp.wav"
    FunctionEnd

## Credits

Written by [Justin Frankel](https://en.wikipedia.org/wiki/Justin_Frankel) and [Amir Szekely][3]. Fading and transparency by [Nik Medved][4].

## License

As part of the NSIS distribution, this plug-in is licensed under [zlib/libpng][5]

[1]: ../Callbacks/onInit.md
[2]: https://en.wikipedia.org/wiki/Justin_Frankel
[3]: http://nsis.sourceforge.net/User:Kichik
[4]: http://nsis.sourceforge.net/User:Brainsucker
[5]: http://opensource.org/licenses/Zlib
`;var ia=`# Banner.dll

The Banner plug-in shows a banner with customizable text. It uses the \`IDD_VERIFY\` dialog of the UI.

There are three functions \u2013 \`show\`, \`getWindow\` and \`destroy\`.

## Usage

    Banner::show "Text to show"
    Banner::getWindow
    Banner::destroy

### Modern UI

The Modern UI has two labels on the \`IDD_VERIFY\` dialog. To change all the texts, use:

    Banner::show /set 76 "Text 1 (replaces Please wait while Setup is loading...)" "Normal text"

### Custom UI

If you have more labels on your \`IDD_VERIFY\` dialog, you can use multiple \`/set\` parameters to change the texts.

Example:

    Banner::show /set 76 "bah #1" /set 54 "bah #2" "Normal text"

The second parameter for \`/set is the ID of the control.

## Example

    Name "Banner.dll test"
    OutFile "Banner Test.exe"
    ShowInstDetails show    

    Function .onInit
        Banner::show "Calculating important stuff..."

        Banner::getWindow
        Pop $1    

        again:
        IntOp $0 $0 + 1
        Sleep 1
        StrCmp $0 100 0 again

        GetDlgItem $2 $1 1030
        SendMessage $2 \${WM_SETTEXT} 0 "STR:Calculating more important  stuff..."    

        again2:
        IntOp $0 $0 + 1
        Sleep 1
        StrCmp $0 200 0 again2

        Banner::destroy
    FunctionEnd    

    Section
        DetailPrint "Using previous calculations to quickly calculate 1*2000..."
        Sleep 1000
        DetailPrint "Eureka! It's $0!!!"
        DetailPrint ""
    SectionEnd

## Credits

Written by [Nik Medved][1] and [Amir Szekely][2] in honor of the messages dropped during the battle

## License

As part of the NSIS distribution, this plug-in is licensed under [zlib/libpng][3]

[1]: http://nsis.sourceforge.net/User:Brainsucker
[2]: http://nsis.sourceforge.net/User:Kichik
[3]: http://opensource.org/licenses/Zlib
`;var ra=`# BgImage.dll

Displays an image or a gradient with user defined texts and/or images behind the NSIS window. Can also play Wave files.

## Usage

    BgImage::SetBg /GRADIENT 0 0x80 0 0x80 0 0
    BgImage::AddImage background.bmp 150 0
    BgImage::Redraw
    BgImage::Clear
    BgImage::Destroy

Do not call \`SetBg (which creates the window) from a section or a function called by a section.\`BgImage\` must be run from the GUI thread as the installation thread is not built to handle GUI.

### Available Functions

\`SetBg [/FILLSCREEN|/TILED] path_to_bitmap\`
\`SetBg /GRADIENT R G B R G B\`

Sets the background and creates the window if necessary

* Use \`/FILLSCREEN\` to make the image fill the screen
* Use \`/TILED\` to set a tiled background
* Use \`/GRADIENT\` to set a gradient background

If \`SetReturn on\` was called returns "success" on the stack or an error string if there was an error

Do not use in [\`.onInit\`][1]!

\`AddImage [/TRANSPARENT R G B] path_to_bitmap X Y\`

Adds an image to the background window at (X,Y)

* X and Y can be negative to specify distance from right/bottom
* Use \`/TRANSPARENT\` to make BgImage draw the image transparently. Define the transparent color using R G B

If \`SetReturn on\` was called returns "success" on the stack or an error string if there was an error

\`AddText text font_handle R G B X Y X Y\`

Adds text to the background window

* Use NSIS's [\`CreateFont\`][2] to create a font and pass it as \`font_handle\`
* Use R G B to set the text color
* The first X Y is for the top left corner of the text box
* The second X Y is for the bottom right corner of the text box
* X and Y can be negative to specify distance from right/bottoms

If \`SetReturn on\` was called returns "success" on the stack or an error string if there was an error

\`Clear\`

Clears all of the current background, images and texts

\`Destroy\`

 Destroys the current background window. Calls \`Clear\` automatically.

\`Sound [/WAIT|/LOOP] path_to_wav\`
\`Sound /STOP\`

Plays a wave file

* Use \`/WAIT\` to wait for the sound to finish playing
* Use \`/LOOP\` to loop the sound
* Use Sound \`/STOP\` to stop the loop

\`SetReturn on|off\`

Enable return values from \`SetBg\`, \`AddImage\` and \`AddText\`

Default value is off because all of the possible errors are either things you should handle when debugging your script such as "can't load bitmap" or errors you can do nothing about such as "memory allocation error"

## Example

    Name "BgImage.dll test"
    OutFile "BgImage Test.exe"
    XPStyle on

    !define DEBUG
    !macro GetReturnValue
        !ifdef DEBUG
            Pop $R9
            StrCmp $R9 success +2
                DetailPrint "Error: $R9"
        !endif
    !macroend

    Function .onGUIInit
        # the plugins dir is automatically deleted when the installer exits
        InitPluginsDir

        # lets extract some bitmaps...
        File /oname=$PLUGINSDIR\\1.bmp "\${NSISDIR}\\Contrib\\Graphics\\Wizard\\llama.bmp"
        File /oname=$PLUGINSDIR\\2.bmp "\${NSISDIR}\\Contrib\\Graphics\\Checks\\modern.bmp"

        !ifdef DEBUG
            # turn return values on if in debug mode
            BgImage::SetReturn on
        !endif

        # set the initial background for images to be drawn on
        # we will use a gradient from drak green to dark red
        BgImage::SetBg /GRADIENT 0 0x80 0 0x80 0 0
        !insertmacro GetReturnValue

        # add an image @ (150,0)
        BgImage::AddImage $PLUGINSDIR\\2.bmp 150 0
        !insertmacro GetReturnValue

        # add the same image only transparent (magenta wiped) @ (150,16)
        BgImage::AddImage /TRANSPARENT 255 0 255 $PLUGINSDIR\\2.bmp 150 16
        !insertmacro GetReturnValue

        # create the font for the following text
        CreateFont $R0 "Comic Sans MS" 50 700

        # add a blue shadow for the text
        BgImage::AddText "Testing 1... 2... 3..." $R0 0 0 255 48 48 798 198
        !insertmacro GetReturnValue

        # add a green shadow for the text
        BgImage::AddText "Testing 1... 2... 3..." $R0 0 255 0 52 52 802 202
        !insertmacro GetReturnValue

        # add the text
        BgImage::AddText "Testing 1... 2... 3..." $R0 255 0 0 50 50 800 200
        !insertmacro GetReturnValue

        # show our creation to the world!
        BgImage::Redraw

        # Refresh doesn't return any value
    FunctionEnd

    Section
        # play some sounds
        FindFirst $0 $1 $WINDIR\\Media\\*.wav
        StrCmp $0 "" skipSound

        moreSounds:
            StrCmp $1 "" noMoreSounds
            BgImage::Sound /WAIT $WINDIR\\Media\\$1

            # Sound doesn't return any value either
            MessageBox MB_YESNO "Another sound?" IDNO noMoreSounds
            FindNext $0 $1
            Goto moreSounds

        noMoreSounds:
            FindClose $0

        skipSound:
            # change the background image to Mike, tiled
            BgImage::SetBg /TILED $PLUGINSDIR\\1.bmp
            !insertmacro GetReturnValue

        # we have to redraw to reflect the changes
        BgImage::Redraw
        MessageBox MB_OK "Mike the llama"

        # clear everything
        BgImage::Clear

        # Clear doesn't return any value
        # set another gradient
        BgImage::SetBg /GRADIENT 0xFF 0xFA 0xBA 0xAA 0xA5 0x65
        !insertmacro GetReturnValue

        # add some text
        BgImage::AddText "A Desert for Mike" $R0 0 0 0 50 50 800 150
        !insertmacro GetReturnValue

        # add mike as an image
        BgImage::AddImage $PLUGINSDIR\\1.bmp 50 150
        !insertmacro GetReturnValue

        # again, we have to call redraw to reflect changes
        BgImage::Redraw
    SectionEnd
    
    Function .onGUIEnd
        BgImage::Destroy
        # Destroy doesn't return any value
    FunctionEnd

## Credits

Written by [Amir Szekely][3] with contributions by [Ximon Eighteen][4], [iceman_k][5], Lajos Molnar and Jason Reis

## License

As part of the NSIS distribution, this plug-in is licensed under [zlib/libpng][6]

[1]: ../Callbacks/onInit.md
[2]: ../Commands/CreateFont.md
[3]: http://nsis.sourceforge.net/User:Kichik
[4]: http://nsis.sourceforge.net/User:Sunjammer
[5]: http://nsis.sourceforge.net/User:Iceman_K
[6]: http://opensource.org/licenses/Zlib
`;var sa=`# Dialer

The Dialer plugin for NSIS provides five functions related to internet connections.

To download files from the internet, use the NSISdl plugin.

## Usage

Simple example:

    ClearErrors           ;Clear the error flag
    Dialer::FunctionName  ;Call Dialer function
    IfErrors "" +3        ;Check for errors
      MessageBox MB_OK "Function not available"
      Quit
    Pop $R0               ;Get the return value from the stack
    MessageBox MB_OK $R0  ;Display the return value

Example function:

    ; ConnectInternet (uses Dialer plugin)
    ; Written by Joost Verburg 
    ;
    ; This function attempts to make a connection to the internet if there is no
    ; connection available. If you are not sure that a system using the installer
    ; has an active internet connection, call this function before downloading
    ; files with NSISdl.
    ; 
    ; The function requires Internet Explorer 3, but asks to connect manually if
    ; IE3 is not installed.

    Function ConnectInternet

      Push $R0

        ClearErrors
        Dialer::AttemptConnect
        IfErrors noie3

        Pop $R0
        StrCmp $R0 "online" connected
          MessageBox MB_OK|MB_ICONSTOP "Cannot connect to the internet."
          Quit ;Remove to make error not fatal

        noie3:

        ; IE3 not installed
        MessageBox MB_OK|MB_ICONINFORMATION "Please connect to the internet now."

        connected:

      Pop $R0

    FunctionEnd

### Functions

If a function is not available on the system, the error flag will be set.

#### AttemptConnect

Attempts to make a connection to the Internet if the system is not connected.

\`online\` - already connected / connection successful  
\`offline\` - connection failed  

Requires Internet Explorer 3 or later

#### AutodialOnline

Causes the modem to automatically dial the default Internet connection if the system
is not connected to the internet. If the system is not set up to automatically
connect, it will prompt the user.

Return values:

\`online\` - already connected / connection successful  
\`offline\` - connection failed  

Requires Internet Explorer 4 or later

#### AutodialUnattended

Causes the modem to automatically dial the default Internet connection if the system
is not connected to the internet. The user will not be prompted.

Return values:

\`online\` - already connected / connection successful  
\`offline\` - connection failed  

Requires Internet Explorer 4 or later

#### AutodialHangup

Disconnects an automatic dial-up connection.

Return values:

\`success\` - disconnection successful  
\`failure\` - disconnection failed  

Requires Internet Explorer 4 or later

#### GetConnectedState

Checks whether the system is connected to the internet.

Return values:

\`online\` - system is online  
\`offline\` - system is offline  

Requires Internet Explorer 4 or later

## Credits

Written by [Amir Szekely][2]. Readme by [Joost Verburg][2]

[1]: http://nsis.sourceforge.net/User:Kichik
[2]: http://nsis.sourceforge.net/User:Joost
`;var aa=`# nsExec

nsExec will execute command-line based programs and capture the output
without opening a DOS box.

## Usage

    nsExec::Exec [/OEM] [/TIMEOUT=x] path
    Pop $0

    nsExec::ExecToLog [/OEM] [/TIMEOUT=x] path
    Pop $0

    nsExec::ExecToStack [/OEM] [/TIMEOUT=x] path
    Pop $0 ; Return
    Pop $1 ; Output

All functions are the same except \`ExecToLog\` will print the output to the log window and \`ExecToStack\` will push up to \`\${NSIS_MAX_STRLEN}\` characters of output onto the stack after the return value.

Use the /OEM switch to convert the output text from OEM to ANSI.

The timeout value is optional.  The timeout is the time in milliseconds \`nsExec\` will wait for output.  If output from the process is received, the timeout value is reset and it will again wait for more output using the timeout value.  See Return Value for how to check if there was a timeout.

To ensure that command are executed without problems on all windows versions, is recommended to use the following syntax:

    nsExec::ExecToStack [OPTIONS] '"PATH" param1 param2 paramN'

This way the application path may contain non 8.3 paths (with spaces)

### Return Value

If \`nsExec\` is unable to execute the process, it will return "error"on the top of the stack, if the process timed out it will return "timeout", else it will return the return code from the executed process.

## Credits

Written by [Robert Rainwater][2]. Thanks to Justin Frankel and [Amir Szekely][3].

[1]: http://nsis.sourceforge.net/User:Rainwater
[2]: http://nsis.sourceforge.net/User:Kichik
`;var la=`# NSISdl

This plugin can be used from NSIS to download files via HTTP.
Note: HTTPS is not supported, only plain HTTP!

To connect to the internet, use the Dialer plugin.

## Usage

    NSISdl::download http://www.domain.com/file localfile.exe

You can also pass /TIMEOUT to set the timeout in milliseconds:

    NSISdl::download /TIMEOUT=30000 http://www.domain.com/file localfile.exe

The return value is pushed to the stack:

- \`cancel\` if cancelled
- \`success\` if success
- otherwise, an error string describing the error

If you don't want the progress window to appear, use NSISdl::download_quiet.

Example of usage:

    NSISdl::download http://www.domain.com/file localfile.exe
    Pop $R0 ;Get the return value
      StrCmp $R0 "success" +3
        MessageBox MB_OK "Download failed: $R0"
        Quit

For another example, see waplugin.nsi in the examples directory.

### Proxies

\`NSISdl\` supports only basic configurations of proxies. It doesn't support
proxies which require authentication, automatic configuration script, etc.
\`NSISdl\` reads the proxy configuration from Internet Explorer's registry key
under \`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\`. It
reads and parses \`ProxyEnable\` and \`ProxyServer\`.

If you don't want \`NSISdl\` to use Internet Explorer's settings, use the
\`/NOIEPROXY\` flag. \`/NOIEPROXY\` should be used after \`/TRANSLATE\` and
\`/TIMEOUT\`. For example:

If you want to specify a proxy on your own, use the \`/PROXY\` flag.

    NSISdl::download /NOIEPROXY http://www.domain.com/file localfile.exe
    NSISdl::download /TIMEOUT=30000 /NOIEPROXY http://www.domain.com/file localfile.exe
    NSISdl::download /PROXY proxy.whatever.com http://www.domain.com/file localfile.exe
    NSISdl::download /PROXY proxy.whatever.com:8080 http://www.domain.com/file localfile.exe

### Translate

To translate \`NSISdl\` add the following values to the call line:

\`/TRANSLATE2\` downloading connecting second minute hour seconds minutes hours progress

Default values are:

- \`downloading\` - "Downloading %s"
- \`connecting\` - "Connecting ..."
- \`second\` - " (1 second remaining)"
- \`minute\` - " (1 minute remaining)"
- \`hour\` - " (1 hour remaining)"
- \`seconds\` - " (%u seconds remaining)"
- \`minutes\` - " (%u minutes remaining)"
- \`hours\` - " (%u hours remaining)"
- \`progress\` - "%skB (%d%%) of %skB @ %u.%01ukB/s"

The old \`/TRANSLATE\` method still works for backward compatibility.

\`/TRANSLATE\` downloading connecting second minute hour plural progress remianing

Default values are:

- \`downloading\` - "Downloading %s"
- \`connecting\` - "Connecting ..."
- \`second\` - "second"
- \`minute\` - "minute"
- \`hour\` - "hour"
- \`plural\` - "s"
- \`progress\` - "%dkB (%d%%) of %ukB @ %d.%01dkB/s"
- \`remaining\` -  " (%d %s%s remaining)"

\`/TRANSLATE\` and \`/TRANSLATE2\` must come before \`/TIMEOUT\`.

## Credits

Written by Yaroslav Faybishenko and Justin Frankel.
`;var da=`# Splash

Small (4k), simple plugin that lets you throw up a splash screen in NSIS installers.

## Usage

    Function .onInit
      SetOutPath $TEMP
      File /oname=spltmp.bmp "my_splash.bmp"

    ; optional
    ; File /oname=spltmp.wav "my_splashsound.wav"

      splash::show 1000 $TEMP\\spltmp

      Pop $0 ; $0 has '1' if the user closed the splash screen early,
         ; '0' if everything closed normally, and '-1' if some error occurred.

      Delete $TEMP\\spltmp.bmp
    ;  Delete $TEMP\\spltmp.wav
    FunctionEnd

Note that the first parameter to splash.exe is the length to show the
screen for (in milliseconds), and the second is the splash bitmap filename (without
the .bmp). The BMP file used will be this parameter.bmp, and the wave file used
(if present) will be this parameter.wav.

(If you already have an .onInit function, put that in it)

Note: the return value of splash is 1 if the user closed the splash
screen early (pop it from the stack)

## Credits

Written by Justin Frankel and [Amir Szekely][1].

[1]: http://nsis.sourceforge.net/User:Kichik
`;var ca=`# VPatch

VPatch allows to create a patch file to update previous versions of your software. The GenPat utility generates the patch file. The plug-in can use the patch to update a file. Using a patch, you can reduce the download size of your updates because only the differences between the files are included in the patch file.

## Usage

### Generate the patch file

Make sure you have the source file (original version) and the target file (version to update to). For example, \`DATA.DTA\` (currently on user system) and \`DATA_20.DTA\` (version 2.0 of this data file). Now call the command line tool \`GenPat.exe\`:

    \`GENPAT oldfile.txt newfile.txt patch.pat

Now, the patch will be generated, this will take some time.

Using the \`/B=(BlockSize)\` parameter of the GenPat utility (put it after the filenames), you can use a different block size. A smaller block size may result in a smaller patch, but the generation will take more time (the default blocksize is 64).

If you have trouble using this command-line utility, you can download a GUI (graphical user interface) for VPatch from its own [website][1].

### Update the file during installation

Use the VPatch plug-in to update a file using a patch file:

\`vpatch::vpatchfile "patch.pat" "oldfile.txt" "temporary_newfile.txt"\`

The result of the patch operating will be added to the stack and can be one of the following texts:

- OK
- OK, new version already installed
- An error occurred while patching
- Patch data is invalid or corrupt
- No suitable patches were found

Check \`example.nsi\` for an example. You should check whether the stack string starts with "OK" because then the patch has succeeded and you can rename "temporary_newfile.txt" to "oldfile.txt" to replace the original, if you want.

### Multiple patches in one file

GenPat appends a patch to the file you specified. If there is already a patch for the same original file, with the same CRC/MD5, in the patch file, the patch will be replaced. For example, if you want to be able to upgrade version 1 and 2 to version 3, you can put a 1 > 3 and 2 > 3 patch in one file.

You can also put patches for different files in one patch file, for example, a patch from file A version 1 to file A version 2 and a patch from file B version 1 to file B version 2. Just call the plug-in multiple times with the same patch file. It will automatically select the right patch (based on the file CRC).

### Patch generator (GenPat) exit codes

In version 3 the following exit codes (known as error levels in the DOS period) can be returned by GenPat. GenPat will return an exit code based on success of the patch generation. Here is a list of the possible exit codes:

Exit code | Description
----------|------------
0         | Success
1         | Arguments missing
2         | Other error
3         | Source file already has a patch in specified patch file (ERROR), use /R switch to override

These exit codes can be useful when you generate patch files through a NSIS script.

## Credits

Written by Koen van de Sande.

[1]: http://www.tibed.net/vpatch
`;var Il={AdvSplash:{name:"AdvSplash",content:oa},Banner:{name:"Banner",content:ia},BgImage:{name:"BgImage",content:ra},Dialer:{name:"Dialer",content:sa},nsExec:{name:"nsExec",content:aa},NSISdl:{name:"NSISdl",content:la},Splash:{name:"Splash",content:da},VPatch:{name:"VPatch",content:ca}};var ma=`# \${__DATE__}

Date when the script started compiling according to the current locale.

## History

Added in NSIS v2.0 Beta 4
`;var ua=`# \${__FILE__}

Current script name.

## History

Added in NSIS v2.0 Beta 4
`;var fa=`# \${__FILEDIR__}

Current script directory.

## History

Not documented
`;var pa=`# \${__LINE__}

Current line number.

## History

Added in NSIS v2.0 Beta 4
`;var ha=`# \${__TIME__}

Time when the script started compiling according to the current locale.

## History

Added in NSIS v2.0 Beta 4
`;var Sa=`# \${__TIMESTAMP__}

Date & time of the last modification to the script file according to the current locale.

## History

Added in NSIS v2.0 Beta 4
`;var $a=`# $ADMINTOOLS

A directory where administrative tools are kept. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

This constant is available on Windows 2000, ME and above.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var ga=`# $APPDATA

The application data directory. Detection of the current user path requires Internet Explorer 4 and above. Detection of the all users path requires Internet Explorer 5 and above. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

This constant is not available on Windows 95 with Internet Explorer 4 and Active Desktop not installed.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var Ia=`# $CDBURN_AREA

A directory where files awaiting to be burned to CD are stored.

This constant is available on Windows XP and above.

## History

Not documented
`;var ba=`# $CMDLINE

The command line of the installer. The format of the command line can be one of the following:

- "full\\path to\\installer.exe" PARAMETER PARAMETER PARAMETER
- installer.exe PARAMETER PARAMETER PARAMETER
- For parsing out the PARAMETER portion, see [\`GetParameters\`][1]. If \`/D=\` is specified on the command line (to override the install directory) it won't show up in \`$CMDLINE\`.

## History

Added in NSIS v1.65

[1]: ../Includes/FileFunc/GetParameters.md
`;var ya="# $COMMONFILES\n\nThe common files directory. This is a directory for components that are shared across applications (usually `C:\\Program Files\\Common Files` but detected at runtime). On Windows x64, `$COMMONFILES` and `$COMMONFILES32` point to `C:\\Program Files (x86)\\Common Files` while `$COMMONFILES64` points to `C:\\Program Files\\Common Files`. Use `$COMMONFILES64` when installing x64 applications.\n\n## History\n\n`$COMMONFILES32` and `$COMMONFILES64` added in NSIS 2.26\n";var xa=`# $COOKIES

Internet Explorer's cookies directory.

This constant is not available on Windows 95 and Windows NT with Internet Explorer 4 and Active Desktop not installed.

## History

Not documented
`;var Ea=`# $DESKTOP

The Windows desktop directory (usually \`C:\\Windows\\Desktop\` but detected at runtime). The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var wa=`# $DOCUMENTS

The documents directory. A typical path for the current user is \`C:\\Documents and Settings\\Foo\\My Documents\`. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

This constant is not available on Windows 95 with Internet Explorer 4 not installed.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var Ra=`# $EXEDIR

The directory containing the installer executable (technically you can modify this variable, but it is probably not a good idea).

## History

Not documented
`;var Ca=`# $EXEFILE

The base name of the installer executable.

## History

Added in NSIS v2.26
`;var va=`# $EXEPATH

The full path of the installer executable.

## History

Added in NSIS v2.26
`;var Na=`# $FAVORITES

The directory that contains shortcuts to the user's favorite websites, documents, etc. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

This constant is not available on Windows 95 with Internet Explorer 4 not installed.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var Fa=`# $FONTS

The system's fonts directory.

## History

Added in NSIS v2.0 Release Candidate 1
`;var Ta=`# $HISTORY

Internet Explorer's history directory.

This constant is not available on Windows 95 and Windows NT with Internet Explorer 4 and Active Desktop not installed.

## History

Not documented
`;var Da=`# $HWNDPARENT

The decimal HWND of the parent window.

## History

Not documented
`;var Aa="# $INSTDIR\n\nThe installation directory (`$INSTDIR` is modifiable using [`StrCpy`][1], [`ReadRegStr`][2], [`ReadINIStr`][3], etc. - This could be used, for example, in the [`.onInit`][4] function to do a more advanced detection of install location).\n\nNote that in uninstaller code, `$INSTDIR` contains the directory where the uninstaller lies. It does not necessarily contain the same value it contained in the installer. For example, if you write the uninstaller to [`$WINDIR`][5] and the user doesn't move it, `$INSTDIR` will be [`$WINDIR`][5] in the uninstaller. If you write the uninstaller to another location, you should keep the installer's `$INSTDIR` in the registry or an alternative storing facility and read it in the uninstaller.\n\n## History\n\nAdded in NSIS v1.0\n\n[1]: ../Commands/StrCpy.md\n[2]: ../Commands/ReadRegStr.md\n[3]: ../Commands/ReadINIStr.md\n[4]: ../Callbacks/onInit.md\n[5]: WINDIR.md\n";var _a=`# $INTERNET_CACHE

The directory that contains link objects that may exist in the Printers folder.

This constant is not available on Windows 95 and Windows 98.

## History

Not documented
`;var Wa=`# $LANGUAGE

The identifier of the language that is currently used. For example, English is 1033. You can change this variable in [\`.onInit\`][1].

## History

Added in NSIS 2.0 Alpha 3

[1]: ../Callbacks/onInit.md
`;var Ma=`# $LOCALAPPDATA

The local (nonroaming) application data directory.

This constant is available on Windows 2000 and above.

## History

Added in NSIS v2.07
`;var Oa=`# $MUSIC

The user's music files directory. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

This constant is available on Windows XP, ME and above.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var Pa=`# $NETHOOD

The directory that contains link objects that may exist in the My Network Places/Network Neighborhood folder.

This constant is not available on Windows 95 with Internet Explorer 4 and Active Desktop not installed.

## History

Not documented
`;var La=`# \${NSIS_MAX_STRLEN}

NSIS maximum string length used to build the script. The default is 1024 bytes, the [special build][1]'s string lenght is 8192 bytes.

## History

Not documented

[1]: http://nsis.sourceforge.net/Special_Builds
`;var Ba=`# \${NSIS_VERSION}

NSIS version used to build the script.

## History

Not documented
`;var ka=`# \${NSISDIR}

A symbol that contains the path where NSIS is installed. Useful if you want to call resources that are in NSIS directory e.g. Icons, UIs etc.

When compiled with support for keeping makensis and the data in the same place (the default on Windows), it is in the same place as makensis, on other platforms it is set at compile time (See the INSTALL file for info). In both instances you can modify it at runtime by setting the NSISDIR environment variable. See [section 3.1.3][1] for more info.

## History

Added in NSIS v2.0 Alpha 2

[1]: http://nsis.sourceforge.net/Docs/Chapter3.html#3.1.3
`;var Ua=`# $OUTDIR

The current output directory (set implicitly via [\`SetOutPath\`][1] or explicitly via [\`StrCpy\`][2], [\`ReadRegStr\`][3], [\`ReadINIStr\`][4], etc)

## History

Added in NSIS v1.4 Beta

[1]: ../Commands/SetOutPath.md
[2]: ../Commands/StrCpy.md
[3]: ../Commands/ReadRegStr.md
[4]: ../Commands/ReadINIStr.md
`;var Ga=`# $PICTURES

The user's music files directory. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

This constant is available on Windows XP, ME and above.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var Ha=`# $PLUGINSDIR

The path to a temporary folder created upon the first usage of a plug-in or a call to [\`InitPluginsDir\`][1]. This folder is automatically deleted when the installer exits. This makes this folder the ideal folder to hold INI files for [InstallOptions][2], bitmaps for the splash plug-in, or any other file that a plug-in needs to work.

## History

Not documented

[1]: ../Commands/InitPluginsDir.md
[2]: http://nsis.sourceforge.net/Docs/InstallOptions/Readme.html
`;var Ka=`# $PRINTHOOD

The directory that contains link objects that may exist in the Printers folder.

This constant is not available on Windows 95 and Windows 98.

## History

Not documented
`;var Va=`# $PROFILE

The user's profile directory. A typical path is \`C:\\Documents and Settings\\Foo\`.

This constant is available on Windows 2000 and above.

## History

Not documented
`;var Xa="# $PROGRAMFILES, $PROGRAMFILES32, $PROGRAMFILES64\n\nThe program files directory (usually `C:\\Program Files` but detected at runtime). On Windows x64, `$PROGRAMFILES` and `$PROGRAMFILES32` point to `C:\\Program Files (x86)` while `$PROGRAMFILES64` points to `C:\\Program Files`. Use `$PROGRAMFILES64` when installing x64 applications.\n\n## History\n\n`$PROGRAMFILES32` and `$PROGRAMFILES64` added in NSIS 2.26\n";var Ya=`# $QUICKLAUNCH

The quick launch folder for IE4 active desktop and above. If quick launch is not available, simply returns the same as [\`$TEMP\`][1].

## History

Added in NSIS v1.0i

[1]: TEMP.md
`;var za=`# $RECENT

The directory that contains shortcuts to the user's recently used documents.

## History

Not documented
`;var qa=`# $RESOURCES

The resources directory that stores themes and other Windows resources (usually \`C:\\Windows\\Resources\` but detected at runtime).

This constant is available on Windows XP and above.

## History

Not documented
`;var ja=`# $RESOURCES_LOCALIZED

---

The localized resources directory that stores themes and other Windows resources (usually \`C:\\Windows\\Resources\` but detected at runtime).

This constant is available on Windows XP and above.

## History

Not documented

---
`;var Za=`# $SENDTO

The directory that contains Send To menu shortcut items.

## History

Added in NSIS v2.0 Release Candidate 1
`;var Ja=`# $SMPROGRAMS

The start menu programs folder (use this whenever you want \`$STARTMENU\\Programs\`). The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

## History

Added in NSIS v1.0i

[1]: ../Commands/SetShellVarContext.md
`;var Qa=`# $SMSTARTUP

The start menu programs / startup folder. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

## History

Added in NSIS v1.0i

[1]: ../Commands/SetShellVarContext.md
`;var nl=`# $STARTMENU

The start menu folder (useful in adding start menu items using [\`CreateShortCut\`][1]). The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][2] setting. The default is the current user.

## History

Not documented

[1]: ../Commands/CreateShortCut.md
[2]: ../Commands/SetShellVarContext.md
`;var el=`# $SYSDIR

The Windows system directory (usually \`C:\\Windows\\System\` or \`C:\\WinNT\\System32\` but detected at runtime).

## History

Not documented
`;var tl=`# $TEMP

The system temporary directory (usually \`%APPDATA%\\Local\\Temp\` or \`C:\\Windows\\Temp\` but detected at runtime).

## History

Not documented
`;var ol=`# $TEMPLATES

The document templates directory. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var il=`# $VIDEOS

The user's video files directory. The context of this constant (All Users or Current user) depends on the [\`SetShellVarContext\`][1] setting. The default is the current user.

This constant is available on Windows XP, ME and above.

## History

Not documented

[1]: ../Commands/SetShellVarContext.md
`;var rl=`# $WINDIR

The Windows directory (usually \`C:\\Windows\` or \`C:\\WinNT\` but detected at runtime).

## History

Not documented
`;var bl={HISTORY:{name:"$HISTORY",content:Ta},__DATE__:{name:"${__DATE__}",content:ma},__FILE__:{name:"${__FILE__}",content:ua},__FILEDIR__:{name:"${__FILEDIR__}",content:fa},__LINE__:{name:"${__LINE__}",content:pa},__TIME__:{name:"${__TIME__}",content:ha},__TIMESTAMP__:{name:"${__TIMESTAMP__}",content:Sa},ADMINTOOLS:{name:"$ADMINTOOLS",content:$a},APPDATA:{name:"$APPDATA",content:ga},CDBURN_AREA:{name:"$CDBURN_AREA",content:Ia},CMDLINE:{name:"$CMDLINE",content:ba},COMMONFILES:{name:"$COMMONFILES",content:ya},COOKIES:{name:"$COOKIES",content:xa},DESKTOP:{name:"$DESKTOP",content:Ea},DOCUMENTS:{name:"$DOCUMENTS",content:wa},EXEDIR:{name:"$EXEDIR",content:Ra},EXEFILE:{name:"$EXEFILE",content:Ca},EXEPATH:{name:"$EXEPATH",content:va},FAVORITES:{name:"$FAVORITES",content:Na},FONTS:{name:"$FONTS",content:Fa},HWNDPARENT:{name:"$HWNDPARENT",content:Da},INSTDIR:{name:"$INSTDIR",content:Aa},INTERNET_CACHE:{name:"$INTERNET_CACHE",content:_a},LANGUAGE:{name:"$LANGUAGE",content:Wa},LOCALAPPDATA:{name:"$LOCALAPPDATA",content:Ma},MUSIC:{name:"$MUSIC",content:Oa},NETHOOD:{name:"$NETHOOD",content:Pa},NSIS_MAX_STRLEN:{name:"$NSIS_MAX_STRLEN",content:La},NSIS_VERSION:{name:"$NSIS_VERSION",content:Ba},NSISDIR:{name:"$NSISDIR",content:ka},OUTDIR:{name:"$OUTDIR",content:Ua},PICTURES:{name:"$PICTURES",content:Ga},PLUGINSDIR:{name:"$PLUGINSDIR",content:Ha},PRINTHOOD:{name:"$PRINTHOOD",content:Ka},PROFILE:{name:"$PROFILE",content:Va},PROGRAMFILES:{name:"$PROGRAMFILES",content:Xa},QUICKLAUNCH:{name:"$QUICKLAUNCH",content:Ya},RECENT:{name:"$RECENT",content:za},RESOURCES_LOCALIZED:{name:"$RESOURCES_LOCALIZED",content:ja},RESOURCES:{name:"$RESOURCES",content:qa},SENDTO:{name:"$SENDTO",content:Za},SMPROGRAMS:{name:"$SMPROGRAMS",content:Ja},SMSTARTUP:{name:"$SMSTARTUP",content:Qa},STARTMENU:{name:"$STARTMENU",content:nl},SYSDIR:{name:"$SYSDIR",content:el},TEMP:{name:"$TEMP",content:tl},TEMPLATES:{name:"$TEMPLATES",content:ol},VIDEOS:{name:"$VIDEOS",content:il},WINDIR:{name:"$WINDIR",content:rl}};

export { $l as Callbacks, gl as Commands, et as Includes, Il as Plugins, bl as Variables };
