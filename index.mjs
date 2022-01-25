var BannerTrimPath = "# ${BannerTrimPath}\n\nTrim string path for banner.\n\n## Syntax\n\n    ${BannerTrimPath} \"[PathString]\" \"[Option]\" $var\n\n    \"[PathString]\"    ;\n                      ;\n    \"[Option]\"        ; [Length][A|B|C|D]\n                      ;\n                      ; Length  -Maximum string length\n                      ;   A     -Trim center path (default)\n                      ;           (C:\\root\\...\\third path) \n                      ;           If A mode not possible Then will be used B mode\n                      ;   B     -Trim right path\n                      ;           (C:\\root\\second path\\...)\n                      ;           If B mode not possible Then will be used C mode\n                      ;   C     -Trim right string\n                      ;           (C:\\root\\second path\\third p...)\n                      ;   D     -Trim right string + filename\n                      ;           (C:\\root\\second p...\\third path)\n                      ;           If D mode not possible Then will be used C mode\n                      ;\n    $var              ; Result:  Trimmed path\n\n## Examples\n\n### Trim center path to 35 characters max\n\n    Section\n        ${BannerTrimPath} \"C:\\Server\\Documents\\Terminal\\license.htm\" \"35A\" $R0\n        ;$R0=C:\\Server\\...\\Terminal\\license.htm\n    SectionEnd\n\n### Banner plugin\n\n    !include \"WinMessages.nsh\"\n    !include \"FileFunc.nsh\"\n\n    Section\n        Banner::show \"Starting...\"\n        Banner::getWindow\n        Pop $R1\n        ${Locate} \"$WINDIR\" \"/L=F /M=*.* /B=1\" \"LocateCallback\"\n        Banner::destroy\n    SectionEnd\n\n    Function LocateCallback\n        StrCmp $R0 $R8 code\n        StrCpy $R0 $R8\n        ${BannerTrimPath} \"$R8\" \"38B\" $R8\n        GetDlgItem $1 $R1 1030\n        SendMessage $1 ${WM_SETTEXT} 0 \"STR:$R8\"\n\n        code:\n        StrCmp $R9 '' end\n        ;...\n\n        end:\n        Push $0\n    FunctionEnd\n\n### NxS plugin\n\n    !include \"FileFunc.nsh\"\n\n    Section\n        nxs::Show /NOUNLOAD `$(^Name) Setup`\\\n          /top `Setup searching something$\\nPlease wait$\\nIf you can...`\\\n          /h 1 /can 1 /end\n        ${Locate} \"$WINDIR\" \"/L=F /M=*.* /B=1\" \"LocateCallback\"\n        nxs::Destroy\n    SectionEnd\n\n    Function LocateCallback\n        StrCmp $R0 $R8 abortcheck\n        StrCpy $R0 $R8\n        ${BannerTrimPath} \"$R8\" \"55A\" $R8\n        nxs::Update /NOUNLOAD /sub \"$R8\" /pos 78 /end\n\n        abortcheck:\n        nxs::HasUserAborted /NOUNLOAD\n        Pop $0\n        StrCmp $0 1 0 +2\n        StrCpy $0 StopLocate\n\n        StrCmp $R9 '' end\n        ;...\n\n        end:\n        Push $0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var DirState = "# ${DirState}\n\nCheck directory full, empty or not exist.\n\n## Syntax\n\n    ${DirState} \"[path]\" $var\n\n    \"[path]\"      ; Directory\n    $var          ; Result:\n                  ;    $var=0  (empty)\n                  ;    $var=1  (full)\n                  ;    $var=-1 (directory not found)\n\n## Example\n\n    Section\n        ${DirState} \"$TEMP\" $R0\n        ; $R0=\"1\"  directory is full\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var DriveSpace = "# ${DriveSpace}\n\nGet total, occupied or free space of the drive.\n\n## Syntax\n\n    ${DriveSpace} \"[Drive]\" \"[Options]\" $var\n\n    \"[Drive]\"     ; Disk to check\n                  ;     \n    \"[Options]\"   ; /D=[T|O|F]\n                  ;     /D=T  - Total space (default)\n                  ;     /D=O  - Occupied space\n                  ;     /D=F  - Free space\n                  ; /S=[B|K|M|G]\n                  ;     /S=B  - size in Bytes (default)\n                  ;     /S=K  - size in Kilobytes\n                  ;     /S=M  - size in Megabytes\n                  ;     /S=G  - size in Gigabytes\n                  ;\n    $var          ; Result: Size\n\nNote:\n\n- Error flag if disk isn't exist or not ready\n- Error flag if syntax error\n\n## Example\n\n    Section\n        ${DriveSpace} \"C:\\\" \"/D=F /S=M\" $R0\n        ; $R0=\"2530\"   megabytes free on drive C:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetBaseName = "# ${GetBaseName}\n\nGet file name without extension.\n\n## Syntax\n\n    ${GetBaseName} \"[FileString]\" $var\n\n## Example\n\n    Section\n        ${GetBaseName} \"C:\\ftp\\program.exe\" $R0\n        ; $R0=\"program\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetDrives = "# ${GetDrives}\n\nFind all available drives in the system.\n\n## Syntax\n\n    ${GetDrives} \"[Option]\" \"Function\"\n\n    \"[Option]\"      ; [FDD+HDD+CDROM+NET+RAM]\n                    ;   FDD    Floppy Disk Drives\n                    ;   HDD    Hard Disk Drives \n                    ;   CDROM  CD-ROM Drives\n                    ;   NET    Network Drives\n                    ;   RAM    RAM Disk Drives\n                    ;\n                    ; [ALL]\n                    ;   Find all drives by letter (default)\n                    ;\n    \"Function\"      ; Callback function when found\n\n    Function \"Function\"\n        ; $9    \"drive letter\"  (a:\\ c:\\ ...)\n        ; $8    \"drive type\"    (FDD HDD ...)\n\n        ; $R0-$R9  are not used (save data in them).\n        ; ...\n\n        Push $var    ; If $var=\"StopGetDrives\" Then exit from function\n    FunctionEnd\n\n## Examples\n\n### Get floppy and CD-ROM drives\n\n    Section\n        ${GetDrives} \"FDD+CDROM\" \"Example1\"\n    SectionEnd\n\n    Function Example1\n        MessageBox MB_OK \"$9  ($8 Drive)\"\n\n        Push $0\n    FunctionEnd\n\n### Get all drives\n\n    Section\n        ${GetDrives} \"ALL\" \"Example2\"\n    SectionEnd\n\n    Function Example2\n        MessageBox MB_OK \"$9  ($8 Drive)\"\n\n        Push $0\n    FunctionEnd\n\n### Get type of drive\n\n    Section\n        StrCpy $R0 \"D:\\\"      ;Drive letter\n        StrCpy $R1 \"invalid\"\n\n        ${GetDrives} \"ALL\" \"Example3\"\n\n        MessageBox MB_OK \"Type of drive $R0 is $R1\"\n    SectionEnd\n\n    Function Example3\n        StrCmp $9 $R0 0 +3\n        StrCpy $R1 $8\n        StrCpy $0 StopGetDrives\n\n        Push $0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetExeName = "# ${GetExeName}\n\nGet installer filename (with valid case for Windows 98/Me).\n\n## Syntax\n\n    ${GetExeName} $var\n\n## Example\n\n    Section\n        ${GetExeName} $R0\n        ; $R0=\"C:\\ftp\\program.exe\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetExePath = "# ${GetExePath}\n\nGet installer pathname ([`$EXEDIR`][1] with valid case for Windows 98/Me).\n\n## Syntax\n\n    ${GetExePath} $var\n\n## Example\n\n    Section\n        ${GetExePath} $R0\n        ; $R0=\"C:\\ftp\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][2]\n\n[1]: ../../Variables/EXEDIR.md\n[2]: http://nsis.sourceforge.net/User:Instructor\n";

var GetFileAttributes = "# ${GetFileAttributes}\n\nGet attributes of file or directory.\n\n## Syntax\n\n    ${GetFileAttributes} \"[File]\" \"[Attributes]\" $var\n\n    \"[File]\"          ; File or directory\n                      ;\n    \"[Attributes]\"    ; \"ALL\"  (default)\n                      ;  -all attributes of file combined with \"|\" to output\n                      ;\n                      ; \"READONLY|HIDDEN|SYSTEM|DIRECTORY|ARCHIVE|\n                      ; DEVICE|NORMAL|TEMPORARY|SPARSE_FILE|REPARSE_POINT|\n                      ; COMPRESSED|OFFLINE|NOT_CONTENT_INDEXED|ENCRYPTED\"\n                      ;  -file must have specified attributes\n                      ;\n    $var              ; Result:\n                      ;    $var=attr1|attr2|... (if used \"ALL\")\n                      ;    $var=1   file has specified attributes\n                      ;    $var=0   file has no specified attributes\n\nNote:\n\n- Error flag if file doesn't exist\n\n## Examples\n\n### Get all file attributes\n\n    Section\n        ${GetFileAttributes} \"C:\\MSDOS.SYS\" \"ALL\" $R0\n        ; $R0=READONLY|HIDDEN|SYSTEM|ARCHIVE\n    SectionEnd\n\n### Get some file attributes\n\n    Section\n        ${GetFileAttributes} \"C:\\MSDOS.SYS\" \"SYSTEM|HIDDEN\" $R0\n        ; $R0=1\n    SectionEnd\n\n### Get file attribute \"NORMAL\"\n\n    Section\n        ${GetFileAttributes} \"C:\\MSDOS.SYS\" \"NORMAL\" $R0\n        ; $R0=0\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetFileExt = "# ${GetFileExt}\n\nGet extension of file.\n\n## Syntax\n\n    ${GetFileExt} \"[FileString]\" $var\n\n## Example\n\n    Section\n        ${GetFileExt} \"C:\\ftp\\program.exe\" $R0\n        ; $R0=\"exe\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetFileName = "# ${GetFileName}\n\nGet last part from directory path.\n\n## Syntax\n\n    ${GetFileName} \"[PathString]\" $var\n\n## Example\n\n    Section\n        ${GetFileName} \"C:\\Program Files\\Winamp\\uninstwa.exe\" $R0\n        ; $R0=\"uninstwa.exe\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetFileVersion = "# ${GetFileVersion}\n\nGet version information from executable file.\n\n## Syntax\n\n    ${GetFileVersion} \"[Executable]\" $var\n\n    \"[Executable]\"      ; Executable file (*.exe *.dll ...)\n    $var                ; Result: Version number\n\nNote:\n\n- Error flag if file doesn't exist\n- Error flag if file doesn't contain version information\n\n## Example\n\n    Section\n        ${GetFileVersion} \"C:\\ftp\\program.exe\" $R0\n        ; $R0=\"1.1.0.12\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetOptions = "# ${GetOptions}\n\nGet options from command line parameters.\n\n## Syntax\n\n    ${GetOptions} \"[Parameters]\" \"[Option]\" $var\n\n    \"[Parameters]\"     ; command line parameters\n                       ;\n    \"[Option]\"         ; option name\n                       ;\n    $var               ; Result: option string\n\nNote:\n\n- Error flag if option not found\n- First option symbol it is delimiter\n\n## Examples\n\n### Example 1\n\n    Section\n        ${GetOptions} \"/S /T\" \"/T\"  $R0\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Not found\" IDOK +2\n        MessageBox MB_OK \"Found\"\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${GetOptions} \"-INSTDIR=C:\\Program Files\\Common Files -SILENT=yes\" \"-INSTDIR=\"  $R0\n        ;$R0=C:\\Program Files\\Common Files\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${GetOptions} '/SILENT=yes /INSTDIR=\"C:/Program Files/Common Files\" /ADMIN=password' \"/INSTDIR=\"  $R0\n        ;$R0=C:/Program Files/Common Files\n    SectionEnd\n\n### Example 4\n\n    Section\n        ${GetOptions} `-SILENT=yes -INSTDIR='\"C:/Program Files/Common Files\"' -ADMIN=password` \"-INSTDIR=\"  $R0\n        ;$R0=\"C:/Program Files/Common Files\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetOptionsS = "# ${GetOptionsS}\n\nGet case-sensitive options from command line parameters.\n\n## Syntax\n\n    ${GetOptionsS} \"[Parameters]\" \"[Option]\" $var\n\n    \"[Parameters]\"     ; command line parameters\n                       ;\n    \"[Option]\"         ; option name\n                       ;\n    $var               ; Result: option string\n\nNote:\n\n- Error flag if option not found\n- First option symbol it is delimiter\n\n## Examples\n\n### Example 1\n\n    Section\n        ${GetOptionsS} \"/S /T\" \"/T\"  $R0\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Not found\" IDOK +2\n        MessageBox MB_OK \"Found\"\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${GetOptionsS} \"-INSTDIR=C:\\Program Files\\Common Files -SILENT=yes\" \"-INSTDIR=\"  $R0\n        ;$R0=C:\\Program Files\\Common Files\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${GetOptionsS} '/SILENT=yes /INSTDIR=\"C:/Program Files/Common Files\" /ADMIN=password' \"/INSTDIR=\"  $R0\n        ;$R0=C:/Program Files/Common Files\n    SectionEnd\n\n### Example 4\n\n    Section\n        ${GetOptionsS} `-SILENT=yes -INSTDIR='\"C:/Program Files/Common Files\"' -ADMIN=password` \"-INSTDIR=\"  $R0\n        ;$R0=\"C:/Program Files/Common Files\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetParameters = "# ${GetParameters}\n\nGet command line parameters.\n\n## Syntax\n\n    ${GetParameters} $var\n\n## Example\n\n    Section\n        ${GetParameters} $R0\n        ; $R0=\"[parameters]\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetParent = "# ${GetParent}\n\nGet parent directory.\n\n## Syntax\n\n    ${GetParent} \"[PathString]\" $var\n\n## Example\n\n    Section\n        ${GetParent} \"C:\\Program Files\\Winamp\\uninstwa.exe\" $R0\n        ; $R0=\"C:\\Program Files\\Winamp\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetRoot = "# ${GetRoot}\n\nGet root directory.\n\n## Syntax\n\n    ${GetRoot} \"[FullPath]\" $var\n\n## Examples\n\n### Get root of local folder\n\n    Section\n        ${GetRoot} \"C:\\Program Files\\NSIS\" $R0\n        ; $R0=\"C:\"\n    SectionEnd\n\n### Get root of network share\n\n    Section\n        ${GetRoot} \"\\\\SuperPimp\\NSIS\\Source\\exehead\\Ui.c\" $R0\n        ; $R0=\"\\\\SuperPimp\\NSIS\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var GetSize = "# ${GetSize}\n\n* Find the size of a file, files mask or directory.\n* Find the sum of the files, directories and subdirectories.\n\n## Syntax\n\n    ${GetSize} \"[Path]\" \"[Options]\" $var1 $var2 $var3\n\n    \"[Path]\"      ; Disk or Directory\n                  ;\n    \"[Options]\"   ; /M=[mask]\n                  ;     /M=*.*         - Find all (default)\n                  ;     /M=*.doc       - Find Work.doc, 1.doc ...\n                  ;     /M=Pho*        - Find PHOTOS, phone.txt ...\n                  ;     /M=win???.exe  - Find winamp.exe, winver.exe ...\n                  ;     /M=winamp.exe  - Find winamp.exe only\n                  ; /S=No:No[B|K|M|G]\n                  ;     /S=      - Don't find file size (faster) (default)\n                  ;     /S=0:0B  - Find only files of 0 Bytes exactly\n                  ;     /S=5:9K  - Find only files of 5 to 9 Kilobytes\n                  ;     /S=:10M  - Find only files of 10 Megabyte or less\n                  ;     /S=1G    - Find only files of 1 Gigabyte or more\n                  ; /G=[1|0]\n                  ;     /G=1     - Find with subdirectories (default)\n                  ;     /G=0     - Find without subdirectories\n                  ;\n    $var1         ; Result1: Size\n    $var2         ; Result2: Sum of files\n    $var3         ; Result3: Sum of directories\n\nNote:\n\n- Error flag if disk or directory isn't exist\n- Error flag if syntax error\n- See also [Locate plugin][1]\n\n## Examples\n\n### Find file size in kilobytes\n\n    Section\n        ${GetSize} \"C:\\WINDOWS\" \"/M=Explorer.exe /S=0K /G=0\" $0 $1 $2\n        ; $0=\"220\" Kb\n        ; $1=\"1\"   files\n        ; $2=\"\"    directories\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n### Find folder size in megabytes\n\n    Section\n        ${GetSize} \"C:\\Installs\\Reanimator\\Drivers\" \"/S=0M\" $0 $1 $2\n        ; $0=\"132\" Mb\n        ; $1=\"555\" files\n        ; $2=\"55\"  directories\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n### Find sum of files and folders (no subfolders)\n\n    Section\n        ${GetSize} \"C:\\WINDOWS\" \"/G=0\" $0 $1 $2\n        ; $0=\"\"    size\n        ; $1=\"253\" files\n        ; $2=\"46\"  directories\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][2]\n\n[1]: http://nsis.sourceforge.net/Locate_plugin\n[2]: http://nsis.sourceforge.net/User:Instructor\n";

var GetTime = "# ${GetTime}\n\n* Get local or system time.\n* Get file time (access, creation and modification).\n\n## Syntax\n\n    ${GetTime} \"[File]\" \"[Option]\" $var1 $var2 $var3 $var4 $var5 $var6 $var7\n    \"[File]\"        ; Ignored if \"L\" or \"LS\"\n                    ;\n    \"[Option]\"      ; [Options]\n                    ;   L   Local time\n                    ;   A   last Access file time\n                    ;   C   Creation file time\n                    ;   M   Modification file time\n                    ;   LS  System time (UTC)\n                    ;   AS  last Access file time (UTC)\n                    ;   CS  Creation file time (UTC)\n                    ;   MS  Modification file time (UTC)\n                    ;\n    $var1           ; Result1: day\n    $var2           ; Result2: month\n    $var3           ; Result3: year\n    $var4           ; Result4: day of week name\n    $var5           ; Result5: hour\n    $var6           ; Result6: minute\n    $var7           ; Result7: seconds\n\nNote:\n\n- Error flag if file isn't exist\n- Error flag if syntax error\n- See also [Time plugin][1]\n\n## Examples\n\n### Get local time\n\n    Section\n        ${GetTime} \"\" \"L\" $0 $1 $2 $3 $4 $5 $6\n        ; $0=\"01\"      day\n        ; $1=\"04\"      month\n        ; $2=\"2005\"    year\n        ; $3=\"Friday\"  day of week name\n        ; $4=\"16\"      hour\n        ; $5=\"05\"      minute\n        ; $6=\"50\"      seconds\n\n        MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\\nTime=$4:$5:$6'\n    SectionEnd\n\n### Get file time\n\n    Section\n        ${GetTime} \"$WINDIR\\Explorer.exe\" \"C\" $0 $1 $2 $3 $4 $5 $6\n        ; $0=\"12\"       day\n        ; $1=\"10\"       month\n        ; $2=\"2004\"     year\n        ; $3=\"Tuesday\"  day of week name\n        ; $4=\"2\"        hour\n        ; $5=\"32\"       minute\n        ; $6=\"03\"       seconds\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n        MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\\nTime=$4:$5:$6'\n    SectionEnd\n\n### Get system time\n\n    Section\n        ${GetTime} \"\" \"LS\" $0 $1 $2 $3 $4 $5 $6\n        ; $0=\"01\"      day\n        ; $1=\"04\"      month\n        ; $2=\"2005\"    year\n        ; $3=\"Friday\"  day of week name\n        ; $4=\"11\"      hour\n        ; $5=\"05\"      minute\n        ; $6=\"50\"      seconds\n\n        MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\\nTime=$4:$5:$6'\n    SectionEnd\n\n### Convert time to 12-hour format AM/PM\n\n    Section\n        ${GetTime} \"\" \"L\" $0 $1 $2 $3 $4 $5 $6\n\n        StrCmp $4 0 0 +3\n        StrCpy $4 12\n        goto +3\n        StrCmp $4 12 +5\n        IntCmp $4 12 0 0 +3\n        StrCpy $7 AM\n        goto +3\n        IntOp $4 $4 - 12\n        StrCpy $7 PM\n\n        MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\\nTime=$4:$5:$6 $7'\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][2]\n\n[1]: http://nsis.sourceforge.net/Time_plugin\n[2]: http://nsis.sourceforge.net/User:Instructor\n";

var Locate = "# ${Locate}\n\nFind files, directories and empty directories with mask and size options.\n\n## Syntax\n\n    ${Locate} \"[Path]\" \"[Options]\" \"Function\"\n\n    \"[Path]\"      ; Disk or Directory\n                  ;\n    \"[Options]\"   ; /L=[FD|F|D|DE|FDE]\n                  ;     /L=FD    - Locate Files and Directories (default)\n                  ;     /L=F     - Locate Files only\n                  ;     /L=D     - Locate Directories only\n                  ;     /L=DE    - Locate Empty Directories only\n                  ;     /L=FDE   - Locate Files and Empty Directories\n                  ; /M=[mask]\n                  ;     /M=*.*         - Locate all (default)\n                  ;     /M=*.doc       - Locate Work.doc, 1.doc ...\n                  ;     /M=Pho*        - Locate PHOTOS, phone.txt ...\n                  ;     /M=win???.exe  - Locate winamp.exe, winver.exe ...\n                  ;     /M=winamp.exe  - Locate winamp.exe only\n                  ; /S=No:No[B|K|M|G]\n                  ;     /S=      - Don't locate file size (faster) (default)\n                  ;     /S=0:0B  - Locate only files of 0 Bytes exactly\n                  ;     /S=5:9K  - Locate only files of 5 to 9 Kilobytes\n                  ;     /S=:10M  - Locate only files of 10 Megabyte or less\n                  ;     /S=1G    - Locate only files of 1 Gigabyte or more\n                  ; /G=[1|0]\n                  ;     /G=1     - Locate with subdirectories (default)\n                  ;     /G=0     - Locate without subdirectories\n                  ; /B=[0|1]\n                  ;     /B=0     - Banner isn't used (default)\n                  ;     /B=1     - Banner is used. Callback when function\n                  ;                start to search in new directory\n    \"Function\"    ; Callback function when found\n\n    Function \"Function\"\n        ; $R9    \"path\\name\"\n        ; $R8    \"path\"\n        ; $R7    \"name\"\n        ; $R6    \"size\"  ($R6=\"\" if directory, $R6=\"0\" if file with /S=)\n\n        ; $R0-$R5  are not used (save data in them).\n        ; ...\n\n        Push $var    ; If $var=\"StopLocate\" Then exit from function\n    FunctionEnd\n\nNote:\n\n- Error flag if disk or directory isn't exist\n- Error flag if syntax error\n- See also [Locate plugin][1]\n\n## Examples\n\n### Find one file\n\n    Section\n        ${Locate} \"C:\\ftp\" \"/L=F /M=RPC DCOM.rar /S=1K\" \"Example1\"\n        ; 'RPC DCOM.rar' file in 'C:\\ftp' with size 1 Kb or more\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n        MessageBox MB_OK \"$$R0=$R0\"\n    SectionEnd\n\n    Function Example1\n        StrCpy $R0 $R9\n        ; $R0=\"C:\\ftp\\files\\RPC DCOM.rar\"\n\n        MessageBox MB_YESNO '$R0$\\n$\\nFind next?' IDYES +2\n        StrCpy $0 StopLocate\n\n        Push $0\n    FunctionEnd\n\n### Write results to a text file\n\n    Section\n        GetTempFileName $R0\n        FileOpen $R1 $R0 w\n        ${Locate} \"C:\\ftp\" \"/S=:2M /G=0\" \"Example2\"\n        ; folders and all files with size 2 Mb or less\n        ; don't scan subdirectories\n        FileClose $R1\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n        Exec '\"notepad.exe\" \"$R0\"'\n    SectionEnd\n\n    Function Example2\n        StrCmp $R6 '' 0 +3\n        FileWrite $R1 \"Directory=$R9$\\r$\\n\"\n        goto +2\n        FileWrite $R1 \"File=$R9  Size=$R6 Mb$\\r$\\n\"\n\n        Push $0\n    FunctionEnd\n\n### Write results to an INI file\n\n    Section\n        GetTempFileName $R0\n        ${Locate} \"C:\\ftp\" \"/L=F /S=0K\" \"Example3\"\n        ; all files in 'C:\\ftp' with size detect in Kb\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n        Exec '\"notepad.exe\" \"$R0\"'\n    SectionEnd\n\n    Function Example3\n        WriteINIStr $R0 \"$R8\" \"$R7\" \"$R6 Kb\"\n\n        Push $0\n    FunctionEnd\n\n### Delete empty directories\n\n    Section\n        StrCpy $R2 0\n        StrCpy $R3 0\n\n        loop:\n        StrCpy $R1 0\n        ${Locate} \"C:\\ftp\" \"/L=DE\" \"Example4\"\n        IntOp $R3 $R3 + 1\n        IntOp $R2 $R2 + $R1\n        StrCmp $R0 StopLocate +2\n        StrCmp $R1 0 0 loop\n\n        IfErrors 0 +2\n        MessageBox MB_OK 'error' IDOK +2\n        MessageBox MB_OK '$R2 directories were removed$\\n$R3 loops'\n    SectionEnd\n\n    Function Example4\n        MessageBox MB_YESNOCANCEL 'Delete empty \"$R9\"?' IDNO end IDCANCEL cancel\n        RMDir $R9\n        IntOp $R1 $R1 + 1\n        goto end\n\n        cancel:\n        StrCpy $R0 StopLocate\n\n        end:\n        Push $R0\n    FunctionEnd\n\n### Move all files into one folder\n\n    Section\n        StrCpy $R0 \"C:\\ftp\"   ;Directory move from\n        StrCpy $R1 \"C:\\ftp2\"  ;Directory move into\n\n        StrCpy $R2 0\n        StrCpy $R3 0\n        ${Locate} \"$R0\" \"/L=F\" \"Example5\"\n\n        IfErrors 0 +2\n        MessageBox MB_OK 'error' IDOK +4\n        StrCmp $R3 0 0 +2\n        MessageBox MB_OK '$R2 files were moved' IDOK +2\n        MessageBox MB_OK '$R2 files were moved$\\n$R3 files were NOT moved'\n    SectionEnd\n\n    Function Example5\n        StrCmp $R8 $R1 +6\n        IfFileExists '$R1\\$R7' +4\n        Rename $R9 '$R1\\$R7'\n        IntOp $R2 $R2 + 1\n        goto +2\n        IntOp $R3 $R3 + 1\n\n        Push $0\n    FunctionEnd\n\n### Copy files with log\n\n    Section\n        StrCpy $R0 \"C:\\ftp\"   ;Directory copy from\n        StrCpy $R1 \"C:\\ftp2\"  ;Directory copy into\n        StrLen $R2 $R0\n\n        GetTempFileName $0\n        FileOpen $R3 $0 w\n        ${Locate} \"$R0\" \"/L=FDE\" \"Example6\"\n        FileClose $R3\n\n        IfErrors 0 +2\n        MessageBox MB_OK 'error'\n\n        Exec '\"notepad.exe\" \"$0\"'     ;view log\n    SectionEnd\n\n    Function Example6\n        StrCpy $1 $R8 '' $R2\n\n        StrCmp $R6 '' 0 +3\n        CreateDirectory '$R1$1\\$R7'\n        goto end\n        CreateDirectory '$R1$1'\n        CopyFiles /SILENT $R9 '$R1$1'\n\n        IfFileExists '$R1$1\\$R7' 0 +3\n        FileWrite $R3 \"-old:$R9  -new:$R1$1\\$R7  -success$\\r$\\n\"\n        goto +2\n        FileWrite $R3 \"-old:$R9  -new:$R1$1\\$R7  -failed$\\r$\\n\"\n\n        end:\n        Push $0\n    FunctionEnd\n\n### Recreate directory structure\n\n    Section\n        StrCpy $R0 \"C:\\ftp\"     ;Directory structure from\n        StrCpy $R1 \"C:\\ftp2\"    ;Directory structure into\n        StrLen $R2 $R0\n\n        ${Locate} \"$R0\" \"/L=D\" \"Example7\"\n\n        IfErrors 0 +2\n        MessageBox MB_OK 'error'\n    SectionEnd\n\n    Function Example7\n        StrCpy $1 $R9 '' $R2\n        CreateDirectory '$R1$1'\n\n        Push $0\n    FunctionEnd\n\n### Locate with banner - NxS plugin required\n\n    Section\n        nxs::Show /NOUNLOAD `$(^Name) Setup` /top `Setup searching something$\\r$\\nPlease wait... If you can..` /h 1 /can 1 /end\n        ${Locate} \"C:\\WINDOWS\" \"/L=F /M=*.inf /B=1\" \"Example8\"\n        nxs::Destroy\n    SectionEnd\n\n    Function Example8\n        StrCmp $R0 $R8 abortcheck\n        StrCpy $R0 $R8\n        nxs::Update /NOUNLOAD /sub \"$R8\" /pos 78 /end\n\n        abortcheck:\n        nxs::HasUserAborted /NOUNLOAD\n        Pop $0\n        StrCmp $0 1 0 +2\n        StrCpy $0 StopLocate\n\n        StrCmp $R9 '' end\n        ;...\n\n        end:\n        Push $0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][2]\n\n[1]: http://nsis.sourceforge.net/Locate_plugin\n[2]: http://nsis.sourceforge.net/User:Instructor\n";

var RefreshShellIcons = "# ${RefreshShellIcons}\n\nAfter changing file associations, you can call this function to refresh the shell immediately.\n\n## Syntax\n\n    ${RefreshShellIcons}\n\n## Example\n\n    Section\n        WriteRegStr HKCR \"Winamp.File\\DefaultIcon\" \"\" \"$PROGRAMFILES\\Winamp\\WINAMP.EXE,2\"\n        ${RefreshShellIcons}\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var AndIf = "# ${AndIf}\n\nAdds any number of extra conditions to [`If`][1], [`IfNot`][2], [`Unless`][3], [`ElseIf`][4], [`ElseIfNot`][5] and [`ElseUnless`][6] statements.\n\n## Syntax\n\n    ${AndIf} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n    StrCpy $1 true\n\n    ${If} $0 == true\n    ${AndIf} $1 == true\n        MessageBox MB_OK \"Everything's true\"\n    ${EndIf}\n\n### Integer tests\n\n    ${If} 2 > 1\n    ${AndIf} 2 < 3\n        MessageBox MB_OK \"2 is greater than 1 and smaller than 3\"\n    ${EndIf}\n\n### File conditions\n\n    ${If} ${FileExists} $SYSDIR\\calc.exe\n    ${AndIf} ${FileExists} $SYSDIR\\notepad.exe\n        MessageBox MB_OK \"We have both\"\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n[3]: Unless.md\n[4]: ElseIf.md\n[5]: ElseIfNot.md\n[6]: ElseUnless.md\n";

var AndIfNot = "# ${AndIfNot}\n\nAdds any number of extra conditions to [`If`][1], [`IfNot`][2], [`Unless`][3], [`ElseIf`][4], [`ElseIfNot`][5] and [`ElseUnless`][6] statements. `${AndIfNot}` and [`${AndUnless}`][7] are equivalent and interchangeable.\n\n## Syntax\n\n    ${AndIfNot} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n    StrCpy $1 true\n\n    ${If} $0 == true\n    ${AndIfNot} $1 == false\n        MessageBox MB_OK \"Everything's true\"\n    ${EndIf}\n\n### Integer tests\n\n    ${If} 2 > 1\n    ${AndIfNot} 2 < 1\n        MessageBox MB_OK \"2 is always greater than 1\"\n    ${EndIf}\n\n### File conditions\n\n    ${IfNot} ${FileExists} $SYSDIR\\calc.exe\n    ${AndIfNot} ${FileExists} $SYSDIR\\notepad.exe\n        MessageBox MB_OK \"We have neither\"\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n[3]: Unless.md\n[4]: ElseIf.md\n[5]: ElseIfNot.md\n[6]: ElseUnless.md\n[7]: AndUnless.md\n";

var AndUnless = "# ${AndUnless}\n\nAdds any number of extra conditions to [`If`][1], [`IfNot`][2], [`Unless`][3], [`ElseIf`][4], [`ElseIfNot`][5] and [`ElseUnless`][6] statements. [`${AndIfNot}`][7] and `${AndUnless}` are equivalent and interchangeable.\n\n## Syntax\n\n    ${AndUnless} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n    StrCpy $1 true\n\n    ${Unless} $0 == true\n    ${AndUnless} $1 == true\n        MessageBox MB_OK \"Nothing's true\"\n    ${EndUnless}\n\n### Integer tests\n\n    ${Unless} 2 == 2\n    ${AndUnless} 1 == 1\n        MessageBox MB_OK \"This will never show\"\n    ${EndUnless}\n\n### File conditions\n\n    ${Unless} ${FileExists} $SYSDIR\\calc.exe\n    ${AndUnless} ${FileExists} $SYSDIR\\notepad.exe\n        MessageBox MB_OK \"We have neither\"\n    ${EndUnless}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n[3]: Unless.md\n[4]: ElseIf.md\n[5]: ElseIfNot.md\n[6]: ElseUnless.md\n[7]: AndIfNot.md\n";

var Break = "# ${Break}\n\nBreaks a block of statements.\n\n## Syntax\n\n    ${Break}\n\n## Examples\n\n### Simple example\n\n    ${For} $1 1 10\n        ${Break}\n        MessageBox MB_OK \"This will never show\"\n    ${Next}\n\n### In combination with a MessageBox\n\n    ${For} $1 1 10\n        ${IfCmd} MessageBox MB_YESNO \"We're at $1, continue up to 10?\" IDYES ${||} ${Break} ${|}\n    ${Next}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var Case = "# ${Case}\n\nExecutes one of several blocks of statements, depending on the value of an expression. Use [`${Break}`][1] to prevent fall-through to the next `${Case}` section.\n\n## Syntax\n\n    ${Case[2|3|4|5]} value(s)\n\n## Example\n\n    StrCpy $0 1\n\n    ${Select} $0\n        ${Case} \"1\"\n            MessageBox MB_OK \"$$0 is 1\"\n            ${Break}\n        ${Case} \"2\"\n            MessageBox MB_OK \"$$0 isn't 2\"\n            ${Break}\n        ${Case2} \"3\" \"4\"\n            MessageBox MB_OK \"$$0 isn't 3 or 4\"\n            ${Break}\n        ${Case3} \"5\" \"6\" \"7\"\n            MessageBox MB_OK \"$$0 isn't 5, 6 or 7\"\n            ${Break}\n        ${CaseElse}\n            MessageBox MB_OK \"$$0 isn't anything else\"\n    ${EndSelect}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Break.md\n";

var CaseElse = "# ${CaseElse}\n\nExecutes one of several blocks of statements, depending on the value of an expression. `${CaseElse}` and [`${Default}`][1] are equivalent and interchangeable.\n\n## Syntax\n\n    ${CaseElse}\n\n## Example\n\n    StrCpy $0 1\n\n    ${Select} $0\n        ${Case} \"1\"\n            MessageBox MB_OK \"$$0 is 1\"\n        ${Case} \"2\"\n            MessageBox MB_OK \"$$0 isn't 2\"\n        ${CaseElse}\n            MessageBox MB_OK \"$$0 isn't anything else\"\n    ${EndSelect}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Default.md\n";

var Continue = "# ${Continue}\n\nContinues a block of statements.\n\n## Syntax\n\n    ${Continue}\n\n## Example\n\n    ${Do}\n        MessageBox MB_YESNO \"Stop this loop?\" IDYES ${Break} ID_NO ${Continue}\n    ${Loop}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var Default = "# ${Default}\n\nExecutes one of several blocks of statements, depending on the value of an expression. [`${CaseElse}`][1] and `${Default}` are equivalent and interchangeable.\n\n## Syntax\n\n    ${Default}\n\n## Example\n\n    StrCpy $0 1\n\n    ${Select} $0\n        ${Case} \"1\"\n            MessageBox MB_OK \"$$0 is 1\"\n        ${Case} \"2\"\n            MessageBox MB_OK \"$$0 isn't 2\"\n        ${Default}\n            MessageBox MB_OK \"$$0 isn't anything else\"\n    ${EndSelect}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: CaseElse.md\n";

var Do = "# ${Do}\n\nRepeats a block of statements until stopped, or depending on the value of an expression.\n\n## Syntax\n\n    ${Do}\n\n## Example\n\n    StrCpy $0 0\n\n    ${Do}\n        IntOp $0 $0 + 1\n        ${If} $0 > 10\n            ${ExitDo}\n        ${EndIf}\n    ${Loop}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var DoUntil = "# ${DoUntil}\n\nRepeats a block of statements until stopped, or depending on the value of an expression.\n\n## Syntax\n\n    ${DoUntil} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 0\n\n    ${DoUntil} $0 > 10\n        IntOp $0 $0 + 1\n    ${Loop}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var DoWhile = "# ${DoWhile}\n\nRepeats a block of statements until stopped, or depending on the value of an expression.  `${DoWhile}` and [`${While}`][1] are equivalent and interchangeable.\n\n## Syntax\n\n    ${DoWhile} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 0\n\n    ${DoWhile} $0 > 5\n        IntOp $0 $0 + 1\n    ${EndWhile}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: While.md\n";

var Else = "# ${Else}\n\nConditionally executes a block of statements, depending on the value of an expression. Requires opening condition [`${If}`][1] or [`${IfNot}`][2].\n\n## Syntax\n\n    ${Else}\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n\n    ${If} $0 == true\n        MessageBox MB_OK \"$$0 is always true\"\n    ${Else}\n        MessageBox MB_OK \"$$0 is never false\"\n    ${EndIf}\n\n### Integer tests\n\n    ${If} 1 > 0\n        MessageBox MB_OK \"1 is greater than 0\"\n    ${Else}\n        MessageBox MB_OK \"Something went wrong!\"\n    ${EndIf}\n\n### File conditions\n\n    ${IfNot} ${FileExists} $SYSDIR\\notepad.exe\n        MessageBox MB_OK \"Could not find notepad.exe\"\n    ${Else}\n        Exec $SYSDIR\\notepad.exe\n    ${EndIf}\n\n### Section test\n\n    Section \"My Section\" mySection\n        MessageBox MB_OK \"Section is selected!\"\"\n\n        ${If} ${SectionIsSelected} ${mySection}\n            MessageBox MB_OK \"Section is selected (and we knew that already!)\"\n        ${Else}\n            MessageBox MB_OK \"This will never show, dummy!\"\n        ${EndIf}\n    SectionEnd\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n";

var ElseIf = "# ${ElseIf}\n\nConditionally executes a block of statements, depending on the value of an expression. Requires opening condition [`${If}`][1] or [`${IfNot}`][2].\n\n## Syntax\n\n    ${ElseIf} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n\n    ${If} $0 == true\n        MessageBox MB_OK \"It's true\"\n    ${ElseIf} $0 == pie\n        MessageBox MB_OK \"$0 will never be a pie\"\n    ${EndIf}\n\n### Integer tests\n\n    ${If} 1 > 0\n        MessageBox MB_OK \"1 is greater than 0\"\n    ${ElseIf} 1 < 0\n        MessageBox MB_OK \"1 will never be smaller than 0\"\n    ${EndIf}\n\n### File conditions\n\n    ${If} ${FileExists} $SYSDIR\\notepad.exe\n        Exec $SYSDIR\\notepad.exe\n    ${ElseIf} ${FileExists} $EXEDIR\\notepad.exe\n        Exec $EXEDIR\\notepad.exe\n    ${Else}\n        MessageBox MB_OK \"Could not find notepad.exe\"\n    ${EndIf}\n\n### Section test\n\n    Section \"My Section\" mySection\n        MessageBox MB_OK \"Executing section\"\n\n        ${If} ${SectionIsSelected} ${mySection}\n        ${AndIf} ${SectionIsReadOnly} ${mySection}\n            MessageBox MB_OK \"Ready-only section was selected\"\n        ${ElseIf} ${SectionIsReadOnly} ${mySection}\n        ${AndIfNot} ${SectionIsSelected} ${mySection}\n            MessageBox MB_OK \"This will never show, dummy!\"\n        ${EndIf}\n    SectionEnd\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n";

var ElseIfNot = "# ${ElseIfNot}\n\nConditionally executes a block of statements, depending on the value of an expression. `${ElseIfNot}` and [`${ElseUnless}`][1] are equivalent and interchangeable, as are [`${IfNot}`][2] and [`${Unless}`][3]. Requires opening condition [`${If}`][4] or [`${IfNot}`][5].\n\n## Syntax\n\n    ${ElseIfNot} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n\n    ${IfNot} $0 == true\n        MessageBox MB_OK \"$$0 is true\"\n    ${ElseIfNot} $0 == false\n        MessageBox MB_OK \"$$0 isn't false\"\n    ${EndIf}\n\n### File conditions\n\n    ${IfNot} ${FileExists} $SYSDIR\\notepad.exe\n    ${AndIf} ${FileExists} $EXEDIR\\notepad.exe\n        ; we found a copy in $EXEDIR\n        Exec $EXEDIR\\notepad.exe\n    ${ElseIfNot} ${FileExists} $SYSDIR\\notepad.exe\n    ${AndIfNot} ${FileExists} $EXEDIR\\notepad.exe\n        MessageBox MB_OK \"Could not find any notepad.exe\"\n    ${ElseIf} ${FileExists} $SYSDIR\\notepad.exe\n        ; we should've done that in the first place!\n        Exec $SYSDIR\\notepad.exe\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: ElseUnless.md\n[2]: IfNot.md\n[3]: Unless.md\n[4]: If.md\n[5]: IfNot.md\n";

var ElseUnless = "# ${ElseUnless}\n\nConditionally executes a block of statements, depending on the value of an expression. [`${ElseIfNot}`][1] and `${ElseUnless}` are equivalent and interchangeable, as are [`${IfNot}`][2] and [`${Unless}`][3]. Requires opening condition [`${If}`][4] or [`${IfNot}`][5].\n\n## Syntax\n\n    ${ElseUnless} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 true\n\n    ${Unless} $0 == true\n        MessageBox MB_OK \"$$0 is true\"\n    ${ElseUnless} $0 == false\n        MessageBox MB_OK \"$$0 isn't false\"\n    ${EndUnless}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: ElseIfNot.md\n[2]: IfNot.md\n[3]: Unless.md\n[4]: If.md\n[5]: IfNot.md\n";

var EndIf = "# ${EndIf}\n\nEnds an open condition started by [`${If}`][1] or [`${IfNot}`][2].\n\n## Syntax\n\n    ${EndIf}\n\n## Example\n\n    StrCpy $0 true\n\n    ${If} $0 == true\n        MessageBox MB_OK \"It's true\"\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n";

var EndSelect = "# ${EndSelect}\n\nEnds an open block of statements started by [`${Select}`][1].\n\n## Syntax\n\n    ${EndSelect}\n\n## Example\n\n    StrCpy $0 1\n\n    ${Select} $0\n        ${Case} \"1\"\n            MessageBox MB_OK \"$$0 is 1\"\n        ${Case} \"2\"\n            MessageBox MB_OK \"$$0 isn't 2\"\n        ${CaseElse}\n            MessageBox MB_OK \"$$0 isn't anything else\"\n    ${EndSelect}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Select.md\n";

var EndSwitch = "# ${EndSwitch}\n\nEnds an open block of labels started by [`${Switch}`][1].\n\n## Syntax\n\n    ${EndSwitch}\n\n## Example\n\n    {For} $0 1 10\n        ${Switch} $0\n            ${Case} \"1\"\n                MessageBox MB_OK \"$$0 is 1\"\n            ${Case} \"2\"\n                MessageBox MB_OK \"$$0 is 2\"\n            ${Case2} \"3\" \"5\"\n                MessageBox MB_OK \"$$0 is 3 or 5\"\n            ${CaseElse}\n                MessageBox MB_OK \"$$0 is something else ($0)\"\n        ${EndSwitch}\n    ${Next}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Switch.md\n";

var ExitDo = "# ${ExitDo}\n\nExits a block of statements until started by [`${Do}`][1], [`${DoUntil}`][2] or [`${DoWhile}`][3].\n\n## Syntax\n\n    ${ExitDo}\n\n## Example\n\n    StrCpy $0 0\n\n    ${Do}\n        IntOp $0 $0 + 1\n        ${If} $0 > 10\n            ${ExitDo}\n        ${EndIf}\n    ${Loop}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Do.md\n[2]: DoUntil.md\n[3]: DoWhile.md\n";

var ExitFor = "# ${ExitFor}\n\nRepeats a block of statements varying the value of a variable.\n\n## Syntax\n\n    ${ExitFor} expression\n\n## Example\n\n    StrCpy $0 \"\"\n\n    ${For} $1 1 10\n        StrCpy $0 $0$1\n        ${If} $1 == 5\n            ; let's interrupt this at 5\n            ${ExitFor}\n        ${EndIf}\n    ${Next}\n\n    ; $0 = 12345\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var ExitWhile = "# ${ExitWhile}\n\nExits a block of statements until started by [`${DoWhile}`][1].\n\n## Syntax\n\n    ${ExitWhile}\n\n## Example\n\n    StrCpy $0 0\n    ClearErrors\n\n    ${DoWhile} $0 < 10\n        IntOp $0 $0 + 1\n        ${If} ${Errors}\n            MessageBox MB_OK \"An unexpected error occured!\"\n            ${ExitWhile}\n        ${EndIf}\n    ${Loop}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: DoWhile.md\n";

var For = "# ${For}\n\nRepeats a block of statements varying the value of a variable.\n\n## Syntax\n\n    ${For} expression\n\n## Example\n\n    StrCpy $0 \"\"\n\n    ${For} $1 1 5\n        StrCpy $0 $0$1\n    ${Next}\n\n    ; $0 = 12345\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var ForEach = "# ${ForEach}\n\nRepeats a block of statements varying the value of a variable.\n\n## Syntax\n\n    ${ForEach} expression\n\n## Example\n\n    StrCpy $0 \"\"\n\n    ${ForEach} $1 9 0 - 1\n        StrCpy $0 $0$1\n    ${Next}\n\n    ; $0 = 9876543210\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var If = "# ${If}\n\nConditionally executes a block of statements, depending on the value of an expression.\n\n## Syntax\n\n    ${If} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n\n    ${If} $0 == true\n        MessageBox MB_OK \"It's true\"\n    ${Else}\n        MessageBox MB_OK \"This will never be true\"\n    ${EndIf}\n\n### Integer tests\n\n    ${If} 1 > 0\n        MessageBox MB_OK \"1 is greater than 0\"\n    ${EndIf}\n\n    ${If} 2 > 1\n    ${AndIf} 2 < 3\n        MessageBox MB_OK \"2 is greater than 1 and smaller than 3\"\n    ${EndIf}\n\n### File conditions\n\n    ${If} ${FileExists} $SYSDIR\\notepad.exe\n        Exec $SYSDIR\\notepad.exe\n    ${Else}\n        MessageBox MB_OK \"Could not find notepad.exe\"\n    ${EndIf}\n\n    ${If} ${FileExists} $PROGAMFILES\\*.*\n        MessageBox MB_OK \"Directory $$PROGRAMFILES exists\"\n    ${EndIf}\n\n### Section test\n\n    Section \"My Section\" mySection\n        MessageBox MB_OK \"Executing section\"\n\n        ${If} ${SectionIsSelected} ${mySection}\n            MessageBox MB_OK \"It's selected, dummy!\"\n        ${EndIf}\n    SectionEnd\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var IfCmd = "# ${IfCmd}\n\nConditionally executes an inline statement, depending on a true value of the provided NSIS function.\n\n## Syntax\n\n    ${IfCmd} expression statement\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $R2 \"\"\n\n    ${IfCmd} MessageBox MB_YESNO \"Please click Yes\" IDYES ${||} StrCpy $R2 $R2A ${|}\n    ${Unless} ${Cmd} `MessageBox MB_YESNO|MB_DEFBUTTON2 \"Please click No\" IDYES`\n        StrCpy $R2 $R2B\n    ${EndUnless}\n\n    ${If} $R2 == \"AB\"\n        MessageBox \"You clicked Yes\"\n    ${Else}\n        MessageBox \"You clicked No\"\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var IfNot = "# ${IfNot}\n\nConditionally executes a block of statements, depending on the value of an expression. `${IfNot}` and [`${Unless}`][1] are equivalent and interchangeable, as are [`${ElseIfNot}`][2] and [`${ElseUnless}`][3].\n\n## Syntax\n\n    ${IfNot} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n\n    ${IfNot} $0 == true\n        MessageBox MB_OK \"It's false\"\n    ${EndIf}\n\n    ${IfNot} $0 != true\n        MessageBox MB_OK \"It's true (but I'd use $${If} $$0 == true)\"\n    ${EndIf}\n\n### Integer tests\n\n    ${IfNot} 1 > 0\n        MessageBox MB_OK \"This is never true\"\n    ${EndIf}\n\n### File conditions\n\n    ${IfNot} ${FileExists} $SYSDIR\\notepad.exe\n        MessageBox MB_OK \"Could not find notepad.exe\"\n    ${Else}\n        Exec $SYSDIR\\notepad.exe\n    ${EndIf}\n\n    ${IfNot} ${FileExists} $PROGAMFILES\\*.*\n        MessageBox MB_OK \"Directory $$PROGRAMFILES doesn't exist\"\n    ${EndIf}\n\n### Section test\n\n    Section \"My Section\" mySection\n        MessageBox MB_OK \"Executing section\"\n\n        ${IfNot} ${SectionIsSelected} ${mySection}\n            MessageBox MB_OK \"This will never show, dummy!\"\n        ${EndIf}\n    SectionEnd\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Unless.md\n[2]: ElseIfNot.md\n[3]: ElseUnless.md\n";

var IfNotThen = "# ${IfNotThen}\n\nConditionally executes an inline statement, depending on the value of an expression.\n\n## Syntax\n\n    ${IfNotThen} expression statement\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 true\n\n    ${IfNotThen} $0 == false ${|} StrCpy $1 false ${|}\n        MessageBox MB_OK \"Whenever $$0 is true, $$1 is false\"\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var IfThen = "# ${IfThen}\n\nConditionally executes an inline statement, depending on the value of an expression.\n\n## Syntax\n\n    ${IfThen} expression statement\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 true\n\n    ${IfThen} $0 == true ${|} StrCpy $1 false ${|}\n        MessageBox MB_OK \"Whenever $$0 is true, $$1 is false\"\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var Loop = "# ${Loop}\n\nLoops a block of statements started by [`${Do}`][1], [`${DoUntil}`][2] or [`${DoWhile}`][3].\n\n## Syntax\n\n    ${Loop}\n\n## Example\n\n    StrCpy $0 0\n\n    ${Do}\n        IntOp $0 $0 + 1\n        ${If} $0 > 10\n            ${ExitDo}\n        ${EndIf}\n    ${Loop}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Do.md\n[2]: DoUntil.md\n[3]: DoWhile.md\n";

var LoopUntil = "# ${LoopUntil}\n\nLoops a block of statements started by [`${Do}`][1], depending on the value of an expression.\n\n## Syntax\n\n    ${LoopUntil} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 10\n\n    ${Do}\n        IntOp $0 $0 - 1\n    ${LoopUntil} $0 == 0\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Do.md\n";

var LoopWhile = "# ${LoopWhile}\n\nLoops a block of statements started by [`${Do}`][1], depending on the value of an expression.\n\n## Syntax\n\n    ${LoopWhile} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 0\n\n    ${Do}\n        IntOp $0 $0 + 1\n    ${LoopWhile} $0 < 10\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: Do.md\n";

var OrIf = "# ${OrIf}\n\nAdds any number of extra conditions to [`If`][1], [`IfNot`][2], [`Unless`][3], [`ElseIf`][4], [`ElseIfNot`][5] and [`ElseUnless`][6] statements.\n\n## Syntax\n\n    ${OrIf} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n    StrCpy $1 false\n\n    ${If} $0 == true\n    ${OrIf} $1 == false\n        MessageBox MB_OK \"Either way...\"\n    ${EndIf}\n\n### Integer tests\n\n    ${If} 2 > 1\n    ${OrIf} 2 < 3\n        MessageBox MB_OK \"Either way...\"\n    ${EndIf}\n\n### File conditions\n\n    ${If} ${FileExists} $EXEDIR\\notepad.exe\n    ${OrIf} ${FileExists} $SYSDIR\\notepad.exe\n        MessageBox MB_OK \"We have notepad.exe\"\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n[3]: Unless.md\n[4]: ElseIf.md\n[5]: ElseIfNot.md\n[6]: ElseUnless.md\n";

var OrIfNot = "# ${OrIfNot}\n\nAdds any number of extra conditions to [`If`][1], [`IfNot`][2], [`Unless`][3], [`ElseIf`][4], [`ElseIfNot`][5] and [`ElseUnless`][6] statements. `${OrIfNot}` and [`${OrUnless}`][7] are equivalent and interchangeable.\n\n## Syntax\n\n    ${OrIfNot} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 false\n    StrCpy $1 false\n\n    ${IfNot} $0 == true\n    ${OrIfNot} $1 == true\n        MessageBox MB_OK \"Something's not true\"\n    ${EndIf}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n[3]: Unless.md\n[4]: ElseIf.md\n[5]: ElseIfNot.md\n[6]: ElseUnless.md\n[7]: OrUnless.md\n";

var OrUnless = "# ${OrUnless}\n\nAdds any number of extra conditions to [`If`][1], [`IfNot`][2], [`Unless`][3], [`ElseIf`][4], [`ElseIfNot`][5] and [`ElseUnless`][6] statements. [`${OrIfNot}`][7] and `${OrUnless}` are equivalent and interchangeable.\n\n## Syntax\n\n    ${OrUnless} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 false\n    StrCpy $1 false\n\n    ${Unless} $0 == true\n    ${OrUnless} $1 == true\n        MessageBox MB_OK \"Something's not true\"\n    ${EndUnless}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: If.md\n[2]: IfNot.md\n[3]: Unless.md\n[4]: ElseIf.md\n[5]: ElseIfNot.md\n[6]: ElseUnless.md\n[7]: OrIfNot.md\n";

var Select = "# ${Select}\n\nExecutes one of several blocks of statements, depending on the value of an expression.\n\n## Syntax\n\n    ${Select} expression\n\n## Example\n\n    StrCpy $0 1\n\n    ${Select} $0\n        ${Case} \"1\"\n            MessageBox MB_OK \"$$0 is 1\"\n        ${Case} \"2\"\n            MessageBox MB_OK \"$$0 isn't 2\"\n        ${Case2} \"3\" \"4\"\n            MessageBox MB_OK \"$$0 isn't 3 or 4\"\n        ${CaseElse}\n            MessageBox MB_OK \"$$0 isn't anything else\"\n    ${EndSelect}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var Switch = "# ${Switch}\n\nJumps to one of several labels, depending on the value of an expression. Use ${Break} to prevent fall-through to the next ${Case} section.\n\n## Syntax\n\n    ${Switch} expression\n\n## Example\n\n    {For} $0 1 10\n        ${Switch} $0\n            ${Case} \"1\"\n                MessageBox MB_OK \"$$0 is 1\"\n                ${Break}\n            ${Case} \"2\"\n                MessageBox MB_OK \"$$0 is 2\"\n                ${Break}\n            ${Case2} \"3\" \"5\"\n                MessageBox MB_OK \"$$0 is 3 or 5\"\n                ${Break}\n            ${CaseElse}\n                MessageBox MB_OK \"$$0 is something else ($0)\"\n        ${EndSwitch}\n    ${Next}\n\n## Credits\n\nWritten by dselkirk and eccles\n";

var Unless = "# ${Unless}\n\nConditionally executes a block of statements, depending on the value of an expression. [`${IfNot}`][1] and `${Unless}` are equivalent and interchangeable, as are [`${ElseIfNot}`][2] and [`${ElseUnless}`][3].\n\n## Syntax\n\n    ${Unless} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Examples\n\n### Check if condition is met\n\n    StrCpy $0 true\n\n    ${Unless} $0 == true\n        MessageBox MB_OK \"It's false\"\n    ${EndUnless}\n\n    ${Unless} $0 != true\n        MessageBox MB_OK \"It's true (but I'd use $${If} $$0 == true)\"\n    ${EndUnless}\n\n### Integer tests\n\n    ${Unless} 1 > 0\n        MessageBox MB_OK \"This is never true\"\n    ${EndUnless}\n\n### File conditions\n\n    ${Unless} ${FileExists} $SYSDIR\\notepad.exe\n        MessageBox MB_OK \"Could not find notepad.exe\"\n    ${Else}\n        Exec $SYSDIR\\notepad.exe\n    ${EndUnless}\n\n    ${Unless} ${FileExists} $PROGAMFILES\\*.*\n        MessageBox MB_OK \"Directory $$PROGRAMFILES doesn't exist\"\n    ${EndUnless}\n\n### Section test\n\n    Section \"My Section\" mySection\n        MessageBox MB_OK \"Executing section\"\n\n        ${Unless} ${SectionIsSelected} ${mySection}\n            MessageBox MB_OK \"This will never show, dummy!\"\n        ${EndUnless}\n    SectionEnd\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: IfNot.md\n[2]: ElseIfNot.md\n[3]: ElseUnless.md\n";

var While = "# ${While}\n\nRepeats a block of statements until stopped, or depending on the value of an expression. [`${DoWhile}`][1] and `${While}` are equivalent and interchangeable.\n\n## Syntax\n\n    ${While} expression\n\nThe following \"expressions\" are available:\n\n    Standard (built-in) string tests (which are case-insensitive):\n         a == b; a != b\n    Additional case-insensitive string tests (using System.dll):\n         a S< b; a S>= b; a S> b; a S<= b\n    Case-sensitive string tests:\n         a S== b; a S!= b\n    Standard (built-in) signed integer tests:\n         a = b; a <> b; a < b; a >= b; a > b; a <= b\n    Standard (built-in) unsigned integer tests:\n         a U< b; a U>= b; a U> b; a U<= b\n    64-bit integer tests (using System.dll):\n        a L= b; a L<> b; a L< b; a L>= b; a L> b; a L<= b\n    Built-in NSIS flag tests:\n        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}\n    Built-in NSIS other tests:\n        ${FileExists} a\n    Any conditional NSIS instruction test:\n        ${Cmd} a\n    Section flag tests:\n        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;\n        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;\n        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;\n        ${SectionIsPartiallySelected} a\n\n## Example\n\n    StrCpy $0 0\n\n    ${While} $0 > 5\n        IntOp $0 $0 + 1\n    ${EndWhile}\n\n## Credits\n\nWritten by dselkirk and eccles\n\n[1]: DoWhile.md\n";

var MementoSection = "# ${MementoSection}\n\nReplace [`Section`][1] with `${MementoSection}` and [`SectionEnd`][2] with [`${MementoSectionEnd}`][3]\nfor sections that whose state should be remembered by Memento.\n\nFor sections that should be unselected by default, use `${MementoSection}`'s\nbrother - [`${MementoUnselectedSection}`][4].\n\nSections that don't already have an identifier must be assigned one.\n\nSection identifiers must stay the same across\n\n## Syntax\n\n    ${MementoSection} [section_name] [section_index_output]\n\n## Example\n\n    !include Memento.nsh\n\n    !define MEMENTO_REGISTRY_ROOT HKLM\n    !define MEMENTO_REGISTRY_KEY Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MyProgram\n\n    Function .onInit\n        ${MementoSectionRestore}\n    FunctionEnd\n\n    Function .onInstSuccess\n        ${MementoSectionSave}\n    FunctionEnd\n\n    ${MementoSection} \"name\" \"some_id\"\n        ; some code...\n    ${MementoSectionEnd}\n\n    SectionGroup /e group\n\n        ${MementoSection} croc sec_croc\n            ; some code...\n        ${MementoSectionEnd}\n\n        ${MementoSection} cow sec_cow\n            ; some code...\n        ${MementoSectionEnd}\n\n    SectionGroupEnd\n\n    ${MementoUnselectedSection} dinosaur sec_dinosaur\n        ; some code...\n    ${MementoSectionEnd}\n\n    ${MementoSectionDone}\n\n## Credits\n\nWritten by [kichik][5]\n\n[1]: ../../Reference/Section.md\n[2]: ../../Reference/SectionEnd.md\n[3]: MementoSectionEnd.md\n[4]: MementoUnselectedSection.md\n[5]: http://nsis.sourceforge.net/User:Kichik\n";

var MementoSectionDone = "# ${MementoSectionDone}\n\nUse `${MementoSectionDone}` after the last [`${MementoSection}`][1].\n\n## Syntax\n\n    ${MementoSectionDone}\n\n## Example\n\n    !include Memento.nsh\n\n    !define MEMENTO_REGISTRY_ROOT HKLM\n    !define MEMENTO_REGISTRY_KEY Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MyProgram\n\n    Function .onInit\n        ${MementoSectionRestore}\n    FunctionEnd\n\n    Function .onInstSuccess\n        ${MementoSectionSave}\n    FunctionEnd\n\n    ${MementoUnselectedSection} dinosaur sec_dinosaur\n        ; some code...\n    ${MementoSectionEnd}\n\n    ${MementoSectionDone}\n\n## Credits\n\nWritten by [kichik][2]\n\n[1]: MementoSection.md\n[2]: http://nsis.sourceforge.net/User:Kichik\n";

var MementoSectionEnd = "# ${MementoSectionEnd}\n\nReplace [`Section`][1] with `${MementoSection}` and [`SectionEnd`][2] with [`${MementoSectionEnd}`][3]\nfor sections that whose state should be remembered by Memento.\n\n## Syntax\n\n    ${MementoSectionEnd}\n\n## Example\n\n    !include Memento.nsh\n\n    !define MEMENTO_REGISTRY_ROOT HKLM\n    !define MEMENTO_REGISTRY_KEY Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MyProgram\n\n    Function .onInit\n        ${MementoSectionRestore}\n    FunctionEnd\n\n    Function .onInstSuccess\n        ${MementoSectionSave}\n    FunctionEnd\n\n    ${MementoSection} \"name\" \"some_id\"\n        ; some code...\n    ${MementoSectionEnd}\n\n    ${MementoUnselectedSection} dinosaur sec_dinosaur\n        ; some code...\n    ${MementoSectionEnd}\n\n    ${MementoSectionDone}\n\n## Credits\n\nWritten by [kichik][4]\n\n[1]: ../../Reference/Section.md\n[2]: ../../Reference/SectionEnd.md\n[3]: MementoSectionEnd.md\n[4]: http://nsis.sourceforge.net/User:Kichik\n";

var MementoSectionRestore = "# ${MementoSectionRestore}\n\nAdd a call to `${MementoSectionRestore}` to [`.onInit`][1] to restore the state of all sections from the registry.\n\n## Syntax\n\n    ${MementoSectionRestore}\n\n## Example\n\n    Function .onInit\n        ${MementoSectionRestore}\n    FunctionEnd\n\n## Credits\n\nWritten by [kichik][2]\n\n[1]: ../../Callbacks/onInit.md\n[2]: http://nsis.sourceforge.net/User:Kichik\n";

var MementoSectionSave = "# ${MementoSectionSave}\n\nAdd a call to `${MementoSectionSave}` to [`.onInstSuccess`][1] to save the stateof all sections to the registry.\n\n## Syntax\n\n    ${MementoSectionSave}\n\n## Example\n\n    Function .onInstSuccess\n        ${MementoSectionSave}\n    FunctionEnd\n\n## Credits\n\nWritten by [kichik][2]\n\n[1]: ../../Callbacks/onInstSuccess.md\n[2]: http://nsis.sourceforge.net/User:Kichik\n";

var MementoUnselectedSection = "# ${MementoUnselectedSection}\n\nReplace [`Section`][1] with [`${MementoSection}`][2] and [`SectionEnd`][3] with [`${MementoSectionEnd}`][4]\nfor sections that whose state should be remembered by Memento.\n\nFor sections that should be unselected by default, use [`${MementoSection}`][2]'s\nbrother - `${MementoUnselectedSection}`.\n\nSections that don't already have an identifier must be assigned one.\n\nSection identifiers must stay the same across\n\n## Syntax\n\n    ${MementoUnselectedSection} [section_name] [section_index_output]\n\n## Example\n\n    !include Memento.nsh\n\n    !define MEMENTO_REGISTRY_ROOT HKLM\n    !define MEMENTO_REGISTRY_KEY Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MyProgram\n\n    Function .onInit\n        ${MementoSectionRestore}\n    FunctionEnd\n\n    Function .onInstSuccess\n        ${MementoSectionSave}\n    FunctionEnd\n\n    ${MementoUnselectedSection} dinosaur sec_dinosaur\n        ; some code...\n    ${MementoSectionEnd}\n\n    ${MementoSectionDone}\n\n## Credits\n\nWritten by [kichik][5]\n\n[1]: ../../Reference/Section.md\n[2]: MementoSection.md\n[3]: ../../Reference/SectionEnd.md\n[4]: MementoSectionEnd.md\n[5]: http://nsis.sourceforge.net/User:Kichik\n";

var StrCase = "# ${StrCase}\n\nConverts \"String\" to \"Type\" Case. Uses [LogicLib][1].\n\n## Syntax\n\n    ResultVar String Type(|L|U|T|S|<>)\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String to convert to \"Type\" case.\n    \n    Type\n    Type of string case to convert to:\n\n      - \"\" = Original Case (same as \"String\")\n      - L = Lower Case (this is just an example. a very simple one.)\n      - U = Upper Case (THIS IS JUST AN EXAMPLE. A VERY SIMPLE ONE.)\n      - T = Title Case (This Is Just An Example. A Very Simple One.)\n      - S = Sentence Case (This is just an example. A very simple one.)\n      - <> = Switch Case (This is just an example. A very simple one.)\n      \n    Default value is \"\" (Original Case).\n\n## Example\n\n    ${StrCase} $0 '\"Você\" is \"You\" in English.' \"U\"\n    $0 = '\"VOCÊ\" IS \"YOU\" IN ENGLISH.'\n\n## Credits\n\nWritten by [deguix][2]\n\n[1]: ../LogicLib\n[2]: http://nsis.sourceforge.net/User:Deguix\n";

var StrClb = "# ${StrClb}\n\nMakes an action with the clipboard depending on value of parameter \"Action\".  Uses [LogicLib][1].\n\n## Syntax\n\n    ResultVar String Action(|>|<|<>)\n\n## Parameters\n\n    String\n    If \"Action\" = \">\" or \"<>\" - String to put on the clipboard.\n\n    Action\n    Can be one of the following values:\n\n      - \"\" = Cleans the clipboard.\n      - \">\" = Set string to clipboard.\n      - \"<\" = Get string from clipboard.\n      - \"<>\" = Swap string with clipboard's.\n\n## Credits\n\nWritten by [deguix][2]\n\n[1]: ../LogicLib\n[2]: http://nsis.sourceforge.net/User:Deguix\n";

var StrIOToNSIS = "# ${StrIOToNSIS}\n\nConvert \"String\" from Install Options plugin to be supported by NSIS. Escape, back-slash, carriage return, line feed and tab characters are converted.\n\n## Syntax\n\n    ResultVar String\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String to convert to be supportable for NSIS.\n\n## Example\n\n    ${StrIOToNSIS} $0 \"\\r\\n\\t\\\\This is just an example\\\\\"\n    $0 = \"$\\r$\\n$\\t\\This is just an example\\\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var StrLoc = "# ${StrLoc}\n\nSearches for \"StrToSearchFor\" in \"String\" and returns its location, according to \"CounterDirection\".\n\n## Syntax\n\n    ResultVar String StrToSearchFor CounterDirection(>|<)\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String where to search \"StrToSearchFor\".\n\n    StrToSearchFor\n    String to search in \"String\".\n\n    CounterDirection(>|<)\n    Direction where the counter increases to. Default is \">\".\n    (> = increases from left to right, < = increases from right to left)\n\n## Example\n\n    ${StrLoc} $0 \"This is just an example\" \"just\" \"<\"\n    $0 = \"11\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var StrNSISToIO = "# ${StrNSISToIO}\n\nConverts \"String\" from NSIS to be supported by Install Options plugin. Escape, back-slash, carriage return, line feed and tab characters are converted.\n\n## Syntax\n\n    ResultVar String\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String to convert to be supportable for Install Options plugin.\n\n## Example\n\n    ${StrNSISToIO} $0 \"$\\r$\\n$\\t\\This is just an example\\\"\n    $0 = \"\\r\\n\\t\\\\This is just an example\\\\\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var StrRep = "# ${StrRep}\n\nSearches for all \"StrToReplace\" in \"String\" replacing those with \"ReplacementString\".\n\n## Syntax\n\n    ResultVar String StrToReplace ReplacementString\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String where to search \"StrToReplace\".\n\n    StrToReplaceFor\n    String to search in \"String\".\n\n    StringToBeReplacedWith\n    String to replace \"StringToReplace\" when it is found in \"String\".\n\n## Example\n\n    ${StrRep} $0 \"This is just an example\" \"an\" \"one\"\n    $0 = \"This is just one example\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var StrSort = "# ${StrSort}\n\nSearches for \"CenterStr\" in \"String\", and returns only the value between \"LeftStr\" and \"RightStr\", including or not the \"CenterStr\" using \"IncludeCenterStr\" and/or the \"LeftStr\" using \"IncludeLeftStr\" and \"RightStr\" using \"IncludeRightStr\".\n\n## Syntax\n\n    ResultVar String LeftStr CenterStr RightStr IncludeLeftStr(1|0) IncludeCenterStr(1|0) IncludeRightStr(1|0)\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String where to search \"CenterStr\".\n\n    LeftStr\n    The first occurrence of \"LeftStr\" on the left of \"CenterStr\".\n    If it is an empty value, or was not found, will return\n    everything on the left of \"CenterStr\".\n\n    CenterStr\n    String to search in \"String\".\n\n    RightStr\n    The first occurrence of \"RightStr\" on the right of \"CenterStr\".\n    If it is an empty value, or was not found, will return\n    everything on the right of \"CenterStr\".\n\n    IncludeLeftStr(1|0)\n    Include or not the \"LeftStr\" in the result value. Default is 1\n    (True). (1 = True, 0 = False)\n\n    IncludeCenterStr(1|0)\n    Include or not the \"CenterStr\" in the result value. Default is 1\n    (True). (1 = True, 0 = False)\n\n    IncludeRightStr(1|0)\n    Include or not the \"RightStr\" in the result value. Default is 1\n    (True). (1 = True, 0 = False)\n\n## Example\n\n    ${StrSort} $0 \"This is just an example\" \" just\" \"\" \"ple\" \"0\" \"0\" \"0\"\n    $0 = \"This is an exam\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var StrStr = "# ${StrStr}\n\nSearches for \"StrToSearchFor\" in \"String\".\n\n## Syntax\n\n    ResultVar String StrToSearchFor\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String where to search \"StrToSearchFor\".\n\n    StrToSearchFor\n    String to search in \"String\".\n\n## Example\n\n    ${StrStr} $0 \"This is just an example\" \"just\"\n    $0 = \"just an example\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var StrStrAdv = "# ${StrStrAdv}\n\nSearches for \"StrToSearchFor\" in \"String\" in the direction specified by \"SearchDirection\" and looping \"Loops\" times.\n\n## Syntax\n\n    ResultVar String StrToSearchFor SearchDirection(>|<) ResultStrDirection(>|<) DisplayStrToSearch(1|0) Loops CaseSensitive(0|1)\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String where to search \"StrToSearchFor\".\n\n    StrToSearchFor\n    String to search in \"String\".\n\n    SearchDirection (>|<)\n    Where do you want to direct the search. Default is \">\" (to right).\n    (< = To left, > = To right)\n\n    ResultStrDirection (>|<)\n    Where the result string will be based on in relation of\n    \"StrToSearchFor\"\n    position. Default is \">\" (to right). (< = To left, > = To right)\n\n    DisplayStrToSearch (1|0)\n    Display \"StrToSearchFor\" in the result. Default is \"1\" (True).\n    (1 = True, 0 = False)\n\n    Loops\n    Number of times the code will search \"StrToSearchFor\" in \"String\" not\n    including the original execution. Default is \"0\" (1 code execution).\n\n    CaseSensitive(0|1)\n    If \"1\" the search will be case-sensitive (differentiates between cases).\n    If \"0\" it is case-insensitive (does not differentiate between cases).\n    Default is \"0\" (Case-Insensitive).\n\n## Example\n\n    ${StrStrAdv} $0 \"This IS really just an example\" \"IS \" \">\" \">\" \"0\" \"0\" \"1\"\n    $0 = \"really just an example\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var StrTok = "# ${StrTok}\n\nReturns the part \"ResultPart\" between two \"Separators\" inside \"String\".\n\n## Syntax\n\n    ResultVar String Separators ResultPart[L] SkipEmptyParts(1|0)\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String where to search for \"Separators\".\n\n    Separators\n    Characters to find on \"String\".\n\n    ResultPart[L]\n    The part want to be found on \"StrToTokenize\" between two \"Separators\".\n    Can be any number, starting at 0, and \"L\" that is the last part.\n    Default is L (Last part).\n\n    SkipEmptyParts(1|0)\n    Skips empty string parts between two \"Separators\". Default is 1 (True).\n    (1 = True, 0 = False)\n\n## Example\n\n    ${StrTok} $0 \"This is, or is not, just an example\" \" ,\" \"4\" \"1\"\n    $0 = \"not\"\n    \n    ${StrTok} $0 \"This is, or is not, just an example\" \" ,\" \"4\" \"0\"\n    $0 = \"is\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var StrTrimNewLines = "# ${StrTrimNewLines}\n\nDeletes unnecessary new lines at end of \"String\".\n\n## Syntax\n\n    ResultVar String\n\n## Parameters\n\n    ResultVar\n    Destination where result is returned.\n\n    String\n    String where to search unnecessary new lines at end of \"String\".\n\n## Example\n\n    ${StrTrimNewLines} $0 \"$\\r$\\nThis is just an example$\\r$\\n$\\r$\\n\"\n    $0 = \"$\\r$\\nThis is just an example\"\n\n## Credits\n\nWritten by [deguix][1]\n\n[1]: http://nsis.sourceforge.net/User:Deguix\n";

var ConfigRead = "# ${ConfigRead}\n\nRead value from entry name in config file.\n\n## Syntax\n\n    ${ConfigRead} \"[File]\" \"[Entry]\" $var\n    \"[File]\"      ; config file\n                  ;\n    \"[Entry]\"     ; entry name\n                  ;\n    $var          ; Result:  Value\n\nNote:\n\n- Error flag if entry not found\n- Error flag if file doesn't exist\n\n## Examples\n\n### Example 1\n\n    Section\n        ${ConfigRead} \"C:\\AUTOEXEC.BAT\" \"SET winbootdir=\" $R0\n        ;$R0=C:\\WINDOWS\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${ConfigRead} \"C:\\apache\\conf\\httpd.conf\" \"Timeout \" $R0\n        ;$R0=30\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var ConfigReadS = "# ${ConfigReadS}\n\nRead value from entry name in config file, case sensitive\n\n## Syntax\n\n    ${ConfigReadS} \"[File]\" \"[Entry]\" $var\n    \"[File]\"      ; config file\n                  ;\n    \"[Entry]\"     ; entry name\n                  ;\n    $var          ; Result:  Value\n\nNote:\n\n- Error flag if entry not found\n- Error flag if file doesn't exist\n\n## Examples\n\n### Example 1\n\n    Section\n        ${ConfigReadS} \"C:\\AUTOEXEC.BAT\" \"SET winbootdir=\" $R0\n        ;$R0=C:\\WINDOWS\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${ConfigReadS} \"C:\\apache\\conf\\httpd.conf\" \"Timeout \" $R0\n        ;$R0=30\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var ConfigWrite = "# ${ConfigWrite}\n\nWrite value from entry name in config file.\n\n## Syntax\n\n    ${ConfigWrite} \"[File]\" \"[Entry]\" \"[Value]\" $var\n\n    \"[File]\"      ; config file\n                  ;\n    \"[Entry]\"     ; entry name\n                  ;\n    \"[Value]\"     ; value name\n                  ;  if \"\" then delete Entry\n                  ;\n    $var          ; Result:\n                  ;    $var=CHANGED  Value is written\n                  ;    $var=DELETED  Entry is deleted\n                  ;    $var=ADDED    Entry and Value are added\n                  ;    $var=SAME     Entry and Value already exist\n\nNote:\n\n- Error flag if file doesn't exist\n- Error flag if file can't be opened\n\n## Examples\n\n### Example 1\n\n    Section\n        ${ConfigWrite} \"C:\\AUTOEXEC.BAT\" \"SET winbootdir=\" \"D:\\WINDOWS\" $R0\n        ;$R0=CHANGED\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${ConfigWrite} \"C:\\apache\\conf\\httpd.conf\" \"Timeout \" \"30\" $R0\n        ;$R0=SAME\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${ConfigWrite} \"C:\\apache\\conf\\httpd.conf\" \"Timeout \" \"\" $R0\n        ;$R0=DELETED\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var ConfigWriteS = "# ${ConfigWriteS}\n\nWrite value from entry name in config file, case sensitive.\n\n## Syntax\n\n    ${ConfigWriteS} \"[File]\" \"[Entry]\" \"[Value]\" $var\n\n    \"[File]\"      ; config file\n                  ;\n    \"[Entry]\"     ; entry name\n                  ;\n    \"[Value]\"     ; value name\n                  ;  if \"\" then delete Entry\n                  ;\n    $var          ; Result:\n                  ;    $var=CHANGED  Value is written\n                  ;    $var=DELETED  Entry is deleted\n                  ;    $var=ADDED    Entry and Value are added\n                  ;    $var=SAME     Entry and Value already exist\n\nNote:\n\n- Error flag if file doesn't exist\n- Error flag if file can't be opened\n\n## Examples\n\n### Example 1\n\n    Section\n        ${ConfigWriteS} \"C:\\AUTOEXEC.BAT\" \"SET winbootdir=\" \"D:\\WINDOWS\" $R0\n        ;$R0=CHANGED\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${ConfigWriteS} \"C:\\apache\\conf\\httpd.conf\" \"Timeout \" \"30\" $R0\n        ;$R0=SAME\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${ConfigWriteS} \"C:\\apache\\conf\\httpd.conf\" \"Timeout \" \"\" $R0\n        ;$R0=DELETED\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var FileJoin = "# ${FileJoin}\n\nJoin two files in one.\n\n## Syntax\n\n    ${FileJoin} \"[File1]\" \"[File2]\" \"[File3]\"\n    \"[File1]\"     ; Input File1\n    \"[File2]\"     ; Input File2\n    \"[File3]\"     ; Output File3\n                  ;  If [File3]=\"\" Then add [File2] to [File1]\n\nNote:\n\n- Error flag if input files don't exist\n- Error flag if output file path doesn't exist\n\n## Examples\n\n### Join a.log + b.log = Z.log\n\n    Section\n        ${FileJoin} \"C:\\a.log\" \"C:\\logs\\b.log\" \"C:\\Z.log\"\n    SectionEnd\n\n### Add a.log + b.log = a.log\n\n    Section\n        ${FileJoin} \"C:\\a.log\" \"C:\\logs\\b.log\" \"C:\\a.log\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var FileReadFromEnd = "# ${FileReadFromEnd}\n\nRead text file from end line by line.\n\n## Syntax\n\n    ${FileReadFromEnd} \"[File]\" \"Function\"\n\n    \"[File]\"      ; Input text file\n    \"Function\"    ; Callback function\n\n    Function \"Function\"\n        ; $9       current line\n        ; $8       current line number\n        ; $7       current line negative number\n\n        ; $R0-$R9  are not used (save data in them).\n        ; ...\n\n        Push $var      ; If $var=\"StopFileReadFromEnd\"  Then exit from function\n    FunctionEnd\n\nNote:\n\n- Error flag if input file doesn't exist\n\n## Examples\n\n### Read and display lines\n\n    Section\n        ${FileReadFromEnd} \"C:\\a.log\" \"Example1\"\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n    Function Example1\n        MessageBox MB_OKCANCEL '\"Line\"=[$9]$\\n   \"#\"=[$8]$\\n  \"-#\"=[$7]' IDOK +2\n        StrCpy $0 StopFileReadFromEnd\n\n        Push $0\n    FunctionEnd\n\n### Reverse text file\n\n    Section\n        GetTempFileName $R0\n        FileOpen $R1 $R0 w\n        ${FileReadFromEnd} \"C:\\a.log\" \"Example2\"\n        FileClose $R1\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n        Exec '\"notepad.exe\" \"$R0\"'\n    SectionEnd\n\n    Function Example2\n        StrCmp $7 -1 0 +5\n        StrCpy $1 $9 1 -1\n        StrCmp $1 '$\\n' +3\n        StrCmp $1 '$\\r' +2\n        StrCpy $9 '$9$\\r$\\n'\n\n        FileWrite $R1 \"$9\"\n\n        Push $0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var FileRecode = "# ${FileRecode}\n\nRecode text file from DOS to Windows format and vice-versa.\n\n## Syntax\n\n    ${FileRecode} \"[File]\" \"[Format]\"\n\n    \"[File]\"        ;\n                    ;\n    \"[Format]\"      ; OemToChar   -from DOS to Windows\n                    ; CharToOem   -from Windows to DOS\n\nNote:\n\n- Error flag if file doesn't exist\n- Error flag if syntax error\n\n## Example\n\n    Section\n        ${FileRecode} \"C:\\SCANDISK.LOG\" \"CharToOem\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var LineFind = "# ${LineFind}\n\nFind specified lines in text file, and edit or view these lines in callback function.\n\n## Syntax\n\n    ${LineFind} \"[File1]\" \"[File2|/NUL]\" \"[LineNumbers]\" \"Function\"\n\n    \"[File1]\"         ; Input text file\n                      ;\n    \"[File2|/NUL]\"    ; [File2]\n                      ;   Output text file\n                      ;   If empty then File2=File1\n                      ; [/NUL]\n                      ;   No output text file (only read File1)\n                      ;\n    \"[LineNumbers]\"   ; [No|-No|No:No|{No}|{-No}|{No:No}]\n                      ;   1:-1     all lines to change (default)\n                      ;   2        second line from start\n                      ;   -3       third line from end\n                      ;   5:9      range of lines from 5 to 9\n                      ;   {2}      only second line from start to output\n                      ;   {-3}     only third line from end to output\n                      ;   {5:9}    only range of lines from 5 to 9 to output\n                      ;\n    \"Function\"        ; Callback function for specified lines\n\n    Function \"Function\"\n        ; $R9       current line\n        ; $R8       current line number\n        ; $R7       current line negative number\n        ; $R6       current range of lines\n        ; $R5       handle of a file opened to read\n        ; $R4       handle of a file opened to write ($R4=\"\" if \"/NUL\")\n\n        ; you can use any string functions\n        ; $R0-$R3  are not used (save data in them).\n        ; ...\n\n        Push $var      ; If $var=\"StopLineFind\"  Then exit from function\n                       ; If $var=\"SkipWrite\"     Then skip current line (ignored if \"/NUL\")\n    FunctionEnd\n\nNote:\n\n- Error flag if input file doesn't exist\n- Error flag if output file path doesn't exist\n- Ranges must be specified on growth (2 4:5 9:-8 -5:-4 -2:-1)\n- Output file will not be updated if no changes made.\n\n## Examples:\n\n### Delete first two symbols\n\n    Section\n        ${LineFind} \"C:\\a.log\" \"C:\\a-edited.log\" \"3:-1\" \"Example1\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n    Function Example1\n        ${TrimNewLines} '$R9' $R9\n        StrCpy $R9 $R9 '' 2\n        StrCpy $R9 '$R9$\\r$\\n'\n        ;start from 3 line and delete first two symbols\n\n        Push $0\n    FunctionEnd\n\n### Show changed lines\n\n    Section\n        ${LineFind} \"C:\\a.log\" \"a.log\" \"{5:12 15 -6:-5 -1}\" \"Example2\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n    Function Example2\n        ${TrimNewLines} '$R9' $R9\n        StrCpy $R9 \"$R9   ~Changed line ($R8)~$\\r$\\n\"\n\n        Push $0\n    FunctionEnd\n\n### Delete lines\n\n    Section\n        ${LineFind} \"C:\\a.log\" \"\\logs\\a.log\" \"2:3 10:-5 -3:-2\" \"Example3\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n    Function Example3\n        StrCpy $0 SkipWrite\n\n        Push $0\n    FunctionEnd\n\n### Insert lines\n\n    Section\n        ${LineFind} \"C:\\a.log\" \"\" \"10\" \"Example4\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n    Function Example4\n        FileWrite $R4 \"---First Line---$\\r$\\n\"\n        FileWrite $R4 \"---Second Line ...---$\\r$\\n\"\n\n        Push $0\n    FunctionEnd\n\n### Replace in file with count of changes - \"WordFunc.nsh\" required\n\n    !include \"WordFunc.nsh\"\n\n    Section\n        StrCpy $R0 0\n        ${LineFind} \"C:\\a.log\" \"C:\\logs\\a.log\" \"1:-1\" \"Example5\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n        MessageBox MB_OK \"Changed lines=$R0\"\n    SectionEnd\n\n    Function Example5\n        StrCpy $1 $R9\n\n        ${WordReplace} '$R9' ' ' '_' '+*' $R9\n\n        StrCmp $1 $R9 +2\n        IntOp $R0 $R0 + 1\n        ;$R0   count of changed lines\n\n        Push $0\n    FunctionEnd\n\n### Line string to cut or delete\n\n    Section\n        ${LineFind} \"\\a.log\" \"C:\\logs\\a.log\" \"\" \"Example6\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n        MessageBox MB_OK \"Processed lines=$R1:$R2\"\n    SectionEnd\n\n    Function Example6\n        ;(Cut lines from a line to another line (also including that line))\n        StrCmp $R0 finish stop\n        StrCmp $R0 start finish\n        StrCmp $R9 'Start Line$\\r$\\n' 0 skip\n        StrCpy $R0 start\n        StrCpy $R1 $R8\n        goto code\n        finish:\n        StrCmp $R9 'Finish Line$\\r$\\n' 0 code\n        StrCpy $R0 finish\n        StrCpy $R2 $R8\n        goto code\n        skip:\n        StrCpy $0 SkipWrite\n        goto output\n        stop:\n        StrCpy $0 StopLineFind\n        goto output\n\n        ;;(Delete lines from a line to another line (also including that line))\n        ; StrCmp $R0 finish code\n        ; StrCmp $R0 start finish\n        ; StrCmp $R9 'Start Line$\\r$\\n' 0 code\n        ; StrCpy $R0 start\n        ; StrCpy $R1 $R8\n        ; goto skip\n        ; finish:\n        ; StrCmp $R9 'Finish Line$\\r$\\n' 0 skip\n        ; StrCpy $R0 finish\n        ; StrCpy $R2 $R8\n        ; skip:\n        ; StrCpy $0 SkipWrite\n        ; goto output\n\n        code:\n        ;...\n\n        output:\n        Push $0\n    FunctionEnd\n\n### Read lines\n\n    Section\n        ${LineFind} \"C:\\a.log\" \"/NUL\" \"1:-1\" \"Example7\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n    Function Example7\n        MessageBox MB_OKCANCEL '$$R9  \"Line\"=[$R9]$\\n$$R8     \"#\" =[$R8]' IDOK +2\n        StrCpy $0 StopLineFind\n\n        Push $0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var LineRead = "# ${LineRead}\n\nGet line in file specified with number.\n\n## Syntax\n\n    ${LineRead} \"[File]\" \"[LineNumber]\" $var\n\n    \"[File]\"         ; Input text file\n                     ;\n    \"[LineNumber]\"   ; [No|-No]\n                     ;   3    line number from start\n                     ;   -5   line number from end\n                     ;\n    $var             ; Result: Line\n\nNote:\n\n- Error flag if input file doesn't exist\n- Error flag if line number not found\n\n## Example\n\n    Section\n        ${LineRead} \"C:\\a.log\" \"-1\" $R0\n        ; $R0=\"Last line$\\r$\\n\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var LineSum = "# ${LineSum}\n\nGet sum of lines in text file.\n\n## Syntax\n\n    ${LineSum} \"[File]\" $var\n\n    \"[File]\"      ; Input file\n    $var          ; Result: Sum of lines\n\nNote:\n\n- Error flag if input file doesn't exist\n\n## Example\n\n    Section\n        ${LineSum} \"C:\\a.log\" $R0\n        ; $R0=\"54\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var TextCompare = "# ${TextCompare}\n\nCompare two text files.\n\n## Syntax\n\n    ${TextCompare} \"[File1]\" \"[File2]\" \"[Option]\" \"Function\"\n\n    \"[File1]\"     ; File1      Compare these lines\n    \"[File2]\"     ; File2      Compare with these lines\n    \"[Options]\"   ; (line-by-line):\n                  ; FastDiff   Compare line N (File1) with line N (File2)\n                  ;            Call function if Different lines found\n                  ; FastEqual  Compare line N (File1) with line N (File2)\n                  ;            Call function if Equal lines found\n                  ; (line number independent):\n                  ; SlowDiff   Compare line N (File1) with all lines (File2)\n                  ;            Call function if line N (File1) Different\n                  ; SlowEqual  Compare line N (File1) with all lines (File2)\n                  ;            Call function if line N (File1) Equal\n    \"Function\"    ; Callback function\n\n    Function \"Function\"\n        ; $9    \"Line File1\"\n        ; $8    \"Line number\"\n        ; $7    \"Line File2\"  (empty if SlowDiff)\n        ; $6    \"Line number\" (empty if SlowDiff)\n\n        ; $R0-$R9  are not used (save data in them).\n        ; ...\n\n        Push $var    ; If $var=\"StopTextCompare\"  Then exit from function\n    FunctionEnd\n\nNote:\n\n- Error flag if File1 or File2 doesn't exist\n- Error flag if syntax error\n\n## Examples\n\n### Different or Equal\n\n    Section\n        StrCpy $R0 ''\n        ${TextCompare} \"C:\\1.txt\" \"C:\\2.txt\" \"FastDiff\" \"Example1\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +4\n\n        StrCmp $R0 NotEqual 0 +2\n        MessageBox MB_OK \"Files differ\" IDOK +2\n        MessageBox MB_OK \"Files identical\"\n    SectionEnd\n\n    Function Example1\n        StrCpy $R0 NotEqual\n        StrCpy $0 StopTextCompare\n\n        Push $0\n    FunctionEnd\n\n### Compare line-by-line - Different\n\n    Section\n        StrCpy $R0 'Text1.txt'\n        StrCpy $R1 'Text2.txt'\n\n        GetTempFileName $R2\n        FileOpen $R3 $R2 w\n        FileWrite $R3 \"$R0 | $R1$\\r$\\n\"\n        ${TextCompare} \"$R0\" \"$R1\" \"FastDiff\" \"Example2\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n\n        Exec \"notepad.exe $R2\"\n    FunctionEnd\n\n    Function Example2\n        FileWrite $R3 '$8=$9'\n        FileWrite $R3 '$6=$7$\\r$\\n'\n\n        Push $0\n    FunctionEnd\n\n### Compare line-by-line - Equal\n\n    Section\n        StrCpy $R0 'Text1.txt'\n        StrCpy $R1 'Text2.txt'\n\n        GetTempFileName $R2\n        FileOpen $R3 $R2 w\n        FileWrite $R3 \"$R0 | $R1$\\r$\\n\"\n        ${TextCompare} \"$R0\" \"$R1\" \"FastEqual\" \"Example3\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n\n        Exec \"notepad.exe $R2\"\n    FunctionEnd\n\n    Function Example3\n        FileWrite $R3 '$8|$6=$9'\n\n        Push $0\n    FunctionEnd\n\n### Compare all lines - Different\n\n    Section\n        StrCpy $R0 'Text1.txt'\n        StrCpy $R1 'Text2.txt'\n\n        GetTempFileName $R2\n        FileOpen $R3 $R2 w\n        FileWrite $R3 \"$R0 | $R1$\\r$\\n\"\n        ${TextCompare} \"$R0\" \"$R1\" \"SlowDiff\" \"Example4\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK end\n\n        FileWrite $R3 \"$\\r$\\n$R1 | $R0$\\r$\\n\"\n        ${TextCompare} \"$R1\" \"$R0\" \"SlowDiff\" \"Example4\"\n        FileClose $R3\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK end\n\n        Exec \"notepad.exe $R2\"\n\n        end:\n    FunctionEnd\n\n    Function Example4\n        FileWrite $R3 '$8=$9'\n\n        Push $0\n    FunctionEnd\n\n### Compare all lines - Equal\n\n    Section\n        StrCpy $R0 'Text1.txt'\n        StrCpy $R1 'Text2.txt'\n\n        GetTempFileName $R2\n        FileOpen $R3 $R2 w\n        FileWrite $R3 \"$R0 | $R1$\\r$\\n\"\n        ${TextCompare} \"$R0\" \"$R1\" \"SlowEqual\" \"Example5\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n\n        Exec \"notepad.exe $R2\"\n    FunctionEnd\n\n    Function Example5\n        FileWrite $R3 '$8|$6=$9'\n\n        Push $0\n    FunctionEnd\n\n### Show variables\n\n    Section\n        ${TextCompare} \"C:\\1.txt\" \"C:\\2.txt\" \"FastDiff\" \"Example6\"\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n    Function Example6\n        MessageBox MB_OKCANCEL '$$9    \"Line File1\" =[$9]$\\n$$8    \"Line #\"      =[$8]$\\n$$7    \"Line File2\" =[$7]$\\n$$6    \"Line #\"      =[$6]' IDOK +2\n        StrCpy $0 StopTextCompare\n\n        Push $0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var TextCompareS = "# ${TextCompareS}\n\nCompare two text files, case sensitive\n\n## Syntax\n\n    ${TextCompareS} \"[File1]\" \"[File2]\" \"[Option]\" \"Function\"\n\n    \"[File1]\"     ; File1      Compare these lines\n    \"[File2]\"     ; File2      Compare with these lines\n    \"[Options]\"   ; (line-by-line):\n                  ; FastDiff   Compare line N (File1) with line N (File2)\n                  ;            Call function if Different lines found\n                  ; FastEqual  Compare line N (File1) with line N (File2)\n                  ;            Call function if Equal lines found\n                  ; (line number independent):\n                  ; SlowDiff   Compare line N (File1) with all lines (File2)\n                  ;            Call function if line N (File1) Different\n                  ; SlowEqual  Compare line N (File1) with all lines (File2)\n                  ;            Call function if line N (File1) Equal\n    \"Function\"    ; Callback function\n\n    Function \"Function\"\n        ; $9    \"Line File1\"\n        ; $8    \"Line number\"\n        ; $7    \"Line File2\"  (empty if SlowDiff)\n        ; $6    \"Line number\" (empty if SlowDiff)\n\n        ; $R0-$R9  are not used (save data in them).\n        ; ...\n\n        Push $var    ; If $var=\"StopTextCompare\"  Then exit from function\n    FunctionEnd\n\nNote:\n\n- Error flag if File1 or File2 doesn't exist\n- Error flag if syntax error\n\n## Examples\n\n### Different or Equal\n\n    Section\n        StrCpy $R0 ''\n        ${TextCompareS} \"C:\\1.txt\" \"C:\\2.txt\" \"FastDiff\" \"Example1\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +4\n\n        StrCmp $R0 NotEqual 0 +2\n        MessageBox MB_OK \"Files differ\" IDOK +2\n        MessageBox MB_OK \"Files identical\"\n    SectionEnd\n\n    Function Example1\n        StrCpy $R0 NotEqual\n        StrCpy $0 StopTextCompare\n\n        Push $0\n    FunctionEnd\n\n### Compare line-by-line - Different\n\n    Section\n        StrCpy $R0 'Text1.txt'\n        StrCpy $R1 'Text2.txt'\n\n        GetTempFileName $R2\n        FileOpen $R3 $R2 w\n        FileWrite $R3 \"$R0 | $R1$\\r$\\n\"\n        ${TextCompareS} \"$R0\" \"$R1\" \"FastDiff\" \"Example2\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n\n        Exec \"notepad.exe $R2\"\n    FunctionEnd\n\n    Function Example2\n        FileWrite $R3 '$8=$9'\n        FileWrite $R3 '$6=$7$\\r$\\n'\n\n        Push $0\n    FunctionEnd\n\n### Compare line-by-line - Equal\n\n    Section\n        StrCpy $R0 'Text1.txt'\n        StrCpy $R1 'Text2.txt'\n\n        GetTempFileName $R2\n        FileOpen $R3 $R2 w\n        FileWrite $R3 \"$R0 | $R1$\\r$\\n\"\n        ${TextCompareS} \"$R0\" \"$R1\" \"FastEqual\" \"Example3\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n\n        Exec \"notepad.exe $R2\"\n    FunctionEnd\n\n    Function Example3\n        FileWrite $R3 '$8|$6=$9'\n\n        Push $0\n    FunctionEnd\n\n### Compare all lines - Different\n\n    Section\n        StrCpy $R0 'Text1.txt'\n        StrCpy $R1 'Text2.txt'\n\n        GetTempFileName $R2\n        FileOpen $R3 $R2 w\n        FileWrite $R3 \"$R0 | $R1$\\r$\\n\"\n        ${TextCompareS} \"$R0\" \"$R1\" \"SlowDiff\" \"Example4\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK end\n\n        FileWrite $R3 \"$\\r$\\n$R1 | $R0$\\r$\\n\"\n        ${TextCompareS} \"$R1\" \"$R0\" \"SlowDiff\" \"Example4\"\n        FileClose $R3\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK end\n\n        Exec \"notepad.exe $R2\"\n\n        end:\n    FunctionEnd\n\n    Function Example4\n        FileWrite $R3 '$8=$9'\n\n        Push $0\n    FunctionEnd\n\n### Compare all lines - Equal\n\n    Section\n        StrCpy $R0 'Text1.txt'\n        StrCpy $R1 'Text2.txt'\n\n        GetTempFileName $R2\n        FileOpen $R3 $R2 w\n        FileWrite $R3 \"$R0 | $R1$\\r$\\n\"\n        ${TextCompareS} \"$R0\" \"$R1\" \"SlowEqual\" \"Example5\"\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\" IDOK +2\n\n        Exec \"notepad.exe $R2\"\n    FunctionEnd\n\n    Function Example5\n        FileWrite $R3 '$8|$6=$9'\n\n        Push $0\n    FunctionEnd\n\n### Show variables\n\n    Section\n        ${TextCompareS} \"C:\\1.txt\" \"C:\\2.txt\" \"FastDiff\" \"Example6\"\n\n        IfErrors 0 +2\n        MessageBox MB_OK \"Error\"\n    SectionEnd\n\n    Function Example6\n        MessageBox MB_OKCANCEL '$$9    \"Line File1\" =[$9]$\\n$$8    \"Line #\"      =[$8]$\\n$$7    \"Line File2\" =[$7]$\\n$$6    \"Line #\"      =[$6]' IDOK +2\n        StrCpy $0 StopTextCompare\n\n        Push $0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var TrimNewLines = "# ${TrimNewLines}\n\nTrim newlines in a string.\n\n## Syntax\n\n    ${TrimNewLines} \"[string]\" $var\n\n    \"[string]\"    ; Input string\n    $var          ; Result: String without '$\\r' and '$\\n' at the end\n\nNote:\n\n- Error flag if file doesn't exist\n- Error flag if syntax error\n\n## Example\n\n    Section\n        ${TrimNewLines} \"Text line$\\r$\\n\" $R0\n        ; $R0=\"Text line\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var IsDomainController = "# ${IsDomainController}\n\nChecks if the server is a domain controller\n\n## Syntax\n\n    logic_lib_statement ${IsDomainController}\n\n## Example\n\n    ${If} ${IsDomainController}\n        DetailPrint \"Running on a domain controller.\"\n    ${Else}\n        DetailPrint \"Not running on a domain controller.\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastServicePack = "# ${AtLeastServicePack}\n\nChecks if the installer is running on Windows service pack version at least as specified.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastServicePack} service_pack_version\n\n## Example\n\n    ${If} ${IsWinXP}\n    ${AndIf} ${AtLeastServicePack} 1\n        DetailPrint \"Windows XP with SP1 (or higher)\"\n    ${Else}\n        DetailPrint \"Not Windows XP, or no service pack installed\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin7 = "# ${AtLeastWin7}\n\nChecks if the installer is running on Windows 7.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin7}\n\n## Example\n\n    ${If} ${AtLeastWin7}\n        DetailPrint \"Windows 7 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin8_1 = "# ${AtLeastWin8}.1\n\nChecks if the installer is running on Windows 8.1.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin8.1}\n\n## Example\n\n    ${If} ${AtLeastWin8.1}\n        DetailPrint \"Windows 8.1 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin8 = "# ${AtLeastWin8}\n\nChecks if the installer is running on Windows 8.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin8}\n\n## Example\n\n    ${If} ${AtLeastWin8}\n        DetailPrint \"Windows 8 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin10 = "# ${AtLeastWin10}\n\nChecks if the installer is running on Windows 10.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin10}\n\n## Example\n\n    ${If} ${AtLeastWin10}\n        DetailPrint \"Windows 10 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n\n## History\n\nAdded in NSIS v3.0b2\n";

var AtLeastWin95 = "# ${AtLeastWin95}\n\nChecks if the installer is running on Windows 95.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin95}\n\n## Example\n\n    ${If} ${AtLeastWin95}\n        DetailPrint \"Windows 95 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin98 = "# ${AtLeastWin98}\n\nChecks if the installer is running on Windows 98.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin98}\n\n## Example\n\n    ${If} ${AtLeastWin98}\n        DetailPrint \"Windows 98 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin2000 = "# ${AtLeastWin2000}\n\nChecks if the installer is running on Windows 2000.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin2000}\n\n## Example\n\n    ${If} ${AtLeastWin2000}\n        DetailPrint \"Windows 2000 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin2003 = "# ${AtLeastWin2003}\n\nChecks if the installer is running on Windows Server 2003.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin2003}\n\n## Example\n\n    ${If} ${AtLeastWin2003}\n        DetailPrint \"Windows Server 2003 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin2008 = "# ${AtLeastWin2008}\n\nChecks if the installer is running on Windows Server 2008.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin2008}\n\n## Example\n\n    ${If} ${AtLeastWin2008}\n        DetailPrint \"Windows Server 2008 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWin2008R2 = "# ${AtLeastWin2008R2}\n\nChecks if the installer is running on Windows Server 2008 R2.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWin2008R2}\n\n## Example\n\n    ${If} ${AtLeastWin2008R2}\n        DetailPrint \"Windows Server 2008 R2 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWinME = "# ${AtLeastWinME}\n\nChecks if the installer is running on Windows ME.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWinME}\n\n## Example\n\n    ${If} ${AtLeastWinME}\n        DetailPrint \"Windows ME or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWinNT4 = "# ${AtLeastWinNT4}\n\nChecks if the installer is running on Windows NT4.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWinNT4}\n\n## Example\n\n    ${If} ${AtLeastWinNT4}\n        DetailPrint \"Windows NT 4 or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWinVista = "# ${AtLeastWinVista}\n\nChecks if the installer is running on Windows Vista.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWinVista}\n\n## Example\n\n    ${If} ${AtLeastWinVista}\n        DetailPrint \"Windows Vista or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtLeastWinXP = "# ${AtLeastWinXP}\n\nChecks if the installer is running on Windows XP.\n\n## Syntax\n\n    logic_lib_statement ${AtLeastWinXP}\n\n## Example\n\n    ${If} ${AtLeastWinXP}\n        DetailPrint \"Windows XP or higher\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostServicePack = "# ${AtMostServicePack}\n\nChecks if the installer is running on Windows service version pack at most as specified.\n\n## Syntax\n\n    logic_lib_statement ${AtMostServicePack} service_pack_version\n\n## Example\n\n    ${If} ${IsWinXP}\n    ${AndIf} ${AtMostServicePack} 2\n        DetailPrint \"Windows XP with SP2 (or lower)\"\n    ${Else}\n        DetailPrint \"Not Windows XP, or higher service pack installed\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin7 = "# ${AtMostWin7}\n\nChecks if the installer is running on Windows 7 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin7}\n\n## Example\n\n    ${If} ${AtMostWin7}\n        DetailPrint \"Windows 7 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin8_1 = "# ${AtMostWin8}.1\n\nChecks if the installer is running on Windows 8.1 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin8.1}\n\n## Example\n\n    ${If} ${AtMostWin8.1}\n        DetailPrint \"Windows 8.1 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin8 = "# ${AtMostWin8}\n\nChecks if the installer is running on Windows 8 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin8}\n\n## Example\n\n    ${If} ${AtMostWin8}\n        DetailPrint \"Windows 8 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin10 = "# ${AtMostWin10}\n\nChecks if the installer is running on Windows 10 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin10}\n\n## Example\n\n    ${If} ${AtMostWin10}\n        DetailPrint \"Windows 10 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n\n## History\n\nAdded in NSIS v3.0b2\n";

var AtMostWin95 = "# ${AtMostWin95}\n\nChecks if the installer is running on Windows 95 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin95}\n\n## Example\n\n    ${If} ${AtMostWin95}\n        DetailPrint \"Windows 95 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin98 = "# ${AtMostWin98}\n\nChecks if the installer is running on Windows 98 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin98}\n\n## Example\n\n    ${If} ${AtMostWin98}\n        DetailPrint \"Windows 98 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin2000 = "# ${AtMostWin2000}\n\nChecks if the installer is running on Windows 2000 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin2000}\n\n## Example\n\n    ${If} ${AtMostWin2000}\n        DetailPrint \"Windows 2000 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin2003 = "# ${AtMostWin2003}\n\nChecks if the installer is running on Windows Server 2003 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin2003}\n\n## Example\n\n    ${If} ${AtMostWin2003}\n        DetailPrint \"Windows Server 2003 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin2008 = "# ${AtMostWin2008}\n\nChecks if the installer is running on Windows Server 2008 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin2008}\n\n## Example\n\n    ${If} ${AtMostWin2008}\n        DetailPrint \"Windows Server 2008 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin2008R2 = "# ${AtMostWin2008R2}\n\nChecks if the installer is running on Windows Server 2008 R2 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin2008R2}\n\n## Example\n\n    ${If} ${AtMostWin2008R2}\n        DetailPrint \"Windows Server 2008 R2 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin2012 = "# ${AtMostWin2012}\n\nChecks if the installer is running on Windows Server 2012 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin2012}\n\n## Example\n\n    ${If} ${AtMostWin2012}\n        DetailPrint \"Windows Server 2012 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWin2012R2 = "# ${AtMostWin2012R2}\n\nChecks if the installer is running on Windows Server 2012 R2 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWin2012R2}\n\n## Example\n\n    ${If} ${AtMostWin2012R2}\n        DetailPrint \"Windows Server 2012 R2 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWinME = "# ${AtMostWinME}\n\nChecks if the installer is running on Windows ME at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWinME}\n\n## Example\n\n    ${If} ${AtMostWinME}\n        DetailPrint \"Windows ME or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWinNT4 = "# ${AtMostWinNT4}\n\nChecks if the installer is running on Windows NT4 at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWinNT4}\n\n## Example\n\n    ${If} ${AtMostWinNT4}\n        DetailPrint \"Windows NT4 or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWinVista = "# ${AtMostWinVista}\n\nChecks if the installer is running on Windows Vista at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWinVista}\n\n## Example\n\n    ${If} ${AtMostWinVista}\n        DetailPrint \"Windows Vista or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var AtMostWinXP = "# ${AtMostWinXP}\n\nChecks if the installer is running on Windows XP at most.\n\n## Syntax\n\n    logic_lib_statement ${AtMostWinXP}\n\n## Example\n\n    ${If} ${AtMostWinXP}\n        DetailPrint \"Windows XP or lower\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsNT = "# ${IsNT}\n\nChecks if the installer is running on Windows NT family (NT4, 2000, XP, etc.)\n\n## Syntax\n\n    logic_lib_statement ${IsNT}\n\n## Example\n\n    ${If} ${IsNT}\n        DetailPrint \"Running on NT. Installing Unicode enabled application.\"\n    ${Else}\n        DetailPrint \"Not running on NT. Installing ANSI application.\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsServerOS = "# ${IsServerOS}\n\nChecks if the installer is running on a server version of Windows (NT4, 2003, 2008, etc.)\n\n## Syntax\n\n    logic_lib_statement ${IsServerOS}\n\n## Example\n\n    ${If} ${IsServerOS}\n        DetailPrint \"Running on Windows Server.\"\n    ${Else}\n        DetailPrint \"Not running on Windows Server.\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsServicePack = "# ${IsServicePack}\n\nChecks if the installer is running on Windows service pack version exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsServicePack} service_pack_version\n\n## Example\n\n    ${If} ${IsWinXP}\n    ${AndIf} ${IsServicePack} 2\n        DetailPrint \"Windows XP with SP2\"\n    ${Else}\n        DetailPrint \"Not Windows XP, or different service pack installed\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin7 = "# ${IsWin7}\n\nChecks if the installer is running on Windows 7 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin7}\n\n## Example\n\n    ${If} ${IsWin7}\n        DetailPrint \"Running on Windows 7\"\n    ${Else}\n        DetailPrint \"Not running on Windows 7\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin8_1 = "# ${IsWin8}.1\n\nChecks if the installer is running on Windows 8.1 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin8.1}\n\n## Example\n\n    ${If} ${IsWin8.1}\n        DetailPrint \"Running on Windows 8.1\"\n    ${Else}\n        DetailPrint \"Not running on Windows 8.1\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin8 = "# ${IsWin8}\n\nChecks if the installer is running on Windows 8 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin8}\n\n## Example\n\n    ${If} ${IsWin8}\n        DetailPrint \"Running on Windows 8\"\n    ${Else}\n        DetailPrint \"Not running on Windows 8\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin10 = "# ${IsWin10}\n\nChecks if the installer is running on Windows 10 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin10}\n\n## Example\n\n    ${If} ${IsWin10}\n        DetailPrint \"Running on Windows 10\"\n    ${Else}\n        DetailPrint \"Not running on Windows 10\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n\n## History\n\nAdded in NSIS v3.0b2\n";

var IsWin95 = "# ${IsWin95}\n\nChecks if the installer is running on Windows 95 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin95}\n\n## Example\n\n    ${If} ${IsWin95}\n        DetailPrint \"Running on Windows 95\"\n    ${Else}\n        DetailPrint \"Not running on Windows 95\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin98 = "# ${IsWin98}\n\nChecks if the installer is running on Windows 98 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin98}\n\n## Example\n\n    ${If} ${IsWin98}\n        DetailPrint \"Running on Windows 98\"\n    ${Else}\n        DetailPrint \"Not running on Windows 98\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin2000 = "# ${IsWin2000}\n\nChecks if the installer is running on Windows 2000 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin2000}\n\n## Example\n\n    ${If} ${IsWin2000}\n        DetailPrint \"Running on Windows 2000\"\n    ${Else}\n        DetailPrint \"Not running on Windows 2000\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin2003 = "# ${IsWin2003}\n\nChecks if the installer is running on Windows Server 2003 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin2003}\n\n## Example\n\n    ${If} ${IsWin2003}\n        DetailPrint \"Running on Windows Server 2003\"\n    ${Else}\n        DetailPrint \"Not running on Windows Server 2003\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin2008 = "# ${IsWin2008}\n\nChecks if the installer is running on Windows Server 2008 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin2008}\n\n## Example\n\n    ${If} ${IsWin2008}\n        DetailPrint \"Running on Windows Server 2008\"\n    ${Else}\n        DetailPrint \"Not running on Windows Server 2008\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin2008R2 = "# ${IsWin2008R2}\n\nChecks if the installer is running on Windows Server 2008 R2 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin2008R2}\n\n## Example\n\n    ${If} ${IsWin2008R2}\n        DetailPrint \"Running on Windows Server 2008 R2\"\n    ${Else}\n        DetailPrint \"Not running on Windows Server 2008 R2\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin2012 = "# ${IsWin2012}\n\nChecks if the installer is running on Windows Server 2012 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin2012}\n\n## Example\n\n    ${If} ${IsWin2012}\n        DetailPrint \"Running on Windows Server 2012\"\n    ${Else}\n        DetailPrint \"Not running on Windows Server 2012\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWin2012R2 = "# ${IsWin2012R2}\n\nChecks if the installer is running on Windows Server 2012 R2 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWin2012R2}\n\n## Example\n\n    ${If} ${IsWin2012R2}\n        DetailPrint \"Running on Windows Server 2012 R2\"\n    ${Else}\n        DetailPrint \"Not running on Windows Server 2012 R2\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWinME = "# ${IsWinME}\n\nChecks if the installer is running on Windows ME exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWinME}\n\n## Example\n\n    ${If} ${IsWinME}\n        DetailPrint \"Running on Windows ME\"\n    ${Else}\n        DetailPrint \"Not running on Windows ME\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWinNT4 = "# ${IsWinNT4}\n\nChecks if the installer is running on Windows NT4 exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWinNT4}\n\n## Example\n\n    ${If} ${IsWinNT4}\n        DetailPrint \"Running on Windows NT4\"\n    ${Else}\n        DetailPrint \"Not running on Windows NT4\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWinVista = "# ${IsWinVista}\n\nChecks if the installer is running on Windows Vista exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWinVista}\n\n## Example\n\n    ${If} ${IsWinVista}\n        DetailPrint \"Running on Windows Vista\"\n    ${Else}\n        DetailPrint \"Not running on Windows Vista\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var IsWinXP = "# ${IsWinXP}\n\nChecks if the installer is running on Windows XP exactly as specified.\n\n## Syntax\n\n    logic_lib_statement ${IsWinXP}\n\n## Example\n\n    ${If} ${IsWinXP}\n        DetailPrint \"Running on Windows XP\"\n    ${Else}\n        DetailPrint \"Not running  Windows XP\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n";

var StrFilter = "# ${StrFilter}\n\n* Convert string to uppercase or lowercase.\n* Set symbol filter.\n\n## Syntax\n\n    ${StrFilter} \"[string]\" \"[options]\" \"[symbols1]\" \"[symbols2]\" $var\n\n    \"[string]\"       ;[string]\n                     ;  input string\n                     ;\n    \"[options]\"      ;[+|-][1|2|3|12|23|31][eng|rus]\n                     ;  +   : convert string to uppercase\n                     ;  -   : convert string to lowercase\n                     ;  1   : only Digits\n                     ;  2   : only Letters\n                     ;  3   : only Special\n                     ;  12  : only Digits  + Letters\n                     ;  23  : only Letters + Special\n                     ;  31  : only Special + Digits\n                     ;  eng : English symbols (default)\n                     ;  rus : Russian symbols\n                     ;\n    \"[symbols1]\"     ;[symbols1]\n                     ;  symbols include (not changeable)\n                     ;\n    \"[symbols2]\"     ;[symbols2]\n                     ;  symbols exclude\n                     ;\n    $var             ;output (result)\n\nNote:\n\n- Error flag if syntax error\n- Same symbol to include & to exclude = to exclude\n\n## Examples\n\n### UpperCas\n\n    Section\n        ${StrFilter} \"123abc 456DEF 7890|%#\" \"+\" \"\" \"\" $R0\n        ; $R0=\"123ABC 456DEF 7890|%#\"\n    SectionEnd\n\n### LowerCase\n\n    Section\n        ${StrFilter} \"123abc 456DEF 7890|%#\" \"-\" \"ef\" \"\" $R0\n        ; $R0=\"123abc 456dEF 7890|%#\"\n    SectionEnd\n\n### Filter 1\n\n    Section\n        ${StrFilter} \"123abc 456DEF 7890|%#\" \"2\" \"|%\" \"\" $R0\n        ; $R0=\"abcDEF|%\"       ;only Letters + |%\n    SectionEnd\n\n### Filter 2\n\n    Section\n        ${StrFilter} \"123abc 456DEF 7890|%#\" \"13\" \"af\" \"4590\" $R0\n        ; $R0=\"123a 6F 78|%#\"  ;only Digits + Special + af - 4590\n    SectionEnd\n\n### Filter 3\n\n    Section\n        ${StrFilter} \"123abc 456DEF 7890|%#\" \"+12\" \"b\" \"def\" $R0\n        ; $R0=\"123AbC4567890\"  ;only Digits + Letters + b - def\n    SectionEnd\n\n### Filter 4\n\n    Section\n        ${StrFilter} \"123abcÀÁÂ 456DEFãäå 7890|%#\" \"+12rus\" \"ä\" \"ãå\" $R0\n        ; $R0=\"123ÀÁÂ456ä7890\"  ;only Digits + Letters + ä - ãå\n    SectionEnd\n\n### English + Russian Letters\n\n    Section\n        ${StrFilter} \"123abcÀÁÂ 456DEFãäå 7890|%#\" \"2rus\" \"\" \"\" $R0\n        ; $R0=\"ÀÁÂãäå\"        ;only Russian Letters\n        ${StrFilter} \"123abcÀÁÂ 456DEFãäå 7890|%#\" \"2\" \"$R0\" \"\" $R0\n        ; $R0=\"abcÀÁÂDEFãäå\"  ;only English + Russian Letters\n    SectionEnd\n\n### Word Capitalize\n\n    Section\n        Push \"_01-PERPETUOUS_DREAMER__-__THE_SOUND_OF_GOODBYE_(ORIG._MIX).MP3_\"\n        Call Capitalize\n        Pop $R0\n        ; $R0=\"_01-Perpetuous_Dreamer__-__The_Sound_Of_Goodbye_(Orig._Mix).mp3_\"\n\n        ${WordReplace} \"$R0\" \"_\" \" \" \"+*\" $R0\n        ; $R0=\" 01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3 \"\n\n        ${WordReplace} \"$R0\" \" \" \"\" \"{}\" $R0\n        ; $R0=\"01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3\"\n    SectionEnd\n\n    Function Capitalize\n        Exch $R0\n        Push $0\n        Push $1\n        Push $2\n\n        ${StrFilter} '$R0' '-eng' '' '' $R0\n        ${StrFilter} '$R0' '-rus' '' '' $R0\n\n        StrCpy $0 0\n\n        loop:\n        IntOp $0 $0 + 1\n        StrCpy $1 $R0 1 $0\n        StrCmp $1 '' end\n        StrCmp $1 ' ' +5\n        StrCmp $1 '_' +4\n        StrCmp $1 '-' +3\n        StrCmp $1 '(' +2\n        StrCmp $1 '[' 0 loop\n        IntOp $0 $0 + 1\n        StrCpy $1 $R0 1 $0\n        StrCmp $1 '' end\n\n        ${StrFilter} '$1' '+eng' '' '' $1\n        ${StrFilter} '$1' '+rus' '' '' $1\n\n        StrCpy $2 $R0 $0\n        IntOp $0 $0 + 1\n        StrCpy $R0 $R0 '' $0\n        IntOp $0 $0 - 2\n        StrCpy $R0 '$2$1$R0'\n        goto loop\n\n        end:\n        Pop $2\n        Pop $1\n        Pop $0\n        Exch $R0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var StrFilterS = "# ${VersionCompare}\n\n* Convert string to uppercase or lowercase.\n* Set symbol filter.\n\n## Syntax\n\n    ${StrFilterS} \"[string]\" \"[options]\" \"[symbols1]\" \"[symbols2]\" $var\n\n    \"[string]\"       ;[string]\n                     ;  input string\n                     ;\n    \"[options]\"      ;[+|-][1|2|3|12|23|31][eng|rus]\n                     ;  +   : convert string to uppercase\n                     ;  -   : convert string to lowercase\n                     ;  1   : only Digits\n                     ;  2   : only Letters\n                     ;  3   : only Special\n                     ;  12  : only Digits  + Letters\n                     ;  23  : only Letters + Special\n                     ;  31  : only Special + Digits\n                     ;  eng : English symbols (default)\n                     ;  rus : Russian symbols\n                     ;\n    \"[symbols1]\"     ;[symbols1]\n                     ;  symbols include (not changeable)\n                     ;\n    \"[symbols2]\"     ;[symbols2]\n                     ;  symbols exclude\n                     ;\n    $var             ;output (result)\n\nNote:\n\n- Error flag if syntax error\n- Same symbol to include & to exclude = to exclude\n\n## Examples\n\n### UpperCase\n\n    Section\n        ${StrFilterS} \"123abc 456DEF 7890|%#\" \"+\" \"\" \"\" $R0\n        ; $R0=\"123ABC 456DEF 7890|%#\"\n    SectionEnd\n\n### LowerCase\n\n    Section\n        ${StrFilterS} \"123abc 456DEF 7890|%#\" \"-\" \"ef\" \"\" $R0\n        ; $R0=\"123abc 456dEF 7890|%#\"\n    SectionEnd\n\n### Filter 1\n\n    Section\n        ${StrFilterS} \"123abc 456DEF 7890|%#\" \"2\" \"|%\" \"\" $R0\n        ; $R0=\"abcDEF|%\"       ;only Letters + |%\n    SectionEnd\n\n### Filter 2\n\n    Section\n        ${StrFilterS} \"123abc 456DEF 7890|%#\" \"13\" \"af\" \"4590\" $R0\n        ; $R0=\"123a 6F 78|%#\"  ;only Digits + Special + af - 4590\n    SectionEnd\n\n### Filter 3\n\n    Section\n        ${StrFilterS} \"123abc 456DEF 7890|%#\" \"+12\" \"b\" \"def\" $R0\n        ; $R0=\"123AbC4567890\"  ;only Digits + Letters + b - def\n    SectionEnd\n\n### Filter 4\n\n    Section\n        ${StrFilterS} \"123abcÀÁÂ 456DEFãäå 7890|%#\" \"+12rus\" \"ä\" \"ãå\" $R0\n        ; $R0=\"123ÀÁÂ456ä7890\"  ;only Digits + Letters + ä - ãå\n    SectionEnd\n\n### English + Russian Letters\n\n    Section\n        ${StrFilterS} \"123abcÀÁÂ 456DEFãäå 7890|%#\" \"2rus\" \"\" \"\" $R0\n        ; $R0=\"ÀÁÂãäå\"        ;only Russian Letters\n        ${StrFilterS} \"123abcÀÁÂ 456DEFãäå 7890|%#\" \"2\" \"$R0\" \"\" $R0\n        ; $R0=\"abcÀÁÂDEFãäå\"  ;only English + Russian Letters\n    SectionEnd\n\n### Word Capitalize\n\n    Section\n        Push \"_01-PERPETUOUS_DREAMER__-__THE_SOUND_OF_GOODBYE_(ORIG._MIX).MP3_\"\n        Call Capitalize\n        Pop $R0\n        ; $R0=\"_01-Perpetuous_Dreamer__-__The_Sound_Of_Goodbye_(Orig._Mix).mp3_\"\n\n        ${WordReplace} \"$R0\" \"_\" \" \" \"+*\" $R0\n        ; $R0=\" 01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3 \"\n\n        ${WordReplace} \"$R0\" \" \" \"\" \"{}\" $R0\n        ; $R0=\"01-Perpetuous Dreamer - The Sound Of Goodbye (Orig. Mix).mp3\"\n    SectionEnd\n\n    Function Capitalize\n        Exch $R0\n        Push $0\n        Push $1\n        Push $2\n\n        ${StrFilterS} '$R0' '-eng' '' '' $R0\n        ${StrFilterS} '$R0' '-rus' '' '' $R0\n\n        StrCpy $0 0\n\n        loop:\n        IntOp $0 $0 + 1\n        StrCpy $1 $R0 1 $0\n        StrCmp $1 '' end\n        StrCmp $1 ' ' +5\n        StrCmp $1 '_' +4\n        StrCmp $1 '-' +3\n        StrCmp $1 '(' +2\n        StrCmp $1 '[' 0 loop\n        IntOp $0 $0 + 1\n        StrCpy $1 $R0 1 $0\n        StrCmp $1 '' end\n\n        ${StrFilterS} '$1' '+eng' '' '' $1\n        ${StrFilterS} '$1' '+rus' '' '' $1\n\n        StrCpy $2 $R0 $0\n        IntOp $0 $0 + 1\n        StrCpy $R0 $R0 '' $0\n        IntOp $0 $0 - 2\n        StrCpy $R0 '$2$1$R0'\n        goto loop\n\n        end:\n        Pop $2\n        Pop $1\n        Pop $0\n        Exch $R0\n    FunctionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var VersionCompare = "# ${VersionCompare}\n\nCompare version numbers.\n\n## Syntax\n\n    ${VersionCompare} \"[Version1]\" \"[Version2]\" $var\n\n    \"[Version1]\"        ; First version\n    \"[Version2]\"        ; Second version\n    $var                ; Result:\n                        ;    $var=0  Versions are equal\n                        ;    $var=1  Version1 is newer\n                        ;    $var=2  Version2 is newer\n\n## Example\n\n    Section\n        ${VersionCompare} \"1.1.1.9\" \"1.1.1.01\" $R0\n        ; $R0=\"1\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var VersionConvert = "# ${VersionConvert}\n\nConvert version in the numerical format which can be compared.\n\n## Syntax\n\n    ${VersionConvert} \"[Version]\" \"[CharList]\" $var\n\n    \"[Version]\"         ; Version\n                        ;\n    \"[CharList]\"        ; List of characters, which will be replaced by numbers\n                        ; \"abcdefghijklmnopqrstuvwxyz\" (default)\n                        ;\n    $var                ; Result: converted version\n\nNote:\n\n- Converted letters are separated with dot\n- If character is non-digit and not in list then it will be converted to dot\n\n## Examples\n\n### Example 1\n\n    Section\n        ${VersionConvert} \"9.0a\" \"\" $R0\n        ; $R0=\"9.0.01\"\n\n        ${VersionConvert} \"9.0c\" \"\" $R1\n        ; $R1=\"9.0.03\"\n\n        ${VersionCompare} \"$R0\" \"$R1\" $R2\n        ; $R2=\"2\"   version2 is newer\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${VersionConvert} \"0.15c-9m\" \"\" $R0\n        ; $R0=\"0.15.03.9.13\"\n\n        ${VersionConvert} \"0.15c-1n\" \"\" $R1\n        ; $R1=\"0.15.03.1.14\"\n\n        ${VersionCompare} \"$R0\" \"$R1\" $R2\n        ; $R2=\"1\"   version1 is newer\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${VersionConvert} \"0.15c+\" \"abcdefghijklmnopqrstuvwxyz+\" $R0\n        ; $R0=\"0.15.0327\"\n\n        ${VersionConvert} \"0.15c\" \"abcdefghijklmnopqrstuvwxyz+\" $R1\n        ; $R1=\"0.15.03\"\n\n        ${VersionCompare} \"$R0\" \"$R1\" $R2\n        ; $R2=\"1\"   version1 is newer\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordAdd = "# ${WordAdd}\n\nAdd words to string1 from string2 if not exist or delete words if exist.\n\n## Syntax\n\n    ${WordAdd} \"[string1]\" \"[delimiter]\" \"[E][options]\" $var\n\n    \"[string1]\"          ;[string1]\n                         ;  string for addition or removing\n    \"[delimiter]\"        ;[delimiter]\n                         ;  one or several symbols\n    \"[E][options]\"       ;[options]\n                         ;  +string2 : words to add\n                         ;  -string2 : words to delete\n                         ;\n                         ;[E]\n                         ;  with errorlevel output\n                         ;  IfErrors:\n                         ;     $var=1  delimiter is empty\n                         ;     $var=3  syntax error (use: +text,-text)\n                         ;[]\n                         ;  no errorlevel output (default)\n                         ;  If some errors found then (result=input string)\n                         ;\n    $var                 ;output (result)\n\n## Examples\n\n### add\n\n    Section\n        ${WordAdd} \"C:\\io.sys C:\\WINDOWS\" \" \" \"+C:\\WINDOWS C:\\config.sys\" $R0\n        ; $R0=\"C:\\io.sys C:\\WINDOWS C:\\config.sys\"\n    SectionEnd\n\n### delete\n\n    Section\n        ${WordAdd} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"-C:\\WINDOWS C:\\config.sys C:\\IO.SYS\" $R0\n        ; $R0=\"C:\\logo.sys\"\n    SectionEnd\n\n### add to one\n\n    Section\n        ${WordAdd} \"C:\\io.sys\" \" \" \"+C:\\WINDOWS C:\\config.sys C:\\IO.SYS\" $R0\n        ; $R0=\"C:\\io.sys C:\\WINDOWS C:\\config.sys\"\n    SectionEnd\n\n### delete one\n\n    Section\n        ${WordAdd} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"-C:\\WINDOWS\" $R0\n        ; $R0=\"C:\\io.sys C:\\logo.sys\"\n    SectionEnd\n\n### No new words found\n\n    Section\n        ${WordAdd} \"C:\\io.sys C:\\logo.sys\" \" \" \"+C:\\logo.sys\" $R0\n        StrCmp $R0 \"C:\\io.sys C:\\logo.sys\" 0 +2\n        MessageBox MB_OK \"No new words found to add\"\n    SectionEnd\n\n### No words deleted\n\n    Section\n        ${WordAdd} \"C:\\io.sys C:\\logo.sys\" \" \" \"-C:\\config.sys\" $R0\n        StrCmp $R0 \"C:\\io.sys C:\\logo.sys\" 0 +2\n        MessageBox MB_OK \"No words found to delete\"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordAdd} \"C:\\io.sys C:\\logo.sys\" \"\" \"E-C:\\logo.sys\" $R0\n        ; $R0=\"1\" (delimiter is empty \"\")\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordAddS = "# ${WordInsert}\n\nInsert word in string.\n\n## Syntax\n\n    ${WordInsert} \"[string]\" \"[delimiter]\" \"[word]\" \"[E][options]\" $var\n---\n    \"[string]\"          ;[string]\n                        ;  input string\n    \"[delimiter]\"       ;[delimiter]\n                        ;  one or several symbols\n    \"[word]\"            ;[word]\n                        ;  word to insert\n    \"[E][options]\"      ;[options]\n                        ;  +number  : word number from start\n                        ;  -number  : word number from end\n                        ;\n                        ;[E]\n                        ;  with errorlevel output\n                        ;  IfErrors:\n                        ;     $var=1  delimiter is empty\n                        ;     $var=2  wrong word number\n                        ;     $var=3  syntax error (Use: +1,-1)\n                        ;[]\n                        ;  no errorlevel output (default)\n                        ;  If some errors found then (result=input string)\n                        ;\n    $var                ;output (result)\n\n## Examples\n\n### add\n\n    Section\n        ${WordAddS} \"C:\\io.sys C:\\WINDOWS\" \" \" \"+C:\\WINDOWS C:\\config.sys\" $R0\n        ; $R0=\"C:\\io.sys C:\\WINDOWS C:\\config.sys\"\n    SectionEnd\n\n### delete\n\n    Section\n        ${WordAddS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"-C:\\WINDOWS C:\\config.sys C:\\IO.SYS\" $R0\n        ; $R0=\"C:\\logo.sys\"\n    SectionEnd\n\n### add to one\n\n    Section\n        ${WordAddS} \"C:\\io.sys\" \" \" \"+C:\\WINDOWS C:\\config.sys C:\\IO.SYS\" $R0\n        ; $R0=\"C:\\io.sys C:\\WINDOWS C:\\config.sys\"\n    SectionEnd\n\n### delete one\n\n    Section\n        ${WordAddS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"-C:\\WINDOWS\" $R0\n        ; $R0=\"C:\\io.sys C:\\logo.sys\"\n    SectionEnd\n\n### No new words found\n\n    Section\n        ${WordAddS} \"C:\\io.sys C:\\logo.sys\" \" \" \"+C:\\logo.sys\" $R0\n        StrCmp $R0 \"C:\\io.sys C:\\logo.sys\" 0 +2\n        MessageBox MB_OK \"No new words found to add\"\n    SectionEnd\n\n### No words deleted\n\n    Section\n        ${WordAddS} \"C:\\io.sys C:\\logo.sys\" \" \" \"-C:\\config.sys\" $R0\n        StrCmp $R0 \"C:\\io.sys C:\\logo.sys\" 0 +2\n        MessageBox MB_OK \"No words found to delete\"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordAddS} \"C:\\io.sys C:\\logo.sys\" \"\" \"E-C:\\logo.sys\" $R0\n        ; $R0=\"1\" (delimiter is empty \"\")\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordFind = "# ${WordFind}\n\nMulti-features string function.\n\n## Syntax\n\n    ${WordFind} \"[string]\" \"[delimiter]\" \"[E][options]\" $var\n\n    \"[string]\"         ;[string]\n                       ;  input string\n    \"[delimiter]\"      ;[delimiter]\n                       ;  one or several symbols\n    \"[E][options]\"     ;[options]\n                       ;  +number   : word number from start\n                       ;  -number   : word number from end\n                       ;  +number}  : delimiter number from start\n                       ;              all space after this\n                       ;              delimiter to output\n                       ;  +number{  : delimiter number from start\n                       ;              all space before this\n                       ;              delimiter to output\n                       ;  +number}} : word number from start\n                       ;              all space after this word\n                       ;              to output\n                       ;  +number{{ : word number from start\n                       ;              all space before this word\n                       ;              to output\n                       ;  +number{} : word number from start\n                       ;              all space before and after\n                       ;              this word (word exclude)\n                       ;  +number*} : word number from start\n                       ;              all space after this\n                       ;              word to output with word\n                       ;  +number{* : word number from start\n                       ;              all space before this\n                       ;              word to output with word\n                       ;  #         : sum of words to output\n                       ;  *         : sum of delimiters to output\n                       ;  /word     : number of word to output\n                       ;\n                       ;[E]\n                       ;  with errorlevel output\n                       ;  IfErrors:\n                       ;     $var=1  delimiter not found\n                       ;     $var=2  no such word number\n                       ;     $var=3  syntax error (Use: +1,-1},#,*,/word,...)\n                       ;[]\n                       ;  no errorlevel output (default)\n                       ;  If some errors found then (result=input string)\n                       ;\n    $var               ;output (result)\n\nNotes:\n\n- Accepted numbers 1,01,001,...\n\n## Examples\n\n### Find word by number\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\Program Files C:\\WINDOWS\" \" C:\\\" \"-02\" $R0\n        ; $R0=\"Program Files\"\n    SectionEnd\n\n### Delimiter exclude\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \"sys\" \"-2}\" $R0\n        ; $R0=\" C:\\logo.sys C:\\WINDOWS\"\n    SectionEnd\n\n### Sum of words\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" C:\\\" \"#\" $R0\n        ; $R0=\"3\"\n    SectionEnd\n\n### Sum of delimiters\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \"sys\" \"*\" $R0\n        ; $R0=\"2\"\n    SectionEnd\n\n### Find word number\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\Program Files C:\\WINDOWS\" \" \" \"/Files\" $R0\n        ; $R0=\"3\"\n    SectionEnd\n\n### }}\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"+2}}\" $R0\n        ; $R0=\" C:\\WINDOWS\"\n    SectionEnd\n\n### {}\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"+2{}\" $R0\n        ; $R0=\"C:\\io.sys C:\\WINDOWS\"\n    SectionEnd\n\n### *}\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"+2*}\" $R0\n        ; $R0=\"C:\\logo.sys C:\\WINDOWS\"\n    SectionEnd\n\n### Get parent directory\n\n    Section\n        StrCpy $R0 \"C:\\Program Files\\NSIS\\NSIS.chm\"\n    ;               \"C:\\Program Files\\NSIS\\Include\\\"\n    ;               \"C:\\\\Program Files\\\\NSIS\\\\NSIS.chm\"\n\n        ${WordFind} \"$R0\" \"\\\" \"-2{*\" $R0\n        ; $R0=\"C:\\Program Files\\NSIS\"\n        ;     \"C:\\\\Program Files\\\\NSIS\"\n    SectionEnd\n\n### Coordinates\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \":\\lo\" \"E+1{\" $R0\n        ; $R0=\"C:\\io.sys C\"\n        IfErrors end\n\n        StrLen $0 $R0             ; $0 = Start position of word (11)\n        StrLen $1 ':\\lo'          ; $1 = Word length (4)\n        ; StrCpy $R0 $R1 $1 $0    ; $R0 = :\\lo\n\n        end:\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordFind} \"[string]\" \"[delimiter]\" \"E[options]\" $R0\n\n        IfErrors 0 end\n        StrCmp $R0 1 0 +2       ; errorlevel 1?\n        MessageBox MB_OK 'delimiter not found' IDOK end\n        StrCmp $R0 2 0 +2       ; errorlevel 2?\n        MessageBox MB_OK 'no such word number' IDOK end\n        StrCmp $R0 3 0 +2       ; errorlevel 3?\n        MessageBox MB_OK 'syntax error'\n\n        end:\n    SectionEnd\n\n### Without errorlevel output\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys\" \"_\" \"+1\" $R0\n\n        ; $R0=\"C:\\io.sys C:\\logo.sys\" (error: delimiter \"_\" not found)\n    SectionEnd\n\n### If found\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys\" \":\\lo\" \"E+1{\" $R0\n\n        IfErrors notfound found\n        found:\n        MessageBox MB_OK 'Found' IDOK end\n        notfound:\n        MessageBox MB_OK 'Not found'\n\n        end:\n    SectionEnd\n\n### If found 2\n\n    Section\n        ${WordFind} \"C:\\io.sys C:\\logo.sys\" \":\\lo\" \"+1{\" $R0\n\n        StrCmp $R0 \"C:\\io.sys C:\\logo.sys\" notfound found        ; error?\n        found:\n        MessageBox MB_OK 'Found' IDOK end\n        notfound:\n        MessageBox MB_OK 'Not found'\n\n        end:\n    SectionEnd\n\n### To accept one word in string if delimiter not found\n\n    Section\n        StrCpy $0 'OneWord'\n        StrCpy $1 1\n\n        loop:\n        ${WordFind} \"$0\" \" \" \"E+$1\" $R0\n        IfErrors 0 code\n        StrCmp $1$R0 11 0 error\n        StrCpy $R0 $0\n        goto end\n\n        code:\n        ; ...\n        IntOp $1 $1 + 1\n        goto loop\n\n        error:\n        StrCpy $1 ''\n        StrCpy $R0 ''\n\n        end:\n        ; $R0=\"OneWord\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordFind2X = "# ${WordFind2X}\n\nFind word between two delimiters.\n\n## Syntax\n\n    ${WordFind2X} \"[string]\" \"[delimiter1]\" \"[delimiter2]\" \"[E][options]\" $var\n\n    \"[string]\"         ;[string]\n                       ;  input string\n    \"[delimiter1]\"     ;[delimiter1]\n                       ;  first delimiter\n    \"[delimiter2]\"     ;[delimiter2]\n                       ;  second delimiter\n    \"[E][options]\"     ;[options]\n                       ;  +number   : word number from start\n                       ;  -number   : word number from end\n                       ;  +number}} : word number from start all space\n                       ;              after this word to output\n                       ;  +number{{ : word number from end all space\n                       ;              before this word to output\n                       ;  +number{} : word number from start\n                       ;              all space before and after\n                       ;              this word (word exclude)\n                       ;  +number*} : word number from start\n                       ;              all space after this\n                       ;              word to output with word\n                       ;  +number{* : word number from start\n                       ;              all space before this\n                       ;              word to output with word\n                       ;  #         : sum of words to output\n                       ;  /word     : number of word to output\n                       ;\n                       ;[E]\n                       ;  with errorlevel output\n                       ;  IfErrors:\n                       ;     $var=1  no words found\n                       ;     $var=2  no such word number\n                       ;     $var=3  syntax error (Use: +1,-1,#)\n                       ;[]\n                       ;  no errorlevel output (default)\n                       ;  If some errors found then (result=input string)\n                       ;\n    $var               ;output (result)\n\n## Examples\n\n### Example 1\n\n    Section\n        ${WordFind2X} \"[C:\\io.sys];[C:\\logo.sys];[C:\\WINDOWS]\" \"[C:\\\" \"];\" \"+2\" $R0\n        ; $R0=\"logo.sys\"\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${WordFind2X} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"-1\" $R0\n        ; $R0=\"logo\"\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${WordFind2X} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"-1{{\" $R0\n        ; $R0=\"C:\\WINDOWS C:\\io.sys C:\"\n    SectionEnd\n\n### Example 4\n\n    Section\n        ${WordFind2X} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"-1{}\" $R0\n        ; $R0=\"C:\\WINDOWS C:\\io.sys C:sys\"\n    SectionEnd\n\n### Example 5\n\n    Section\n        ${WordFind2X} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"-1{*\" $R0\n        ; $R0=\"C:\\WINDOWS C:\\io.sys C:\\logo.\"\n    SectionEnd\n\n### Example 6\n\n    Section\n        ${WordFind2X} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"/logo\" $R0\n        ; $R0=\"2\"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordFind2X} \"[io.sys];[C:\\logo.sys]\" \"\\\" \"];\" \"E+1\" $R0\n        ; $R0=\"1\" (\"\\...];\" not found)\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordFind2XS = "# ${WordFind2XS}\n\nFind word between two delimiters, case sensitive\n\n## Syntax\n\n    ${WordFind2XS} \"[string]\" \"[delimiter1]\" \"[delimiter2]\" \"[E][options]\" $var\n\n    \"[string]\"         ;[string]\n                       ;  input string\n    \"[delimiter1]\"     ;[delimiter1]\n                       ;  first delimiter\n    \"[delimiter2]\"     ;[delimiter2]\n                       ;  second delimiter\n    \"[E][options]\"     ;[options]\n                       ;  +number   : word number from start\n                       ;  -number   : word number from end\n                       ;  +number}} : word number from start all space\n                       ;              after this word to output\n                       ;  +number{{ : word number from end all space\n                       ;              before this word to output\n                       ;  +number{} : word number from start\n                       ;              all space before and after\n                       ;              this word (word exclude)\n                       ;  +number*} : word number from start\n                       ;              all space after this\n                       ;              word to output with word\n                       ;  +number{* : word number from start\n                       ;              all space before this\n                       ;              word to output with word\n                       ;  #         : sum of words to output\n                       ;  /word     : number of word to output\n                       ;\n                       ;[E]\n                       ;  with errorlevel output\n                       ;  IfErrors:\n                       ;     $var=1  no words found\n                       ;     $var=2  no such word number\n                       ;     $var=3  syntax error (Use: +1,-1,#)\n                       ;[]\n                       ;  no errorlevel output (default)\n                       ;  If some errors found then (result=input string)\n                       ;\n    $var               ;output (result)\n\n## Examples\n\n### Example 1\n\n    Section\n        ${WordFind2XS} \"[C:\\io.sys];[C:\\logo.sys];[C:\\WINDOWS]\" \"[C:\\\" \"];\" \"+2\" $R0\n        ; $R0=\"logo.sys\"\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${WordFind2XS} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"-1\" $R0\n        ; $R0=\"logo\"\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${WordFind2XS} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"-1{{\" $R0\n        ; $R0=\"C:\\WINDOWS C:\\io.sys C:\"\n    SectionEnd\n\n### Example 4\n\n    Section\n        ${WordFind2XS} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"-1{}\" $R0\n        ; $R0=\"C:\\WINDOWS C:\\io.sys C:sys\"\n    SectionEnd\n\n### Example 5\n\n    Section\n        ${WordFind2XS} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"-1{*\" $R0\n        ; $R0=\"C:\\WINDOWS C:\\io.sys C:\\logo.\"\n    SectionEnd\n\n### Example 6\n\n    Section\n        ${WordFind2XS} \"C:\\WINDOWS C:\\io.sys C:\\logo.sys\" \"\\\" \".\" \"/logo\" $R0\n        ; $R0=\"2\"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordFind2XS} \"[io.sys];[C:\\logo.sys]\" \"\\\" \"];\" \"E+1\" $R0\n        ; $R0=\"1\" (\"\\...];\" not found)\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordFind3X = "# ${WordFind3X}\n\nFind a word that contains a string, between two delimiters.\n\n## Syntax\n\n    ${WordFind3X} \"[string]\" \"[delimiter1]\" \"[center]\" \"[delimiter2]\" \"[E][options]\" $var\n\n    \"[string]\"         ;[string]\n                       ;  input string\n    \"[delimiter1]\"     ;[delimiter1]\n                       ;  first delimiter\n    \"[center]\"         ;[center]\n                       ;  center string\n    \"[delimiter2]\"     ;[delimiter2]\n                       ;  second delimiter\n    \"[E][options]\"     ;[options]\n                       ;  +number   : word number from start\n                       ;  -number   : word number from end\n                       ;  +number}} : word number from start all space\n                       ;              after this word to output\n                       ;  +number{{ : word number from end all space\n                       ;              before this word to output\n                       ;  +number{} : word number from start\n                       ;              all space before and after\n                       ;              this word (word exclude)\n                       ;  +number*} : word number from start\n                       ;              all space after this\n                       ;              word to output with word\n                       ;  +number{* : word number from start\n                       ;              all space before this\n                       ;              word to output with word\n                       ;  #         : sum of words to output\n                       ;  /word     : number of word to output\n                       ;\n                       ;[E]\n                       ;  with errorlevel output\n                       ;  IfErrors:\n                       ;     $var=1  no words found\n                       ;     $var=2  no such word number\n                       ;     $var=3  syntax error (Use: +1,-1,#)\n                       ;[]\n                       ;  no errorlevel output (default)\n                       ;  If some errors found then (result=input string)\n                       ;\n    $var               ;output (result)\n\n## Examples\n\n### Example 1\n\n    Section\n        ${WordFind3X} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"+1\" $R0\n        ; $R0=\"1.AAB\"\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${WordFind3X} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"-1\" $R0\n        ; $R0=\"2.BAA\"\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${WordFind3X} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"-1{{\" $R0\n        ; $R0=\"[1.AAB];\"\n    SectionEnd\n\n### Example 4\n\n    Section\n        ${WordFind3X} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"-1{}\" $R0\n        ; $R0=\"[1.AAB];[3.BBB];\"\n    SectionEnd\n\n### Example 5\n\n    Section\n        ${WordFind3X} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"-1{*\" $R0\n        ; $R0=\"[1.AAB];[2.BAA];\"\n    SectionEnd\n\n### Example 6\n\n    Section\n        ${WordFind3X} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"/2.BAA\" $R0\n        ; $R0=\"2\"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordFind3X} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"XX\" \"];\" \"E+1\" $R0\n        ; $R0=\"1\" (\"[...XX...];\" not found)\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordFind3XS = "# ${WordFind3XS}\n\nFind a word that contains a string, between two delimiters, case sensitive.\n\n## Syntax\n\n    ${WordFind3XS} \"[string]\" \"[delimiter1]\" \"[center]\" \"[delimiter2]\" \"[E][options]\" $var\n\n    \"[string]\"         ;[string]\n                       ;  input string\n    \"[delimiter1]\"     ;[delimiter1]\n                       ;  first delimiter\n    \"[center]\"         ;[center]\n                       ;  center string\n    \"[delimiter2]\"     ;[delimiter2]\n                       ;  second delimiter\n    \"[E][options]\"     ;[options]\n                       ;  +number   : word number from start\n                       ;  -number   : word number from end\n                       ;  +number}} : word number from start all space\n                       ;              after this word to output\n                       ;  +number{{ : word number from end all space\n                       ;              before this word to output\n                       ;  +number{} : word number from start\n                       ;              all space before and after\n                       ;              this word (word exclude)\n                       ;  +number*} : word number from start\n                       ;              all space after this\n                       ;              word to output with word\n                       ;  +number{* : word number from start\n                       ;              all space before this\n                       ;              word to output with word\n                       ;  #         : sum of words to output\n                       ;  /word     : number of word to output\n                       ;\n                       ;[E]\n                       ;  with errorlevel output\n                       ;  IfErrors:\n                       ;     $var=1  no words found\n                       ;     $var=2  no such word number\n                       ;     $var=3  syntax error (Use: +1,-1,#)\n                       ;[]\n                       ;  no errorlevel output (default)\n                       ;  If some errors found then (result=input string)\n                       ;\n    $var               ;output (result)\n\n## Examples\n\n### Example 1\n\n    Section\n        ${WordFind3XS} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"+1\" $R0\n        ; $R0=\"1.AAB\"\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${WordFind3XS} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"-1\" $R0\n        ; $R0=\"2.BAA\"\n    SectionEnd\n\n### Example 3\n\n    Section\n        ${WordFind3XS} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"-1{{\" $R0\n        ; $R0=\"[1.AAB];\"\n    SectionEnd\n\n### Example 4\n\n    Section\n        ${WordFind3XS} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"-1{}\" $R0\n        ; $R0=\"[1.AAB];[3.BBB];\"\n    SectionEnd\n\n### Example 5\n\n    Section\n        ${WordFind3XS} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"-1{*\" $R0\n        ; $R0=\"[1.AAB];[2.BAA];\"\n    SectionEnd\n\n### Example 6\n\n    Section\n        ${WordFind3XS} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"AA\" \"];\" \"/2.BAA\" $R0\n        ; $R0=\"2\"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordFind3XS} \"[1.AAB];[2.BAA];[3.BBB];\" \"[\" \"XX\" \"];\" \"E+1\" $R0\n        ; $R0=\"1\" (\"[...XX...];\" not found)\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordFindS = "# ${WordFindS}\n\nMulti-features string function, case sensitive\n\n## Syntax\n\n    ${WordFindS} \"[string]\" \"[delimiter]\" \"[E][options]\" $var\n\n    \"[string]\"         ;[string]\n                       ;  input string\n    \"[delimiter]\"      ;[delimiter]\n                       ;  one or several symbols\n    \"[E][options]\"     ;[options]\n                       ;  +number   : word number from start\n                       ;  -number   : word number from end\n                       ;  +number}  : delimiter number from start\n                       ;              all space after this\n                       ;              delimiter to output\n                       ;  +number{  : delimiter number from start\n                       ;              all space before this\n                       ;              delimiter to output\n                       ;  +number}} : word number from start\n                       ;              all space after this word\n                       ;              to output\n                       ;  +number{{ : word number from start\n                       ;              all space before this word\n                       ;              to output\n                       ;  +number{} : word number from start\n                       ;              all space before and after\n                       ;              this word (word exclude)\n                       ;  +number*} : word number from start\n                       ;              all space after this\n                       ;              word to output with word\n                       ;  +number{* : word number from start\n                       ;              all space before this\n                       ;              word to output with word\n                       ;  #         : sum of words to output\n                       ;  *         : sum of delimiters to output\n                       ;  /word     : number of word to output\n                       ;\n                       ;[E]\n                       ;  with errorlevel output\n                       ;  IfErrors:\n                       ;     $var=1  delimiter not found\n                       ;     $var=2  no such word number\n                       ;     $var=3  syntax error (Use: +1,-1},#,*,/word,...)\n                       ;[]\n                       ;  no errorlevel output (default)\n                       ;  If some errors found then (result=input string)\n                       ;\n    $var               ;output (result)\n\nNotes:\n\n- Accepted numbers 1,01,001,...\n\n## Examples\n\n### Find word by number\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\Program Files C:\\WINDOWS\" \" C:\\\" \"-02\" $R0\n        ; $R0=\"Program Files\"\n    SectionEnd\n\n### Delimiter exclude\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \"sys\" \"-2}\" $R0\n        ; $R0=\" C:\\logo.sys C:\\WINDOWS\"\n    SectionEnd\n\n### Sum of words\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" C:\\\" \"#\" $R0\n        ; $R0=\"3\"\n    SectionEnd\n\n### Sum of delimiters\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \"sys\" \"*\" $R0\n        ; $R0=\"2\"\n    SectionEnd\n\n### Find word number\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\Program Files C:\\WINDOWS\" \" \" \"/Files\" $R0\n        ; $R0=\"3\"\n    SectionEnd\n\n### }}\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"+2}}\" $R0\n        ; $R0=\" C:\\WINDOWS\"\n    SectionEnd\n\n### {}\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"+2{}\" $R0\n        ; $R0=\"C:\\io.sys C:\\WINDOWS\"\n    SectionEnd\n\n### *}\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \" \" \"+2*}\" $R0\n        ; $R0=\"C:\\logo.sys C:\\WINDOWS\"\n    SectionEnd\n\n### Get parent directory\n\n    Section\n        StrCpy $R0 \"C:\\Program Files\\NSIS\\NSIS.chm\"\n    ;               \"C:\\Program Files\\NSIS\\Include\\\"\n    ;               \"C:\\\\Program Files\\\\NSIS\\\\NSIS.chm\"\n\n        ${WordFindS} \"$R0\" \"\\\" \"-2{*\" $R0\n        ; $R0=\"C:\\Program Files\\NSIS\"\n        ;     \"C:\\\\Program Files\\\\NSIS\"\n    SectionEnd\n\n### Coordinates\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \":\\lo\" \"E+1{\" $R0\n        ; $R0=\"C:\\io.sys C\"\n        IfErrors end\n\n        StrLen $0 $R0             ; $0 = Start position of word (11)\n        StrLen $1 ':\\lo'          ; $1 = Word length (4)\n        ; StrCpy $R0 $R1 $1 $0    ; $R0 = :\\lo\n\n        end:\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordFindS} \"[string]\" \"[delimiter]\" \"E[options]\" $R0\n\n        IfErrors 0 end\n        StrCmp $R0 1 0 +2       ; errorlevel 1?\n        MessageBox MB_OK 'delimiter not found' IDOK end\n        StrCmp $R0 2 0 +2       ; errorlevel 2?\n        MessageBox MB_OK 'no such word number' IDOK end\n        StrCmp $R0 3 0 +2       ; errorlevel 3?\n        MessageBox MB_OK 'syntax error'\n\n        end:\n    SectionEnd\n\n### Without errorlevel output\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys\" \"_\" \"+1\" $R0\n\n        ; $R0=\"C:\\io.sys C:\\logo.sys\" (error: delimiter \"_\" not found)\n    SectionEnd\n\n### If found\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys\" \":\\lo\" \"E+1{\" $R0\n\n        IfErrors notfound found\n        found:\n        MessageBox MB_OK 'Found' IDOK end\n        notfound:\n        MessageBox MB_OK 'Not found'\n\n        end:\n    SectionEnd\n\n### If found 2\n\n    Section\n        ${WordFindS} \"C:\\io.sys C:\\logo.sys\" \":\\lo\" \"+1{\" $R0\n\n        StrCmp $R0 \"C:\\io.sys C:\\logo.sys\" notfound found        ; error?\n        found:\n        MessageBox MB_OK 'Found' IDOK end\n        notfound:\n        MessageBox MB_OK 'Not found'\n\n        end:\n    SectionEnd\n\n### To accept one word in string if delimiter not found\n\n    Section\n        StrCpy $0 'OneWord'\n        StrCpy $1 1\n\n        loop:\n        ${WordFindS} \"$0\" \" \" \"E+$1\" $R0\n        IfErrors 0 code\n        StrCmp $1$R0 11 0 error\n        StrCpy $R0 $0\n        goto end\n\n        code:\n        ; ...\n        IntOp $1 $1 + 1\n        goto loop\n\n        error:\n        StrCpy $1 ''\n        StrCpy $R0 ''\n\n        end:\n        ; $R0=\"OneWord\"\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordInsert = "# ${WordInsert}\n\nInsert word in string.\n\n## Syntax\n\n    ${WordInsert} \"[string]\" \"[delimiter]\" \"[word]\" \"[E][options]\" $var\n\n    \"[string]\"          ;[string]\n                        ;  input string\n    \"[delimiter]\"       ;[delimiter]\n                        ;  one or several symbols\n    \"[word]\"            ;[word]\n                        ;  word to insert\n    \"[E][options]\"      ;[options]\n                        ;  +number  : word number from start\n                        ;  -number  : word number from end\n                        ;\n                        ;[E]\n                        ;  with errorlevel output\n                        ;  IfErrors:\n                        ;     $var=1  delimiter is empty\n                        ;     $var=2  wrong word number\n                        ;     $var=3  syntax error (Use: +1,-1)\n                        ;[]\n                        ;  no errorlevel output (default)\n                        ;  If some errors found then (result=input string)\n                        ;\n    $var                ;output (result)\n\n## Examples\n\n### Example 1\n\n    Section\n        ${WordInsert} \"C:\\io.sys C:\\WINDOWS\" \" \" \"C:\\logo.sys\" \"-2\" $R0\n        ; $R0=\"C:\\io.sys C:\\logo.sys C:\\WINDOWS\"\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${WordInsert} \"C:\\io.sys\" \" \" \"C:\\WINDOWS\" \"+2\" $R0\n        ; $R0=\"C:\\io.sys C:\\WINDOWS\"\n    SectionEnd\n\n### Example (3)\n\n    Section\n        ${WordInsert} \"\" \" \" \"C:\\WINDOWS\" \"+1\" $R0\n        ; $R0=\"C:\\WINDOWS \"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordInsert} \"C:\\io.sys C:\\logo.sys\" \" \" \"C:\\logo.sys\" \"E+4\" $R0\n        ; $R0=\"2\" (wrong word number \"+4\")\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordInsertS = "# ${WordInsertS}\n\nInsert word in string.\n\n## Syntax\n\n    ${WordInsertS} \"[string]\" \"[delimiter]\" \"[word]\" \"[E][options]\" $var\n\n    \"[string]\"          ;[string]\n                        ;  input string\n    \"[delimiter]\"       ;[delimiter]\n                        ;  one or several symbols\n    \"[word]\"            ;[word]\n                        ;  word to insert\n    \"[E][options]\"      ;[options]\n                        ;  +number  : word number from start\n                        ;  -number  : word number from end\n                        ;\n                        ;[E]\n                        ;  with errorlevel output\n                        ;  IfErrors:\n                        ;     $var=1  delimiter is empty\n                        ;     $var=2  wrong word number\n                        ;     $var=3  syntax error (Use: +1,-1)\n                        ;[]\n                        ;  no errorlevel output (default)\n                        ;  If some errors found then (result=input string)\n                        ;\n    $var                ;output (result)\n\n## Examples\n\n### Example 1\n\n    Section\n        ${WordInsertS} \"C:\\io.sys C:\\WINDOWS\" \" \" \"C:\\logo.sys\" \"-2\" $R0\n        ; $R0=\"C:\\io.sys C:\\logo.sys C:\\WINDOWS\"\n    SectionEnd\n\n### Example 2\n\n    Section\n        ${WordInsertS} \"C:\\io.sys\" \" \" \"C:\\WINDOWS\" \"+2\" $R0\n        ; $R0=\"C:\\io.sys C:\\WINDOWS\"\n    SectionEnd\n\n### Example (3)\n\n    Section\n        ${WordInsertS} \"\" \" \" \"C:\\WINDOWS\" \"+1\" $R0\n        ; $R0=\"C:\\WINDOWS \"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordInsertS} \"C:\\io.sys C:\\logo.sys\" \" \" \"C:\\logo.sys\" \"E+4\" $R0\n        ; $R0=\"2\" (wrong word number \"+4\")\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordReplace = "# ${WordReplace}\n\nReplace or delete word from string.\n\n## Syntax\n\n    ${WordReplace} \"[string]\" \"[word1]\" \"[word2]\" \"[E][options]\" $var\n\n    \"[string]\"         ;[string]\n                       ;  input string\n    \"[word1]\"          ;[word1]\n                       ;  word to replace or delete\n    \"[word2]\"          ;[word2]\n                       ;  replace with (if empty delete)\n    \"[E][options]\"     ;[options]\n                       ;  +number  : word number from start\n                       ;  -number  : word number from end\n                       ;  +number* : word number from start multiple-replace\n                       ;  -number* : word number from end multiple-replace\n                       ;  +        : replace all results\n                       ;  +*       : multiple-replace all results\n                       ;  {        : if exists replace all delimiters\n                       ;               from left edge\n                       ;  }        : if exists replace all delimiters\n                       ;               from right edge\n                       ;  {}       : if exists replace all delimiters\n                       ;               from edges\n                       ;  {*       : if exists multiple-replace all\n                       ;               delimiters from left edge\n                       ;  }*       : if exists multiple-replace all\n                       ;               delimiters from right edge\n                       ;  {}*      : if exists multiple-replace all\n                       ;               delimiters from edges\n                       ;\n                       ;[E]\n                       ;  with errorlevel output\n                       ;  IfErrors:\n                       ;     $var=1  word to replace not found\n                       ;     $var=2  no such word number\n                       ;     $var=3  syntax error (Use: +1,-1,+1*,-1*,+,+*,{},{}*)\n                       ;[]\n                       ;  no errorlevel output (default)\n                       ;  If some errors found then (result=input string)\n                       ;\n    $var               ;output (result)\n\n## Examples\n\n### replace\n\n    Section\n        ${WordReplace} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \"SYS\" \"bmp\" \"+2\" $R0\n        ; $R0=\"C:\\io.sys C:\\logo.bmp C:\\WINDOWS\"\n    SectionEnd\n\n### delete\n\n    Section\n        ${WordReplace} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \"SYS\" \"\" \"+\" $R0\n        ; $R0=\"C:\\io. C:\\logo. C:\\WINDOWS\"\n    SectionEnd\n\n### multiple-replace 1\n\n    Section\n        ${WordReplace} \"C:\\io.sys      C:\\logo.sys   C:\\WINDOWS\" \" \" \" \" \"+1*\" $R0\n        ; +1* or +2* or +3* or +4* or +5* or +6*\n        ; $R0=\"C:\\io.sys C:\\logo.sys   C:\\WINDOWS\"\n    SectionEnd\n\n### multiple-replace 2\n\n    Section\n        ${WordReplace} \"C:\\io.sys C:\\logo.sysSYSsys C:\\WINDOWS\" \"sys\" \"bmp\" \"+*\" $R0\n        ; $R0=\"C:\\io.bmp C:\\logo.bmp C:\\WINDOWS\"\n    SectionEnd\n\n### multiple-replace 3\n\n    Section\n        ${WordReplace} \"sysSYSsysC:\\io.sys C:\\logo.sys C:\\WINDOWSsysSYSsys\" \"sys\" \"|\" \"{}*\" $R0\n        ; $R0=\"|C:\\io.sys C:\\logo.sys C:\\WINDOWS|\"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordReplace} \"C:\\io.sys C:\\logo.sys\" \"sys\" \"bmp\" \"E+3\" $R0\n        ; $R0=\"2\" (no such word number \"+3\")\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var WordReplaceS = "# ${WordReplaceS}\n\nReplace or delete word from string, case sensitive.\n\n## Syntax\n\n    ${WordReplaceS} \"[string]\" \"[word1]\" \"[word2]\" \"[E][options]\" $var\n\n    \"[string]\"         ;[string]\n                       ;  input string\n    \"[word1]\"          ;[word1]\n                       ;  word to replace or delete\n    \"[word2]\"          ;[word2]\n                       ;  replace with (if empty delete)\n    \"[E][options]\"     ;[options]\n                       ;  +number  : word number from start\n                       ;  -number  : word number from end\n                       ;  +number* : word number from start multiple-replace\n                       ;  -number* : word number from end multiple-replace\n                       ;  +        : replace all results\n                       ;  +*       : multiple-replace all results\n                       ;  {        : if exists replace all delimiters\n                       ;               from left edge\n                       ;  }        : if exists replace all delimiters\n                       ;               from right edge\n                       ;  {}       : if exists replace all delimiters\n                       ;               from edges\n                       ;  {*       : if exists multiple-replace all\n                       ;               delimiters from left edge\n                       ;  }*       : if exists multiple-replace all\n                       ;               delimiters from right edge\n                       ;  {}*      : if exists multiple-replace all\n                       ;               delimiters from edges\n                       ;\n                       ;[E]\n                       ;  with errorlevel output\n                       ;  IfErrors:\n                       ;     $var=1  word to replace not found\n                       ;     $var=2  no such word number\n                       ;     $var=3  syntax error (Use: +1,-1,+1*,-1*,+,+*,{},{}*)\n                       ;[]\n                       ;  no errorlevel output (default)\n                       ;  If some errors found then (result=input string)\n                       ;\n    $var               ;output (result)\n\n## Examples\n\n### replace\n\n    Section\n        ${WordReplaceS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \"SYS\" \"bmp\" \"+2\" $R0\n        ; $R0=\"C:\\io.sys C:\\logo.bmp C:\\WINDOWS\"\n    SectionEnd\n\n### delete\n\n    Section\n        ${WordReplaceS} \"C:\\io.sys C:\\logo.sys C:\\WINDOWS\" \"SYS\" \"\" \"+\" $R0\n        ; $R0=\"C:\\io. C:\\logo. C:\\WINDOWS\"\n    SectionEnd\n\n### multiple-replace 1\n\n    Section\n        ${WordReplaceS} \"C:\\io.sys      C:\\logo.sys   C:\\WINDOWS\" \" \" \" \" \"+1*\" $R0\n        ; +1* or +2* or +3* or +4* or +5* or +6*\n        ; $R0=\"C:\\io.sys C:\\logo.sys   C:\\WINDOWS\"\n    SectionEnd\n\n### multiple-replace 2\n\n    Section\n        ${WordReplaceS} \"C:\\io.sys C:\\logo.sysSYSsys C:\\WINDOWS\" \"sys\" \"bmp\" \"+*\" $R0\n        ; $R0=\"C:\\io.bmp C:\\logo.bmp C:\\WINDOWS\"\n    SectionEnd\n\n### multiple-replace 3\n\n    Section\n        ${WordReplaceS} \"sysSYSsysC:\\io.sys C:\\logo.sys C:\\WINDOWSsysSYSsys\" \"sys\" \"|\" \"{}*\" $R0\n        ; $R0=\"|C:\\io.sys C:\\logo.sys C:\\WINDOWS|\"\n    SectionEnd\n\n### With errorlevel output\n\n    Section\n        ${WordReplaceS} \"C:\\io.sys C:\\logo.sys\" \"sys\" \"bmp\" \"E+3\" $R0\n        ; $R0=\"2\" (no such word number \"+3\")\n\n        IfErrors 0 noerrors\n        MessageBox MB_OK 'Errorlevel=$R0' IDOK end\n\n        noerrors:\n        MessageBox MB_OK 'No errors'\n\n        end:\n    SectionEnd\n\n## Credits\n\nWritten by [Instructor][1]\n\n[1]: http://nsis.sourceforge.net/User:Instructor\n";

var DisableX64FSRedirection = "# ${DisableX64FSRedirection}\n\nDisables file system redirection.\n\n## Syntax\n\n    ${DisableX64FSRedirection}\n\n## Example\n\n    SetOutPath $SYSDIR\n    ${DisableX64FSRedirection}\n    File some.dll # extracts to C:\\Windows\\System32\n\n## Credits\n\n*unknown*\n";

var EnableX64FSRedirection = "# ${EnableX64FSRedirection}\n\nEnables file system redirection.\n\n## Syntax\n\n    ${EnableX64FSRedirection}\n\n## Example\n\n    SetOutPath $SYSDIR\n    ${EnableX64FSRedirection}\n    File some.dll # extracts to C:\\Windows\\SysWOW64\n\n## Credits\n\n*unknown*\n";

var IsWow64 = "# ${IsWow64}\n\nChecks if the installer is a 32-bit application running on a 64-bit OS. Requires [LogicLib][1].\n\n## Syntax\n\n    logic_lib_statement ${IsWow64}\n\n## Example\n\n    ${If} ${IsWow64}\n        MessageBox MB_OK \"running on x64\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n\n[1]: https://github.com/NSIS-Handbook/Documentation/tree/master/Includes/LogicLib\n";

var RunningX64 = "# ${RunningX64}\n\nChecks if the installer is running on x64. Requires [LogicLib][1].\n\n## Syntax\n\n    logic_lib_statement ${RunningX64}\n\n## Example\n\n    ${If} ${RunningX64}\n        MessageBox MB_OK \"running on x64\"\n    ${EndIf}\n\n## Credits\n\n*unknown*\n\n[1]: https://github.com/NSIS-Handbook/Documentation/tree/master/Includes/LogicLib\n";

// Includes/FileFunc
var FileFunc = {
    BannerTrimPath: {
        name: '${BannerTrimPath}',
        content: BannerTrimPath
    },
    DirState: {
        name: '${DirState}',
        content: DirState
    },
    DriveSpace: {
        name: '${DriveSpace}',
        content: DriveSpace
    },
    GetBaseName: {
        name: '${GetBaseName}',
        content: GetBaseName
    },
    GetDrives: {
        name: '${GetDrives}',
        content: GetDrives
    },
    GetExeName: {
        name: '${GetExeName}',
        content: GetExeName
    },
    GetExePath: {
        name: '${GetExePath}',
        content: GetExePath
    },
    GetFileAttributes: {
        name: '${GetFileAttributes}',
        content: GetFileAttributes
    },
    GetFileExt: {
        name: '${GetFileExt}',
        content: GetFileExt
    },
    GetFileName: {
        name: '${GetFileName}',
        content: GetFileName
    },
    GetFileVersion: {
        name: '${GetFileVersion}',
        content: GetFileVersion
    },
    GetOptions: {
        name: '${GetOptions}',
        content: GetOptions
    },
    GetOptionsS: {
        name: '${GetOptionsS}',
        content: GetOptionsS
    },
    GetParameters: {
        name: '${GetParameters}',
        content: GetParameters
    },
    GetParent: {
        name: '${GetParent}',
        content: GetParent
    },
    GetRoot: {
        name: '${GetRoot}',
        content: GetRoot
    },
    GetSize: {
        name: '${GetSize}',
        content: GetSize
    },
    GetTime: {
        name: '${GetTime}',
        content: GetTime
    },
    Locate: {
        name: '${Locate}',
        content: Locate
    },
    RefreshShellIcons: {
        name: '${RefreshShellIcons}',
        content: RefreshShellIcons
    }
};
var LogicLib = {
    AndIf: {
        name: '${AndIf}',
        content: AndIf
    },
    AndIfNot: {
        name: '${AndIfNot}',
        content: AndIfNot
    },
    AndUnless: {
        name: '${AndUnless}',
        content: AndUnless
    },
    Break: {
        name: '${Break}',
        content: Break
    },
    Case: {
        name: '${Case}',
        content: Case
    },
    CaseElse: {
        name: '${CaseElse}',
        content: CaseElse
    },
    Continue: {
        name: '${Continue}',
        content: Continue
    },
    Default: {
        name: '${Default}',
        content: Default
    },
    Do: {
        name: '${Do}',
        content: Do
    },
    DoUntil: {
        name: '${DoUntil}',
        content: DoUntil
    },
    DoWhile: {
        name: '${DoWhile}',
        content: DoWhile
    },
    Else: {
        name: '${Else}',
        content: Else
    },
    ElseIf: {
        name: '${ElseIf}',
        content: ElseIf
    },
    ElseIfNot: {
        name: '${ElseIfNot}',
        content: ElseIfNot
    },
    ElseUnless: {
        name: '${ElseUnless}',
        content: ElseUnless
    },
    EndIf: {
        name: '${EndIf}',
        content: EndIf
    },
    EndSelect: {
        name: '${EndSelect}',
        content: EndSelect
    },
    EndSwitch: {
        name: '${EndSwitch}',
        content: EndSwitch
    },
    ExitDo: {
        name: '${ExitDo}',
        content: ExitDo
    },
    ExitFor: {
        name: '${ExitFor}',
        content: ExitFor
    },
    ExitWhile: {
        name: '${ExitWhile}',
        content: ExitWhile
    },
    For: {
        name: '${For}',
        content: For
    },
    ForEach: {
        name: '${ForEach}',
        content: ForEach
    },
    If: {
        name: '${If}',
        content: If
    },
    IfCmd: {
        name: '${IfCmd}',
        content: IfCmd
    },
    IfNot: {
        name: '${IfNot}',
        content: IfNot
    },
    IfNotThen: {
        name: '${IfNotThen}',
        content: IfNotThen
    },
    IfThen: {
        name: '${IfThen}',
        content: IfThen
    },
    Loop: {
        name: '${Loop}',
        content: Loop
    },
    LoopUntil: {
        name: '${LoopUntil}',
        content: LoopUntil
    },
    LoopWhile: {
        name: '${LoopWhile}',
        content: LoopWhile
    },
    OrIf: {
        name: '${OrIf}',
        content: OrIf
    },
    OrIfNot: {
        name: '${OrIfNot}',
        content: OrIfNot
    },
    OrUnless: {
        name: '${OrUnless}',
        content: OrUnless
    },
    Select: {
        name: '${Select}',
        content: Select
    },
    Switch: {
        name: '${Switch}',
        content: Switch
    },
    Unless: {
        name: '${Unless}',
        content: Unless
    },
    While: {
        name: '${While}',
        content: While
    }
};
var Memento = {
    MementoSection: {
        name: '${MementoSection}',
        content: MementoSection
    },
    MementoSectionDone: {
        name: '${MementoSectionDone}',
        content: MementoSectionDone
    },
    MementoSectionEnd: {
        name: '${MementoSectionEnd}',
        content: MementoSectionEnd
    },
    MementoSectionRestore: {
        name: '${MementoSectionRestore}',
        content: MementoSectionRestore
    },
    MementoSectionSave: {
        name: '${MementoSectionSave}',
        content: MementoSectionSave
    },
    MementoUnselectedSection: {
        name: '${MementoUnselectedSection}',
        content: MementoUnselectedSection
    }
};
var StrFunc = {
    StrCase: {
        name: '${StrCase}',
        content: StrCase
    },
    StrClb: {
        name: '${StrClb}',
        content: StrClb
    },
    StrIOToNSIS: {
        name: '${StrIOToNSIS}',
        content: StrIOToNSIS
    },
    StrLoc: {
        name: '${StrLoc}',
        content: StrLoc
    },
    StrNSISToIO: {
        name: '${StrNSISToIO}',
        content: StrNSISToIO
    },
    StrRep: {
        name: '${StrRep}',
        content: StrRep
    },
    StrSort: {
        name: '${StrSort}',
        content: StrSort
    },
    StrStr: {
        name: '${StrStr}',
        content: StrStr
    },
    StrStrAdv: {
        name: '${StrStrAdv}',
        content: StrStrAdv
    },
    StrTok: {
        name: '${StrTok}',
        content: StrTok
    },
    StrTrimNewLines: {
        name: '${StrTrimNewLines}',
        content: StrTrimNewLines
    }
};
var TextFunc = {
    ConfigRead: {
        name: '${ConfigRead}',
        content: ConfigRead
    },
    ConfigReadS: {
        name: '${ConfigReadS}',
        content: ConfigReadS
    },
    ConfigWrite: {
        name: '${ConfigWrite}',
        content: ConfigWrite
    },
    ConfigWriteS: {
        name: '${ConfigWriteS}',
        content: ConfigWriteS
    },
    FileJoin: {
        name: '${FileJoin}',
        content: FileJoin
    },
    FileReadFromEnd: {
        name: '${FileReadFromEnd}',
        content: FileReadFromEnd
    },
    FileRecode: {
        name: '${FileRecode}',
        content: FileRecode
    },
    LineFind: {
        name: '${LineFind}',
        content: LineFind
    },
    LineRead: {
        name: '${LineRead}',
        content: LineRead
    },
    LineSum: {
        name: '${LineSum}',
        content: LineSum
    },
    TextCompare: {
        name: '${TextCompare}',
        content: TextCompare
    },
    TextCompareS: {
        name: '${TextCompareS}',
        content: TextCompareS
    },
    TrimNewLines: {
        name: '${TrimNewLines}',
        content: TrimNewLines
    }
};
var WinVer = {
    AtLeastServicePack: {
        name: '${AtLeastServicePack}',
        content: AtLeastServicePack
    },
    AtLeastWin10: {
        name: '${AtLeastWin10}',
        content: AtLeastWin10
    },
    AtLeastWin2000: {
        name: '${AtLeastWin2000}',
        content: AtLeastWin2000
    },
    AtLeastWin2003: {
        name: '${AtLeastWin2003}',
        content: AtLeastWin2003
    },
    AtLeastWin2008: {
        name: '${AtLeastWin2008}',
        content: AtLeastWin2008
    },
    AtLeastWin2008R2: {
        name: '${AtLeastWin2008R2}',
        content: AtLeastWin2008R2
    },
    AtLeastWin7: {
        name: '${AtLeastWin7}',
        content: AtLeastWin7
    },
    AtLeastWin8_1: {
        name: '${AtLeastWin8.1}',
        content: AtLeastWin8_1
    },
    AtLeastWin8: {
        name: '${AtLeastWin8}',
        content: AtLeastWin8
    },
    AtLeastWin95: {
        name: '${AtLeastWin95}',
        content: AtLeastWin95
    },
    AtLeastWin98: {
        name: '${AtLeastWin98}',
        content: AtLeastWin98
    },
    AtLeastWinME: {
        name: '${AtLeastWinME}',
        content: AtLeastWinME
    },
    AtLeastWinNT4: {
        name: '${AtLeastWinNT4}',
        content: AtLeastWinNT4
    },
    AtLeastWinVista: {
        name: '${AtLeastWinVista}',
        content: AtLeastWinVista
    },
    AtLeastWinXP: {
        name: '${AtLeastWinXP}',
        content: AtLeastWinXP
    },
    AtMostServicePack: {
        name: '${AtMostServicePack}',
        content: AtMostServicePack
    },
    AtMostWin10: {
        name: '${AtMostWin10}',
        content: AtMostWin10
    },
    AtMostWin2000: {
        name: '${AtMostWin2000}',
        content: AtMostWin2000
    },
    AtMostWin2003: {
        name: '${AtMostWin2003}',
        content: AtMostWin2003
    },
    AtMostWin2008: {
        name: '${AtMostWin2008}',
        content: AtMostWin2008
    },
    AtMostWin2008R2: {
        name: '${AtMostWin2008R2}',
        content: AtMostWin2008R2
    },
    AtMostWin2012: {
        name: '${AtMostWin2012}',
        content: AtMostWin2012
    },
    AtMostWin2012R2: {
        name: '${AtMostWin2012R2}',
        content: AtMostWin2012R2
    },
    AtMostWin7: {
        name: '${AtMostWin7}',
        content: AtMostWin7
    },
    AtMostWin8_1: {
        name: '${AtMostWin8.1}',
        content: AtMostWin8_1
    },
    AtMostWin8: {
        name: '${AtMostWin8}',
        content: AtMostWin8
    },
    AtMostWin95: {
        name: '${AtMostWin95}',
        content: AtMostWin95
    },
    AtMostWin98: {
        name: '${AtMostWin98}',
        content: AtMostWin98
    },
    AtMostWinME: {
        name: '${AtMostWinME}',
        content: AtMostWinME
    },
    AtMostWinNT4: {
        name: '${AtMostWinNT4}',
        content: AtMostWinNT4
    },
    AtMostWinVista: {
        name: '${AtMostWinVista}',
        content: AtMostWinVista
    },
    AtMostWinXP: {
        name: '${AtMostWinXP}',
        content: AtMostWinXP
    },
    IsDomainController: {
        name: '${IsDomainController}',
        content: IsDomainController
    },
    IsNT: {
        name: '${IsNT}',
        content: IsNT
    },
    IsServerOS: {
        name: '${IsServerOS}',
        content: IsServerOS
    },
    IsServicePack: {
        name: '${IsServicePack}',
        content: IsServicePack
    },
    IsWin10: {
        name: '${IsWin10}',
        content: IsWin10
    },
    IsWin2000: {
        name: '${IsWin2000}',
        content: IsWin2000
    },
    IsWin2003: {
        name: '${IsWin2003}',
        content: IsWin2003
    },
    IsWin2008: {
        name: '${IsWin2008}',
        content: IsWin2008
    },
    IsWin2008R2: {
        name: '${IsWin2008R2}',
        content: IsWin2008R2
    },
    IsWin2012: {
        name: '${IsWin2012}',
        content: IsWin2012
    },
    IsWin2012R2: {
        name: '${IsWin2012R2}',
        content: IsWin2012R2
    },
    IsWin7: {
        name: '${IsWin7}',
        content: IsWin7
    },
    IsWin8_1: {
        name: '${IsWin8.1}',
        content: IsWin8_1
    },
    IsWin8: {
        name: '${IsWin8}',
        content: IsWin8
    },
    IsWin95: {
        name: '${IsWin95}',
        content: IsWin95
    },
    IsWin98: {
        name: '${IsWin98}',
        content: IsWin98
    },
    IsWinME: {
        name: '${IsWinME}',
        content: IsWinME
    },
    IsWinNT4: {
        name: '${IsWinNT4}',
        content: IsWinNT4
    },
    IsWinVista: {
        name: '${IsWinVista}',
        content: IsWinVista
    },
    IsWinXP: {
        name: '${IsWinXP}',
        content: IsWinXP
    }
};
var WordFunc = {
    StrFilter: {
        name: '${StrFilter}',
        content: StrFilter
    },
    StrFilterS: {
        name: '${StrFilterS}',
        content: StrFilterS
    },
    VersionCompare: {
        name: '${VersionCompare}',
        content: VersionCompare
    },
    VersionConvert: {
        name: '${VersionConvert}',
        content: VersionConvert
    },
    WordAdd: {
        name: '${WordAdd}',
        content: WordAdd
    },
    WordAddS: {
        name: '${WordAddS}',
        content: WordAddS
    },
    WordFind: {
        name: '${WordFind}',
        content: WordFind
    },
    WordFind2X: {
        name: '${WordFind2X}',
        content: WordFind2X
    },
    WordFind2XS: {
        name: '${WordFind2XS}',
        content: WordFind2XS
    },
    WordFind3X: {
        name: '${WordFind3X}',
        content: WordFind3X
    },
    WordFind3XS: {
        name: '${WordFind3XS}',
        content: WordFind3XS
    },
    WordFindS: {
        name: '${WordFindS}',
        content: WordFindS
    },
    WordInsert: {
        name: '${WordInsert}',
        content: WordInsert
    },
    WordInsertS: {
        name: '${WordInsertS}',
        content: WordInsertS
    },
    WordReplace: {
        name: '${WordReplace}',
        content: WordReplace
    },
    WordReplaceS: {
        name: '${WordReplaceS}',
        content: WordReplaceS
    }
};
var x64 = {
    DisableX64FSRedirection: {
        name: '${DisableX64FSRedirection}',
        content: DisableX64FSRedirection
    },
    EnableX64FSRedirection: {
        name: '${EnableX64FSRedirection}',
        content: EnableX64FSRedirection
    },
    IsWow64: {
        name: '${IsWow64}',
        content: IsWow64
    },
    RunningX64: {
        name: '${RunningX64}',
        content: RunningX64
    }
};

var includes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FileFunc: FileFunc,
    LogicLib: LogicLib,
    Memento: Memento,
    StrFunc: StrFunc,
    TextFunc: TextFunc,
    WinVer: WinVer,
    WordFunc: WordFunc,
    x64: x64
});

var onGUIEnd = "# .onGUIEnd\n\nThis callback is called right after the installer window closes. Use it to free any user interface related plug-ins if needed.\n";

var onGUIInit = "# .onGUIInit\n\nThis callback will be called just before the first page is loaded and the installer dialog is shown, allowing you to tweak the user interface.\n\n## Example\n\n    !include \"WinMessages.nsh\"\n\n    Function .onGUIInit\n        # 1028 is the id of the branding text control\n        GetDlgItem $R0 $HWNDPARENT 1028\n        CreateFont $R1 \"Tahoma\" 10 700\n        SendMessage $R0 ${WM_SETFONT} $R1 0\n        # set background color to white and text color to red\n        SetCtlColors $R0 FFFFFF FF0000\n    FunctionEnd\n";

var onInit = "# .onInit\n\nThis callback will be called when the installer is nearly finished initializing. If the `.onInit` function calls [`Abort`][1], the installer will quit instantly.\n\n## Example\n\n    Function .onInit\n        MessageBox MB_YESNO \"This will install. Continue?\" IDYES NoAbort\n        Abort ; causes installer to quit.\n        NoAbort:\n    FunctionEnd\n\nor:\n\n    Function .onInit\n        ReadINIStr $INSTDIR $WINDIR\\wincmd.ini Configuration InstallDir\n        StrCmp $INSTDIR \"\" 0 NoAbort\n        MessageBox MB_OK \"Windows Commander not found. Unable to get install path.\"\n        Abort ; causes installer to quit.\n        NoAbort:\n    FunctionEnd\n\n[1]: ../Reference/Abort.md\n";

var onInstFailed = "# .onInstFailed\n\nThis callback is called when the user hits the 'cancel' button after the install has failed (if it could not extract a file, or the install script used the Abort command).\n\n## Example\n\n    Function .onInstFailed\n        MessageBox MB_OK \"Better luck next time.\"\n    FunctionEnd\n";

var onInstSuccess = "# .onInstSuccess\n\nThis callback is called when the install was successful, right before the install window closes (which may be after the user clicks 'Close' if [`AutoCloseWindow`][1] or [`SetAutoClose`][2] is set to false).\n\n## Example\n\n    Function .onInstSuccess\n        MessageBox MB_YESNO \"Congrats, it worked. View readme?\" IDNO NoReadme\n        Exec notepad.exe ; view readme or whatever, if you want.\n        NoReadme:\n    FunctionEnd\n\n[1]: ../Reference/AutoCloseWindow.md\n[2]: ../Reference/SetAutoClose.md\n";

var onMouseOverSection = "# .onMouseOverSection\n\nThis callback is called whenever the mouse position over the sections tree has changed. This allows you to set a description for each section for example. The section id on which the mouse is over currently is stored, temporarily, in $0.\n\n## Example\n\n    Function .onMouseOverSection\n        FindWindow $R0 \"#32770\" \"\" $HWNDPARENT\n        GetDlgItem $R0 $R0 1043 ; description item (must be added to the UI)\n\n        StrCmp $0 0 \"\" +2\n        SendMessage $R0 ${WM_SETTEXT} 0 \"STR:first section description\"\n\n        StrCmp $0 1 \"\" +2\n        SendMessage $R0 ${WM_SETTEXT} 0 \"STR:second section description\"\n    FunctionEnd\n";

var onRebootFailed = "# .onRebootFailed\n\nThis callback is called if [`Reboot`][1] fails. [`WriteUninstaller`][2], plug-ins, [`File`][3] and [`WriteRegBin`][4] should not be used in this callback.\n\n## Example\n\n    Function .onRebootFailed\n        MessageBox MB_OK|MB_ICONSTOP \"Reboot failed. Please reboot manually.\" /SD IDOK\n    FunctionEnd\n\n[1]: ../Reference/Reboot.md\n[2]: ../Reference/WriteUninstaller.md\n[3]: ../Reference/File.md\n[4]: ../Reference/WriteRegBin.md\n";

var onSelChange = "# .onSelChange\n\nCalled when the selection changes on the component page. Useful for using with [`SectionSetFlags`][1] and [`SectionGetFlags`][2].\n\nSelection changes include both section selection and installation type change.\n\n[1]: ../Reference/SectionSetFlags.md\n[2]: ../Reference/SectionGetFlags.md\n";

var onUserAbort = "# .onUserAbort\n\nThis callback is called when the user hits the 'cancel' button, and the install hasn't already failed. If this function calls [`Abort`][1], the install will not be aborted.\n\nExample:\n\n    Function .onUserAbort\n        MessageBox MB_YESNO \"Abort install?\" IDYES NoCancelAbort\n        Abort ; causes installer to not quit.\n        NoCancelAbort:\n    FunctionEnd\n\n[1]: ../Reference/Abort.md\n";

var onVerifyInstDir = "# .onVerifyInstDir\n\nThis callback enables control over whether or not an installation path is valid for your installer. This code will be called every time the user changes the install directory, so it shouldn't do anything crazy with [`MessageBox`][1] or the likes. If this function calls [`Abort`][2], the installation path in [`$INSTDIR`][3] is deemed invalid.\n\nExample:\n\n    Function .onVerifyInstDir\n        IfFileExists $INSTDIR\\Winamp.exe PathGood\n        Abort ; if $INSTDIR is not a winamp directory, don't let us install there\n        PathGood:\n    FunctionEnd\n\n[1]: ../Reference/MessageBox.md\n[2]: ../Reference/Abort.md\n[3]: ../Variables/INSTDIR.md\n";

var unOnGUIEnd = "# un.onGUIEnd\n\nThis callback is called right after the uninstaller window closes. Use it to free any user interface related plug-ins if needed.\n";

var unOnGUIInit = "# un.onGUIInit\n\nThis callback will be called just before the first page is loaded and the installer dialog is shown, allowing you to tweak the user interface.\n\n## Example\n\n    !include \"WinMessages.nsh\"\n\n    Function un.onGUIInit\n        # 1028 is the id of the branding text control\n        GetDlgItem $R0 $HWNDPARENT 1028\n        CreateFont $R1 \"Tahoma\" 10 700\n        SendMessage $R0 ${WM_SETFONT} $R1 0\n        # set background color to white and text color to red\n        SetCtlColors $R0 FFFFFF FF0000\n    FunctionEnd\n";

var unOnInit = "# un.onInit\n\nThis callback will be called when the uninstaller is nearly finished initializing. If the `un.onInit` function calls [`Abort`][2], the uninstaller will quit instantly. Note that this function can verify and/or modify [`$INSTDIR`][3] if necessary.\n\n## Example\n\n    Function un.onInit\n        MessageBox MB_YESNO \"This will uninstall. Continue?\" IDYES NoAbort\n        Abort ; causes uninstaller to quit.\n        NoAbort:\n    FunctionEnd\n\nor:\n\n    Function un.onInit\n        IfFileExists $INSTDIR\\myfile.exe found\n        Messagebox MB_OK \"Uninstall path incorrect\"\n        Abort\n        found:\n    FunctionEnd\n\n[1]: ../Reference/Abort.md\n[2]: ../Variables/INSTDIR.md\n";

var unOnRebootFailed = "# un.onRebootFailed\n\nThis callback is called if [`Reboot`][1] fails. [`WriteUninstaller`][2], plug-ins, [`File`][3] and [`WriteRegBin`][4] should not be used in this callback.\n\n## Example\n\n    Function un.onRebootFailed\n        MessageBox MB_OK|MB_ICONSTOP \"Reboot failed. Please reboot manually.\" /SD IDOK\n    FunctionEnd\n\n[1]: ../Reference/Reboot.md\n[2]: ../Reference/WriteUninstaller.md\n[3]: ../Reference/File.md\n[4]: ../Reference/WriteRegBin.md\n";

var unOnSelChange = "# un.onSelChange\n\nCalled when the selection changes on the component page. Useful for using with [`SectionSetFlags`][1] and [`SectionGetFlags`][2].\n\nSelection changes include both section selection and installation type change.\n\n[1]: ../Reference/SectionSetFlags.md\n[2]: ../Reference/SectionGetFlags.md\n";

var unOnUninstFailed = "# un.onUninstFailed\n\nThis callback is called when the user hits the 'cancel' button after the uninstall has failed (if it used the [`Abort`][1] command or otherwise failed).\n\n## Example\n\n    Function un.onUninstFailed\n        MessageBox MB_OK \"Better luck next time.\"\n    FunctionEnd\n\n[1]: ../Reference/Abort.md\n";

var unOnUninstSuccess = "# un.onUninstSuccess\n\nThis callback is called when the uninstall was successful, right before the install window closes (which may be after the user clicks 'Close' if [`SetAutoClose`][1] is set to false)..\n\n## Example\n\n    Function un.onUninstSuccess\n        MessageBox MB_OK \"Congrats, it's gone.\"\n    FunctionEnd\n\n[1]: ../Reference/SetAutoClose.md\n";

var unOnUserAbort = "# un.onUserAbort\n\nThis callback is called when the user hits the 'cancel' button and the uninstall hasn't already failed. If this function calls [`Abort`][1], the install will not be aborted.\n\n## Example\n\n    Function un.onUserAbort\n        MessageBox MB_YESNO \"Abort uninstall?\" IDYES NoCancelAbort\n        Abort ; causes uninstaller to not quit.\n        NoCancelAbort:\n    FunctionEnd\n\n[1]: ../Reference/Abort.md\n";

var callbacks = {
    onGUIEnd: {
        name: '.onGUIEnd',
        content: onGUIEnd
    },
    onGUIInit: {
        name: '.onGUIInit',
        content: onGUIInit
    },
    onInit: {
        name: '.onInit',
        content: onInit
    },
    onInstFailed: {
        name: '.onInstFailed',
        content: onInstFailed
    },
    onInstSuccess: {
        name: '.onInstSuccess',
        content: onInstSuccess
    },
    onMouseOverSection: {
        name: '.onMouseOverSection',
        content: onMouseOverSection
    },
    onRebootFailed: {
        name: '.onRebootFailed',
        content: onRebootFailed
    },
    onSelChange: {
        name: '.onSelChange',
        content: onSelChange
    },
    onUserAbort: {
        name: '.onUserAbort',
        content: onUserAbort
    },
    onVerifyInstDir: {
        name: '.onVerifyInstDir',
        content: onVerifyInstDir
    },
    unOnGUIEnd: {
        name: 'un.onGUIEnd',
        content: unOnGUIEnd
    },
    unOnGUIInit: {
        name: 'un.onGUIInit',
        content: unOnGUIInit
    },
    unOnInit: {
        name: 'un.onInit',
        content: unOnInit
    },
    unOnRebootFailed: {
        name: 'un.onRebootFailed',
        content: unOnRebootFailed
    },
    unOnSelChange: {
        name: 'un.onSelChange',
        content: unOnSelChange
    },
    unOnUninstFailed: {
        name: 'un.onUninstFailed',
        content: unOnUninstFailed
    },
    unOnUninstSuccess: {
        name: 'un.onUninstSuccess',
        content: unOnUninstSuccess
    },
    unOnUserAbort: {
        name: 'un.onUserAbort',
        content: unOnUserAbort
    }
};

var _addincludedir = "# !addincludedir\n\nAdds another include directory to the include directories list. This list is searched when [`!include`](!include.md) is used. This list's initial value is `${NSISDIR}\\Include` alone.\n\n## Parameters\n\n    directory\n\n## Example\n\n    !addincludedir ..\\include\n    !include something.nsh\n\n## History\n\nAdded in NSIS v2.0 Beta 1\n";

var _addplugindir = "# !addplugindir\n\nCauses the NSIS compiler to scan the given directory for plug-in DLLs.\n\n## Parameters\n\n    directory\n\n## Example\n\n    !addplugindir myplugin\n    MyPlugin::SomeFunction\n\n## History\n\nAdded in NSIS v2.0 Beta 1\n";

var _appendfile = "# !appendfile\n\nAppends text to file. The text is written as ANSI (ACP) unless the file already has a BOM. Using `/CHARSET` will force a specific character encoding. `$\\n` will be translated to `$\\r$\\n` on Windows unless you specify `/RawNL`.\n\n## Parameters\n\n    [/CHARSET=ACP|OEM|CP#|UTF8[SIG]|UTF16<LE|BE>[BOM]] [/RawNL] file text file text\n\n## Example\n\n    !tempfile FILE\n    !appendfile \"${FILE}\" \"XPStyle on$\\n\"\n    !appendfile \"${FILE}\" \"Name 'test'$\\n\"\n    !include \"${FILE}\"\n    !delfile \"${FILE}\"\n    !undef FILE\n\n## History\n\nAdded in NSIS v2.11\n";

var _cd = "# !cd\n\nThis command will change the compiler to the new directory, `new_path`. `new_path` can be relative or absolute.\n\n## Parameters\n\n    new_path\n\n## Example\n\n    !cd ..\\more-scripts\\new\n\n## History\n\nAdded in NSIS v1.4\n";

var _define = "# !define\n\nThis command will add gflag to the global define list. This will have a similar effect as using the `/D` switch on the command line (the define only becomes effective after the `!define` command).\nIf `/date` or `/utcdate` are used, value will be passed into strftime and the result will be used as the value of gflag. strftime converts special symbols into certain parts of the current time or date. For example, %H will be converted into the current hour in 24-hour format. For a complete list of available symbols, search for strftime on [MSDN][1]. On POSIX, you can get the list by using man strftime.\nIf `/math` is used, the result of 'val1 OP val2', where OP may be +,-,*,&,|,^,/ or % , will be used as the value of gflag. Note that val1 AND val2 MUST be integer values!\nIf `/file` is used, the entire text file specified (including whitespace and newlines) will be read and stuffed into gflag.\n\n## Parameters\n\n    [/ifndef | /redef] ([/date|/utcdate] gflag [value]) | (/math gflag val1 OP val2) | (/file gflag filename.txt)\n\n## Example\n\n    !define USE_SOMETHING\n    !define VERSION 1.2\n    !define /date NOW \"%H:%M:%S %d %b, %Y\"\n    !define /math RESULT 3 + 10\n    !define /math REST 15 % ${RESULT}\n    !define /file BUNCHASTUFF somesourcefile.cpp\n    !define /redef USE_SOMETHING ${RESULT} ;redefine USE_SOMETHING\n\n## History\n\nAdded in NSIS v1.1f\n\n[1]: http://msdn.microsoft.com/\n";

var _delfile = "# !delfile\n\nThis command deletes a file on compile time.\n\n## Parameters\n\n    file\n\n## Example\n\n    !tempfile FILE\n    !delfile \"${FILE}\"\n    !undef FILE\n\n## History\n\nAdded in NSIS v2.11\n";

var _echo = "# !echo\n\nThis command will echo a message to the user compiling the script.\n\n## Parameters\n\n    message\n\n## Example\n\n    !echo \"hello world\"\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n";

var _else = "# !else\n\nThis command allows to easily insert different code when different defines or macros are set. You can create blocks like [`!ifdef`][1]/`!else`/[`!endif`][2], [`!ifdef`][1]/`!else` [`!ifdef`][1]/`!else`/[`!endif`][2] etc.\n\n## Parameters\n\n    [if|ifdef|ifndef|ifmacrodef|ifmacrondef [...]]\n\n## Example\n\n    !ifdef VERSION\n        OutFile installer-${VERSION}.exe\n    !else\n        sOutFile installer.exe\n    !endif\n\n## History\n\nAdded in NSIS v1.1f\n\n[1]: !ifdef.md\n[2]: !endif.md\n";

var _endif = "# !endif\n\nThis command closes a block started with [`!if`][1], [`!ifdef`][2], [`!ifndef`][3], [`!ifmacrodef`][4] or [`!ifmacrondef`][5].\n\n## Example\n\n    !ifdef VERSION\n        OutFile installer-${VERSION}.exe\n    !else\n        sOutFile installer.exe\n    !endif\n\n    !ifmacrodef MACRO\n        DetailPrint \"Macro defined\" \n    !else\n        DetailPrint \"Macro not defined\" \n    !endif\n\n## History\n\nAdded in NSIS v1.1f\n\n[1]: !if.md\n[2]: !ifdef.md\n[3]: !ifndef.md\n[4]: !ifmacrodef.md\n[5]: !ifmacrondef.md\n";

var _error = "# !error\n\nThis command will issue an error to the script compiler and will stop execution of the script. You can also add a message to this error.\n\n## Parameters\n\n    message\n\n## Example\n\n    !ifdef VERSION & NOVERSION\n        !error \"both VERSION and NOVERSION are defined\"\n    !endif\n\n## History\n\nAdded in NSIS v1.1u\n";

var _execute = "# !execute\n\nThis command will execute 'command' using a call to _CreateProcess()_. Unlike [`!system`][1], it does not use the command line processor, so input/output redirection and commands like 'cd', 'dir' and 'type' can not be used. `!execute` also ignores the return value of the executed command. Currently, the only known advantage of `!execute` over [`!system`][1] is that it does not give trouble when the current working directory is specified using UNC.\nOn POSIX platforms, `!execute` will use _system()_ just like [`!system`][1].\n\n## Parameters\n\n    command\n\n## Example\n\n    !execute '\"%WINDIR%\\notepad.exe\" \"${NSISDIR}\\license.txt\"'\n\n## History\n\nAdded in NSIS v2.01\n\n[1]: !system.md\n";

var _finalize = "# !finalize\n\nThis option will execute 'command' using a call to _system()_ after the output EXE has been generated. You can typically use it to sign (Authenticode) your installer. If 'command' contains a '%1' it will be replaced by the executable filename.\nOn POSIX platforms, `!execute` will use _system()_ just like [`!system`][1].\n\n## Parameters\n\n    command\n\n## Example\n\n    !finalize 'sign.bat \"%1\" \"Product Installer\" http://example.com'\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: !system.md\n";

var _getdllversion = "# !getdllversion\n\nThis is similar to [`GetDLLVersionLocal`][1], only it stores the version number in defines and can therefore be used anywhere, not just inside functions and sections.\n\n## Parameters\n\n    localfilename define_basename\n\n## Example\n\n    !getdllversion \"$%windir%\\explorer.exe\" expv_\n    !echo \"Explorer.exe version is ${expv_1}.${expv_2}.${expv_3}.${expv_4}\"\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: GetDLLVersionLocal.md\n";

var _gettlbversion = "# !gettlbversion\n\nGet the version information from a .TLB file.\n\n## Parameters\n\n    [/noerrors] [/packed] localfilename define_basename\n\n## Example\n\n    !gettlbversion /packed \"$%WINDIR%\\System32\\stdole32.tlb\" TLBVER_\n    !echo \"${TLBVER_HIGH}.${TLBVER_LOW}\"\n\n## History\n\nAdded in NSIS v3.03\n";

var _if = "# !if\n\nThis command, when paired with an [`!endif`][1] command, will tell the compiler whether or not to compile the lines in between the two lines. If value is non-zero, or the comparison of value and value2 depending on the operator results in true, the contained lines will be compiled. Otherwise, they will be skipped. op can be either `==` or `!=` (string comparison), `<=`, `< >` or `>=` (float comparison), `&` (bitwise AND comparison), `&&` or `||` (boolean comparison). If [!] is set, return value will be switched from true to false and vice versa.\n\n## Parameters\n\n    [!] value [op value2]\n\n## Example\n\n    !if 1 < 2\n      !echo \"1 is smaller than 2!!\"\n    !else if ! 3.1 > 1.99\n      !error \"this line should never appear\"\n    !else\n      !error \"neither should this\"\n    !endif\n\n## History\n\nAdded in NSIS v2.15\n\n[1]: !endif.md\n";

var _ifdef = "# !ifdef\n\nThis command, when paired with an [`!endif`][1] command, will tell the compiler whether or not to compile the lines in between the two lines. If gflag is globally defined (using [`!define`][2] or the `/D` switch), then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as `&` (boolean and) or `|` (boolean or) along with more gflags -- precedence is simple, left to right.\n\n## Parameters\n\n    gflag [bcheck gflag [...]]]\n\n## Example\n\n    !define SOMETHING\n    !ifdef SOMETHING\n        !echo \"SOMETHING is defined\"\n    !endif\n\n    !undef SOMETHING\n    !ifdef SOMETHING\n        !echo \"SOMETHING is defined\" # will never be printed\n    !endif\n\n## History\n\nAdded in NSIS v1.1f\n\n[1]: !endif.md\n[2]: !define.md\n";

var _ifmacrodef = "# !ifmacrodef\n\nThis command, when paired with an [`!endif`][1] command, will tell the compiler whether or not to compile the lines in between the two lines. If the macro gflag exists, then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as `&` (boolean and) or `|` (boolean or) along with more gflags -- precedence is simple, left to right.\n\n## Parameters\n\n    gflag [bcheck gflag [...]]]\n\n## Example\n\n    !macro SomeMacro\n    !macroend\n    !ifmacrodef SomeMacro\n      !echo \"SomeMacro is defined\"\n    !endif\n\n## History\n\nAdded in NSIS v2.0\n\n[1]: !endif.md\n";

var _ifmacrondef = "# !ifmacrondef\n\nThe opposite of [`!ifmacrodef`][1]. The lines will be compiled when the macro gflag does not exist. This command, when paired with an [`!endif`][2] command, will tell the compiler whether or not to compile the lines in between the two lines. If the macro gflag exists, then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as `&` (boolean and) or `|` (boolean or) along with more gflags -- precedence is simple, left to right.\n\n## Parameters\n\n    gflag [bcheck gflag [...]]]\n\n## Example\n\n    !ifmacrondef SomeMacro\n        !echo \"SomeMacro is not defined\"\n    !endif\n\n## History\n\nAdded in NSIS v2.0\n\n[1]: !ifmacrodef.md\n[2]: !endif.md\n";

var _ifndef = "# !ifndef\n\nThe opposite of [`!ifdef`][1]. This command, when paired with an [`!endif`][2] command, will tell the compiler whether or not to compile the lines in between the two lines. If gflag is globally defined (using [`!define`][3] or the `/D` switch), then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as `&` (boolean and) or `|` (boolean or) along with more gflags -- precedence is simple, left to right.\n\n## Parameters\n\n    gflag [bcheck gflag [...]]]\n\n## Example\n\n    !define SOMETHING\n    !ifdef SOMETHING\n        !echo \"SOMETHING is defined\"\n    !endif\n\n    !undef SOMETHING\n    !ifndef SOMETHING\n        !echo \"SOMETHING is not defined\"\n    !endif\n\n## History\n\nAdded in NSIS v1.1f\n\n[1]: !ifdef.md\n[2]: !endif.md\n[3]: !define.md\n";

var _include = "# !include\n\nThis command will include 'file' as if it was part of the original script. Note that if a file is included in another directory, the current directory is still where the script was compiled from (not where the included file resides). If the compiler can't find the file it will look for it in every include directory. See [`!addincludedir`][1] for more information. If the `/NONFATAL` switch is used and no files are found, a warning will be issued instead of an error.\n\n## Parameters\n\n    [/NONFATAL] file\n\n## Example\n\n    !include WinMessages.nsh\n    !include Library.nsh\n    !include C:\\MyConfig.nsi\n    !include ..\\MyConfig.nsh\n    !include /NONFATAL file_that_may_exist_or_not.nsh\n\n## History\n\nAdded in NSIS v1.1d\n\n[1]: !addincludedir.md\n";

var _insertmacro = "# !insertmacro\n\nInserts the contents of a macro that was created with [`!macro`][1]. If the macro was created with parameters, then you must pass as many parameters to the macro as it requires.\n\n## Parameters\n\n    macro_name [parameter] [...]\n\n## Example\n\n    !macro Print text\n        DetailPrint \"${text}\"\n    !macroend\n    !insertmacro Print \"some text\"\n    !insertmacro Print \"some more text\"\n\n## History\n\nAdded in NSIS v1.8b3\n\n[1]: !macro.md\n";

var _macro = "# !macro\n\nCreates a macro named 'macro_name'. All lines between the `!macro` and the [`!macroend`][1] will be saved. To insert the macro later on, use [`!insertmacro`][2]. `!macro` definitions can have one or more parameters defined. The parameters may be accessed the same way a [`!define`][3] would (e.g. `${PARAMNAME}`) from inside the macro.\n\n## Parameters\n\n    `macro_name [parameter] [...]`\n\n## Example\n\n    !macro SomeMacro parm1 parm2 parm3\n        DetailPrint \"${parm1}\"\n        MessageBox MB_OK \"${parm2}\"\n        File \"${parm3}\"\n    !macroend\n\n## History\n\nAdded in NSIS v1.8b3\n\n[1]: !macroend.md\n[2]: !insertmacro.md\n[3]: !define.md\n";

var _macroend = "# !macroend\n\nEnds a macro that was started with [`!macro`][1].\n\n## Example\n\n    !macro SomeMacro parm1 parm2 parm3\n        DetailPrint \"${parm1}\"\n        MessageBox MB_OK \"${parm2}\"\n        File \"${parm3}\"\n    !macroend\n\n## History\n\nAdded in NSIS v1.8b3\n\n[1]: !macro.md\n";

var _makensis = "# !makensis\n\nThis command will [`!execute`][1] a new instance of MakeNSIS with the parameters you specify.\n\n## Parameters\n\n    parameters [compare comparevalue | symbol]\n\n## Example\n\n    !makensis '-DGENERATEUNINST \"${__FILE__}\"' = 0\n    !system '\"signtool\" sign ...' = 0\n\n## History\n\nAdded in NSIS v3.0b1\n\n[1]: !execute.md\n";

var _packhdr = "# !packhdr\n\nThis option makes the compiler use an external EXE packer (such as [Petite][1] or [UPX][2]) to compress the executable header. Specify a temporary file name (such as \"temp.dat\") and a command line (such as \"C:\\program files\\upx\\upx -9 temp.dat\") to compress the header.\n\n## Parameters\n\n    tempfile command\n\n## Example\n\n    !packhdr \"$%TEMP%\\exehead.tmp\" '\"C:\\Program Files\\UPX\\upx.exe\" \"$%TEMP%\\exehead.tmp\"'\n\n## History\n\nAdded in NSIS v1.32\n\n[1]: http://www.un4seen.com/petite/\n[2]: http://upx.sourceforge.net/\n";

var _pragma = "# !pragma\n\nThe pragma commands allows you to change compiler features and behavior.\n\n## Parameters\n\n    /REGEDIT5 root_key subkey key_name value\n\n## Example\n\n    !pragma warning disable 9000 ; Disable warning about using \"Setup.exe\" as the name\n    OutFile \"Setup.exe\"\n\n## History\n\nAdded in NSIS v3.02\n\n[1]: http://www.un4seen.com/petite/\n[2]: http://upx.sourceforge.net/\n";

var _searchparse = "# !searchparse\n\nParses source\\_string\\_or\\_file (which is treated as a string, or as a filename if `/file` is set), looking for substring\\_start. If substring\\_start is found, then OUTPUTSYMBOL1 is defined to the rest of the string (minus any other substring that may be found). Any number of OUTPUTSYMBOLx may be specified, and the final substring is optional.\nIf `/noerrors` is specified, matching less than the full number of strings is allowed (all OUTPUTSYMBOLx after the not-found substring will be ignored).\nIf `/file` is specified, the file is treated as a series of lines. The file is searched until all substrings are matched. If `/noerrors` is specified and not all strings are matched, the first line with the most symbols matched is used.\n\n## Parameters\n\n    [/ignorecase] [/noerrors] [/file] source_string_or_file substring_start OUTPUTSYMBOL1 [substring [OUTPUTSYMBOL2 [substring ...]]]\n\n## Example\n\n    # search filename.cpp for a line '#define APP_VERSION \"2.5\"' and set ${VER_MAJOR} to 2, ${VER_MINOR} to 5.\n    !searchparse /file filename.cpp `#define APP_VERSION \"` VER_MAJOR `.` VER_MINOR `\"`\n\n## History\n\nAdded in NSIS v2.39\n";

var _searchreplace = "# !searchreplace\n\nSearches source\\_string, looking for searchfor and replacing all instances of it with replacewith. Unlike [`!define`][1], `!searchreplace` allows you to redefine symbol_out without warning or error.\n\n## Parameters\n\n    [/ignorecase] symbol_out source_string searchfor replacewith\n\n## Example\n\n    # defines ${blah} to \"i like ponies\"\n    !searchreplace blah \"i love ponies\" \"love\" \"like\"\n\n## History\n\nAdded in NSIS v2.42\n\n[1]: !define.md\n";

var _system = "# !system\n\nThis command will execute 'command' using a call to system(), and if the return value compared (using 'compare') to 'comparevalue' is false, execution will halt. 'compare' can be '<' or '>' or '<>' or '='.\n\n## Parameters\n\n    command [compare comparevalue]\n\n## Example\n\n    !system '\"%WINDIR%\\notepad.exe\" \"${NSISDIR}\\license.txt\"'\n    !system 'echo !define something > newinclude.nsh'\n    !include newinclude.nsh\n    !ifdef something\n        !echo \"something is defined\"\n    !endif\n\n## History\n\nAdded in NSIS v1.1d\n";

var _tempfile = "# !tempfile\n\nThis command creates a temporary file. It puts its path into a define, named symbol.\n\n## Parameters\n\n    symbol\n\n## Example\n\n    !tempfile PACKHDRTEMP\n    !packhdr \"${PACKHDRTEMP}\" '\"C:\\Program Files\\UPX\\upx.exe\" \"${PACKHDRTEMP}\"'\n    !tempfile FILE\n    !define /date DATE \"%H:%M:%S %d %b, %Y\"\n    !system 'echo built on ${DATE} > \"${FILE}\"'\n    File /oname=build.txt \"${FILE}\"\n    !delfile \"${FILE}\"\n    !undef FILE\n    !undef DATE\n\n## History\n\nAdded in NSIS v2.11\n";

var _undef = "# !undef\n\nRemoves an item from the global define list. Note that `${SYMBOL}` where SYMBOL is undefined will be translated to `${SYMBOL}`.\n\n## Parameters\n\n    gflag\n\n## Example\n\n    !define SOMETHING\n    !undef SOMETHING\n\n## History\n\nAdded in NSIS v1.51\n";

var _verbose = "# !verbose\n\nThis command will set the level of verbosity. 4=all, 3=no script, 2=no info, 1=no warnings, 0=none.\n\nPassing push will cause `!verbose` to push the current verbosity level on a special stack. Passing pop will cause `!verbose` to pop the current verbosity level from the same stack and use it.\n\n## Parameters\n\n    level | push | pop\n\n## Example\n\n    !verbose push\n    !verbose 1\n    !include WinMessages.nsh\n    !verbose pop\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n";

var _warning = "# !warning\n\nThis command will issue a warning to the script compiler. You can also add a message to this warning.\n\n## Parameters\n\n    [message]\n\n## Example\n\n    !ifdef USE_DANGEROUS_STUFF\n        !warning \"using dangerous stuff\"\n    !endif\n\n## History\n\nAdded in NSIS v1.1u\n";

var Abort = "# Abort\n\nCancels the install, stops execution of script, and displays user_message in the status display. Note: you can use this from [Callback functions][1] to do special things. [Page callbacks][2] also uses Abort for special purposes.\n\n## Parameters\n\n    user_message\n\n## Example\n\n    Abort\n    Abort \"can't install\"\n\n## History\n\nAdded in NSIS v1.1t\n\n[1]: http://nsis.sourceforge.net/Docs/Chapter4.html#4.7.2\n[2]: http://nsis.sourceforge.net/Docs/Chapter4.html#4.5\n";

var AddBrandingImage = "# AddBrandingImage\n\nAdds a branding image on the top, bottom, left, or right of the installer. Its size will be set according to the width/height specified, the installer width/height and the installers font. The final size will not always be what you requested; have a look at the output of the command for the actual size. Because this depends on the installers, you should use [`SetFont`][1] before `AddBrandingImage`. The default padding value is 2.\n\n`AddBrandingImage` only adds a placeholder for an image. To set the image itself at runtime, use [`SetBrandingImage`][2].\n\n## Parameters\n\n    (left|right|top|bottom) (width|height) [padding]\n\n## Example\n\n    AddBrandingImage left 100\n    AddBrandingImage right 50\n    AddBrandingImage top 20\n    AddBrandingImage bottom 35\n    AddBrandingImage left 100 5\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n\n[1]: SetFont.md\n[2]: SetBrandingImage.md\n";

var AddSize = "# AddSize\n\nTells the installer that the current section needs an additional \"size_kb\" kilobytes of disk space. Only valid within a section (will have no effect outside of a section or in a function).\n\n## Parameters\n\n    size_kb\n\n## Example\n\n    Section\n        AddSize 500\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.53\n";

var AllowRootDirInstall = "# AllowRootDirInstall\n\nControls whether or not installs are allowed in the root directory of a drive, or directly into a network share. Set to 'true' to change the safe behavior, which prevents users from selecting C:\\ or \\\\Server\\Share as an install (and later on, uninstall) directory. For additional directory selection page customizability, see [`.onVerifyInstDir`][1].\n\n## Parameters\n\n    true|false\n\n## History\n\nAdded in NSIS v1.80\n\n[1]: ../Callbacks/onVerifyInstDir.md\n";

var AllowSkipFiles = "# AllowSkipFiles\n\nThis command specifies whether the user should be able to skip a file or not. A user has an option to skip a file if [`SetOverwrite`][1] is set to on (default) and the installer fails to open a file for writing when trying to extract a file. If off is used the ignore button which allows the user to skip the file will not show and the user will only have an option to abort the installation (Cancel button) or retry opening the file for writing (Retry button). If on is used the user will have an option to skip the file (error flag will be set - see [`SetOverwrite`][1]).\n\n## Parameters\n\n    on|off\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: SetOverwrite.md\n";

var AutoCloseWindow = "# AutoCloseWindow\n\nSets whether or not the install window automatically closes when completed. This is overrideable from a section using [`SetAutoClose`][1].\n\n## Parameters\n\n    true|false\n\n## History\n\nAdded in NSIS v1.1a\n\n[1]: SetAutoClose.md\n";

var BGFont = "# BGFont\n\nSpecifies the font used to show the text on the background gradient. To set the color use [`BGGradient`][1]. The default font will be used if no parameters are specified. The default font is bold and italic Times New Roman.\n\n## Parameters\n\n    [font_face [height [weight] [/ITALIC] [/UNDERLINE] [/STRIKE]]]\n\n## History\n\nAdded in NSIS v2.01\n\n[1]: BGGradient.md\n";

var BGGradient = "# BGGradient\n\nSpecifies whether or not to use a gradient background window. If 'off', the installer will not show a background window, if no parameters are specified, the default black to blue gradient is used, and otherwise the top\\_color or bottom\\_color are used to make a gradient. top\\_color and bottom\\_color are specified using the form RRGGBB (in hexadecimal, as in HTML, only minus the leading '#', since # can be used for comments). 'textcolor' can be specified as well, or 'notext' can be specified to turn the big background text off.\n\n## Parameters\n\n    [off|(topc botc [textcolor|notext])]\n\n## History\n\nAdded in NSIS v1.2f\n";

var BrandingText = "# BrandingText\n\nSets the text that is shown at the bottom of the install window (by default it is 'Nullsoft Install System vX.XX') at the bottom of the install window. Setting this to an empty string (\"\") uses the default; to set the string to blank, use \" \" (a space). If it doesn't matter to you, leave it the default so that everybody can know why the installer didn't suck. heh. Use `/TRIMLEFT`, `/TRIMRIGHT` or `/TRIMCENTER` to trim down the size of the control to the size of the string.\n\n## Parameters\n\n    /TRIM(LEFT|RIGHT|CENTER) text\n\n## History\n\nAdded in NSIS v1.57\n\n[1]: BGGradient.md\n";

var BringToFront = "# BringToFront\n\nMakes the installer window visible and brings it to the top of the window list. If an application was executed that shows itself in front of the installer, a BringToFront would bring the installer back in focus.\n\nRecent Windows versions restrict the setting of foreground windows. If the user is working with another application during installation, the user may be notified using a different method.\n\n## History\n\nAdded in NSIS v1.1a\n";

var Call = "# Call\n\nCalls the function named function\\_name, the label named label\\_name, or a variable that specifies an address. An address is returned by [`GetCurrentAddress`][1], [`GetFunctionAddress`][2] or [`GetLabelAddress`][3]. A call returns when it encounters a [`Return`][4] instruction. Sections and functions are automatically ended with a Return instruction. Uninstall functions cannot be called from installer functions and sections, and vice-versa.\n\n## Parameters\n\n    function_name | :label_name | user_var(input)\n\n## Example\n\n    Function func\n          Call :label\n          DetailPrint \"#1: This will only appear 1 time.\"\n        label:\n          DetailPrint \"#2: This will appear before and after message #1.\"\n          Call :.global_label\n    FunctionEnd\n     \n    Section\n          Call func\n          Return\n         \n        .global_label:\n          DetailPrint \"#3: The global label was called\"\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.3\n\n[1]: GetCurrentAddress.md\n[2]: GetFunctionAddress.md\n[3]: GetLabelAddress.md\n[4]: Return.md\n";

var CallInstDLL = "# CallInstDLL\n\nCalls a function named function_name inside a NSIS extension DLL, a plug-in. See the example plugin for how to make one. Extension DLLs can access the stack and variables. Note: To automatically extract and call plug-in DLLs, use a plug-in command instead of `CallInstDLL`.\n\n## Parameters\n\n    dllfile function_name\n\n## Example\n\n    Push \"a parameter\"\n    Push \"another parameter\"\n    CallInstDLL $INSTDIR\\somedll.dll somefunction\n\n## History\n\nAdded in NSIS v1.7b\n";

var Caption = "# Caption\n\nWhen used outside a [`PageEx`][1] block: Sets the text for the titlebar of the installer. By default, it is '$(^Name) Setup', where [`Name`][2] is specified by the [`Name`][2] instruction. You can, however, override it with 'MyApp Installer' or whatever. If you specify an empty string (\"\"), the default will be used (you can however specify \" \" to simulate an empty string).\n\nWhen used inside a [`PageEx`][1] block: Sets the subcaption of the current page.\n\nAccepts variables. If variables are used, they must be initialized on [`.onInit`][3].\n\n## Parameters\n\n    caption\n\n## Example\n\n    PageEx license\n        Caption \"This is a license page\"\n    PageExEnd\n\n## History\n\nAdded in NSIS v1.2f\n\n[1]: PageEx.md\n[2]: Name.md\n[3]: ../Callbacks/onInit.md\n";

var ChangeUI = "# ChangeUI\n\nReplaces dialog (IDD\\_LICENSE, IDD\\_DIR, IDD\\_SELCOM, IDD\\_INST, IDD\\_INSTFILES, IDD\\_UNINST or IDD\\_VERIFY)  with a dialog from ui_file.exe`. You can also specify 'all' as the dialog if you wish to replace all 7 of the dialogs at once from the same UI file. For some example UIs look at Contrib\\UIs under your NSIS directory.\n\n* IDD\\_LICENSE must contain IDC\\_EDIT1 (RICHEDIT control).\n* IDD\\_DIR must contain IDC\\_DIR (edit box), IDC\\_BROWSE (button) and IDC\\_CHECK1 (checkbox).\n* IDD\\_SELCOM must contain IDC\\_TREE1 (SysTreeView32 control), and IDC\\_COMBO1 (combo box).\n* IDD\\_INST must contain IDC\\_BACK (button), IDC\\_CHILDRECT (static control the size of all other dialogs), IDC\\_VERSTR (static), IDOK (button), and IDCANCEL (button). If an image control (static with SS\\_BITMAP style) will be found in this dialog it will be used as the default for [`SetBrandingImage`][1].\n* IDD\\_INSTFILES must contain IDC\\_LIST1 (SysListView32 control), IDC\\_PROGRESS (msctls_progress32 control), and IDC\\_SHOWDETAILS (button).\n* IDD\\_UNINST must contain IDC\\_EDIT1 (edit box).\n* IDD\\_VERIFY must contain IDC\\_STR (static).\n\n## Parameters\n\n    dialog ui_file.exe\n\n## Example\n\n    ChangeUI all \"${NSISDIR}\\Contrib\\UIs\\sdbarker_tiny.exe\"\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n\n[1]: SetBrandingImage.md\n";

var CheckBitmap = "# CheckBitmap\n\nSpecifies the bitmap with the checkbox images used in the component-selection page treeview.\n\nThis bitmap should have a size of 96x16 pixels, no more than 8bpp (256 colors) and contain six 16x16 images for the different states (in order: selection mask, not checked, checked, greyed out, unchecked & read-only, checked & read-only). Use magenta as mask color (this area will be transparent).\n\n## Parameters\n\n    bitmap.bmp\n\n## History\n\nAdded in NSIS v2.0 Alpha 0\n";

var ClearErrors = "# ClearErrors\n\nClears the error flag.\n\n## Example\n\n    ClearErrors\n    IfErrors 0 +2\n    MessageBox MB_OK \"this message box will never show\"\n\n## History\n\nAdded in NSIS v1.2g\n";

var CompletedText = "# CompletedText\n\nReplaces the default text (\"Completed\") that is printed at the end of the install if parameter is specified. Otherwise, the default is used.\n\nAccepts variables. If variables are used, they must be initialized before the message is printed.\n\n## Parameters\n\n    text\n\n## History\n\nAdded in NSIS v1.60\n";

var ComponentText = "# ComponentText\n\nUsed to change the default text on the component page.\n\nThe default string will be used if a string is empty (\"\").\n\nAccepts variables. If variables are used, they must be initialized before the components page is created.\n\n## Parameters\n\n    [text [subtext] [subtext2]]\n\n* text: Text above the controls, to the right of the installation icon.\n* subtext: Text next to the installation type selection.\n* subtext2: Text to the left of the components list and below the installation type.\n\n## History\n\nAdded in NSIS v1.0f\n";

var CopyFiles = "# CopyFiles\n\nCopies files from the source to the destination on the installing system. Useful with [`$EXEDIR`][1] if you want to copy from installation media, or to copy from one place to another on the system. You might see a Windows status window of the copy operation if the operation takes a lot of time (to disable this, use `/SILENT`). The last parameter can be used to specify the size of the files that will be copied (in kilobytes), so that the installer can approximate the disk space requirements. On error, or if the user cancels the copy (only possible when `/SILENT` was omitted), the error flag is set. The error flag is not set if a destination file already exists; instead, the destination file is overwritten. If `/FILESONLY` is specified, only files are copied.\n\nFully-qualified path names should always be used with this instruction. Using relative paths will have unpredictable results.\n\n## Parameters\n\n    [/SILENT] [/FILESONLY] filespec_on_destsys destination_path [size_of_files_in_kb]\n\n## Example\n\n    CreateDirectory $INSTDIR\\backup\n    CopyFiles $INSTDIR\\*.dat $INSTDIR\\backup\n\n## History\n\nAdded in NSIS v1.1a\n\n[1]: ../Variables/EXEDIR.md\n";

var CRCCheck = "# CRCCheck\n\nSpecifies whether or not the installer will perform a CRC on itself before allowing an install. Note that if the user uses `/NCRC` on the command line when executing the installer, and you didn't specify 'force', the CRC will not occur, and the user will be allowed to install a (potentially) corrupted installer.\n\n## Parameters\n\n    on|off|force\n\n## History\n\nAdded in NSIS v1.0f\n";

var CreateDirectory = "# CreateDirectory\n\nCreates (recursively if necessary) the specified directory. The error flag is set if the directory couldn't be created.\nYou should always specify an absolute path.\n\n## Parameters\n\n    path_to_create\n\n## Example\n\n    CreateDirectory $INSTDIR\\some\\directory\n\n## History\n\nAdded in NSIS v1.1a\n";

var CreateFont = "# CreateFont\n\nCreates a font and puts its handle into user_var. For more information about the different parameters have a look at MSDN's page about the Win32 API function [CreateFont()][1].\nYou can get the current font used by NSIS using the ^Font and ^FontSize [`LangString`][2].\n\n## Parameters\n\n    user_var(handle output) face_name [height] [weight] [/ITALIC] [/UNDERLINE] [/STRIKE]\n\n## Example\n\n    CreateDirectory $INSTDIR\\some\\directory\n\n## History\n\nAdded in NSIS v2.0 Alpha 7\n\n[1]: http://msdn.microsoft.com/library/default.asp?url=/library/en-us/gdi/fontext_8fp0.asp\n[2]: LangString.md\n";

var CreateShortCut = "# CreateShortCut\n\nCreates a shortcut 'link.lnk' that links to 'target.file', with optional parameters 'parameters'. The icon used for the shortcut is 'icon.file,icon\\_index\\_number'; for default icon settings use empty strings for both icon.file and icon\\_index\\_number. start\\_options should be one of: SW\\_SHOWNORMAL, SW\\_SHOWMAXIMIZED, SW\\_SHOWMINIMIZED, or an empty string. keyboard_shortcut should be in the form of 'flag|c' where flag can be a combination (using |) of: ALT, CONTROL, EXT, or SHIFT. c is the character to use (a-z, A-Z, 0-9, F1-F24, etc). Note that no spaces are allowed in this string. A good example is \"ALT|CONTROL|F8\". [`$OUTDIR`][1] is used for the working directory. You can change it by using [`SetOutPath`][2] before creating the Shortcut. description should be the description of the shortcut, or comment as it is called under XP. The error flag is set if the shortcut cannot be created (i.e. either of the paths (link or target) does not exist, or some other error).\n\n## Parameters\n\n    link.lnk target.file [parameters [icon.file [icon_index_number [start_options [keyboard_shortcut [description]]]]]]\n\n## Example\n\n    CreateDirectory $INSTDIR\\some\\directory\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: ../Variables/OUTDIR.md\n[2]: SetOutPath.md\n";

var Delete = "# Delete\n\nDelete file (which can be a file or wildcard, but should be specified with a full path) from the target system. If `/REBOOTOK` is specified and the file cannot be deleted then the file is deleted when the system reboots -- if the file will be deleted on a reboot, the reboot flag will be set. The error flag is set if files are found and cannot be deleted. The error flag is not set from trying to delete a file that does not exist.\n\n## Parameters\n\n    [/REBOOTOK] file\n\n## Example\n\n    Delete $INSTDIR\\somefile.dat\n\n## History\n\nAdded in NSIS v1.0f\n";

var DeleteINISec = "# DeleteINISec\n\nDelete file (which can be a file or wildcard, but should be specified with a full path) from the target system. If `/REBOOTOK` is specified and the file cannot be deleted then the file is deleted when the system reboots -- if the file will be deleted on a reboot, the reboot flag will be set. The error flag is set if files are found and cannot be deleted. The error flag is not set from trying to delete a file that does not exist.\n\n## Parameters\n\n    ini_filename section_name\n\n## Example\n\n    WriteINIStr $TEMP\\something.ini section1 something 123\n    WriteINIStr $TEMP\\something.ini section1 somethingelse 1234\n    WriteINIStr $TEMP\\something.ini section2 nsis true\n    DeleteINISec $TEMP\\something.ini section1\n\n## History\n\nAdded in NSIS v1.1u\n";

var DeleteINIStr = "# DeleteINIStr\n\nDeletes the string str\\_name from section [section\\_name] from ini\\_filename. If the string could not be removed from the ini file, the error flag is set. It does not set the error flag if the string could not be found.\n\n## Parameters\n\n    ini_filename section_name str_name\n\n## Example\n\n    WriteINIStr $TEMP\\something.ini section1 something 123\n    WriteINIStr $TEMP\\something.ini section1 somethingelse 1234\n    DeleteINIStr $TEMP\\something.ini section1 somethingelse\n\n## History\n\nAdded in NSIS v1.1u\n";

var DeleteRegKey = "# DeleteRegKey\n\nDeletes a registry key. If `/ifempty` is specified, the registry key will only be deleted if it has no subkeys (otherwise, the whole registry tree will be removed). Valid values for root_key are listed under [`WriteRegStr`][1]. The error flag is set if the key could not be removed from the registry (or if it didn't exist to begin with).\n\n## Parameters\n\n    [/ifempty] root_key subkey\n\n## Example\n\n    DeleteRegKey HKLM \"Software\\My Company\\My Software\"\n    DeleteRegKey /ifempty HKLM \"Software\\A key that might have subkeys\"\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: WriteRegStr.md\n";

var DeleteRegValue = "# DeleteRegValue\n\nDeletes a registry value. Valid values for root_key are listed under [`WriteRegStr`][1]. The error flag is set if the value could not be removed from the registry (or if it didn't exist to begin with).\n\n## Parameters\n\n    root_key subkey key_name\n\n## Example\n\n    DeleteRegValue HKLM \"Software\\My Company\\My Software\" \"some value\"\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: WriteRegStr.md\n";

var DetailPrint = "# DetailPrint\n\nAdds the string \"user_message\" to the details view of the installer.\n\n## Parameters\n\n    user_message\n\n## Example\n\n    DetailPrint \"this message will show on the installation window\"\n\n## History\n\nAdded in NSIS v1.32\n";

var DetailsButtonText = "# DetailsButtonText\n\nReplaces the default details button text of \"Show details\", if parameter is specified (otherwise the default is used).\nAccepts variables. If variables are used, they must be initialized before the install log (instfiles) page is created.\n\n## Parameters\n\n    show_details_text\n\n## Example\n\n    DetailPrint \"this message will show on the installation window\"\n\n## History\n\nAdded in NSIS v1.60\n";

var DirText = "# DirText\n\nUsed to change the default text on the directory page.\n\nThe default string will be used if a string is empty (\"\").\n\nAccepts variables. If variables are used, they must be initialized before the directory page is created.\n\n## Parameters\n\n    [text] [subtext] [browse_button_text] [browse_dlg_text]\n\n* text: Text above the controls, to the right of the installation icon.\n* subtext: Text on the directory selection frame.\n* browse\\_button\\_text: Text on the Browse button.\n* browse\\_dlg\\_text: Text on the \"Browse For Folder\" dialog, appears after clicking on \"Browse\" button.\n\n## Example\n\n    DetailPrint \"this message will show on the installation window\"\n\n## History\n\nAdded in NSIS v1.0f\n";

var DirVar = "# DirVar\n\nSpecifies which variable is to be used to contain the directory selected. This variable should be initialized with a default value. This allows you to easily create two different directory pages that will not require you to move values in and out of [`$INSTDIR`][1]. The default variable is [`$INSTDIR`][1]. This can only be used in [`PageEx`][2] and for directory and uninstConfirm pages.\n\n## Parameters\n\n    user_var(dir input/output)\n\n## Example\n\n    Var ANOTHER_DIR\n    PageEx directory\n        DirVar $ANOTHER_DIR\n    PageExEnd\n     \n    Section\n        SetOutPath $INSTDIR\n        File \"a file.dat\"\n        SetOutPath $ANOTHER_DIR\n        File \"another file.dat\"\n    SectionEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: ../Variables/INSTDIR.md\n[2]: PageEx.md\n";

var DirVerify = "# DirVerify\n\nIf 'DirVerify leave' is used, the Next button will not be disabled if the installation directory is not valid or there is not enough space. A flag that you can read in the leave function using [`GetInstDirError`][1] will be set instead.\n\n## Parameters\n\n    auto|leave\n\n## Example\n\n    PageEx directory\n        DirVerify leave\n        PageCallbacks \"\" \"\" dirLeave\n    PageExEnd\n\n## History\n\nAdded in NSIS v2.0 Release Candidate 1\n\n[1]: GetInstDirError.md\n";

var EnableWindow = "# EnableWindow\n\nEnables or disables mouse and keyboard input to the specified window or control. Possible states are 0 (disabled) or 1 (enabled).\n\n## Parameters\n\n    hwnd (1|0)\n\n## Example\n\n    GetDlgItem $0 $HWNDPARENT 1\n    EnableWindow $0 0\n    Sleep 1000\n    EnableWindow $0 1\n\n## History\n\nAdded in NSIS v2.0\n";

var EnumRegKey = "# EnumRegKey\n\nSet user variable $x with the name of the 'index'th registry key in root\\_key\\Subkey. Valid values for root\\_key are listed under [`WriteRegStr`][1]. Returns an empty string if there are no more keys, and returns an empty string and sets the error flag if there is an error.\n\n## Parameters\n\n    user_var(output) root_key subkey index\n\n## Example\n\n    StrCpy $0 0\n    loop:\n      EnumRegKey $1 HKLM Software $0\n      StrCmp $1 \"\" done\n      IntOp $0 $0 + 1\n      MessageBox MB_YESNO|MB_ICONQUESTION \"$1$\\n$\\nMore?\" IDYES loop\n    done:\n\n## History\n\nAdded in NSIS v1.50\n\n[1]: WriteRegStr.md\n";

var EnumRegValue = "# EnumRegValue\n\nSet user variable $x with the name of the 'index'th registry value in root\\_key\\Subkey. Valid values for root\\_key are listed under [`WriteRegStr`][1]. Returns an empty string and sets the error flag if there are no more values or if there is an error.\n\n## Parameters\n\n    user_var(output) root_key subkey index\n\n## Example\n\n    StrCpy $0 0\n    loop:\n      ClearErrors\n      EnumRegValue $1 HKLM Software\\Microsoft\\Windows\\CurrentVersion $0\n      IfErrors done\n      IntOp $0 $0 + 1\n      ReadRegStr $2 HKLM Software\\Microsoft\\Windows\\CurrentVersion $1\n      MessageBox MB_YESNO|MB_ICONQUESTION \"$1 = $2$\\n$\\nMore?\" IDYES loop\n    done:\n\n## History\n\nAdded in NSIS v1.50\n\n[1]: WriteRegStr.md\n";

var Exch = "# Exch\n\nWhen no parameter is specified, exchanges the top two elements of the stack. When a parameter is specified and is a user variable, exchanges the top element of the stack with the parameter. When a parameter is specified and is a positive integer, `Exch` will swap the item on the top of the stack with the item that is specified by the offset from the top of the stack in the parameter. If there are not enough items on the stack to accomplish the exchange, a fatal error will occur (to help you debug your code :).\n\n## Parameters\n\n    [user_var | stack_index]\n\n## Example\n\n    Push 1\n    Push 2\n    Exch\n    Pop $0 # = 1\n    Push 1\n    Push 2\n    Push 3\n    Exch 2\n    Pop $0 # = 1\n    StrCpy $0 1\n    Push 2\n    Exch $0 # = 2\n    Pop $1 # = 1\n\n## History\n\nAdded in NSIS v1.58\n\n[1]: WriteRegStr.md\n";

var Exec = "# Exec\n\nExecute the specified program and continue immediately. Note that the file specified must exist on the target system, not the compiling system. [`$OUTDIR`][1] is used for the working directory.\n\nThe error flag is set if the process could not be launched. Note, if the command could have spaces, you should put it in quotes to delimit it from parameters. e.g.: Exec '\"$INSTDIR\\command.exe\" parameters'. If you don't put it in quotes it will not work on Windows 9x with or without parameters.\n\n## Parameters\n\n    command\n\n## Example\n\n    Exec '\"$INSTDIR\\someprogram.exe\"'\n    Exec '\"$INSTDIR\\someprogram.exe\" some parameters'\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: ../Variables/OUTDIR.md\n";

var ExecShell = "# ExecShell\n\nExecute the specified program using ShellExecute. Note that action is usually \"open\", \"print\", etc, but can be an empty string to use the default action. Parameters and the show type are optional. [`$OUTDIR`][1] is used for the working directory. The error flag is set if the process could not be launched.\n\n## Parameters\n\n    action command [parameters] [SW_SHOWDEFAULT | SW_SHOWNORMAL | SW_SHOWMAXIMIZED | SW_SHOWMINIMIZED | SW_HIDE]\n\n## Example\n\n    ExecShell \"open\" \"http://nsis.sf.net/\"\n    ExecShell \"open\" \"$INSTDIR\\readme.txt\"\n    ExecShell \"print\" \"$INSTDIR\\readme.txt\"\n\n## History\n\nAdded in NSIS v1.1b\n\n[1]: ../Variables/OUTDIR.md\n";

var ExecShellWait = "# ExecShellWait\n\nExecute the specified program and continue immediately. Note that the file specified must exist on the target system, not the compiling system. [`$OUTDIR`][1] is used as the working directory. The error flag is set if the process could not be launched. Note, if the command could have spaces, you should put it in quotes to delimit it from parameters. e.g.: `Exec '\"$INSTDIR\\command.exe\" parameters'`. If you don't put it in quotes it will not work on Windows 9x with or without parameters.\n\n## Parameters\n\n    [/INVOKEIDLIST] action command [parameters] [SW_SHOWDEFAULT | SW_SHOWNORMAL | SW_SHOWMAXIMIZED | SW_SHOWMINIMIZED | SW_HIDE]\n\n## Example\n\n    ExecShellWait \"open\" \"http://nsis.sf.net/\"\n    ExecShellWait \"open\" \"$INSTDIR\\readme.txt\"\n    ExecShellWait \"print\" \"$INSTDIR\\readme.txt\"\n\n## History\n\nAdded in NSIS v3.02\n\n[1]: ../Variables/OUTDIR.md\n";

var ExecWait = "# ExecWait\n\nExecute the specified program and wait for the executed process to quit. See [`Exec`][1] for more information. If no output variable is specified `ExecWait` sets the error flag if the program executed returns a nonzero error code, or if there is an error. If an output variable is specified, `ExecWait` sets the variable with the exit code (and only sets the error flag if an error occurs; if an error occurs the contents of the user variable are undefined). Note, if the command could have spaces, you should put it in quotes to delimit it from parameters. e.g.: ExecWait '\"$INSTDIR\\command.exe\" parameters'. If you don't put it in quotes it will not work on Windows 9x with or without parameters.\n\n## Parameters\n\n    command [user_var(exit code)]\n\n## Example\n\n    ExecWait '\"$INSTDIR\\someprogram.exe\"'\n    ExecWait '\"$INSTDIR\\someprogram.exe\"' $0\n    DetailPrint \"some program returned $0\"\n\n## History\n\nAdded in NSIS v1.0i\n\n[1]: Exec.md\n";

var ExpandEnvStrings = "# ExpandEnvStrings\n\nExpands environment variables in string into the user variable $x. If an environment variable doesn't exist, it will not be replaced. For example, if you use \"%var%\" and var doesn't exists, the result will be \"%var\". If there is an error, the variable is set to empty, and the error flag is set.\n\n## Parameters\n\n    user_var(output) string\n\n## Example\n\n    ExpandEnvStrings $0 \"WINDIR=%WINDIR%$\\nTEMP=%TEMP%\"\n\n## History\n\nAdded in NSIS v1.60\n";

var File = "# File\n\nAdds file(s) to be extracted to the current output path ([`$OUTDIR`][1]).\n\n* Note that the output file name is $OUTDIR\\filename\\_portion\\_of\\_file.\n* Use `/oname=X` switch to change the output name. X may contain variables and can be a fully qualified path or a relative path in which case it will be appended to [`$OUTDIR`][1] set by [`SetOutPath`][2]. When using this switch, only one file can be specified. If the output name contains spaces, quote the entire parameter, including /oname, as shown in the examples below.\n* Wildcards are supported.\n* If the `/r` switch is used, matching files and directories are recursively searched for in subdirectories. If just one path segment is specified (e.g. File /r something), the current directory will be recursively searched. If more than one segment is specified (e.g. File /r something\\*.*), the last path segment will be used as the matching condition and the rest for the directory to search recursively. If a directory name matches, all of its contents is added recursively. Directory structure is preserved.\n* Use the `/x`switch to exclude files or directories.\n* If the `/a` switch is used, the attributes of the file(s) added will be preserved.\n* The `File` command sets the error flag if overwrite mode is set to 'try' and the file could not be overwritten, or if the overwrite mode is set to 'on' and the file could not be overwritten and the user selects ignore.\n* If the `/nonfatal` switch is used and no files are found, a warning will be issued instead of an error.\n\n## Parameters\n\n    [/nonfatal] [/a] ([/r] [/x file|wildcard [...]] (file|wildcard) [...] | /oname=file.dat infile.dat)\n\n## Example\n\n    File something.exe\n    File /a something.exe\n    File *.exe\n    File /r *.dat\n    File /r data\n    File /oname=temp.dat somefile.ext\n    File /oname=$TEMP\\temp.dat somefile.ext\n    File \"/oname=$TEMP\\name with spaces.dat\" somefile.ext\n    File /nonfatal \"a file that might not exist\"\n    File /r /x CVS myproject\\*.*\n    File /r /x *.res /x *.obj /x *.pch source\\*.*\n\n**Note:** when using the `/r` switch, both matching directories and files will be searched. This is always done with or without the use of wildcards, even if the given path perfectly matches one directory. That means, the following directory structure:\n\n    something/\n    ├── file.dat\n    └── another.dat\n    dir/\n    ├── something\n    ├── dir2/\n    │   └── file2.dat\n    └── another/\n        └── something/\n            └── readme.txt\n\nwith the following `File` usage:\n\n    File /r something\n\nwill match the directory named something on the root directory, the file named something in the directory named dir and the directory named something in the directory named another. To match only the directory named something on the root directory, use the following:\n\n    File /r something\\*.*\n\nWhen adding \\*.*, it will be used as the matching condition and something will be used as the directory to search. When only something is specified, the current directory will be recursively searched for every and directory named something and another\\something will be matched.\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: ../Variables/OUTDIR.md\n[2]: SetOutPath.md\n";

var FileBufSize = "# FileBufSize\n\nThis command sets the size of the compiler's internal file buffers. This command allows you to control the compiler's memory usage by limiting how much of a given file it will load into memory at once. Since the compiler needs both input and output, twice the memory size specified could be used at any given time for file buffers. This command does not limit the compression buffers which could take another couple of MB, neither does it limit the compiler's other internal buffers, but those shouldn't normally top 1MB anyway. Specifying a very small number could decrease performance. Specifying a very large number could exhaust system resources and force the compiler to cancel the compilation process. The default value is 32MB.\n\n## Parameters\n\n    buffer_size_in_mb\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var FileClose = "# FileClose\n\nCloses a file handle opened with [`FileOpen`][1].\n\n## Parameters\n\n    handle\n\n## Example\n\n    FileOpen $0 $INSTDIR\\file.dat r\n    FileClose $0\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: FileOpen.md\n";

var FileErrorText = "# FileErrorText\n\nReplaces the default text that comes up when a file cannot be written to. This string can contain a reference to `$0`, which is the filename (`$0` is temporarily changed to this value). Example: \"Can not write to file $\\r$\\n$0$\\r$\\ngood luck.\".\n\nAccepts variables. If variables are used, they must be initialized before [`File`][1] is used.\n\n## Parameters\n\n    text\n\n## History\n\nAdded in NSIS v1.63beta\n\n[1]: File.md\n";

var FileOpen = "# FileOpen\n\nOpens a file named \"filename\", and sets the handle output variable with the handle. The openmode should be one of \"r\" (read) \"w\" (write, all contents of file are destroyed) or \"a\" (append, meaning opened for both read and write, contents preserved). In all open modes, the file pointer is placed at the beginning of the file. If the file cannot be opened, the handle output is set to empty, and the error flag is set.\n\nIf no absolute path is specified the current folder will be used. The current folder is the folder set using the last `SetOutPath` instruction. If you have not used [`SetOutPath`][1] the current folder is [`$EXEDIR`][1].\n\n## Parameters\n\n    user_var(handle output) filename openmode\n\n## Example\n\n    FileOpen $0 $INSTDIR\\file.dat r\n    FileClose $0\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: SetOutPath.md\n[2]: ../Variables/EXEDIR.md\n";

var FileRead = "# FileRead\n\nReads a string (ANSI characters) from a file opened with [`FileOpen`][1]. The string is read until either a newline (or carriage return newline pair) occurs, or until a null byte is read, or until maxlen is met (if specified). By default, strings are limited to 1024 characters (a special build with larger NSIS\\_MAX\\_STRLEN can be compiled or downloaded). If the end of file is read and no more data is available, the output string will be empty, and the error flag will be set.\n\n(If you are building a [Unicode installer][2], the function reads an ANSI string and makes the adequate conversion)\n\n## Parameters\n\n    handle user_var(output) [maxlen]\n\n## Example\n\n    ClearErrors\n    FileOpen $0 $INSTDIR\\file.dat r\n    IfErrors done\n    FileRead $0 $1\n    DetailPrint $1\n    FileClose $0\n    done:\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: FileOpen.md\n[2]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4\n";

var FileReadByte = "# FileReadByte\n\nReads a byte from a file opened with [`FileOpen`][1]. The byte is stored in the output as an integer (0-255). If the end of file is read and no more data is available, the output will be empty, and the error flag will be set.\n\n## Parameters\n\n    handle user_var(output)\n\n## Example\n\n    ClearErrors\n    FileOpen $0 $INSTDIR\\file.dat r\n    IfErrors done\n    FileReadByte $0 $1\n    FileReadByte $0 $2\n    DetailPrint \"$1 $2\"\n    FileClose $0\n    done:\n\n## History\n\nAdded in NSIS v1.80\n\n[1]: FileOpen.md\n";

var FileReadUTF16LE = "# FileReadUTF16LE\n\nThis function is only available when building a [Unicode installer][1].\n\nReads a string (UTF-16LE characters) from a file opened with [`FileOpen`][2]. The string is read until either a newline (or carriage return newline pair) occurs, or until a null wide-character is read, or until maxlen is met (if specified). By default, strings are limited to 1024 characters (a special build with larger NSIS\\_MAX\\_STRLEN can be compiled or downloaded). If the end of file is read and no more data is available, the output string will be empty, and the error flag will be set.\n\n## Parameters\n\n    handle user_var(output)\n\n## Example\n\n    ClearErrors\n    FileOpen $0 $INSTDIR\\file.dat r\n    IfErrors done\n    FileReadByte $0 $1\n    FileReadByte $0 $2\n    DetailPrint \"$1 $2\"\n    FileClose $0\n    done:\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4\n[2]: FileOpen.md\n";

var FileReadWord = "# FileReadUTF16LE\n\nThis function is only available when building a [Unicode installer][1].\n\nReads a word (2-bytes) from a file opened with [`FileOpen`][2]. The word is stored in the output as an integer (0-65535). If the end of file is read and no more data is available, the output will be empty, and the error flag will be set.\n\n## Parameters\n\n    handle user_var(output)\n\n## Example\n\n    ClearErrors\n    FileOpen $0 $INSTDIR\\file.dat r\n    IfErrors done\n    FileReadWord $0 $1\n    FileReadWord $0 $2\n    DetailPrint \"$1 $2\"\n    FileClose $0\n    done:\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4\n[2]: FileOpen.md\n";

var FileSeek = "# FileSeek\n\nSeeks a file opened with [`FileOpen`][1]. If mode is omitted or specified as SET, the file is positioned to \"offset\", relative to the beginning of the file. If mode is specified as CUR, then the file is positioned to \"offset\", relative to the current file position. If mode is specified as END, then the file is positioned to \"offset\", relative to the end of the file. If the final parameter \"new position\" is specified, the new file position will be stored to that variable.\n\n## Parameters\n\n    handle offset [mode] [user_var(new position)]\n\n## Example\n\n    ClearErrors\n    FileOpen $0 $INSTDIR\\file.dat r\n    IfErrors done\n    FileSeek $0 -5 END\n    FileRead $0 $1\n    DetailPrint $1\n    FileClose $0\n    done:\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: FileOpen.md\n";

var FileWrite = "# FileWrite\n\nWrites an ANSI string to a file opened with [`FileOpen`][1]. If an error occurs writing, the error flag will be set.\n\n(If you are building a [Unicode installer][2], the function makes the adequate conversion and writes an ANSI string)\n\n## Parameters\n\n    handle string\n\n## Example\n\n    ClearErrors\n    FileOpen $0 $INSTDIR\\file.dat w\n    IfErrors done\n    FileWrite $0 \"some text\"\n    FileClose $0\n    done:\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: FileOpen.md\n[2]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4\n";

var FileWriteByte = "# FileWrite\n\nWrites an ANSI string to a file opened with [`FileOpen`][1]. If an error occurs writing, the error flag will be set.\n\n(If you are building a [Unicode installer][2], the function makes the adequate conversion and writes an ANSI string)\n\n## Parameters\n\n    handle string\n\n## Example\n\n    ClearErrors\n    FileOpen $0 $INSTDIR\\file.dat w\n    IfErrors done\n    FileWrite $0 \"some text\"\n    FileClose $0\n    done:\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: FileOpen.md\n[2]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4\n";

var FileWriteUTF16LE = "# FileWriteUTF16LE\n\nThis function is only available when building a [Unicode installer][1].\n\nWrites a Unicode (UTF-16LE) string to a file opened with [`FileOpen`][2]. If an error occurs writing, the error flag will be set.\n\n## Parameters\n\n    handle string\n\n## Example\n\n    ClearErrors\n    FileOpen $0 $INSTDIR\\file.dat w\n    IfErrors done\n    FileWriteUTF16LE $0 \"some text\"\n    FileClose $0\n    done:\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4\n[2]: FileOpen.md\n";

var FileWriteWord = "# FileWriteWord\n\nThis function is only available when building a [Unicode installer][1].\n\nWrites the integer interpretation of 'string' as a WORD (2-bytes, range: 0-65535) to a file opened with [`FileOpen`][2]. Of course you can enter the integer value directly. The following code writes a \"Carriage Return / Line Feed\" - Enter to the file.\n\n## Parameters\n\n    handle string\n\n## Example\n\n    FileWriteWord file_handle \"13\"\n    FileWriteWord file_handle \"10\"\n\nIf an error occurs while writing, the error flag will be set. Note that the low WORD of the integer is used, i.e. writing 65536 is the same as writing 0, etc.\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: http://nsis.sourceforge.net/Docs/Chapter1.html#1.4\n[2]: FileOpen.md\n";

var FindClose = "# FindClose\n\nCloses a search opened with [`FindFirst`][1].\n\n## Parameters\n\n    handle\n\n## Example\n\n    FindFirst $0 $1 $INSTDIR\\*.txt\n    loop:\n      StrCmp $1 \"\" done\n      DetailPrint $1\n      FindNext $0 $1\n      Goto loop\n    done:\n    FindClose $0\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: FindFirst.md\n";

var FindFirst = "# FindFirst\n\nPerforms a search for 'filespec', placing the first file found in filename\\_output (a user variable). It also puts the handle of the search into handle\\_output (also a user variable). If no files are found, both outputs are set to empty, and the error flag is set. Best used with [`FindNext`][1] and [`FileClose`][2]. Note that the filename output is without path.\n\n## Parameters\n\n    user_var(handle output) user_var(filename output) filespec\n\n## Example\n\n    FindFirst $0 $1 $INSTDIR\\*.txt\n    loop:\n      StrCmp $1 \"\" done\n      DetailPrint $1\n      FindNext $0 $1\n      Goto loop\n    done:\n    FindClose $0\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: FindNext.md\n[2]: FileClose.md\n";

var FindNext = "# FindNext\n\nContinues a search began with [`FindFirst`][1]. handle should be the handle\\_output\\_variable returned by [`FindFirst`][1]. If the search is completed (there are no more files), filename\\_output is set to empty, and the error flag is set. Note that the filename output is without path.\n\n## Parameters\n\n    handle user_var(filename_output)\n\n## Example\n\n    FindFirst $0 $1 $INSTDIR\\*.txt\n    loop:\n      StrCmp $1 \"\" done\n      DetailPrint $1\n      FindNext $0 $1\n      Goto loop\n    done:\n    FindClose $0\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: FindFirst.md\n";

var FindWindow = "# FindWindow\n\nSearches for a window. Behaves like the win32 FindWindowEx(). Searches by windowclass (and/or windowtitle if specified). If windowparent or childafter are specified, the search will be restricted as such. If windowclass or windowtitle is specified as \"\", they will not be used for the search. If the window is not found, the user variable returned is 0. To accomplish old-style FindWindow behavior, use FindWindow with [`SendMessage`][1].\n\n## Parameters\n\n    user_var(hwnd output) windowclass [windowtitle] [windowparent] [childafter]\n\n## Example\n\n    FindWindow $0 \"#32770\" \"\" $HWNDPARENT\n    FindWindow $0 \"my window class\" \"my window title\"\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: SendMessage.md\n";

var FlushINI = "# FlushINI\n\nFlushes the INI file's buffers. Windows 9x keeps all changes to the INI file in memory. This command causes the changes to be written to the disk immediately. Use it if you edit the INI manually, delete it, move it or copy it right after you change it with [`WriteINIStr`][1], [`DeleteINISec`][2] or [`DeleteINStr`][3].\n\n## Parameters\n\n    ini_filename\n\n## Example\n\n    WriteINIStr $TEMP\\something.ini test test test\n    FlushINI $TEMP\\something.ini\n    Delete $TEMP\\something.ini\n\n## History\n\nAdded in NSIS v2.0 Beta 3\n\n[1]: WriteINIStr.md\n[2]: DeleteINISec.md\n[3]: DeleteINIStr.md\n";

var Function = "# Function\n\nBegins and opens a new function. Function names beginning with \".\" (e.g. \".Whatever\") are generally reserved for callback functions. Function names beginning with \"un.\" are functions that will be generated in the Uninstaller. Hence, normal install Sections and functions cannot call uninstall functions, and the Uninstall Section and uninstall functions cannot call normal functions.\n\n## Parameters\n\n    [function_name]\n\n## Example\n\n    Function func\n        # some commands\n    FunctionEnd\n\n    Section\n        Call func\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.3\n";

var FunctionEnd = "# FunctionEnd\n\nThis command closes the current open [`Function`][1].\n\n## Example\n\n    Function func\n        # some commands\n    FunctionEnd\n\n    Section\n        Call func\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.3\n\n[1]: Function.md\n";

var GetCurInstType = "# GetCurInstType\n\nGet the current [`InstType`][1] and stores it in user\\_var. If the first install type is selected, 0 will be put in user\\_var. If the second install type is selected, 1 will be put in user\\_var, and so on. The value of `${NSIS_MAX_INST_TYPES}` (32 by default) means that the custom install type was selected.\n\n## Parameters\n\n    user_var\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: InstType.md\n";

var GetCurrentAddress = "# GetCurrentAddress\n\nGets the address of the current instruction and stores it in the output user variable. This user variable then can be passed to [`Call`][1] or [`Goto`][2].\n\n## Parameters\n\n    user_var(output)\n\n## Example\n\n    Function func\n        DetailPrint \"function\"\n        IntOp $0 $0 + 2\n        Call $0\n        DetailPrint \"function end\"\n    FunctionEnd\n     \n    Section\n      DetailPrint \"section\"\n      DetailPrint \"section\"\n      GetCurrentAddress $0\n      Goto callFunc\n     \n      DetailPrint \"back to section\"\n      Return\n     \n    callFunc:\n      Call func\n      DetailPrint \"section end\"\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.80\n\n[1]: Call.md\n[2]: Goto.md\n";

var GetDlgItem = "# GetDlgItem\n\nRetrieves the handle of a control identified by item_id in the specified dialog box dialog. If you want to get the handle of a control on the inner dialog, first use\n\n    FindWindow user_var(output) \"#32770\" \"\" `$HWNDPARENT\n\nto get the handle of the inner dialog.\n\n## Parameters\n\n    user_var(output) dialog item_id\n\n## Example\n\n    GetDlgItem $0 $HWNDPARENT 1 # next/install button\n\n## History\n\nAdded in NSIS v2.0\n\n[1]: Call.md\n[2]: Goto.md\n";

var GetDLLVersion = "# GetDLLVersion\n\nGets the version information from the DLL (or any other executable containing version information) in \"filename\". Sets the user output variables with the high and low dwords of version information on success; on failure the outputs are empty and the error flag is set.\n\n## Parameters\n\n    filename user_var(high dword output) user_var(low dword output)\n\n## Example\n\nThe following example reads the DLL version and copies a human readable version of it into `$0:\n\n    GetDlgItem $0 $HWNDPARENT 1 # next/install button\n\n## History\n\nAdded in NSIS v1.60\n";

var GetDLLVersionLocal = "# GetDLLVersionLocal\n\nThis is similar to [`GetDLLVersion`][1], only it acts on the system building the installer (it actually compiles into two [`StrCpy`][2] commands). Sets the two output variables with the DLL version information of the DLL on the build system.\n\n## Parameters\n\n    localfilename user_var(high dword output) user_var(low dword output)\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: GetDLLVersion.md\n[2]: StrCpy.md\n";

var GetErrorLevel = "# GetErrorLevel\n\nReturns the last error level set by [`SetErrorLevel`][1] or -1 if it was never used.\n\n## Parameters\n\n    user_var(error level output)\n\n## Example\n\n    GetErrorLevel $0\n    IntOp $0 $0 + 1\n    SetErrorLevel $0\n\n## History\n\nAdded in NSIS v2.02\n\n[1]: SetErrorLevel.md\n";

var GetFileTime = "# GetFileTime\n\nGets the last write time of \"filename\". Sets the user output variables with the high and low dwords of the timestamp on success; on failure the outputs are empty and the error flag is set.\n\n## Parameters\n\n    filename user_var(high dword output) user_var(low dword output)\n\n## History\n\nAdded in NSIS v1.60\n";

var GetFileTimeLocal = "# GetFileTimeLocal\n\nThis is similar to [`GetFileTime`][1], only it acts on the system building the installer (it actually compiles into two [`StrCpy`][2] commands). Sets the two output variables with the file timestamp of the file on the build system.\n\n## Parameters\n\n    filename user_var(high dword output) user_var(low dword output)\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: GetFileTime.md\n[2]: StrCpy.md\n";

var GetFullPathName = "# GetFullPathName\n\nAssign to the user variable $x, the full path of the file specified. If the path portion of the parameter is not found, the error flag will be set and $x will be empty. If `/SHORT` is specified, the path is converted to the short filename form. However, if `/SHORT` is not specified, the path isn't converted to its long filename form. To get the long filename, call GetLongPathName using the System plug-in. Note that GetLongPathName is only available on Windows 98, Windows 2000 and above.\n\n## Parameters\n\n    [/SHORT] user_var(output) path_or_file\n\n## Example\n\n    StrCpy $INSTDIR $PROGRAMFILES\\NSIS\n    SetOutPath $INSTDIR\n    GetFullPathName $0 ..\n    DetailPrint $0 # will print C:\\Program Files\n    GetFullPathName /SHORT $0 $INSTDIR\n    DetailPrint $0 # will print C:\\Progra~1\\NSIS\n\nUsing GetLongPathName:\n\n    StrCpy $0 C:\\Progra~1\\NSIS\n    System::Call 'kernel32::GetLongPathName(t r0, t .r1, i ${NSIS_MAX_STRLEN}) i .r2'\n    StrCmp $2 error +2\n    StrCpy $0 $1\n    DetailPrint $0 # will print C:\\Program Files\\NSIS, where supported\n\n## History\n\nAdded in NSIS v1.70\n";

var GetFunctionAddress = "# GetFunctionAddress\n\nGets the address of the function and stores it in the output user variable. This user variable then can be passed to [`Call`][1] or [`Goto`][2]. Note that if you [`Goto`][2] an address which is the output of `GetFunctionAddress`, your function will never be returned to (when the function you Goto'd to returns, you return instantly).\n\n## Parameters\n\n    user_var(output) function_name\n\n## Example\n\n    Function func\n        DetailPrint \"function\"\n    FunctionEnd\n     \n    Section\n        GetFunctionAddress $0 func\n        Call $0\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.80\n\n[1]: Call.md\n[2]: Goto.md\n";

var GetInstDirError = "# GetInstDirError\n\nUse in the leave function of a directory page. Reads the flag set if 'DirVerify leave' is used. Possible values:\n\n* 0: No error\n* 1: Invalid installation directory\n* 2: Not enough space on installation drive\n\n## Parameters\n\n    user_var(error output)\n\n## Example\n\n    !include LogicLib.nsh\n    PageEx directory\n        DirVerify leave\n        PageCallbacks \"\" \"\" dirLeave\n    PageExEnd\n     \n    Function dirLeave\n        GetInstDirError $0\n        ${Switch} $0\n            ${Case} 0\n                MessageBox MB_OK \"valid installation directory\"\n                ${Break}\n            ${Case} 1\n                MessageBox MB_OK \"invalid installation directory!\"\n                Abort\n                ${Break}\n            ${Case} 2\n                MessageBox MB_OK \"not enough free space!\"\n                Abort\n                ${Break}\n        ${EndSwitch}\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0 Release Candidate 1\n";

var GetKnownFolderPath = "# GetKnownFolderPath\n\nGet the path of a [known folder][1]. The error flag is set and the output variable is empty if the call fails or the `knownfolderid` guid is not available. This function is only able to resolve known folders on Windows Vista or higher.\n\n## Parameters\n\n    user_var(output) knownfolderid\n\n## Example\n\n    !include WinCore.nsh\n    !include LogicLib.nsh\n\n    Function .onInit\n        ${If} $InstDir == \"\"\n            GetKnownFolderPath $InstDir ${FOLDERID_UserProgramFiles} ; This exists on Win7+\n            StrCmp $InstDir \"\" 0 +2 \n            StrCpy $InstDir \"$LocalAppData\\Programs\" ; Fallback directory\n            StrCpy $InstDir \"$InstDir\\$(^Name)\"\n        ${EndIf}\n    FunctionEnd\n\n## History\n\nAdded in NSIS v3.06\n\n[1]: https://docs.microsoft.com/en-us/windows/win32/shell/knownfolderid\n";

var GetLabelAddress = "# GetLabelAddress\n\nGets the address of the label and stores it in the output user variable. This user variable then can be passed to [`Call`][1] or [`Goto`][2]. Note that you may only call this with labels accessible from your function, but you can call it from anywhere (which is potentially dangerous). Note that if you [`Call`][1] the output of `GetLabelAddress`, code will be executed until it [`Return`][3]'s (explicitly or implicitly at the end of a function), and then you will be returned to the statement after the [`Call`][1].\n\n## Parameters\n\n    user_var(output) label\n\n## Example\n\n    !include LogicLib.nsh\n    PageEx directory\n        DirVerify leave\n        PageCallbacks \"\" \"\" dirLeave\n    PageExEnd\n     \n    Function dirLeave\n        GetInstDirError $0\n        ${Switch} $0\n            ${Case} 0\n                MessageBox MB_OK \"valid installation directory\"\n                ${Break}\n            ${Case} 1\n                MessageBox MB_OK \"invalid installation directory!\"\n                Abort\n                ${Break}\n            ${Case} 2\n                MessageBox MB_OK \"not enough free space!\"\n                Abort\n                ${Break}\n        ${EndSwitch}\n    FunctionEnd\n\n## History\n\nAdded in NSIS v1.80\n\n[1]: Call.md\n[2]: Goto.md\n[3]: Return.md\n";

var GetTempFileName = "# GetTempFileName\n\nAssign to the user variable $x, the name of a temporary file. The file will have been created, so you can then overwrite it with what you please. The name of the temporary file is guaranteed to be unique. If to want the temporary file to be created in another directory than the Windows temp directory, specify a base_dir. [`Delete`][1] the file when done with it.\n\n## Parameters\n\n    user_var(output) base_dir\n\n## Example\n\n    GetTempFileName $0\n    File /oname=$0 something.dat\n    # do something with something.dat\n    Delete $0\n\n## History\n\nAdded in NSIS v1.90\n\n[1]: Delete.md\n";

var Goto = "# Goto\n\nIf label is specified, goto the label 'label_to_jump_to:'.\n\nIf `+offset` or `-offset` is specified, jump is relative by offset instructions. Goto +1 goes to the next instruction, Goto -1 goes to the previous instruction, etc.\n\nIf a user variable is specified, jumps to absolute address (generally you will want to get this value from a function like [`GetLabelAddress`][1]). Compiler flag commands and SectionIn aren't instructions so jumping over them has no effect.\n\n## Parameters\n\n    label_to_jump_to | +offset| -offset| user_var(target)\n\n## Example\n\n    Goto label\n    Goto +2\n    Goto -2\n    Goto $0\n\n## History\n\nAdded in NSIS v1.4 Beta\n\n[1]: GetLabelAddress.md\n";

var HideWindow = "# HideWindow\n\nHides the installer.\n\n## History\n\nAdded in NSIS v1.1b\n";

var Icon = "# Icon\n\nSets the icon of the installer. Every image in the icon file will be included in the installer. Use [`UninstallIcon`][1] to set the uninstaller icon.\n\n## Parameters\n\n    [path\\]icon.ico\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: UninstallIcon.md\n";

var IfAbort = "# IfAbort\n\nIf [`Abort`][1] is called it will \"return\" true. This can happen if the user chose abort on a file that failed to create (or overwrite) or if the user aborted by hand. This function can only be called from the leave function of the instfiles page.\n\n## Parameters\n\n    label_to_goto_if_abort [label_to_goto_if_no_abort]\n\n## Example\n\n    Page instfiles \"\" \"\" instfilesLeave\n     \n    Function instfilesLeave\n        IfAbort 0 +2\n        MessageBox MB_OK \"user aborted\"\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0\n\n[1]: Abort.md\n";

var IfErrors = "# IfErrors\n\nChecks and clears the error flag, and if it is set, it will [`Goto`][1] jumpto\\_iferror, otherwise it will [`Goto`][1] jumpto\\_ifnoerror. The error flag is set by other instructions when a recoverable error (such as trying to delete a file that is in use) occurs.\n\n## Parameters\n\n    jumpto_iferror [jumpto_ifnoerror]\n\n## Example\n\n    ClearErrors\n    File file.dat\n    IfErrors 0 +2\n    Call ErrorHandler\n\n## History\n\nAdded in NSIS v1.2g\n\n[1]: Goto.md\n";

var IfFileExists = "# IfFileExists\n\nChecks for existence of file(s) file\\_to\\_check\\_for (which can be a wildcard, or a directory), and [`Goto`][1] jump\\_if\\_present if the file exists, otherwise [`Goto`][1] jump_otherwise. If you want to check to see if a file is a directory, use IfFileExists DIRECTORY\\*\n\n## Parameters\n\n    file_to_check_for jump_if_present [jump_otherwise]\n\n## Example\n\n    IfFileExists $WINDIR\\notepad.exe 0 +2\n    MessageBox MB_OK \"notepad is installed\"\n\nYou can also use labels, which may help make your code easier to read:\n\n    IfFileExists $INSTDIR\\somefile.txt file_found file_not_found\n    \n    file_found:\n    MessageBox MB_OK \"somefile.txt was found\"\n    Goto done\n    \n    file_not_found:\n    MessageBox MB_OK \"somefile.txt was not found\"\n    \n    done:\n    ; ...\n\n## History\n\nAdded in NSIS v1.1n\n\n[1]: Goto.md\n";

var IfRebootFlag = "# IfRebootFlag\n\nChecks the reboot flag, and jumps to jump\\_if\\_set if the reboot flag is set, otherwise jumps to jump\\_if\\_not_set. The reboot flag can be set by [`Delete`][1] and [`Rename`][2], or manually with [`SetRebootFlag`][3].\n\n## Parameters\n\n    jump_if_set [jump_if_not_set]\n\n## Example\n\n    IfRebootFlag 0 noreboot\n    MessageBox MB_YESNO \"A reboot is required to finish the installation. Do you wish to reboot now?\" IDNO noreboot\n    Reboot\n    noreboot:\n\n## History\n\nAdded in NSIS v1.70\n\n[1]: Delete.md\n[2]: Rename.md\n[3]: SetRebootFlag.md\n";

var IfRtlLanguage = "# IfRtlLanguage\n\nChecks if active language is a RTL language.\n\n**Warning:** Do not call this in `[un].onInit` because the language file has not been fully initialized.\n\n## Parameters\n\n    jump_if_true [jump_if_false]\n\n## History\n\nAdded in NSIS v3.06\n";

var IfShellVarContextAll = "# IfShellVarContextAll\n\nChecks if [`SetShellVarContext`][1] is set to all.\n\n**Warning:** Do not call this in `[un].onInit` because the language file has not been fully initialized.\n\n## Parameters\n\n    jump_if_true [jump_if_false]\n\n## History\n\nAdded in NSIS v3.06\n\n[1]: SetShellVarContext.md\n";

var IfSilent = "# IfSilent\n\nChecks the silent flag, and jumps to jump\\_if\\_silent if the installer is silent, otherwise jumps to jump\\_if\\_not. The silent flag can be set by [`SilentInstall`][1], [`SilentUninstall`][2], [`SetSilent`][3] and by the user passing `/S` on the command line.\n\n## Parameters\n\n    jump_if_set [jump_if_not_set]\n\n## Example\n\n    IfSilent +2\n    ExecWait '\"$INSTDIR\\nonsilentprogram.exe\"'\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: SilentInstall.md\n[2]: SilentUnInstall.md\n[3]: SetSilent.md\n";

var InitPluginsDir = "# InitPluginsDir\n\nInitializes the plug-ins directory [`$PLUGINSDIR`][1] if not already initialized.\n\n## Example\n\n    InitPluginsDir\n    File /oname=$PLUGINSDIR\\image.bmp image.bmp\n\n## History\n\nAdded in NSIS v2.0 Beta 0\n\n[1]: ../Variables/PLUGINSDIR.md\n";

var InstallButtonText = "# InstallButtonText\n\nIf parameter is specified, overrides the default install button text (of \"Install\") with the specified text.\n\nAccepts variables. If variables are used, they must be initialized before the install button shows.\n\n## Parameters\n\n    install_button_text\n\n## History\n\nAdded in NSIS v1.60\n";

var InstallColors = "# InstallColors\n\nSets the colors to use for the install info screen (the default is 00FF00 000000. Use the form RRGGBB (in hexadecimal, as in HTML, only minus the leading '#', since # can be used for comments). Note that if `/windows` is specified as the only parameter, the default windows colors will be used.\n\n## Parameters\n\n    /windows | (foreground_color background_color)\n\n## History\n\nAdded in NSIS v1.2f\n";

var InstallDir = "# InstallDir\n\nSets the default installation directory. See the variables section for variables that can be used to make this string (especially [`$PROGRAMFILES`][1]). Note that the part of this string following the last \\ will be used if the user selects 'browse', and may be appended back on to the string at install time (to disable this, end the directory with a \\ (which will require the entire parameter to be enclosed with quotes). If this doesn't make any sense, play around with the browse button a bit.\n\n## Parameters\n\n    definstdir\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: ../Variables/PROGRAMFILES.md\n";

var InstallDirRegKey = "# InstallDirRegKey\n\nThis attribute tells the installer to check a string in the registry and use it as the install dir if that string is valid. If this attribute is present, it will override the [`InstallDir`][1] attribute if the registry key is valid, otherwise it will fall back to the [`InstallDir`][1] value. When querying the registry, this command will automatically remove any quotes. If the string ends in \".exe\", it will automatically remove the filename component of the string (i.e. if the string is \"C:\\\\Program Files\\\\Foo\\\\app.exe\", it will know to use \"C:\\\\Program Files\\\\Foo\"). For more advanced install directory configuration, set [`$INSTDIR`][2] in [`.onInit`][3].\n\nLanguage strings and variables cannot be used with `InstallDirRegKey`.\n\n## Parameters\n\n    root_key subkey key_name\n\n## Example\n\n    InstallDirRegKey HKLM Software\\NSIS \"\"\n    InstallDirRegKey HKLM Software\\ACME\\Thingy InstallLocation\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: InstallDir.md\n[2]: ../Variables/INSTDIR.md\n[3]: ../Callbacks/onInit.md\n";

var InstProgressFlags = "# InstProgressFlags\n\nValid values for flag are \"smooth\" (smooth the progress bar) or \"colored\" (color the progress bar with the colors set by [`InstallColors`][1].\n\nNote: neither \"smooth\" or \"colored\" work with [`XPStyle`][2] on when the installer runs on Windows XP with a modern theme.\n\n## Parameters\n\n    [flag [...]]\n\n## Example\n\n    InstProgressFlags #default old-school windows look\n    InstProgressFlags smooth\" #new smooth look\n    InstProgressFlags smooth colored #colored smooth look whee\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: InstallColors.md\n[2]: XPStyle.md\n";

var InstType = "# InstType\n\nAdds an install type to the install type list, or disables the custom install type. There can be as many as 32 types, each one specifying the name of the install type. If the name is prefixed with 'un.' it is an uninstaller install type. The name can contain variables which will be processed at runtime before the components page shows. Another way of changing the InstType name during runtime is the [`InstTypeSetText`][1] command. The difference is that with [`InstTypeSetText`][1] you are saving your precious user variables. The first type is the default (generally 'Typical'). If the `/NOCUSTOM` switch is specified, then the \"custom\" install type is disabled, and the user has to choose one of the pre-defined install types. Alternatively, if the `/CUSTOMSTRING` switch is specified, the parameter will override the \"Custom\" install type text. Alternatively, if the `/COMPONENTSONLYONCUSTOM` flag is specified, the component list will only be shown if the \"Custom\" install type is selected.\n\nAccepts variables for type names. If variables are used, they must be initialized before the components page is created.\n\n## Parameters\n\n    install_type_name | /NOCUSTOM | /CUSTOMSTRING=str | /COMPONENTSONLYONCUSTOM\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: InstTypeSetText.md\n";

var InstTypeGetText = "# InstTypeGetText\n\nGets the Text of the specified [`InstType`][1].\n\n## Parameters\n\n    inst_type_idx user_var\n\n## Example\n\n    InstType a\n    InstType b\n     \n    Function .onInit\n        InstTypeGetText 0 $0\n        DetailPrint $0 # prints 'a'\n        InstTypeGetText 1 $0\n        DetailPrint $0 # prints 'b'\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0\n\n[1]: InstType.md\n";

var InstTypeSetText = "# InstTypeSetText\n\nSets the Text of the specified [`InstType`][1]. If the Text is empty than the [`InstType`][1] is removed. By using a previously unused inst\\_type\\_idx number you can create new [`InstType`][1]. To add/remove [`Section`][2] to this new [`InstType`][1] see [`SectionSetInstTypes`][3]. Unlike [`SectionIn`][4] the index is zero based, which means the first install type's index is 0.\n\nGets the Text of the specified [`InstType`][1].\n\n## Parameters\n\n    inst_type_idx text\n\n## Example\n\n    InstType a\n    InstType b\n     \n    Function .onInit\n        InstTypeGetText 0 $0\n        DetailPrint $0 # prints 'a'\n        InstTypeGetText 1 $0\n        DetailPrint $0 # prints 'b'\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0\n\n[1]: InstType.md\n[2]: Section.md\n[3]: SectionSetInstTypes.md\n[4]: SectionIn.md\n";

var Int64Cmp = "# Int64Cmp\n\n*This function is only available when building a 64-bit installer.*\n\nCompares two integers val1 and val2. If val1 and val2 are equal, [`Goto`][1] jump\\_if\\_equal, otherwise if val1 < val2, [`Goto`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [`Goto`][1] jump\\_if\\_val1_more. Same as [IntCmp][2], but treats the values as 64-bit integers.\n\n## Parameters\n\n    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]\n\n## History\n\nAdded in NSIS v3.03\n\n[1]: Goto.md\n[2]: IntCmp.md\n";

var Int64CmpU = "# Int64CmpU\n\n*This function is only available when building a 64-bit installer.*\n\nCompares two unsigned integers val1 and val2. If val1 and val2 are equal, [`Goto`][1] jump\\_if\\_equal, otherwise if val1 < val2, [`Goto`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [`Goto`][1] jump\\_if\\_val1\\_more. Performs the comparison as unsigned integers. Same as [IntCmpU][2], but treats the values as 64-bit integers.\n\n## Parameters\n\n    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]\n\n## History\n\nAdded in NSIS v3.03\n\n[1]: Goto.md\n[2]: IntCmpU.md\n";

var Int64Fmt = "# Int64Fmt\n\n*This function is only available when building a 64-bit installer.*\n\nFormats the number in \"numberstring\" using the format \"format\", and sets the output to user variable $x. Example format strings include \"%08X\" \"%u\"\n\n## Parameters\n\n    user_var(output) format numberstring\n\n## Example\n\n    Int64Fmt $0 \"%I64x\" 244837743786702\n\n## History\n\nAdded in NSIS v3.03\n";

var IntCmp = "# IntCmp\n\nCompares two integers val1 and val2. If val1 and val2 are equal, [`Goto`][1] jump\\_if\\_equal, otherwise if val1 < val2, [`Goto`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [`Goto`][1] jump\\_if\\_val1_more.\n\n## Parameters\n\n    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]\n\n## Example\n\n    IntCmp $0 5 is5 lessthan5 morethan5\n    is5:\n      DetailPrint \"$$0 == 5\"\n      Goto done\n    lessthan5:\n      DetailPrint \"$$0 < 5\"\n      Goto done\n    morethan5:\n      DetailPrint \"$$0 > 5\"\n      Goto done\n    done:\n\n## History\n\nAdded in NSIS v1.50\n\n[1]: Goto.md\n";

var IntCmpU = "# IntCmpU\n\nCompares two unsigned integers val1 and val2. If val1 and val2 are equal, [`Goto`][1] jump\\_if\\_equal, otherwise if val1 < val2, [`Goto`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [`Goto`][1] jump\\_if\\_val1\\_more. Performs the comparison as unsigned integers.\n\n## Parameters\n\n    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: Goto.md\n";

var IntFmt = "# IntFmt\n\nFormats the number in \"numberstring\" using the format \"format\", and sets the output to user variable $x. Example format strings include \"%08X\" \"%u\"\n\n## Parameters\n\n    user_var(output) format numberstring\n\n## Example\n\n    IntFmt $0 \"0x%08X\" 195948557\n    IntFmt $0 \"%c\" 0x41\n\n## History\n\nAdded in NSIS v1.60b\n";

var IntOp = "# IntOp\n\nCombines value1 and (depending on OP) value2 into the specified user variable (user_var). OP is defined as one of the following:\n\n* \"+\" ADDs value1 and value2\n* \"-\" SUBTRACTs value2 from value1\n* \"∗\" MULTIPLIEs value1 and value2\n* \"/\" DIVIDEs value1 by value2\n* \"%\" MODULUSs value1 by value2\n* \"|\" BINARY ORs value1 and value2\n* \"&\" BINARY ANDs value1 and value2\n* \"^\" BINARY XORs value1 and value2\n* \">>\" RIGHT SHIFTs value1 by value2\n* \"<<\" LEFT SHIFTs value1 by value2\n* \"~\" BITWISE NEGATEs value1 (i.e. 7 becomes 4294967288)\n* \"!\" LOGICALLY NEGATEs value1 (i.e. 7 becomes 0)\n* \"||\" LOGICALLY ORs value1 and value2\n* \"&&\" LOGICALLY ANDs value1 and value2\n\n## Parameters\n\n    user_var(output) value1 OP [value2]\n\n## Example\n\n    IntOp $0 1 + 1\n    IntOp $0 $0 + 1\n    IntOp $0 $0 << 2\n    IntOp $0 $0 ~\n    IntOp $0 $0 & 0xF\n\n## History\n\nAdded in NSIS v1.50\n";

var IntPtrCmp = "# IntPtrCmp\n\nCompares two integers val1 and val2. If val1 and val2 are equal, [`Goto`][1] jump\\_if\\_equal, otherwise if val1 < val2, [`Goto`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [`Goto`][1] jump\\_if\\_val1_more. Same as [IntCmp][2], but treats the values as pointer sized integers.\n\n## Parameters\n\n    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]\n\n## History\n\nAdded in NSIS v3.03\n\n[1]: Goto.md\n[2]: IntCmp.md\n";

var IntPtrCmpU = "# IntPtrCmpU\n\nCompares two integers val1 and val2. If val1 and val2 are equal, [`Goto`][1] jump\\_if\\_equal, otherwise if val1 < val2, [`Goto`][1] jump\\_if\\_val1\\_less, otherwise if val1 > val2, [`Goto`][1] jump\\_if\\_val1_more. Same as [IntCmpU][2], but treats the values as pointer sized integers.\n\n## Parameters\n\n    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]\n\n## History\n\nAdded in NSIS v3.03\n\n[1]: Goto.md\n[2]: IntCmpU.md\n";

var IntPtrOp = "# IntPtrOp\n\nCombines value1 and (depending on OP) value2 into the specified user variable (`user_var`). OP is the same list of operators as supported by [`IntOp`][1].\n\n## Parameters\n\n    user_var(output) value1 OP [value2]\n\n## History\n\nAdded in NSIS v3.03\n\n[1]: IntOp.md\n";

var IsWindow = "# IsWindow\n\nIf HWND is a window, [`Goto`][1] jump\\_if\\_window, otherwise, [`Goto`][1] jump\\_if\\_not_window (if specified).\n\n## Parameters\n\n    HWND jump_if_window [jump_if_not_window]\n\n## Example\n\n    GetDlgItem $0 $HWNDPARENT 1\n    IsWindow $0 0 +3\n    MessageBox MB_OK \"found a window\"\n    Goto +2\n    MessageBox MB_OK \"no window\"\n\n## History\n\nAdded in NSIS v1.51\n\n[1]: Goto.md\n";

var LangString = "# LangString\n\nDefines a multilingual string. This means its value may be different (or not, it's up to you) for every language. It allows you to easily make your installer multilingual without the need to add massive switches to the script.\n\nEach language string has a name that identifies it and a value for each language used by the installer. They can be used in any runtime string in the script. To use a language string all you need to add to the string is `$(LangString_name_here)` where you want the `LangString` to be inserted.\n\nNotes:\n\n* Unlike defines that use curly braces - {}, language strings use parenthesis - ().\n* If you change the language in the [`.onInit`][1] function, note that language strings in [`.onInit`][1] will still use the detected language based on the user's default Windows language, because the language is initialized after [`.onInit`][1].\n* Always set language strings for every language in your script.\n* If you set the language ID to 0 the last used language by `LangString` or [`LoadLanguageFile`][2] will be used.\n\n## Parameters\n\n    name language_id string\n\n## Example\n\n    LangString message ${LANG_ENGLISH} \"English message\"\n    LangString message ${LANG_FRENCH} \"French message\"\n    LangString message ${LANG_KOREAN} \"Korean message\"\n\n    MessageBox MB_OK \"A translated message: $(message)\"\n\n## History\n\nAdded in NSIS v2.0 Release Candidate 2\n\n[1]: ../Callbacks/onInit.md\n[2]: LoadLanguageFile.md\n";

var LicenseBkColor = "# LicenseBkColor\n\nSets the background color of the license data. Color is specified using the form RRGGBB (in hexadecimal, as in HTML, only minus the leading '#', since # can be used for comments). Default is `/gray`. You can also use the Windows OS defined color by using `/windows`.\n\n## Parameters\n\n    color | /gray | /windows\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n";

var LicenseData = "# LicenseData\n\nSpecifies a text file or a RTF file to use for the license that the user can read. Omit this to not have a license displayed. Note that the file must be in DOS text format (\\\\r\\\\n). To define a multilingual license data use [`LicenseLangString`][1].\n\nIf you are using a RTF file it is recommended that you edit it with WordPad and not MS Word. Using WordPad will result in a much smaller file.\n\nUse [`LicenseLangString`][1] to show a different license for every language.\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: LicenseLangString.md\n";

var LicenseForceSelection = "# LicenseForceSelection\n\nSpecifies if the displayed license must be accept explicit or not. This can be done either by a checkbox or by radiobuttons. By default the \"next button\" is disabled and will only be enabled if the checkbox is enabled or the correct radio button is selected. If off is specified the \"next button\" is enabled by default.\n\n## Parameters\n\n    (checkbox [accept_text] | radiobuttons [accept_text] [decline_text] | off)\n\n## Example\n\n    LicenseForceSelection checkbox\n    LicenseForceSelection checkbox \"i accept\"\n    LicenseForceSelection radiobuttons\n    LicenseForceSelection radiobuttons \"i accept\"\n    LicenseForceSelection radiobuttons \"i accept\" \"i decline\"\n    LicenseForceSelection radiobuttons \"\" \"i decline\"\n    LicenseForceSelection off\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var LicenseLangString = "# LicenseLangString\n\nDoes the same as [`LangString`][1] only it loads the string from a text/RTF file and defines a special [`LangString`][1] that can be used only by [`LicenseData`][2].\n\n## Parameters\n\n    name language_id license_path\n\n## Example\n\n    LicenseLangString license ${LANG_ENGLISH} license-english.txt\n    LicenseLangString license ${LANG_FRENCH} license-french.txt\n    LicenseLangString license ${LANG_GERMAN} license-german.txt\n    LicenseData $(license)\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: LangString.md\n[2]: LicenseData.md\n";

var LicenseText = "# LicenseText\n\nUsed to change the default text on the license page.\n\nThe default string will be used if a string is empty (\"\").\n\nAccepts variables. If variables are used, they must be initialized before the license page is created.\n\n## Parameters\n\n    [text [button_text]]\n\n* text: Text above the controls, to the right of the installation icon.\n* button_text: Text on the \"I Agree\" button.\n\n## History\n\nAdded in NSIS v1.0f\n";

var LoadAndSetImage = "# PERemoveResource\n\nRemoves a resource added with [`PEAddResource`][PEAddResource].\n\n## Parameters\n\n    [/NOERRORS] restype resname reslang|ALL\n\n## Example\n\n    PERemoveResource \"#Icon\" \"#200\" ALL\n\n## History\n\nAdded in NSIS v3.05\n\n[PEAddResource]: PEAddResource.md\n";

var LoadLanguageFile = "# LoadLanguageFile\n\nLoads a language file for the construction of a language table. All of the language files that come with NSIS are in Contrib\\Language Files\nAfter you have inserted the language file `${LANG_langfile}` will be defined as the language id (for example, `${LANG_ENGLISH}` will be defined as 1033). Use it with [`LangString`][1], [`LicenseLangString`][2], [`LangDLL`][3] and [`VIAddVersionKey`][4].\n\n## Parameters\n\n    language_file.nlf\n\n## History\n\nAdded in NSIS v2.0 Alpha 3\n\n[1]: LangString.md\n[2]: LicenseLangString.md\n[3]: LangDLL.md\n[4]: VIAddVersionKey.md\n";

var LockWindow = "# LockWindow\n\n`LockWindow` on prevents the main window from redrawing itself upon changes. When `LockWindow off` is used, all controls that weren't redrawn since `LockWindow on` will be redrawn. This makes the pages flickering look nicer because now it flickers a group of controls at the same time, instead of one control at a time. The individual control flickering is more noticeable on old computers.\n\n## Parameters\n\n    on|off\n\n## History\n\nAdded in NSIS v2.0\n";

var LogSet = "# LogSet\n\nSets whether install logging to install.log will happen. [`$INSTDIR`][1] must have a value before you call this function or it will not work. Note that the NSIS\\_CONFIG\\_LOG build setting must be set (scons NSIS\\_CONFIG\\_LOG=yes) on compile time (it is not by default) to support this.\n\nSee [Building NSIS][2] for more information about recompiling NSIS.\n\n## Parameters\n\n    on|off\n\n## History\n\nAdded in NSIS v1.98\n\n[1]: ../Variables/INSTDIR.md\n[2]: http://nsis.sourceforge.net/Docs//AppendixG.html#G\n";

var LogText = "# LogText\n\nIf installer logging is enabled, inserts text \"text\" into the log file.\n\n## Parameters\n\n    text\n\n## Example\n\n    IfFileExists $WINDIR\\notepad.exe 0 +2\n    LogText \"$$WINDIR\\notepad.exe exists\"\n\n## History\n\nAdded in NSIS v2.0 Release Candidate 2\n";

var ManifestDPIAware = "# ManifestDPIAware\n\nDeclare that the installer is DPI-aware. A DPI-aware application is not scaled by the DWM (DPI virtualization) so the text is never blurry. NSIS does not scale the bitmap used by the tree control on the component page and some plugins might have compatibility issues so make sure that you test your installer at different DPI settings if you select true.\n\nSee [MSDN][1] for more information about DPI-aware applications.\n\n## Parameters\n\n    notset|true|false\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: http://msdn.microsoft.com/en-us/library/dd464660\n";

var ManifestLongPathAware = "# ManifestLongPathAware\n\nDeclare that the installer can handle paths longer than `MAX_PATH`. Only supported on Windows 10 Anniversary Update and later.\n\n**Note:** Instructions like [`CopyFiles`][CopyFiles] and [`CreateShortcut`][CreateShortcut] do not support long paths!\n\n## Parameters\n\n    notset|true|false\n\n## History\n\nAdded in NSIS v3.05\n\n[CopyFiles]: CopyFiles.md\n[CreateShortcut]: CreateShortcut.md\n";

var ManifestMaxVersionTested = "# ManifestMaxVersionTested\n\n## Parameters\n\n    maj.min.bld.rev\n\n## History\n\nAdded in NSIS v3.05\n";

var ManifestSupportedOS = "# ManifestSupportedOS\n\nDeclare that the installer is compatible with the specified Windows version(s). This adds a SupportedOS entry in the compatibility section of the application manifest. The default is Win7+8+8.1+10. none is the default if [`RequestExecutionLevel`][1] is set to none for compatibility reasons.\n\nYou can read more about the changes in behavior on [MSDN][2].\n\n## Parameters\n\n    none|all|WinVista|Win7|Win8|Win10|{GUID} [...]\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: RequestExecutionLevel.md\n[2]: http://msdn.microsoft.com/en-us/library/windows/desktop/hh848036\n";

var MessageBox = "# MessageBox\n\nDisplays a `MessageBox` containing the text \"messagebox\\_text\". mb\\_option\\_list must be one or more of the following, delimited by |s (e.g. MB\\_YESNO|MB\\_ICONSTOP).\n\n* MB_OK - Display with an OK button\n* MB_OKCANCEL - Display with an OK and a cancel button\n* MB_ABORTRETRYIGNORE - Display with abort, retry, ignore buttons\n* MB_RETRYCANCEL - Display with retry and cancel buttons\n* MB_YESNO - Display with yes and no buttons\n* MB_YESNOCANCEL - Display with yes, no, cancel buttons\n* MB_ICONEXCLAMATION - Display with exclamation icon\n* MB_ICONINFORMATION - Display with information icon\n* MB_ICONQUESTION - Display with question mark icon\n* MB_ICONSTOP - Display with stop icon\n* MB_USERICON - Display with installer's icon\n* MB_TOPMOST - Make messagebox topmost\n* MB_SETFOREGROUND - Set foreground\n* MB_RIGHT - Right align text\n* MB_RTLREADING - RTL reading order\n* MB_DEFBUTTON1 - Button 1 is default\n* MB_DEFBUTTON2 - Button 2 is default\n* MB_DEFBUTTON3 - Button 3 is default\n* MB_DEFBUTTON4 - Button 4 is default\n\nReturn_check can be 0 (or empty, or left off), or one of the following:\n\n* IDABORT - Abort button\n* IDCANCEL - Cancel button\n* IDIGNORE - Ignore button\n* IDNO - No button\n* IDOK - OK button\n* IDRETRY - Retry button\n* IDYES - Yes button\n\nIf the return value of the `MessageBox` is return_check, the installer will [`Goto`][1] jumpto.\nUse the `/SD` parameter with one of the return_check values above to specify the option that will be used when the installer is silent. See section [4.12][2] for more information.\n\n## Parameters\n\n    mb_option_list messagebox_text [/SD return] [return_check jumpto] [return_check_2 jumpto_2]\n\n## Example\n\n    MessageBox MB_OK \"simple message box\"\n    MessageBox MB_YESNO \"is it true?\" IDYES true IDNO false\n    true:\n      DetailPrint \"it's true!\"\n      Goto next\n    false:\n      DetailPrint \"it's false\"\n    next:\n    MessageBox MB_YESNO \"is it true? (defaults to yes on silent installations)\" /SD IDYES IDNO false2\n      DetailPrint \"it's true (or silent)!\"\n      Goto next2\n    false2:\n      DetailPrint \"it's false\"\n    next2:\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: Goto.md\n[2]: http://nsis.sourceforge.net/Docs//Chapter4.html#4.12\n";

var MiscButtonText = "# MiscButtonText\n\nReplaces the default text strings for the four buttons (< Back, Next >, Cancel and Close). If parameters are omitted, the defaults are used.\nAccepts variables. If variables are used, they must be initialized in [`.onInit`][1].\n\n## Parameters\n\n    [back_button_text [next_button_text] [cancel_button_text] [close_button_text]]\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: ../Callbacks/onInit.md\n";

var Name = "# Name\n\nSets the name of the installer. The name is usually simply the product name such as 'MyApp' or 'CrapSoft MyApp'. If you have one or more ampersands (&) in the name, set the second parameter to the same name, only with doubled ampersands.\n\nAccepts variables. If variables are used, they must be initialized in [`.onInit`][1].\n\n## Parameters\n\n    name [name_doubled_ampersands]\n\n## Example\n\n    Name \"Foobar\"\n\nIf your product's name is \"Foo & Bar\", use:\n\n    Name \"Foo & Bar\" \"Foo && Bar\"\n\nIf you have ampersands in the name and use a [`LangString`][2] for the name, you will have to create another one with doubled ampersands to use as the second parameter.\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: ../Callbacks/onInit.md\n[2]: LangString.md\n";

var Nop = "# Nop\n\nDoes nothing.\n\n## History\n\nAdded in NSIS v1.1n\n";

var OutFile = "# OutFile\n\nSpecifies the output file that the MakeNSIS should write the installer to. This is just the file that MakeNSIS writes, it doesn't affect the contents of the installer.\n\n## Parameters\n\n    [path\\]install.exe\n\n## History\n\nAdded in NSIS v1.0f\n";

var Page = "# Page\n\nAdds an installer page. See the above sections for more information about built-in versus custom pages and about callback functions.\n\ninternal_page_type can be:\n\n* license - license page\n* components - components selection page\n* directory - installation directory selection page\n* instfiles - installation page where the sections are executed\n* uninstConfirm - uninstall confirmation page\n\nThe last page of the installer has its cancel button disabled to prevent confusion. To enable it anyway, use `/ENABLECANCEL`.\n\n## Parameters\n\n    custom [creator_function] [leave_function] [caption] [/ENABLECANCEL]\n\n    internal_page_type [pre_function] [show_function] [leave_function] [/ENABLECANCEL]\n\n## History\n\nAdded in NSIS v2.0 Beta 0\n";

var PageCallbacks = "# PageCallbacks\n\nSets the callback functions for a page defined using [`PageEx`][1]. Can only be used inside a [`PageEx`][1] block. See the above sections for more information about callback functions.\n\n## Parameters\n\n    ([creator_function] [leave_function]) | ([pre_function] [show_function] [leave_function])\n\n## Example\n\n    PageEx license\n        PageCallbacks licensePre licenseShow licenseLeave\n    PageExEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 0\n\n[1]: PageEx.md\n";

var PageEx = "# PageEx\n\nAdds an installer page or an uninstaller page if the un. prefix was used. Every `PageEx` must have a matching [`PageExEnd`][1]. In a `PageEx` block you can set options that are specific to this page and will not be used for other pages. Options that are not set will revert to what was set outside the `PageEx` block or the default if nothing was set. To set the sub-caption for a page use [`Caption`][2] or [`SubCaption`][3] to set the default. To set the callback functions for a page set with `PageEx` use [`PageCallbacks`][4]. See the above sections for more information about built-in versus custom pages.\n\n## Parameters\n\n    [un.](custom|uninstConfirm|license|components|directory|instfiles)\n\n## Example\n\n    PageEx license\n        LicenseText \"Readme\"\n        LicenseData readme.rtf\n    PageExEnd\n\n    PageEx license\n        LicenseData license.txt\n        LicenseForceSelection checkbox\n    PageExEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: PageExEnd.md\n[2]: Caption.md\n[3]: SubCaption.md\n[4]: PageCallbacks.md\n";

var PageExEnd = "# PageEx\n\nEnds a [`PageEx`][1] block.\n\n## Example\n\n    PageEx license\n        LicenseText \"Readme\"\n        LicenseData readme.rtf\n    PageExEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: PageEx.md\n";

var PEAddResource = "# PEAddResource\n\nAdds `file` as a resource to the installer and uninstaller. `restype` specifies the resource type and can be any string or # followed by a standard type or number. `resname` must be # followed by a number. `reslang` is optional and specifies the language id of the resource. Replacing standard NSIS resources is not supported, you should use [`Icon`][Icon] and [`ChangeUI`][ChangeUI] instead.\n\n## Parameters\n\n    [/OVERWRITE|/REPLACE] file restype resname [reslang]\n\n## Example\n\n    PEAddResource 0x020 0\n\n## History\n\nAdded in NSIS v3.05\n\n[Icon]: Icon.md\n[ChangeUI]: ChangeUI.md\n";

var PEDllCharacteristics = "# PEDllCharacteristics\n\n*This command has not yet been officially documented*\n\n## Parameters\n\n    addbits removebits\n\n## Example\n\n    PEDllCharacteristics 0x020 0\n\n## History\n\nAdded in NSIS v3.0 Beta 1\n";

var PERemoveResource = "# PERemoveResource\n\nRemoves a resource added with [`PEAddResource`][PEAddResource].\n\n## Parameters\n\n    [/NOERRORS] restype resname reslang|ALL\n\n## Example\n\n    PERemoveResource \"#Icon\" \"#200\" ALL\n\n## History\n\nAdded in NSIS v3.05\n\n[PEAddResource]: PEAddResource.md\n";

var PESubsysVer = "# PESubsysVer\n\n*This command has not yet been officially documented*\n\n## Parameters\n\n    major.minor\n\n## Example\n\n    PESubsysVer 1.2\n\n## History\n\nAdded in NSIS v3.0 Beta 2\n";

var Pop = "# Pop\n\nPops a string off of the stack into user variable $x. If the stack is empty, the error flag will be set.\n\n## Parameters\n\n    user_var(out)\n\n## Example\n\n    Push 1\n    Pop $0 # = 1\n\n## History\n\nAdded in NSIS v1.50\n";

var Push = "# Push\n\nPushes a string onto the stack. The string can then be popped off of the stack using the [`Pop`][1] command.\n\n## Parameters\n\n    string\n\n## Example\n\n    Push \"a string\"\n\n## History\n\nAdded in NSIS v1.50\n\n[1]: Pop.md\n";

var Quit = "# Quit\n\nCauses the installer to exit as soon as possible. After `Quit` is called, the installer will exit (no callback functions will get a chance to run).\n\n## History\n\nAdded in NSIS v1.90b2\n";

var ReadEnvStr = "# ReadEnvStr\n\nReads from the environment string \"name\" and sets the value into the user variable $x. If there is an error reading the string, the user variable is set to empty, and the error flag is set.\n\n## Parameters\n\n    user_var(output) name\n\n## Example\n\n    ReadEnvStr $0 WINDIR\n    ReadEnvStr $1 TEMP\n\n## History\n\nAdded in NSIS v1.58\n";

var ReadINIStr = "# ReadINIStr\n\nReads from entry\\_name in [section\\_name] of ini\\_filename and stores the value into user variable $x. The error flag will be set and $x will be assigned to an empty string if the entry is not found.\n\n## Parameters\n\n    user_var(output) ini_filename section_name entry_name\n\n## Example\n\n    ReadINIStr $0 $INSTDIR\\winamp.ini winamp outname\n\n## History\n\nAdded in NSIS v1.2g\n";

var ReadRegDWORD = "# ReadRegDWORD\n\nReads a 32 bit DWORD from the registry into the user variable $x. Valid values for root_key are listed under [`WriteRegStr`][1]. The error flag will be set and $x will be set to an empty string (\"\" which is 0) if the DWORD is not present. If the value is present, but is not a DWORD, it will be read as a string and the error flag will be set.\n\n## Parameters\n\n    user_var(output) root_key sub_key name\n\n## Example\n\n    ReadRegDWORD $0 HKLM Software\\NSIS VersionBuild\n\n## History\n\nAdded in NSIS v1.50\n\n[1]: WriteRegStr.md\n";

var ReadRegStr = "# ReadRegStr\n\nReads from the registry into the user variable $x. Valid values for root\\_key are listed under [`WriteRegStr`][1]. The error flag will be set and $x will be set to an empty string (\"\") if the string is not present. If the value is present, but is of type REG\\_DWORD, it will be read and converted to a string and the error flag will be set.\n\n## Parameters\n\n    user_var(output) root_key sub_key name\n\n## Example\n\n    ReadRegStr $0 HKLM Software\\NSIS \"\"\n    DetailPrint \"NSIS is installed at: $0\"\n\n## History\n\nAdded in NSIS v1.2g\n\n[1]: WriteRegStr.md\n";

var Reboot = "# Reboot\n\nReboots the computer. Be careful with this one. If it fails, [`.onRebootFailed`][1] is called. In any case, this instruction never returns, just like [`Quit`][2].\n\n## Example\n\n    MessageBox MB_YESNO|MB_ICONQUESTION \"Do you wish to reboot the system?\" IDNO +2\n    Reboot\n\n## History\n\nAdded in NSIS v1.70\n\n[1]: ../Callbacks/onRebootFailed.md\n[2]: Quit.md\n";

var RegDLL = "# ReadRegStr\n\nLoads the specified DLL and calls DllRegisterServer (or entrypoint\\_name if specified). The error flag is set if an error occurs (i.e. it can't load the DLL, initialize OLE, find the entry point, or the function returned anything other than ERROR\\_SUCCESS (=0)).\n\nUse [`SetOutPath`][1] to set the current directory for DLLs that depend on other DLLs that are now in the path or in the Windows directory\n\n## Parameters\n\n    dllfile [entrypoint_name]\n\n## Example\n\nIf foo.dll depends on bar.dll which is located in $INSTDIR use:\n\n    SetOutPath $INSTDIR\n    RegDLL $INSTDIR\\foo.dll\n\n## History\n\nAdded in NSIS v1.0i\n\n[1]: SetOutPath.md\n";

var Rename = "# Rename\n\nRename source\\_file to dest\\_file. You can use it to move a file from anywhere on the system to anywhere else and you can move a directory to somewhere else on the same drive. The destination file must not exist or the move will fail (unless you are using `/REBOOTOK`). If `/REBOOTOK` is specified, and the file cannot be moved (if, for example, the destination exists), then the file is moved when the system reboots. If the file will be moved on a reboot, the reboot flag will be set. The error flag is set if the file cannot be renamed (and `/REBOOTOK` is not used) or if the source file does not exist.\n\nIf no absolute path is specified the current folder will be used. The current folder is the folder set using the last [`SetOutPath`][1] instruction. If you have not used [`SetOutPath`][1] the current folder is [`$EXEDIR`][1].\n\n## Parameters\n\n    [/REBOOTOK] source_file dest_file\n\n## Example\n\n    Rename $INSTDIR\\file.ext $INSTDIR\\file.dat\n\n## History\n\nAdded in NSIS v1.2\n\n[1]: SetOutPath.md\n[2]: ../Variables/EXEDIR.md\n";

var RequestExecutionLevel = "# RequestExecutionLevel\n\nSpecifies the requested execution level for Windows Vista and Windows 7. The value is embedded in the installer and uninstaller's XML manifest and tells Vista/7, and probably future versions of Windows, what privileges level the installer requires. *user* requests a normal user's level with no administrative privileges. *highest* will request the highest execution level available for the current user and will cause Windows to prompt the user to verify privilege escalation. The prompt might request for the user's password. *admin* requests administrator level and will cause Windows to prompt the user as well. Specifying none, which is also the default, will keep the manifest empty and let Windows decide which execution level is required. Windows Vista/7 automatically identifies NSIS installers and decides administrator privileges are required. Because of this, none and admin have virtually the same effect.\n\nIt's recommended that every application is marked with a required execution level. Unmarked installers are subject to compatibility mode. Workarounds of this mode include automatically moving any shortcuts created in the user's start menu to all users' start menu. Installers that don't install anything into system folders nor write to the local machine registry (HKLM) should specify \\e{user} execution level.\n\nMore information about this topic can be found at [MSDN][1]. Keywords include \"UAC\", \"requested execution level\", \"vista manifest\" and \"vista security\".\n\n## Parameters\n\n    none|user|highest|admin\n\n## History\n\nAdded in NSIS v2.21\n\n[1]: http://msdn.microsoft.com/en-us/library/bb756929\n";

var ReserveFile = "# ReserveFile\n\nReserves a file in the data block for later use. Files are added to the compressed data block in the order they appear in the script. Functions, however, are not necessarily called in the order they appear in the script. Therefore, if you add a file in a function called early but put the function at the end of the script, all of the files added earlier will have to be decompressed to get to the required file. This process can take a long time if there a lot of files. [`.onInit`][1] is one such function. It is called at the very beginning, before anything else appears. If you put it at the very end of the script, extract some files in it and have lots of files added before it, the installer might take a very long time to load. This is where this command comes useful, allowing you to speed up the loading process by including the file at the top of the data block instead of letting NSIS seek all the way down to the bottom of the compressed data block.\n\nSee [`File`][2] for more information about the parameters.\n\n## Parameters\n\n    [/nonfatal] [/r] [/x file|wildcard [...]] file [file...]\n\n## History\n\nAdded in NSIS v2.0 Beta 0\n\n[1]: ../Callbacks/onInit.md\n[2]: File.md\n";

var Return = "# Rename\n\nReturns from a [`Function`][1] or [`Section`][2].\n\n## Example\n\n    Function func\n        StrCmp $0 \"return now\" 0 +2\n        Return\n        # do stuff\n    FunctionEnd\n\n    Section\n        Call func\n        ;\"Return\" will return here\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.80\n\n[1]: Function.md\n[2]: Section.md\n";

var RMDir = "# RMDir\n\nRemove the specified directory (fully qualified path with no wildcards). Without `/r`, the directory will only be removed if it is completely empty. If `/r` is specified, the directory will be removed recursively, so all directories and files in the specified directory will be removed. If `/REBOOTOK` is specified, any file or directory which could not have been removed during the process will be removed on reboot -- if any file or directory will be removed on a reboot, the reboot flag will be set. The error flag is set if any file or directory cannot be removed.\n\n**Warning:** using RMDir /r $INSTDIR in the uninstaller is not safe. Though it is unlikely, the user might select to install to the Program Files folder and so this command will wipe out the entire Program Files folder, including other programs that has nothing to do with the uninstaller. The user can also put other files but the program's files and would expect them to get deleted with the program. Solutions are [available][2] for easily uninstalling only files which were installed by the installer.\n\n## Parameters\n\n    [/r] [/REBOOTOK] directory_name\n\n## Example\n\n    RMDir $INSTDIR\n    RMDir $INSTDIR\\data\n    RMDir /r /REBOOTOK $INSTDIR\n    RMDir /REBOOTOK $INSTDIR\\DLLs\n\nNote that the current working directory can not be deleted. The current working directory is set by [`SetOutPath`][1]. For example, the following example will not delete the directory.\n\n    SetOutPath $TEMP\\dir\n    RMDir $TEMP\\dir\n\nThe next example will succeed in deleting the directory.\n\n    SetOutPath $TEMP\\dir\n    SetOutPath $TEMP\n    RMDir $TEMP\\dir\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: SetOutPath.md\n[2]: http://nsis.sourceforge.net/Uninstall_only_installed_files\n";

var SearchPath = "# SearchPath\n\nAssign to the user variable $x, the full path of the file named by the second parameter. The error flag will be set and $x will be empty if the file cannot be found. Uses SearchPath() to search the system paths for the file.\n\n## Parameters\n\n    user_var(output) filename\n\n## History\n\nAdded in NSIS v1.70\n";

var Section = "# Section\n\nBegins and opens a new section. If section\\_name is empty, omitted, or begins with a -, then it is a hidden section and the user will not have the option of disabling it. If the section name is 'Uninstall' or is prefixed with 'un.', then it is a an uninstaller section. If section\\_index\\_output is specified, the parameter will be [`!define`][1]d with the section index (that can be used for [`SectionSetText`][2] etc). If the section name begins with a !, the section will be displayed as bold. If the /o switch is specified, the section will be unselected by default.\n\n## Parameters\n\n    [/o] [([!]|[-])section_name] [section_index_output]\n\n## Example\n\n    Section \"-hidden section\"\n    SectionEnd\n     \n    Section # hidden section\n    SectionEnd\n     \n    Section \"!bold section\"\n    SectionEnd\n     \n    Section /o \"optional\"\n    SectionEnd\n     \n    Section \"install something\" SEC_IDX\n    SectionEnd\n\nTo access the section index, curly brackets must be used and the code must be located below the section in the script.\n\n    Section test1 sec1_id\n    SectionEnd\n     \n    Section test2 sec2_id\n    SectionEnd\n     \n    Function .onInit\n        SectionGetText ${sec2_id} $0\n        MessageBox MB_OK \"name of ${sec2_id}:$\\n$0\" # will correctly display 'name of 1: test2'\n    FunctionEnd\n\n    Function .onInit\n        SectionGetText ${sec2_id} $0\n        MessageBox MB_OK \"name of ${sec2_id}:$\\n$0\" # will incorrectly display 'name of ${sec2_id}: test1'\n        # plus a warning stating:\n        #   unknown variable/constant \"{sec2_id}\" detected, ignoring\n    FunctionEnd\n     \n    Section test1 sec1_id\n    SectionEnd\n     \n    Section test2 sec2_id\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: !define.md\n[2]: SectionSetText.md\n";

var SectionEnd = "# SectionEnd\n\nThis command closes the current open [`Section`][1].\n\n## Example\n\n    Section \"install something\" SEC_IDX\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.3\n\n[1]: Section.md\n";

var SectionGetFlags = "# SectionGetFlags\n\nRetrieves the section's flags. See above for a description of the flag. The error flag will be set if an out of range section is specified.\n\n## Parameters\n\n    section_index user_var(output)\n\n## Example\n\n    Section test test_section_id\n    SectionEnd\n\n    Function .onSelChange\n        # keep section 'test' selected\n        SectionGetFlags ${test_section_id} $0\n        IntOp $0 $0 | ${SF_SELECTED}\n        SectionSetFlags ${test_section_id} $0\n    FunctionEnd\n\n## History\n\nAdded in NSIS v1.98\n";

var SectionGetInstTypes = "# SectionGetInstTypes\n\nRetrieves the install types flags array of a section. See the explanation about [`SectionSetInstTypes`][1] for a description of how to deal with the output. The error flag will be set if the section index specified is out of range.\n\n## Parameters\n\n    section_index user_var(output)\n\n## Example\n\n    Section test test_section_id\n    SectionEnd\n\n    Function .onInit\n        # associate section 'test' with installation types 5, on top of its existing associations\n        SectionGetInstTypes ${test_section_id} $0\n        IntOp $0 $0 | 16\n        SectionSetInstTypes ${test_section_id} $0\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 3\n\n[1]: SectionSetInstTypes.md\n";

var SectionGetSize = "# SectionGetSize\n\nGets the Size of the section specified by section_index and stores the value in the given User Variable. Note that the Index starts with Zero.\n\n## Parameters\n\n    section_index user_var\n\n## Example\n\n    Section test test_section_id\n    SectionEnd\n\n    Function .onInit\n        # increase required size of section 'test' by 100 bytes\n        SectionGetSize ${test_section_id} $0\n        IntOp $0 $0 + 100\n        SectionSetSize ${test_section_id} $0\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var SectionGetText = "# SectionGetText\n\nStores the text description of the section section_index into the output. If the section is hidden, stores an empty string. The error flag will be set if an out of range section is specified.\n\n## Parameters\n\n    section_index user_var(output)\n\n## Example\n\n    Function .onInit\n        # append $WINDIR to section's name\n        SectionGetText ${test_section_id} $0\n        StrCpy $0 \"$0 - $WINDIR\"\n        SectionSetText ${test_section_id} $0\n    FunctionEnd\n\n## History\n\nAdded in NSIS v1.98\n";

var SectionGroup = "# SectionGroup\n\nThis command inserts a section group. The section group must be closed with [`SectionGroupEnd`][1], and should contain 1 or more sections. If the section group name begins with a !, its name will be displayed with a bold font. If `/e` is present, the section group will be expanded by default. If index_output is specified, the parameter will be [`!define`][2]d with the section index (that can be used for [`SectionSetText`][3] etc). If the name is prefixed with 'un.' the section group is an uninstaller section group.\n\n## Parameters\n\n    [/e] section_group_name [index_output]\n\n## Example\n\n    SectionGroup \"some stuff\"\n        Section \"a section\"\n        SectionEnd\n\n        Section \"another section\"\n        SectionEnd\n    SectionGroupEnd\n\n## History\n\nAdded in NSIS v2.05\n\n[1]: SectionGroupEnd.md\n[2]: !define.md\n[3]: SectionSetText.md\n";

var SectionGroupEnd = "# SectionGroupEnd\n\nCloses a section group opened with [`SectionGroup`][1].\n\n## Example\n\n    SectionGroup \"some stuff\"\n        Section \"a section\"\n        SectionEnd\n\n        Section \"another section\"\n        SectionEnd\n    SectionGroupEnd\n\n## History\n\nAdded in NSIS v2.05\n\n[1]: SectionGroup.md\n";

var SectionIn = "# SectionIn\n\nThis command specifies which install types (see [`InstType`][1]) the current section defaults to the enabled state in. Multiple `SectionIn` commands can be specified (they are combined). If you specify `$RO` as a parameter, then the section will be read-only, meaning the user won't be able to change its state. The first install type defined using [`InstType'][1] is indexed 1, the next 2 and so on.\n\n## Parameters\n\n    insttype_index [insttype_index] [RO]\n\n## Example\n\n    InstType \"full\"\n    InstType \"minimal\"\n     \n    Section \"a section\"\n        SectionIn 1 2\n    SectionEnd\n     \n    Section \"another section\"\n        SectionIn 1\n    SectionEnd\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: InstType.md\n";

var SectionSetFlags = "# SectionSetFlags\n\nSets the section's flags. The flag is a 32 bit integer. The first bit (lowest) represents whether the section is currently selected, the second bit represents whether the section is a section group (don't modify this unless you really know what you are doing), the third bit represents whether the section is a section group end (again, don't modify), the fourth bit represents whether the section is shown in bold or not, the fifth bit represents whether the section is read-only, the sixth bit represents whether the section group is to be automatically expanded, the seventh bit is set for section groups which are partially selected, the eighth bit is internally used for partially selected section group toggling and the ninth bit is used for reflecting section name changes. The error flag will be set if an out of range section is specified.\n\n## Parameters\n\n    section_index section_flags\n\n## Example\n\nEach flag has a name, prefixed with `SF_`:\n\n    !define SF_SELECTED   1\n    !define SF_SECGRP     2\n    !define SF_SECGRPEND  4\n    !define SF_BOLD       8\n    !define SF_RO         16\n    !define SF_EXPAND     32\n    !define SF_PSELECTED  64\n\nFor an example of usage please see the [one-section.nsi][1] example.\n\nFor more useful macros and definitions, see Include\\Sections.nsh.\n\n    Section test test_section_id\n    SectionEnd\n     \n    Function .onInit\n      # set section 'test' as selected and read-only\n      IntOp $0 ${SF_SELECTED} | ${SF_RO}\n      SectionSetFlags ${test_section_id} $0\n    FunctionEnd\n\n## History\n\nAdded in NSIS v1.98\n\n[1]: http://nsis.sourceforge.net/Docs/Examples/one-section.nsi\n";

var SectionSetInstTypes = "# SectionSetInstTypes\n\nSets the install types the section specified by section\\_index defaults to the enabled state in. Note that the section index starts with zero. Every bit of inst\\_types is a flag that tells if the section is in that install type or not. For example, if you have 3 install types and you want the first section to be included in install types 1 and 3, then the command should look like this:\n\n## Parameters\n\n    section_index inst_types\n\n## Example\n\n    SectionSetInstTypes 0 5\n    # because the binary value for 5 is \"00000101\". The error flag will be set if the section index specified is out of range.\n\n    Section test test_section_id\n    SectionEnd\n\n    Function .onInit\n        # associate section 'test' with installation types 3 and 4\n        SectionSetInstTypes ${test_section_id} 12\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 3\n";

var SectionSetSize = "# SectionSetSize\n\nSets the Size of the section specified by section_index. Note that the Index starts with Zero. The Value for Size must be entered in KiloByte and supports only whole numbers.\n\n## Parameters\n\n    section_index new_size\n\n## Example\n\n    Section test test_section_id\n    SectionEnd\n\n    Function .onInit\n        # set required size of section 'test' to 100 bytes\n        SectionSetSize ${test_section_id} 100\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var SectionSetText = "# SectionSetText\n\nSets the description for the section section_index. If the text is set to \"\" then the section will be hidden. The error flag will be set if an out of range section is specified.\n\n## Parameters\n\n    section_index section_text\n\n## Example\n\n    Section \"\" test_section_id\n    SectionEnd\n\n    Function .onInit\n        # change section's name to $WINDIR\n        SectionSetText ${test_section_id} $WINDIR\n    FunctionEnd\n\n## History\n\nAdded in NSIS v1.98\n";

var SendMessage = "# SendMessage\n\nSends a message to HWND. If a user variable $x is specified as the last parameter (or one before the last if you use `/TIMEOUT`), the return value of `SendMessage` will be stored to it. Note that when specifying 'msg' you must just use the integer value of the message. If you wish to send strings use \"STR:a string\" as wParam or lParam where needed.\n\nWM_CLOSE 16\nWM_COMMAND 273\nWM_USER 1024\n\nInclude WinMessages.nsh to have all of Windows messages defined in your script.\n\nTo send a string param, put STR: before the parameter, for example: \"STR:Some string\".\n\nUse /TIMEOUT=time\\_in\\_ms to specify the duration, in milliseconds, of the time-out period.\n\n## Parameters\n\n    HWND msg wparam lparam [user_var(return value)] [/TIMEOUT=time_in_ms]\n\n## Example\n\n    !include WinMessages.nsh\n    FindWindow $0 \"Winamp v1.x\"\n    SendMessage $0 ${WM_CLOSE} 0 0\n\n## History\n\nAdded in NSIS v1.51\n";

var SetAutoClose = "# SetAutoClose\n\nOverrides the default auto window-closing flag (specified for the installer using [`AutoCloseWindow`][1], and false for the uninstaller). Specify 'true' to have the install window immediately disappear after the install has completed, or 'false' to make it require a manual close.\n\n## Parameters\n\n    true|false\n\n## History\n\nAdded in NSIS v1.42\n\n[1]: AutoCloseWindow.md\n";

var SetBrandingImage = "# SetBrandingImage\n\nSets the current bitmap file displayed as the branding image. If no IMGID is specified, the first image control found will be used, or the image control created by [`AddBrandingImage`][1]. Note that this bitmap must be present on the user's machine. Use [`File`][2] first to put it there. If `/RESIZETOFIT` is specified the image will be automatically resized (very poorly) to the image control size. If you used [`AddBrandingImage`][1] you can get this size, by compiling your script and watching for [`AddBrandingImage`][1] output, it will tell you the size. `SetBrandingImage` will not work when called from [`.onInit`][3]!\n\n## Parameters\n\n    [/IMGID=item_id_in_dialog] [/RESIZETOFIT] path_to_bitmap_file.bmp\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n\n[1]: AddBrandingImage.md\n[2]: File.md\n[3]: ../Callbacks/onInit.md\n";

var SetCompress = "# SetCompress\n\nThis command sets the compress flag which is used by the installer to determine whether or not data should be compressed. Typically the `SetCompress` flag will affect the commands after it, and the last `SetCompress` command in the file also determines whether or not the install info section and uninstall data of the installer is compressed. If compressflag is 'auto', then files are compressed if the compressed size is smaller than the uncompressed size. If compressflag is set to 'force', then the compressed version is always used. If compressflag is 'off' then compression is not used (which can be faster).\n\nNote that this option has no effect when solid compression is used.\n\n## Parameters\n\n    auto|force|off\n\n## History\n\nAdded in NSIS v1.0f\n";

var SetCompressor = "# SetCompressor\n\nThis command sets the compression algorithm used to compress files/data in the installer. It can only be used outside of sections and functions and before any data is compressed. Different compression methods can not be used for different files in the same installer. It is recommended to use it on the very top of the script to avoid compilation errors.\n\nThree compression methods are supported: ZLIB, BZIP2 and LZMA.\n\nZLIB (the default) uses the deflate algorithm, it is a quick and simple method. With the default compression level it uses about 300 KB of memory.\n\nBZIP2 usually gives better compression ratios than ZLIB, but it is a bit slower and uses more memory. With the default compression level it uses about 4 MB of memory.\n\nLZMA is a new compression method that gives very good compression ratios. The decompression speed is high (10-20 MB/s on a 2 GHz CPU), the compression speed is lower. The memory size that will be used for decompression is the dictionary size plus a few KBs, the default is 8 MB.\n\nIf `/FINAL` is used, subsequent calls to SetCompressor will be ignored.\n\nIf `/SOLID` is used, all of the installer data is compressed in one block. This results in greater compression ratios.\n\n## Parameters\n\n    [/SOLID] [/FINAL] zlib|bzip2|lzma\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n";

var SetCompressorDictSize = "# SetCompressorDictSize\n\nSets the dictionary size in megabytes (MB) used by the LZMA compressor (default is 8 MB).\n\n## Parameters\n\n    dict_size_mb\n\n## History\n\nAdded in NSIS v2.0\n";

var SetCtlColors = "# SetCtlColors\n\nSets a background color and the text color for a static control, edit control, button or a dialog. text\\_color and bg\\_color don't accept variables. Use [`GetDlgItem`][1] to get the handle (HWND) of the control. To make the control transparent specify \"transparent\" as the background color value. You can also specify `/BRANDING` with or without text color and background color to make the control completely gray (or any other color you choose). This is used by the branding text control in the MUI.\n\nWarning: setting the background color of check boxes to \"transparent\" may not function properly when using [`XPStyle`][2] on. The background may be completely black, instead of transparent, when using certain Windows themes.\n\n## Parameters\n\n    hwnd [/BRANDING] [text_color] [transparent|bg_color]\n\n## Example\n\n    FindWindow $0 \"#32770\" \"\" $HWNDPARENT\n    GetDlgItem $0 $0 1006\n    SetCtlColors $0 0xFF0000 0x00FF00\n\n## History\n\nAdded in NSIS v2.0 Release Candidate 2\n\n[1]: GetDlgItem.md\n[2]: XPStyle.md\n";

var SetCurInstType = "# SetCurInstType\n\nSets the current [`InstType`][1]. inst\\_type\\_idx should be between 0 and 31. The Error Flag is not set if an out of range [`InstType`][1] was used.\n\n## Parameters\n\n    inst_type_idx\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: InstType.md\n";

var SetDatablockOptimize = "# SetDatablockOptimize\n\nThis command tells the compiler whether or not to do datablock optimizations. Datablock optimizations have the compiler check to see if any data being added to the data block is already in the data block, and if so, it is simply referenced as opposed to added (can save a little bit of size). It is highly recommended to leave this option on.\n\n## Parameters\n\n    on|off\n\n## History\n\nAdded in NSIS v1.1i\n";

var SetDateSave = "# SetDateSave\n\nThis command sets the file date/time saving flag which is used by the File command to determine whether or not to save the last write date and time of the file, so that it can be restored on installation. Valid flags are 'on' and 'off'. 'on' is the default.\n\n## Parameters\n\n    on|off\n\n## History\n\nAdded in NSIS v1.1a\n";

var SetDetailsPrint = "# SetDetailsPrint\n\nSets mode at which commands print their status. None has commands be quiet, listonly has status text only added to the listbox, textonly has status text only printed to the status bar, and both enables both (the default). For extracting many small files, textonly is recommended (especially on Windows 9x with smooth scrolling enabled).\n\n## Parameters\n\n    none|listonly|textonly|both|lastused\n\n## Example\n\n    SetDetailsPrint none\n    File \"secret file.dat\"\n    SetDetailsPrint both\n\n## History\n\nAdded in NSIS v1.62\n";

var SetDetailsView = "# SetDetailsView\n\nShows or hides the details, depending on which parameter you pass. Overrides the default details view, which is set via [`ShowInstDetails`][1].\n\n## Parameters\n\n    show|hide\n\n## History\n\nAdded in NSIS v1.1t\n\n[1]: ShowInstDetails.md\n";

var SetErrorLevel = "# SetErrorLevel\n\nSets the error level of the installer or uninstaller to error_level. See Error Levels for more information.\n\n## Parameters\n\n    error_level\n\n## Example\n\n    IfRebootFlag 0 +2\n    SetErrorLevel 4\n\n## History\n\nAdded in NSIS v2.02\n";

var SetErrors = "# SetErrors\n\nSets the error flag.\n\n## Example\n\n    SetErrors\n    IfErrors 0 +2\n    MessageBox MB_OK \"this message box will always show\"\n\n## History\n\nAdded in NSIS v1.2g\n";

var SetFileAttributes = "# SetFileAttributes\n\nSets the file attributes of 'filename'. Valid attributes can be combined with | and are:\n\n* NORMAL or FILE_ATTRIBUTE_NORMAL (you can use 0 to abbreviate this)\n* ARCHIVE or FILE_ATTRIBUTE_ARCHIVE\n* HIDDEN or FILE_ATTRIBUTE_HIDDEN\n* OFFLINE or FILE_ATTRIBUTE_OFFLINE\n* READONLY or FILE_ATTRIBUTE_READONLY\n* SYSTEM or FILE_ATTRIBUTE_SYSTEM\n* TEMPORARY or FILE_ATTRIBUTE_TEMPORARY\n\nThe error flag will be set if the file's attributes cannot be set (i.e. the file doesn't exist, or you don't have the right permissions). You can only set attributes. It's not possible to unset them. If you want to remove an attribute use NORMAL. This way all attributes are erased. This command doesn't support wildcards.\n\n## Parameters\n\n    filename attribute1|attribute2|...\n\n## History\n\nAdded in NSIS v1.2c\n";

var SetFont = "# SetFont\n\nSets the installer font. Please remember that the font you choose must be present on the user's machine as well. Don't use rare fonts that only you have.\n\nUse the `/LANG` switch if you wish to set a different font for each language.\n\nThere are two LangStrings named ^Font and ^FontSize which contain the font and font size for every language.\n\n## Parameters\n\n    [/LANG=lang_id] font_face_name font_size\n\n## Example\n\n     SetFont /LANG=${LANG_ENGLISH} \"English Font\" 9\n     SetFont /LANG=${LANG_FRENCH} \"French Font\" 10\n\n## History\n\nAdded in NSIS v1.3\n";

var SetOutPath = "# SetOutPath\n\nSets the output path ([`$OUTDIR`][1]) and creates it (recursively if necessary), if it does not exist. Must be a full pathname, usually is just [`$INSTDIR`][2] (you can specify [`$INSTDIR`][2] if you are lazy with a single \"-\").\n\n## Parameters\n\n    outpath\n\n## Example\n\n    SetOutPath $INSTDIR\n    File program.exe\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: ../Variables/OUTDIR.md\n[2]: ../Variables/INSTDIR.md\n";

var SetOverwrite = "# SetOverwrite\n\nThis command sets the overwrite flag which is used by the [`File`][1] command to determine whether or not the file should overwrite any existing files that are present. If overwriteflag is 'on', files are overwritten (this is the default). If overwriteflag is 'off', files that are already present are not overwritten. If overwriteflag is 'try', files are overwritten if possible (meaning that if the file is not able to be written to, it is skipped without any user interaction). If overwriteflag is 'ifnewer', then files are only overwritten if the existing file is older than the new file. If overwriteflag is 'ifdiff', then files are only overwritten if the existing file is older or newer than the new file. Note that when in 'ifnewer' or 'ifdiff' mode, the destination file's date is set, regardless of what [`SetDateSave`][2] is set to.\n\n## Parameters\n\n    on|off|try|ifnewer|ifdiff|lastused\n\n## Example\n\n    SetOverwrite off\n    File program.cfg # config file we don't want to overwrite\n    SetOverwrite on\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: File.md\n[2]: SetDateSave.md\n";

var SetRebootFlag = "# SetRebootFlag\n\nSets the reboot flag to either true or false. The flag's value can be read using [`IfRebootFlag`][1].\n\n## Parameters\n\n    true|false\n\n## Example\n\n    SetRebootFlag true\n    IfRebootFlag 0 +2\n    MessageBox MB_OK \"this message box will always show\"\n\n## History\n\nAdded in NSIS v1.70\n\n[1]: IfRebootFlag.md\n";

var SetRegView = "# SetRegView\n\nSets the registry view affected by registry commands. On Windows x64 there are two views. One for 32-bit applications and one for x64 applications. By default, 32-bit applications running on x64 systems under WOW64 have access only to the 32-bit view. Using SetRegView 64 allows the installer to access keys in the x64 view of the registry.\n\nAffects [`DeleteRegKey`][1], [`DeleteRegValue`][2], [`EnumRegKey`][3], [`EnumRegValue`][4], [`ReadRegDWORD`][5], [`ReadRegStr`][6], [`WriteRegBin`][7], [`WriteRegDWORD`][8], [`WriteRegStr`][9] and [`WriteRegExpandStr`][10].\n\nDoes not affect [`InstallDirRegKey`][11]. Instead, the registry can be read using [`ReadRegStr`][6] in [`.onInit`][12].\n\n## Parameters\n\n    32|64|lastused\n\n## Example\n\n    SetRegView 32\n    ReadRegStr $0 HKLM Software\\Microsoft\\Windows\\CurrentVersion ProgramFilesDir\n    DetailPrint $0 # prints C:\\Program Files (x86)\n    SetRegView 64\n    ReadRegStr $0 HKLM Software\\Microsoft\\Windows\\CurrentVersion ProgramFilesDir\n    DetailPrint $0 # prints C:\\Program Files\n\n    Function .onInit\n        SetRegView 64\n        ReadRegStr $INSTDIR HKLM Software\\NSIS \"\"\n        SetRegView 32\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.26\n\n[1]: DeleteRegKey.md\n[2]: DeleteRegValue.md\n[3]: EnumRegKey.md\n[4]: EnumRegValue.md\n[5]: ReadRegDWORD.md\n[6]: ReadRegStr.md\n[7]: WriteRegBin.md\n[8]: WriteRegDWORD.md\n[9]: WriteRegStr.md\n[10]: WriteRegExpandStr.md\n[11]: InstallDirRegKey.md\n[12]: ../Callbacks/onInit.md\n";

var SetShellVarContext = "# SetShellVarContext\n\nSets the context of [`$SMPROGRAMS`][1] and other shell folders. If set to 'current' (the default), the current user's shell folders are used. If set to 'all', the 'all users' shell folder is used. The all users folder may not be supported on all OSes. If the all users folder is not found, the current user folder will be used. Please take into consideration that a \"normal user\" has no rights to write in the all users area. Only admins have full access rights to the all users area. You can check this by using the UserInfo plug-in. See Contrib\\UserInfo\\UserInfo.nsi for an example.\n\nNote that, if used in installer code, this will only affect the installer, and if used in uninstaller code, this will only affect the uninstaller. To affect both, it needs to be used in both.\n\n## Parameters\n\n    current|all\n\n## Example\n\n    SetShellVarContext current\n    StrCpy $0 $DESKTOP\n    SetShellVarContext all\n    StrCpy $1 $DESKTOP\n    MessageBox MB_OK $0$\\n$1\n\n## History\n\nAdded in NSIS v1.98\n\n[1]: ../Variables/SMPROGRAMS.md\n";

var SetSilent = "# SetSilent\n\nSets the installer to silent mode or normal mode. See [`SilentInstall`][1] for more information about silent installations. Can only be used in [`.onInit`][2].\n\n## Parameters\n\n    silent | normal\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n\n[1]: SilentInstall.md\n[2]: ../Callbacks/onInit.md\n";

var ShowInstDetails = "# ShowInstDetails\n\nSets whether or not the details of the install are shown. Can be 'hide' to hide the details by default, allowing the user to view them, or 'show' to show them by default, or 'nevershow', to prevent the user from ever seeing them. Note that sections can override this using [`SetDetailsView`][1].\n\n## Parameters\n\n    hide|show|nevershow\n\n## History\n\nAdded in NSIS v1.1a\n\n[1]: SetDetailsView.md\n";

var ShowUninstDetails = "# ShowUninstDetails\n\nSets whether or not the details of the uninstall are shown. Can be 'hide' to hide the details by default, allowing the user to view them, or 'show' to show them by default, or 'nevershow', to prevent the user from ever seeing them. Note that sections can override this using [`SetDetailsView`][1].\n\n## Parameters\n\n    hide|show|nevershow\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: SetDetailsView.md\n";

var ShowWindow = "# ShowWindow\n\nSets the visibility of a window. Possible show\\_states are the same as [Windows ShowWindow][1] function. SW\\_* constants are defined in [Include\\WinMessages.nsh][2].\n\n## Parameters\n\n    hwnd show_state\n\n## Example\n\n    !include WinMessages.nsh\n    GetDlgItem $0 $HWNDPARENT 1\n    ShowWindow $0 ${SW_HIDE}\n    Sleep 1000\n    ShowWindow $0 ${SW_SHOW}\n\n## History\n\nAdded in NSIS v2.0\n\n[1]: http://msdn2.microsoft.com/en-us/library/ms633548\n[2]: http://nsis.sourceforge.net/Docs/Include/WinMessages.nsh\n";

var SilentInstall = "# SilentInstall\n\nSpecifies whether or not the installer should be silent. If it is 'silent' or 'silentlog', all sections that have the SF_SELECTED flag are installed quietly (you can set this flag using [`SectionSetFlags`][1]), with no screen output from the installer itself (the script can still display whatever it wants, use [`MessageBox`][2]'s `/SD` to specify a default for silent installers). Note that if this is set to 'normal' and the user runs the installer with `/S` (case sensitive) on the command line, it will behave as if `SilentInstall` 'silent' was used.\n\nNote: see also [`LogSet`][3].\n\n## Parameters\n\n    normal|silent|silentlog\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: SectionSetFlags.md\n[2]: MessageBox.md\n[3]: LogSet.md\n";

var SilentUnInstall = "# SilentUnInstall\n\nSpecifies whether or not the uninstaller should be silent. If it is 'silent' the uninstall sections will run quietly, with no screen output from the uninstaller itself (the script can still display whatever it wants, use [`MessageBox`][1]'s `/SD` to specify a default for silent uninstallers). Note that if this is set to 'normal' and the user runs the uninstaller with `/S` on the command line, it will behave as if `SilentUnInstall 'silent' was used.\n\nNote: see also [`LogSet`][2].\n\n## Parameters\n\n    normal|silent\n\n## History\n\nAdded in NSIS v1.7b2\n\n[1]: MessageBox.md\n[2]: LogSet.md\n";

var Sleep = "# Sleep\n\nPauses execution in the installer for `sleeptime_in_ms` milliseconds. `sleeptime_in_ms` can be a variable, e.g. \"$0\" or a number, i.e. \"666\".\n\n## Parameters\n\n    sleeptime_in_ms\n\n## Example\n\n    DetailPrint \"sleeping...\"\n    Sleep 3000\n    DetailPrint \"back to work\"\n\n## History\n\nAdded in NSIS v1.1a\n";

var SpaceTexts = "# SpaceTexts\n\nIf parameters are specified, overrides the space required and space available text (\"Space required: \" and \"Space available: \" by default). If 'none' is specified as the required text no space texts will be shown.\n\nAccepts variables. If variables are used, they must be initialized before the components page is created.\n\n## Parameters\n\n    [req_text [avail_text]]\n\n## History\n\nAdded in NSIS v2.0 Alpha 0\n";

var StrCmp = "# StrCmp\n\nCompares (case insensitively) str1 to str2. If str1 and str2 are equal, [`Goto`][1] jump\\_if\\_equal, otherwise [`Goto`][1] jump\\_if\\_not\\_equal.\n\n## Parameters\n\n    str1 str2 jump_if_equal [jump_if_not_equal]\n\n## Example\n\n    StrCmp $0 \"a string\" 0 +3\n    DetailPrint '$$0 == \"a string\"'\n    Goto +2\n    DetailPrint '$$0 != \"a string\"'\n\n## History\n\nAdded in NSIS v1.2g\n\n[1]: Goto.md\n";

var StrCmpS = "# StrCmpS\n\nCompares (case sensitively) str1 to str2. If str1 and str2 are equal, [`Goto`][1] jump_if_equal, otherwise [`Goto`][1] jump_if_not_equal.\n\n## Parameters\n\n    str1 str2 jump_if_equal [jump_if_not_equal]\n\n## Example\n\n    StrCmp $0 \"a string\" 0 +3\n    DetailPrint '$$0 == \"a string\"'\n    Goto +2\n    DetailPrint '$$0 != \"a string\"'\n\n## History\n\nAdded in NSIS v2.13\n\n[1]: Goto.md\n";

var StrCpy = "# StrCpy\n\nSets the user variable $x with str. Note that str can contain other variables, or the user variable being set (concatenating strings this way is possible, etc). If maxlen is specified, the string will be a maximum of maxlen characters (if maxlen is negative, the string will be truncated abs(maxlen) characters from the end). If start\\_offset is specified, the source is offset by it (if start\\_offset is negative, it will start abs(start_offset) from the end of the string).\n\n## Parameters\n\n    user_var(destination) str [maxlen] [start_offset]\n\n## Example\n\n    StrCpy $0 \"a string\" # = \"a string\"\n    StrCpy $0 \"a string\" 3 # = \"a s\"\n    StrCpy $0 \"a string\" -1 # = \"a strin\"\n    StrCpy $0 \"a string\" \"\" 2 # = \"string\"\n    StrCpy $0 \"a string\" \"\" -3 # = \"ing\"\n    StrCpy $0 \"a string\" 3 -4 # = \"rin\"\n\n## History\n\nAdded in NSIS v1.2g\n";

var StrLen = "# StrLen\n\nSets user variable $x with the length of str.\n\n## Parameters\n\n    user_var(length output) str\n\n## Example\n\n    StrLen $0 \"123456\" # = 6\n\n## History\n\nAdded in NSIS v1.60\n";

var SubCaption = "# SubCaption\n\nOverrides the subcaptions for each of the installer pages (0=\": License Agreement\",1=\": Installation Options\",2=\": Installation Directory\", 3=\": Installing Files\", 4=\": Completed\"). If you specify an empty string (\"\"), the default will be used (you can however specify \" \" to achieve a blank string).\n\nYou can also set a subcaption (or override the default) using [`Caption`][1] inside a [`PageEx`][2] block.\n\nAccepts variables. If variables are used, they must be initialized before the relevant page is created.\n\n## Parameters\n\n    [page_number subcaption]\n\n## History\n\nAdded in NSIS v1.56\n\n[1]: Caption.md\n[2]: PageEx.md\n";

var Unicode = "# Unicode\n\nGenerate a Unicode installer. It can only be used outside of sections and functions and before any data is compressed.\n\n## Parameters\n\n    true|false\n\n## History\n\nAdded in NSIS v3.0a\n";

var UninstallButtonText = "# UninstallButtonText\n\nChanges the text of the button that by default says \"Uninstall\" in the uninstaller. If no parameter is specified, the default text is used.\n\nAccepts variables. If variables are used, they must be initialized before the uninstall button shows.\n\n## Parameters\n\n    text\n\n## History\n\nAdded in NSIS v1.60\n\n[1]: WriteUninstaller.md\n";

var UninstallCaption = "# UninstallCaption\n\nSets what the titlebars of the uninstaller will display. By default it is '$(^Name) Uninstall', where [`Name`][1] is specified with the Name command. You can, however, override it with 'MyApp uninstaller' or whatever. If you specify an empty string (\"\"), the default will be used (you can specify \" \" to simulate a empty string).\n\nAccepts variables. If variables are used, they must be initialized in [`un.onInit`][2].\n\n## Parameters\n\n    caption\n\n## History\n\nAdded in NSIS v1.56\n\n[1]: Name.md\n[2]: ../Callbacks/un.onInit.md\n";

var UninstallIcon = "# UninstallIcon\n\nSets the icon of the uninstaller.\n\n## Parameters\n\n    [path\\]icon.ico\n\n## History\n\nAdded in NSIS v1.0f\n";

var UninstallSubCaption = "# UninstallSubCaption\n\nSets the default subcaptions for the uninstaller pages (0=\": Confirmation\",1=\": Uninstalling Files\",2=\": Completed\"). If you specify an empty string (\"\"), the default will be used (you can however specify \" \" to simulate an empty string).\n\nYou can also set a subcaption (or override the default) using [`Caption`][1] inside a [`PageEx`][2] block.\n\nAccepts variables. If variables are used, they must be initialized before the relevant page is created.\n\n## Parameters\n\n    page_number subcaption\n\n## History\n\nAdded in NSIS v1.56\n\n[1]: Caption.md\n[2]: PageEx.md\n";

var UninstallText = "# UninstallText\n\nSpecifies the texts on the uninstaller confirm page.\n\nAccepts variables. If variables are used, they must be initialized before the uninstaller confirm page is created.\n\n## Parameters\n\n    text [subtext]\n\n* text: Text above the controls\n* subtext: Text next to the uninstall location\n\n## History\n\nAdded in NSIS v1.0f\n";

var UninstPage = "# UninstPage\n\nAdds an uninstaller page. See the above sections for more information about built-in versus custom pages and about callback functions.\n\n## Parameters\n\n    custom [creator_function] [leave_function] [caption] [/ENABLECANCEL]\n    internal_page_type [pre_function] [show_function] [leave_function] [/ENABLECANCEL]\n\ninternal_page_type can be:\n\n* license - license page\n* components - components selection page\n* directory - installation directory selection page\n* instfiles - installation page where the sections are executed\n* uninstConfirm - uninstall confirmation page\n\n## History\n\nAdded in NSIS v2.0 Beta 0\n";

var UnRegDLL = "# UnRegDLL\n\nLoads the specified DLL and calls DllUnregisterServer. The error flag is set if an error occurs (i.e. it can't load the DLL, initialize OLE, find the entry point, or the function returned anything other than ERROR_SUCCESS (=0)).\n\n## Parameters\n\n    dllfile\n\n## History\n\nAdded in NSIS v1.0i\n";

var Var = "# Var\n\nDeclare a user variable. Allowed characters for variables names: [a-z][A-Z][0-9] and '_'. All defined variables are global, even if defined in a section or a function. To make this clear, variables defined in a section or a function must use the `/GLOBAL` flag. The `/GLOBAL` flag is not required outside of sections and functions.\n\n## Parameters\n\n    [/GLOBAL] var_name\n\n## Example\n\n    Var example\n \n    Function testVar\n        Var /GLOBAL example2\n\n        StrCpy $example \"example value\"\n        StrCpy $example2 \"another example value\"\n    FunctionEnd\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var VIAddVersionKey = "# VIAddVersionKey\n\nAdds a field in the Version Tab of the File Properties. This can either be a field provided by the system or a user defined field. The following fields are provided by the System:\n\n* ProductName\n* Comments\n* CompanyName\n* LegalCopyright\n* FileDescription\n* FileVersion\n* ProductVersion\n* InternalName\n* LegalTrademarks\n* OriginalFilename\n* PrivateBuild\n* SpecialBuild\n\nThe name of these fields are translated on the target system, whereas user defined fields remain untranslated.\n\n## Parameters\n\n    [/LANG=lang_id] keyname value\n\n## Example\n\n    VIAddVersionKey /LANG=${LANG_ENGLISH} \"ProductName\" \"Test Application\"\n    VIAddVersionKey /LANG=${LANG_ENGLISH} \"Comments\" \"A test comment\"\n    VIAddVersionKey /LANG=${LANG_ENGLISH} \"CompanyName\" \"Fake company\"\n    VIAddVersionKey /LANG=${LANG_ENGLISH} \"LegalTrademarks\" \"Test Application is a trademark of Fake company\"\n    VIAddVersionKey /LANG=${LANG_ENGLISH} \"LegalCopyright\" \"© Fake company\"\n    VIAddVersionKey /LANG=${LANG_ENGLISH} \"FileDescription\" \"Test Application\"\n    VIAddVersionKey /LANG=${LANG_ENGLISH} \"FileVersion\" \"1.2.3\"\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var VIFileVersion = "# VIFileVersion\n\nSets the File Version in the VS\\_FIXEDFILEINFO version information block (You should also set the FileVersion string with [`VIAddVersionKey`][1] so the information is displayed at the top of the Version Tab in the Properties of the file). If you don't provide a File Version the Product Version is used in the VS\\_FIXEDFILEINFO block.\n\n## Parameters\n\n    [version_string_X.X.X.X]\n\n## Example\n\n    VIFileVersion 1.2.3.4\n\n## History\n\nAdded in NSIS v3.0a0\n\n[1]: VIAddVersionKey.md\n";

var VIProductVersion = "# VIProductVersion\n\nAdds the Product Version on top of the Version Tab in the Properties of the file.\n\n## Parameters\n\n    [version_string_X.X.X.X]\n\n## Example\n\n    VIProductVersion \"1.2.3.4\"\n\n## History\n\nAdded in NSIS v2.0\n";

var WindowIcon = "# WindowIcon\n\nSets whether or not the installer's icon is displayed on certain pages.\n\n## Parameters\n\n    on|off\n\n## History\n\nAdded in NSIS v1.70\n";

var WriteINIStr = "# WriteINIStr\n\nWrites entry\\_name=value into [section\\_name] of ini\\_filename. The error flag is set if the string could not be written to the ini file.\n\n## Parameters\n\n    ini_filename section_name entry_name value\n\n## Example\n\n    WriteINIStr $TEMP\\something.ini section1 something 123\n    WriteINIStr $TEMP\\something.ini section1 somethingelse 1234\n    WriteINIStr $TEMP\\something.ini section2 nsis true\n\n## History\n\nAdded in NSIS v1.0f\n";

var WriteRegBin = "# WriteRegBin\n\nThis command writes a block of binary data to the registry. Valid values for root_key are listed under `WriteRegStr`. Valuedata is in hexadecimal (e.g. DEADBEEF01223211151). The error flag is set if the binary data could not be written to the registry. If the registry key doesn't exist it will be created.\n\n## Parameters\n\n    root_key subkey key_name valuedata\n\n## Example\n\n    WriteRegBin HKLM \"Software\\My Company\\My Software\" \"Binary Value\" DEADBEEF01223211151\n\n## History\n\nAdded in NSIS v1.0f\n";

var WriteRegDWORD = "# WriteRegDWORD\n\nThis command writes a dword (32 bit integer) to the registry (a user variable can be specified). Valid values for root_key are listed under [`WriteRegStr`][1]. The error flag is set if the dword could not be written to the registry. If the registry key doesn't exist it will be created.\n\n## Parameters\n\n    root_key subkey key_name value\n\n## Example\n\n    WriteRegDWORD HKLM \"Software\\My Company\\My Software\" \"DWORD Value\" 0xDEADBEEF\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: WriteRegStr.md\n";

var WriteRegExpandStr = "# WriteRegExpandStr\n\nWrite a string to the registry. root\\_key must be one of:\n\n* HKCR or HKEY\\_CLASSES\\_ROOT\n* HKLM or HKEY\\_LOCAL\\_MACHINE\n* HKCU or HKEY\\_CURRENT\\_USER\n* HKU or HKEY_USERS\n* HKCC or HKEY\\_CURRENT\\_CONFIG\n* HKDD or HKEY\\_DYN\\_DATA\n* HKPD or HKEY\\_PERFORMANCE\\_DATA\n* SHCTX or SHELL_CONTEXT\n\nIf root\\_key is SHCTX or SHELL\\_CONTEXT, it will be replaced with HKLM if [`SetShellVarContext`][1] is set to all and with HKCU if [`SetShellVarContext`][1] is set to current.\n\nThe error flag is set if the string could not be written to the registry. The type of the string will be REG\\_SZ for [`WriteRegStr`][2], or REG\\_EXPAND\\_STR for [`WriteRegExpandStr`][3]. If the registry key doesn't exist it will be created.\n\n## Parameters\n\n    root_key subkey key_name value\n\n## History\n\nAdded in NSIS v1.6beta2\n\n[1]: SetShellVarContext.md\n[2]: WriteRegStr.md\n[3]: WriteRegExpandStr.md\n";

var WriteRegMultiStr = "# WriteRegMultiStr\n\nWrites a multi-string value. The `/REGEDIT5` switch must be used and specifies that the data is in the hex format used by `.reg` files on Windows 2000 and later.\n\n## Parameters\n\n    root_key subkey key_name value\n\n## Example\n\n    WriteRegMultiStr HKLM \"Software\\My Company\\My Software\" \"String Value\" \"dead beef\"\n\n## History\n\nAdded in NSIS v3.02\n";

var WriteRegStr = "# WriteRegStr\n\nWrite a string to the registry. See [`WriteRegExpandStr`][1] for more details.\n\n## Parameters\n\n    root_key subkey key_name value\n\n## Example\n\n    WriteRegStr HKLM \"Software\\My Company\\My Software\" \"String Value\" \"dead beef\"\n\n## History\n\nAdded in NSIS v1.0f\n\n[1]: WriteRegExpandStr.md\n";

var WriteUninstaller = "# WriteUninstaller\n\nWrites the uninstaller to the filename (and optionally path) specified. Only valid from within an install section or function, and requires that you have an uninstall section in your script. See also Uninstall configuration. You can call this one or more times to write out one or more copies of the uninstaller.\n\n## Parameters\n\n    [Path\\]exename.exe\n\n## Example\n\n    WriteUninstaller $INSTDIR\\uninstaller.exe\n\n## History\n\nAdded in NSIS v1.80\n";

var XPStyle = "# XPStyle\n\nSets whether or not a XP visual style manifest will be added to the installer. This manifest makes the installers controls use the new visual styles when running on Windows XP and later. This affects the uninstaller too.\n\n## Parameters\n\n    on|off\n\n## Example\n\n    WriteUninstaller $INSTDIR\\uninstaller.exe\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n";

var commands = {
    _addincludedir: {
        name: '!addincludedir',
        content: _addincludedir
    },
    _addplugindir: {
        name: '!addplugindir',
        content: _addplugindir
    },
    _appendfile: {
        name: '!appendfile',
        content: _appendfile
    },
    _cd: {
        name: '!cd',
        content: _cd
    },
    _define: {
        name: '!define',
        content: _define
    },
    _delfile: {
        name: '!delfile',
        content: _delfile
    },
    _echo: {
        name: '!echo',
        content: _echo
    },
    _else: {
        name: '!else',
        content: _else
    },
    _endif: {
        name: '!endif',
        content: _endif
    },
    _error: {
        name: '!error',
        content: _error
    },
    _execute: {
        name: '!execute',
        content: _execute
    },
    _finalize: {
        name: '!finalize',
        content: _finalize
    },
    _getdllversion: {
        name: '!getdllversion',
        content: _getdllversion
    },
    _gettlbversion: {
        name: '!gettlbversion',
        content: _gettlbversion
    },
    _if: {
        name: '!if',
        content: _if
    },
    _ifdef: {
        name: '!ifdef',
        content: _ifdef
    },
    _ifmacrodef: {
        name: '!ifmacrodef',
        content: _ifmacrodef
    },
    _ifmacrondef: {
        name: '!ifmacrondef',
        content: _ifmacrondef
    },
    _ifndef: {
        name: '!ifndef',
        content: _ifndef
    },
    _include: {
        name: '!include',
        content: _include
    },
    _insertmacro: {
        name: '!insertmacro',
        content: _insertmacro
    },
    _macro: {
        name: '!macro',
        content: _macro
    },
    _macroend: {
        name: '!macroend',
        content: _macroend
    },
    _makensis: {
        name: '!makensis',
        content: _makensis
    },
    _packhdr: {
        name: '!packhdr',
        content: _packhdr
    },
    _pragma: {
        name: '!pragma',
        content: _pragma
    },
    _searchparse: {
        name: '!searchparse',
        content: _searchparse
    },
    _searchreplace: {
        name: '!searchreplace',
        content: _searchreplace
    },
    _system: {
        name: '!system',
        content: _system
    },
    _tempfile: {
        name: '!tempfile',
        content: _tempfile
    },
    _undef: {
        name: '!undef',
        content: _undef
    },
    _verbose: {
        name: '!verbose',
        content: _verbose
    },
    _warning: {
        name: '!warning',
        content: _warning
    },
    Abort: {
        name: 'Abort',
        content: Abort
    },
    AddBrandingImage: {
        name: 'AddBrandingImage',
        content: AddBrandingImage
    },
    AddSize: {
        name: 'AddSize',
        content: AddSize
    },
    AllowRootDirInstall: {
        name: 'AllowRootDirInstall',
        content: AllowRootDirInstall
    },
    AllowSkipFiles: {
        name: 'AllowSkipFiles',
        content: AllowSkipFiles
    },
    AutoCloseWindow: {
        name: 'AutoCloseWindow',
        content: AutoCloseWindow
    },
    BGFont: {
        name: 'BGFont',
        content: BGFont
    },
    BGGradient: {
        name: 'BGGradient',
        content: BGGradient
    },
    BrandingText: {
        name: 'BrandingText',
        content: BrandingText
    },
    BringToFront: {
        name: 'BringToFront',
        content: BringToFront
    },
    Call: {
        name: 'Call',
        content: Call
    },
    CallInstDLL: {
        name: 'CallInstDLL',
        content: CallInstDLL
    },
    Caption: {
        name: 'Caption',
        content: Caption
    },
    ChangeUI: {
        name: 'ChangeUI',
        content: ChangeUI
    },
    CheckBitmap: {
        name: 'CheckBitmap',
        content: CheckBitmap
    },
    ClearErrors: {
        name: 'ClearErrors',
        content: ClearErrors
    },
    CompletedText: {
        name: 'CompletedText',
        content: CompletedText
    },
    ComponentText: {
        name: 'ComponentText',
        content: ComponentText
    },
    CopyFiles: {
        name: 'CopyFiles',
        content: CopyFiles
    },
    CRCCheck: {
        name: 'CRCCheck',
        content: CRCCheck
    },
    CreateDirectory: {
        name: 'CreateDirectory',
        content: CreateDirectory
    },
    CreateFont: {
        name: 'CreateFont',
        content: CreateFont
    },
    CreateShortCut: {
        name: 'CreateShortCut',
        content: CreateShortCut
    },
    Delete: {
        name: 'Delete',
        content: Delete
    },
    DeleteINISec: {
        name: 'DeleteINISec',
        content: DeleteINISec
    },
    DeleteINIStr: {
        name: 'DeleteINIStr',
        content: DeleteINIStr
    },
    DeleteRegKey: {
        name: 'DeleteRegKey',
        content: DeleteRegKey
    },
    DeleteRegValue: {
        name: 'DeleteRegValue',
        content: DeleteRegValue
    },
    DetailPrint: {
        name: 'DetailPrint',
        content: DetailPrint
    },
    DetailsButtonText: {
        name: 'DetailsButtonText',
        content: DetailsButtonText
    },
    DirText: {
        name: 'DirText',
        content: DirText
    },
    DirVar: {
        name: 'DirVar',
        content: DirVar
    },
    DirVerify: {
        name: 'DirVerify',
        content: DirVerify
    },
    EnableWindow: {
        name: 'EnableWindow',
        content: EnableWindow
    },
    EnumRegKey: {
        name: 'EnumRegKey',
        content: EnumRegKey
    },
    EnumRegValue: {
        name: 'EnumRegValue',
        content: EnumRegValue
    },
    Exch: {
        name: 'Exch',
        content: Exch
    },
    Exec: {
        name: 'Exec',
        content: Exec
    },
    ExecShell: {
        name: 'ExecShell',
        content: ExecShell
    },
    ExecShellWait: {
        name: 'ExecShellWait',
        content: ExecShellWait
    },
    ExecWait: {
        name: 'ExecWait',
        content: ExecWait
    },
    ExpandEnvStrings: {
        name: 'ExpandEnvStrings',
        content: ExpandEnvStrings
    },
    File: {
        name: 'File',
        content: File
    },
    FileBufSize: {
        name: 'FileBufSize',
        content: FileBufSize
    },
    FileClose: {
        name: 'FileClose',
        content: FileClose
    },
    FileErrorText: {
        name: 'FileErrorText',
        content: FileErrorText
    },
    FileOpen: {
        name: 'FileOpen',
        content: FileOpen
    },
    FileRead: {
        name: 'FileRead',
        content: FileRead
    },
    FileReadByte: {
        name: 'FileReadByte',
        content: FileReadByte
    },
    FileReadUTF16LE: {
        name: 'FileReadUTF16LE',
        content: FileReadUTF16LE
    },
    FileReadWord: {
        name: 'FileReadWord',
        content: FileReadWord
    },
    FileSeek: {
        name: 'FileSeek',
        content: FileSeek
    },
    FileWrite: {
        name: 'FileWrite',
        content: FileWrite
    },
    FileWriteByte: {
        name: 'FileWriteByte',
        content: FileWriteByte
    },
    FileWriteUTF16LE: {
        name: 'FileWriteUTF16LE',
        content: FileWriteUTF16LE
    },
    FileWriteWord: {
        name: 'FileWriteWord',
        content: FileWriteWord
    },
    FindClose: {
        name: 'FindClose',
        content: FindClose
    },
    FindFirst: {
        name: 'FindFirst',
        content: FindFirst
    },
    FindNext: {
        name: 'FindNext',
        content: FindNext
    },
    FindWindow: {
        name: 'FindWindow',
        content: FindWindow
    },
    FlushINI: {
        name: 'FlushINI',
        content: FlushINI
    },
    Function: {
        name: 'Function',
        content: Function
    },
    FunctionEnd: {
        name: 'FunctionEnd',
        content: FunctionEnd
    },
    GetCurInstType: {
        name: 'GetCurInstType',
        content: GetCurInstType
    },
    GetCurrentAddress: {
        name: 'GetCurrentAddress',
        content: GetCurrentAddress
    },
    GetDlgItem: {
        name: 'GetDlgItem',
        content: GetDlgItem
    },
    GetDLLVersion: {
        name: 'GetDLLVersion',
        content: GetDLLVersion
    },
    GetDLLVersionLocal: {
        name: 'GetDLLVersionLocal',
        content: GetDLLVersionLocal
    },
    GetErrorLevel: {
        name: 'GetErrorLevel',
        content: GetErrorLevel
    },
    GetFileTime: {
        name: 'GetFileTime',
        content: GetFileTime
    },
    GetFileTimeLocal: {
        name: 'GetFileTimeLocal',
        content: GetFileTimeLocal
    },
    GetFullPathName: {
        name: 'GetFullPathName',
        content: GetFullPathName
    },
    GetFunctionAddress: {
        name: 'GetFunctionAddress',
        content: GetFunctionAddress
    },
    GetInstDirError: {
        name: 'GetInstDirError',
        content: GetInstDirError
    },
    GetKnownFolderPath: {
        name: 'GetKnownFolderPath',
        content: GetKnownFolderPath
    },
    GetLabelAddress: {
        name: 'GetLabelAddress',
        content: GetLabelAddress
    },
    GetTempFileName: {
        name: 'GetTempFileName',
        content: GetTempFileName
    },
    Goto: {
        name: 'Goto',
        content: Goto
    },
    HideWindow: {
        name: 'HideWindow',
        content: HideWindow
    },
    Icon: {
        name: 'Icon',
        content: Icon
    },
    IfAbort: {
        name: 'IfAbort',
        content: IfAbort
    },
    IfErrors: {
        name: 'IfErrors',
        content: IfErrors
    },
    IfFileExists: {
        name: 'IfFileExists',
        content: IfFileExists
    },
    IfRebootFlag: {
        name: 'IfRebootFlag',
        content: IfRebootFlag
    },
    IfRtlLanguage: {
        name: 'IfRtlLanguage',
        content: IfRtlLanguage
    },
    IfShellVarContextAll: {
        name: 'IfShellVarContextAll',
        content: IfShellVarContextAll
    },
    IfSilent: {
        name: 'IfSilent',
        content: IfSilent
    },
    InitPluginsDir: {
        name: 'InitPluginsDir',
        content: InitPluginsDir
    },
    InstallButtonText: {
        name: 'InstallButtonText',
        content: InstallButtonText
    },
    InstallColors: {
        name: 'InstallColors',
        content: InstallColors
    },
    InstallDir: {
        name: 'InstallDir',
        content: InstallDir
    },
    InstallDirRegKey: {
        name: 'InstallDirRegKey',
        content: InstallDirRegKey
    },
    InstProgressFlags: {
        name: 'InstProgressFlags',
        content: InstProgressFlags
    },
    InstType: {
        name: 'InstType',
        content: InstType
    },
    InstTypeGetText: {
        name: 'InstTypeGetText',
        content: InstTypeGetText
    },
    InstTypeSetText: {
        name: 'InstTypeSetText',
        content: InstTypeSetText
    },
    Int64Cmp: {
        name: 'Int64Cmp',
        content: Int64Cmp
    },
    Int64CmpU: {
        name: 'Int64CmpU',
        content: Int64CmpU
    },
    Int64Fmt: {
        name: 'Int64Fmt',
        content: Int64Fmt
    },
    IntCmp: {
        name: 'IntCmp',
        content: IntCmp
    },
    IntCmpU: {
        name: 'IntCmpU',
        content: IntCmpU
    },
    IntFmt: {
        name: 'IntFmt',
        content: IntFmt
    },
    IntOp: {
        name: 'IntOp',
        content: IntOp
    },
    IntPtrCmp: {
        name: 'IntPtrCmp',
        content: IntPtrCmp
    },
    IntPtrCmpU: {
        name: 'IntPtrCmpU',
        content: IntPtrCmpU
    },
    IntPtrOp: {
        name: 'IntPtrOp',
        content: IntPtrOp
    },
    IsWindow: {
        name: 'IsWindow',
        content: IsWindow
    },
    LangString: {
        name: 'LangString',
        content: LangString
    },
    LicenseBkColor: {
        name: 'LicenseBkColor',
        content: LicenseBkColor
    },
    LicenseData: {
        name: 'LicenseData',
        content: LicenseData
    },
    LicenseForceSelection: {
        name: 'LicenseForceSelection',
        content: LicenseForceSelection
    },
    LicenseLangString: {
        name: 'LicenseLangString',
        content: LicenseLangString
    },
    LicenseText: {
        name: 'LicenseText',
        content: LicenseText
    },
    LoadAndSetImage: {
        name: 'LoadAndSetImage',
        content: LoadAndSetImage
    },
    LoadLanguageFile: {
        name: 'LoadLanguageFile',
        content: LoadLanguageFile
    },
    LockWindow: {
        name: 'LockWindow',
        content: LockWindow
    },
    LogSet: {
        name: 'LogSet',
        content: LogSet
    },
    LogText: {
        name: 'LogText',
        content: LogText
    },
    ManifestDPIAware: {
        name: 'ManifestDPIAware',
        content: ManifestDPIAware
    },
    ManifestLongPathAware: {
        name: 'ManifestLongPathAware',
        content: ManifestLongPathAware
    },
    ManifestMaxVersionTested: {
        name: 'ManifestMaxVersionTested',
        content: ManifestMaxVersionTested
    },
    ManifestSupportedOS: {
        name: 'ManifestSupportedOS',
        content: ManifestSupportedOS
    },
    MessageBox: {
        name: 'MessageBox',
        content: MessageBox
    },
    MiscButtonText: {
        name: 'MiscButtonText',
        content: MiscButtonText
    },
    Name: {
        name: 'Name',
        content: Name
    },
    Nop: {
        name: 'Nop',
        content: Nop
    },
    OutFile: {
        name: 'OutFile',
        content: OutFile
    },
    Page: {
        name: 'Page',
        content: Page
    },
    PageCallbacks: {
        name: 'PageCallbacks',
        content: PageCallbacks
    },
    PageEx: {
        name: 'PageEx',
        content: PageEx
    },
    PageExEnd: {
        name: 'PageExEnd',
        content: PageExEnd
    },
    PEAddResource: {
        name: 'PEAddResource',
        content: PEAddResource
    },
    PEDllCharacteristics: {
        name: 'PEDllCharacteristics',
        content: PEDllCharacteristics
    },
    PERemoveResource: {
        name: 'PERemoveResource',
        content: PERemoveResource
    },
    PESubsysVer: {
        name: 'PESubsysVer',
        content: PESubsysVer
    },
    Pop: {
        name: 'Pop',
        content: Pop
    },
    Push: {
        name: 'Push',
        content: Push
    },
    Quit: {
        name: 'Quit',
        content: Quit
    },
    ReadEnvStr: {
        name: 'ReadEnvStr',
        content: ReadEnvStr
    },
    ReadINIStr: {
        name: 'ReadINIStr',
        content: ReadINIStr
    },
    ReadRegDWORD: {
        name: 'ReadRegDWORD',
        content: ReadRegDWORD
    },
    ReadRegStr: {
        name: 'ReadRegStr',
        content: ReadRegStr
    },
    Reboot: {
        name: 'Reboot',
        content: Reboot
    },
    RegDLL: {
        name: 'RegDLL',
        content: RegDLL
    },
    Rename: {
        name: 'Rename',
        content: Rename
    },
    RequestExecutionLevel: {
        name: 'RequestExecutionLevel',
        content: RequestExecutionLevel
    },
    ReserveFile: {
        name: 'ReserveFile',
        content: ReserveFile
    },
    Return: {
        name: 'Return',
        content: Return
    },
    RMDir: {
        name: 'RMDir',
        content: RMDir
    },
    SearchPath: {
        name: 'SearchPath',
        content: SearchPath
    },
    Section: {
        name: 'Section',
        content: Section
    },
    SectionEnd: {
        name: 'SectionEnd',
        content: SectionEnd
    },
    SectionGetFlags: {
        name: 'SectionGetFlags',
        content: SectionGetFlags
    },
    SectionGetInstTypes: {
        name: 'SectionGetInstTypes',
        content: SectionGetInstTypes
    },
    SectionGetSize: {
        name: 'SectionGetSize',
        content: SectionGetSize
    },
    SectionGetText: {
        name: 'SectionGetText',
        content: SectionGetText
    },
    SectionGroup: {
        name: 'SectionGroup',
        content: SectionGroup
    },
    SectionGroupEnd: {
        name: 'SectionGroupEnd',
        content: SectionGroupEnd
    },
    SectionIn: {
        name: 'SectionIn',
        content: SectionIn
    },
    SectionSetFlags: {
        name: 'SectionSetFlags',
        content: SectionSetFlags
    },
    SectionSetInstTypes: {
        name: 'SectionSetInstTypes',
        content: SectionSetInstTypes
    },
    SectionSetSize: {
        name: 'SectionSetSize',
        content: SectionSetSize
    },
    SectionSetText: {
        name: 'SectionSetText',
        content: SectionSetText
    },
    SendMessage: {
        name: 'SendMessage',
        content: SendMessage
    },
    SetAutoClose: {
        name: 'SetAutoClose',
        content: SetAutoClose
    },
    SetBrandingImage: {
        name: 'SetBrandingImage',
        content: SetBrandingImage
    },
    SetCompress: {
        name: 'SetCompress',
        content: SetCompress
    },
    SetCompressor: {
        name: 'SetCompressor',
        content: SetCompressor
    },
    SetCompressorDictSize: {
        name: 'SetCompressorDictSize',
        content: SetCompressorDictSize
    },
    SetCtlColors: {
        name: 'SetCtlColors',
        content: SetCtlColors
    },
    SetCurInstType: {
        name: 'SetCurInstType',
        content: SetCurInstType
    },
    SetDatablockOptimize: {
        name: 'SetDatablockOptimize',
        content: SetDatablockOptimize
    },
    SetDateSave: {
        name: 'SetDateSave',
        content: SetDateSave
    },
    SetDetailsPrint: {
        name: 'SetDetailsPrint',
        content: SetDetailsPrint
    },
    SetDetailsView: {
        name: 'SetDetailsView',
        content: SetDetailsView
    },
    SetErrorLevel: {
        name: 'SetErrorLevel',
        content: SetErrorLevel
    },
    SetErrors: {
        name: 'SetErrors',
        content: SetErrors
    },
    SetFileAttributes: {
        name: 'SetFileAttributes',
        content: SetFileAttributes
    },
    SetFont: {
        name: 'SetFont',
        content: SetFont
    },
    SetOutPath: {
        name: 'SetOutPath',
        content: SetOutPath
    },
    SetOverwrite: {
        name: 'SetOverwrite',
        content: SetOverwrite
    },
    SetRebootFlag: {
        name: 'SetRebootFlag',
        content: SetRebootFlag
    },
    SetRegView: {
        name: 'SetRegView',
        content: SetRegView
    },
    SetShellVarContext: {
        name: 'SetShellVarContext',
        content: SetShellVarContext
    },
    SetSilent: {
        name: 'SetSilent',
        content: SetSilent
    },
    ShowInstDetails: {
        name: 'ShowInstDetails',
        content: ShowInstDetails
    },
    ShowUninstDetails: {
        name: 'ShowUninstDetails',
        content: ShowUninstDetails
    },
    ShowWindow: {
        name: 'ShowWindow',
        content: ShowWindow
    },
    SilentInstall: {
        name: 'SilentInstall',
        content: SilentInstall
    },
    SilentUnInstall: {
        name: 'SilentUnInstall',
        content: SilentUnInstall
    },
    Sleep: {
        name: 'Sleep',
        content: Sleep
    },
    SpaceTexts: {
        name: 'SpaceTexts',
        content: SpaceTexts
    },
    StrCmp: {
        name: 'StrCmp',
        content: StrCmp
    },
    StrCmpS: {
        name: 'StrCmpS',
        content: StrCmpS
    },
    StrCpy: {
        name: 'StrCpy',
        content: StrCpy
    },
    StrLen: {
        name: 'StrLen',
        content: StrLen
    },
    SubCaption: {
        name: 'SubCaption',
        content: SubCaption
    },
    Unicode: {
        name: 'Unicode',
        content: Unicode
    },
    UninstallButtonText: {
        name: 'UninstallButtonText',
        content: UninstallButtonText
    },
    UninstallCaption: {
        name: 'UninstallCaption',
        content: UninstallCaption
    },
    UninstallIcon: {
        name: 'UninstallIcon',
        content: UninstallIcon
    },
    UninstallSubCaption: {
        name: 'UninstallSubCaption',
        content: UninstallSubCaption
    },
    UninstallText: {
        name: 'UninstallText',
        content: UninstallText
    },
    UninstPage: {
        name: 'UninstPage',
        content: UninstPage
    },
    UnRegDLL: {
        name: 'UnRegDLL',
        content: UnRegDLL
    },
    Var: {
        name: 'Var',
        content: Var
    },
    VIAddVersionKey: {
        name: 'VIAddVersionKey',
        content: VIAddVersionKey
    },
    VIFileVersion: {
        name: 'VIFileVersion',
        content: VIFileVersion
    },
    VIProductVersion: {
        name: 'VIProductVersion',
        content: VIProductVersion
    },
    WindowIcon: {
        name: 'WindowIcon',
        content: WindowIcon
    },
    WriteINIStr: {
        name: 'WriteINIStr',
        content: WriteINIStr
    },
    WriteRegBin: {
        name: 'WriteRegBin',
        content: WriteRegBin
    },
    WriteRegDWORD: {
        name: 'WriteRegDWORD',
        content: WriteRegDWORD
    },
    WriteRegExpandStr: {
        name: 'WriteRegExpandStr',
        content: WriteRegExpandStr
    },
    WriteRegMultiStr: {
        name: 'WriteRegMultiStr',
        content: WriteRegMultiStr
    },
    WriteRegStr: {
        name: 'WriteRegStr',
        content: WriteRegStr
    },
    WriteUninstaller: {
        name: 'WriteUninstaller',
        content: WriteUninstaller
    },
    XPStyle: {
        name: 'XPStyle',
        content: XPStyle
    }
};

var AdvSplash = "# AdvSplash.dll\n\nA small (5.5k), simple plug-in that lets you throw up a splash-screen in NSIS installers with cool fading effects (Windows 2000 or later) and transparency.\n\nCreate a Windows Bitmap (`.bmp`) image to be used as your splash screen. Optionally, you can also create a Wave (`.wav`) audio file to play while the image is being displayed.\n\nBy calling the plug-in in [`.onInit`][1], your splash-screen will be displayed before the setup interface shows up.\n\n## Parameters\n\n    delay fadeIn fadeOut keyColor fileName\n\nParameter | Description\n----------|------------\n`delay`   | length to show the screen for (in milliseconds)\n`fadeIn`  | length to show the fadein scene (in milliseconds) (not included in `delay`, Windows 2000 or later)\n`fadeOut` | length to show the fadeout scene (in milliseconds) (not included in `delay`, Windows 2000 or later)\n`keyColor`| alpha key RGB values (e.g. `0xffff00` for yellow), use -1 when no transparency is used\n`fileName`| Bitmap file-name (without `.bmp` extension). The file name of the optional audio must match (e.g. `mySplash.bmp` and `mySplash.wav`)\n\n## Example\n\nSimple splash:\n\n    Function .onInit\n      SetOutPath $PLUGINSDIR\n      \n      File /oname=spltmp.bmp \"my_splash.bmp\"\n\n      AdvSplash::show 1000 600 400 -1 \"$TEMP\\spltmp\"\n\n    # $0 has '1' if the user closed the splash screen early,\n    # '0' if everything closed normally, and '-1' if some error occurred.\n      Pop $0\n\n      Delete \"$TEMP\\spltmp.bmp\"\n    FunctionEnd\n\nTransparent with sound:\n\n    Function .onInit\n      SetOutPath $PLUGINSDIR\n      \n      File /oname=spltmp.bmp \"my_splash.bmp\"\n      File /oname=spltmp.wav \"my_splashshit.wav\"\n\n      AdvSplash::show 1000 600 400 0xf00fee \"$TEMP\\spltmp\"\n\n    # $0 has '1' if the user closed the splash screen early,\n    # '0' if everything closed normally, and '-1' if some error occurred.\n      Pop $0\n\n      Delete \"$TEMP\\spltmp.bmp\"\n      Delete \"$TEMP\\spltmp.wav\"\n    FunctionEnd\n\n## Credits\n\nWritten by [Justin Frankel](https://en.wikipedia.org/wiki/Justin_Frankel) and [Amir Szekely][3]. Fading and transparency by [Nik Medved][4].\n\n## License\n\nAs part of the NSIS distribution, this plug-in is licensed under [zlib/libpng][5]\n\n[1]: ../Callbacks/onInit.md\n[2]: https://en.wikipedia.org/wiki/Justin_Frankel\n[3]: http://nsis.sourceforge.net/User:Kichik\n[4]: http://nsis.sourceforge.net/User:Brainsucker\n[5]: http://opensource.org/licenses/Zlib\n";

var Banner = "# Banner.dll\n\nThe Banner plug-in shows a banner with customizable text. It uses the `IDD_VERIFY` dialog of the UI.\n\nThere are three functions – `show`, `getWindow` and `destroy`.\n\n## Usage\n\n    Banner::show \"Text to show\"\n    Banner::getWindow\n    Banner::destroy\n\n### Modern UI\n\nThe Modern UI has two labels on the `IDD_VERIFY` dialog. To change all the texts, use:\n\n    Banner::show /set 76 \"Text 1 (replaces Please wait while Setup is loading...)\" \"Normal text\"\n\n### Custom UI\n\nIf you have more labels on your `IDD_VERIFY` dialog, you can use multiple `/set` parameters to change the texts.\n\nExample:\n\n    Banner::show /set 76 \"bah #1\" /set 54 \"bah #2\" \"Normal text\"\n\nThe second parameter for `/set is the ID of the control.\n\n## Example\n\n    Name \"Banner.dll test\"\n    OutFile \"Banner Test.exe\"\n    ShowInstDetails show    \n\n    Function .onInit\n        Banner::show \"Calculating important stuff...\"\n\n        Banner::getWindow\n        Pop $1    \n\n        again:\n        IntOp $0 $0 + 1\n        Sleep 1\n        StrCmp $0 100 0 again\n\n        GetDlgItem $2 $1 1030\n        SendMessage $2 ${WM_SETTEXT} 0 \"STR:Calculating more important  stuff...\"    \n\n        again2:\n        IntOp $0 $0 + 1\n        Sleep 1\n        StrCmp $0 200 0 again2\n\n        Banner::destroy\n    FunctionEnd    \n\n    Section\n        DetailPrint \"Using previous calculations to quickly calculate 1*2000...\"\n        Sleep 1000\n        DetailPrint \"Eureka! It's $0!!!\"\n        DetailPrint \"\"\n    SectionEnd\n\n## Credits\n\nWritten by [Nik Medved][1] and [Amir Szekely][2] in honor of the messages dropped during the battle\n\n## License\n\nAs part of the NSIS distribution, this plug-in is licensed under [zlib/libpng][3]\n\n[1]: http://nsis.sourceforge.net/User:Brainsucker\n[2]: http://nsis.sourceforge.net/User:Kichik\n[3]: http://opensource.org/licenses/Zlib\n";

var BgImage = "# BgImage.dll\n\nDisplays an image or a gradient with user defined texts and/or images behind the NSIS window. Can also play Wave files.\n\n## Usage\n\n    BgImage::SetBg /GRADIENT 0 0x80 0 0x80 0 0\n    BgImage::AddImage background.bmp 150 0\n    BgImage::Redraw\n    BgImage::Clear\n    BgImage::Destroy\n\nDo not call `SetBg (which creates the window) from a section or a function called by a section.`BgImage` must be run from the GUI thread as the installation thread is not built to handle GUI.\n\n### Available Functions\n\n`SetBg [/FILLSCREEN|/TILED] path_to_bitmap`\n`SetBg /GRADIENT R G B R G B`\n\nSets the background and creates the window if necessary\n\n* Use `/FILLSCREEN` to make the image fill the screen\n* Use `/TILED` to set a tiled background\n* Use `/GRADIENT` to set a gradient background\n\nIf `SetReturn on` was called returns \"success\" on the stack or an error string if there was an error\n\nDo not use in [`.onInit`][1]!\n\n`AddImage [/TRANSPARENT R G B] path_to_bitmap X Y`\n\nAdds an image to the background window at (X,Y)\n\n* X and Y can be negative to specify distance from right/bottom\n* Use `/TRANSPARENT` to make BgImage draw the image transparently. Define the transparent color using R G B\n\nIf `SetReturn on` was called returns \"success\" on the stack or an error string if there was an error\n\n`AddText text font_handle R G B X Y X Y`\n\nAdds text to the background window\n\n* Use NSIS's [`CreateFont`][2] to create a font and pass it as `font_handle`\n* Use R G B to set the text color\n* The first X Y is for the top left corner of the text box\n* The second X Y is for the bottom right corner of the text box\n* X and Y can be negative to specify distance from right/bottoms\n\nIf `SetReturn on` was called returns \"success\" on the stack or an error string if there was an error\n\n`Clear`\n\nClears all of the current background, images and texts\n\n`Destroy`\n\n Destroys the current background window. Calls `Clear` automatically.\n\n`Sound [/WAIT|/LOOP] path_to_wav`\n`Sound /STOP`\n\nPlays a wave file\n\n* Use `/WAIT` to wait for the sound to finish playing\n* Use `/LOOP` to loop the sound\n* Use Sound `/STOP` to stop the loop\n\n`SetReturn on|off`\n\nEnable return values from `SetBg`, `AddImage` and `AddText`\n\nDefault value is off because all of the possible errors are either things you should handle when debugging your script such as \"can't load bitmap\" or errors you can do nothing about such as \"memory allocation error\"\n\n## Example\n\n    Name \"BgImage.dll test\"\n    OutFile \"BgImage Test.exe\"\n    XPStyle on\n\n    !define DEBUG\n    !macro GetReturnValue\n        !ifdef DEBUG\n            Pop $R9\n            StrCmp $R9 success +2\n                DetailPrint \"Error: $R9\"\n        !endif\n    !macroend\n\n    Function .onGUIInit\n        # the plugins dir is automatically deleted when the installer exits\n        InitPluginsDir\n\n        # lets extract some bitmaps...\n        File /oname=$PLUGINSDIR\\1.bmp \"${NSISDIR}\\Contrib\\Graphics\\Wizard\\llama.bmp\"\n        File /oname=$PLUGINSDIR\\2.bmp \"${NSISDIR}\\Contrib\\Graphics\\Checks\\modern.bmp\"\n\n        !ifdef DEBUG\n            # turn return values on if in debug mode\n            BgImage::SetReturn on\n        !endif\n\n        # set the initial background for images to be drawn on\n        # we will use a gradient from drak green to dark red\n        BgImage::SetBg /GRADIENT 0 0x80 0 0x80 0 0\n        !insertmacro GetReturnValue\n\n        # add an image @ (150,0)\n        BgImage::AddImage $PLUGINSDIR\\2.bmp 150 0\n        !insertmacro GetReturnValue\n\n        # add the same image only transparent (magenta wiped) @ (150,16)\n        BgImage::AddImage /TRANSPARENT 255 0 255 $PLUGINSDIR\\2.bmp 150 16\n        !insertmacro GetReturnValue\n\n        # create the font for the following text\n        CreateFont $R0 \"Comic Sans MS\" 50 700\n\n        # add a blue shadow for the text\n        BgImage::AddText \"Testing 1... 2... 3...\" $R0 0 0 255 48 48 798 198\n        !insertmacro GetReturnValue\n\n        # add a green shadow for the text\n        BgImage::AddText \"Testing 1... 2... 3...\" $R0 0 255 0 52 52 802 202\n        !insertmacro GetReturnValue\n\n        # add the text\n        BgImage::AddText \"Testing 1... 2... 3...\" $R0 255 0 0 50 50 800 200\n        !insertmacro GetReturnValue\n\n        # show our creation to the world!\n        BgImage::Redraw\n\n        # Refresh doesn't return any value\n    FunctionEnd\n\n    Section\n        # play some sounds\n        FindFirst $0 $1 $WINDIR\\Media\\*.wav\n        StrCmp $0 \"\" skipSound\n\n        moreSounds:\n            StrCmp $1 \"\" noMoreSounds\n            BgImage::Sound /WAIT $WINDIR\\Media\\$1\n\n            # Sound doesn't return any value either\n            MessageBox MB_YESNO \"Another sound?\" IDNO noMoreSounds\n            FindNext $0 $1\n            Goto moreSounds\n\n        noMoreSounds:\n            FindClose $0\n\n        skipSound:\n            # change the background image to Mike, tiled\n            BgImage::SetBg /TILED $PLUGINSDIR\\1.bmp\n            !insertmacro GetReturnValue\n\n        # we have to redraw to reflect the changes\n        BgImage::Redraw\n        MessageBox MB_OK \"Mike the llama\"\n\n        # clear everything\n        BgImage::Clear\n\n        # Clear doesn't return any value\n        # set another gradient\n        BgImage::SetBg /GRADIENT 0xFF 0xFA 0xBA 0xAA 0xA5 0x65\n        !insertmacro GetReturnValue\n\n        # add some text\n        BgImage::AddText \"A Desert for Mike\" $R0 0 0 0 50 50 800 150\n        !insertmacro GetReturnValue\n\n        # add mike as an image\n        BgImage::AddImage $PLUGINSDIR\\1.bmp 50 150\n        !insertmacro GetReturnValue\n\n        # again, we have to call redraw to reflect changes\n        BgImage::Redraw\n    SectionEnd\n    \n    Function .onGUIEnd\n        BgImage::Destroy\n        # Destroy doesn't return any value\n    FunctionEnd\n\n## Credits\n\nWritten by [Amir Szekely][3] with contributions by [Ximon Eighteen][4], [iceman_k][5], Lajos Molnar and Jason Reis\n\n## License\n\nAs part of the NSIS distribution, this plug-in is licensed under [zlib/libpng][6]\n\n[1]: ../Callbacks/onInit.md\n[2]: ../Reference/CreateFont.md\n[3]: http://nsis.sourceforge.net/User:Kichik\n[4]: http://nsis.sourceforge.net/User:Sunjammer\n[5]: http://nsis.sourceforge.net/User:Iceman_K\n[6]: http://opensource.org/licenses/Zlib\n";

var Dialer = "# Dialer\n\nThe Dialer plugin for NSIS provides five functions related to internet connections.\n\nTo download files from the internet, use the NSISdl plugin.\n\n## Usage\n\nSimple example:\n\n    ClearErrors           ;Clear the error flag\n    Dialer::FunctionName  ;Call Dialer function\n    IfErrors \"\" +3        ;Check for errors\n      MessageBox MB_OK \"Function not available\"\n      Quit\n    Pop $R0               ;Get the return value from the stack\n    MessageBox MB_OK $R0  ;Display the return value\n\nExample function:\n\n    ; ConnectInternet (uses Dialer plugin)\n    ; Written by Joost Verburg \n    ;\n    ; This function attempts to make a connection to the internet if there is no\n    ; connection available. If you are not sure that a system using the installer\n    ; has an active internet connection, call this function before downloading\n    ; files with NSISdl.\n    ; \n    ; The function requires Internet Explorer 3, but asks to connect manually if\n    ; IE3 is not installed.\n\n    Function ConnectInternet\n\n      Push $R0\n\n        ClearErrors\n        Dialer::AttemptConnect\n        IfErrors noie3\n\n        Pop $R0\n        StrCmp $R0 \"online\" connected\n          MessageBox MB_OK|MB_ICONSTOP \"Cannot connect to the internet.\"\n          Quit ;Remove to make error not fatal\n\n        noie3:\n\n        ; IE3 not installed\n        MessageBox MB_OK|MB_ICONINFORMATION \"Please connect to the internet now.\"\n\n        connected:\n\n      Pop $R0\n\n    FunctionEnd\n\n### Functions\n\nIf a function is not available on the system, the error flag will be set.\n\n#### AttemptConnect\n\nAttempts to make a connection to the Internet if the system is not connected.\n\n`online` - already connected / connection successful  \n`offline` - connection failed  \n\nRequires Internet Explorer 3 or later\n\n#### AutodialOnline\n\nCauses the modem to automatically dial the default Internet connection if the system\nis not connected to the internet. If the system is not set up to automatically\nconnect, it will prompt the user.\n\nReturn values:\n\n`online` - already connected / connection successful  \n`offline` - connection failed  \n\nRequires Internet Explorer 4 or later\n\n#### AutodialUnattended\n\nCauses the modem to automatically dial the default Internet connection if the system\nis not connected to the internet. The user will not be prompted.\n\nReturn values:\n\n`online` - already connected / connection successful  \n`offline` - connection failed  \n\nRequires Internet Explorer 4 or later\n\n#### AutodialHangup\n\nDisconnects an automatic dial-up connection.\n\nReturn values:\n\n`success` - disconnection successful  \n`failure` - disconnection failed  \n\nRequires Internet Explorer 4 or later\n\n#### GetConnectedState\n\nChecks whether the system is connected to the internet.\n\nReturn values:\n\n`online` - system is online  \n`offline` - system is offline  \n\nRequires Internet Explorer 4 or later\n\n## Credits\n\nWritten by [Amir Szekely][2]. Readme by [Joost Verburg][2]\n\n[1]: http://nsis.sourceforge.net/User:Kichik\n[2]: http://nsis.sourceforge.net/User:Joost\n";

var nsExec = "# nsExec\n\nnsExec will execute command-line based programs and capture the output\nwithout opening a DOS box.\n\n## Usage\n\n    nsExec::Exec [/OEM] [/TIMEOUT=x] path\n    Pop $0\n\n    nsExec::ExecToLog [/OEM] [/TIMEOUT=x] path\n    Pop $0\n\n    nsExec::ExecToStack [/OEM] [/TIMEOUT=x] path\n    Pop $0 ; Return\n    Pop $1 ; Output\n\nAll functions are the same except `ExecToLog` will print the output to the log window and `ExecToStack` will push up to `${NSIS_MAX_STRLEN}` characters of output onto the stack after the return value.\n\nUse the /OEM switch to convert the output text from OEM to ANSI.\n\nThe timeout value is optional.  The timeout is the time in milliseconds `nsExec` will wait for output.  If output from the process is received, the timeout value is reset and it will again wait for more output using the timeout value.  See Return Value for how to check if there was a timeout.\n\nTo ensure that command are executed without problems on all windows versions, is recommended to use the following syntax:\n\n    nsExec::ExecToStack [OPTIONS] '\"PATH\" param1 param2 paramN'\n\nThis way the application path may contain non 8.3 paths (with spaces)\n\n### Return Value\n\nIf `nsExec` is unable to execute the process, it will return \"error\"on the top of the stack, if the process timed out it will return \"timeout\", else it will return the return code from the executed process.\n\n## Credits\n\nWritten by [Robert Rainwater][2]. Thanks to Justin Frankel and [Amir Szekely][3].\n\n[1]: http://nsis.sourceforge.net/User:Rainwater\n[2]: http://nsis.sourceforge.net/User:Kichik\n";

var NSISdl = "# NSISdl\n\nThis plugin can be used from NSIS to download files via HTTP.\nNote: HTTPS is not supported, only plain HTTP!\n\nTo connect to the internet, use the Dialer plugin.\n\n## Usage\n\n    NSISdl::download http://www.domain.com/file localfile.exe\n\nYou can also pass /TIMEOUT to set the timeout in milliseconds:\n\n    NSISdl::download /TIMEOUT=30000 http://www.domain.com/file localfile.exe\n\nThe return value is pushed to the stack:\n\n- `cancel` if cancelled\n- `success` if success\n- otherwise, an error string describing the error\n\nIf you don't want the progress window to appear, use NSISdl::download_quiet.\n\nExample of usage:\n\n    NSISdl::download http://www.domain.com/file localfile.exe\n    Pop $R0 ;Get the return value\n      StrCmp $R0 \"success\" +3\n        MessageBox MB_OK \"Download failed: $R0\"\n        Quit\n\nFor another example, see waplugin.nsi in the examples directory.\n\n### Proxies\n\n`NSISdl` supports only basic configurations of proxies. It doesn't support\nproxies which require authentication, automatic configuration script, etc.\n`NSISdl` reads the proxy configuration from Internet Explorer's registry key\nunder `HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings`. It\nreads and parses `ProxyEnable` and `ProxyServer`.\n\nIf you don't want `NSISdl` to use Internet Explorer's settings, use the\n`/NOIEPROXY` flag. `/NOIEPROXY` should be used after `/TRANSLATE` and\n`/TIMEOUT`. For example:\n\nIf you want to specify a proxy on your own, use the `/PROXY` flag.\n\n    NSISdl::download /NOIEPROXY http://www.domain.com/file localfile.exe\n    NSISdl::download /TIMEOUT=30000 /NOIEPROXY http://www.domain.com/file localfile.exe\n    NSISdl::download /PROXY proxy.whatever.com http://www.domain.com/file localfile.exe\n    NSISdl::download /PROXY proxy.whatever.com:8080 http://www.domain.com/file localfile.exe\n\n### Translate\n\nTo translate `NSISdl` add the following values to the call line:\n\n`/TRANSLATE2` downloading connecting second minute hour seconds minutes hours progress\n\nDefault values are:\n\n- `downloading` - \"Downloading %s\"\n- `connecting` - \"Connecting ...\"\n- `second` - \" (1 second remaining)\"\n- `minute` - \" (1 minute remaining)\"\n- `hour` - \" (1 hour remaining)\"\n- `seconds` - \" (%u seconds remaining)\"\n- `minutes` - \" (%u minutes remaining)\"\n- `hours` - \" (%u hours remaining)\"\n- `progress` - \"%skB (%d%%) of %skB @ %u.%01ukB/s\"\n\nThe old `/TRANSLATE` method still works for backward compatibility.\n\n`/TRANSLATE` downloading connecting second minute hour plural progress remianing\n\nDefault values are:\n\n- `downloading` - \"Downloading %s\"\n- `connecting` - \"Connecting ...\"\n- `second` - \"second\"\n- `minute` - \"minute\"\n- `hour` - \"hour\"\n- `plural` - \"s\"\n- `progress` - \"%dkB (%d%%) of %ukB @ %d.%01dkB/s\"\n- `remaining` -  \" (%d %s%s remaining)\"\n\n`/TRANSLATE` and `/TRANSLATE2` must come before `/TIMEOUT`.\n\n## Credits\n\nWritten by Yaroslav Faybishenko and Justin Frankel.\n";

var Splash = "# Splash\n\nSmall (4k), simple plugin that lets you throw up a splash screen in NSIS installers.\n\n## Usage\n\n    Function .onInit\n      SetOutPath $TEMP\n      File /oname=spltmp.bmp \"my_splash.bmp\"\n\n    ; optional\n    ; File /oname=spltmp.wav \"my_splashsound.wav\"\n\n      splash::show 1000 $TEMP\\spltmp\n\n      Pop $0 ; $0 has '1' if the user closed the splash screen early,\n         ; '0' if everything closed normally, and '-1' if some error occurred.\n\n      Delete $TEMP\\spltmp.bmp\n    ;  Delete $TEMP\\spltmp.wav\n    FunctionEnd\n\nNote that the first parameter to splash.exe is the length to show the\nscreen for (in milliseconds), and the second is the splash bitmap filename (without\nthe .bmp). The BMP file used will be this parameter.bmp, and the wave file used\n(if present) will be this parameter.wav.\n\n(If you already have an .onInit function, put that in it)\n\nNote: the return value of splash is 1 if the user closed the splash\nscreen early (pop it from the stack)\n\n## Credits\n\nWritten by Justin Frankel and [Amir Szekely][1].\n\n[1]: http://nsis.sourceforge.net/User:Kichik\n";

var VPatch = "# VPatch\n\nVPatch allows to create a patch file to update previous versions of your software. The GenPat utility generates the patch file. The plug-in can use the patch to update a file. Using a patch, you can reduce the download size of your updates because only the differences between the files are included in the patch file.\n\n## Usage\n\n### Generate the patch file\n\nMake sure you have the source file (original version) and the target file (version to update to). For example, `DATA.DTA` (currently on user system) and `DATA_20.DTA` (version 2.0 of this data file). Now call the command line tool `GenPat.exe`:\n\n    `GENPAT oldfile.txt newfile.txt patch.pat\n\nNow, the patch will be generated, this will take some time.\n\nUsing the `/B=(BlockSize)` parameter of the GenPat utility (put it after the filenames), you can use a different block size. A smaller block size may result in a smaller patch, but the generation will take more time (the default blocksize is 64).\n\nIf you have trouble using this command-line utility, you can download a GUI (graphical user interface) for VPatch from its own [website][1].\n\n### Update the file during installation\n\nUse the VPatch plug-in to update a file using a patch file:\n\n`vpatch::vpatchfile \"patch.pat\" \"oldfile.txt\" \"temporary_newfile.txt\"`\n\nThe result of the patch operating will be added to the stack and can be one of the following texts:\n\n- OK\n- OK, new version already installed\n- An error occurred while patching\n- Patch data is invalid or corrupt\n- No suitable patches were found\n\nCheck `example.nsi` for an example. You should check whether the stack string starts with \"OK\" because then the patch has succeeded and you can rename \"temporary_newfile.txt\" to \"oldfile.txt\" to replace the original, if you want.\n\n### Multiple patches in one file\n\nGenPat appends a patch to the file you specified. If there is already a patch for the same original file, with the same CRC/MD5, in the patch file, the patch will be replaced. For example, if you want to be able to upgrade version 1 and 2 to version 3, you can put a 1 > 3 and 2 > 3 patch in one file.\n\nYou can also put patches for different files in one patch file, for example, a patch from file A version 1 to file A version 2 and a patch from file B version 1 to file B version 2. Just call the plug-in multiple times with the same patch file. It will automatically select the right patch (based on the file CRC).\n\n### Patch generator (GenPat) exit codes\n\nIn version 3 the following exit codes (known as error levels in the DOS period) can be returned by GenPat. GenPat will return an exit code based on success of the patch generation. Here is a list of the possible exit codes:\n\nExit code | Description\n----------|------------\n0         | Success\n1         | Arguments missing\n2         | Other error\n3         | Source file already has a patch in specified patch file (ERROR), use /R switch to override\n\nThese exit codes can be useful when you generate patch files through a NSIS script.\n\n## Credits\n\nWritten by Koen van de Sande.\n\n[1]: http://www.tibed.net/vpatch\n";

var plugins = {
    AdvSplash: {
        name: 'AdvSplash',
        content: AdvSplash
    },
    Banner: {
        name: 'Banner',
        content: Banner
    },
    BgImage: {
        name: 'BgImage',
        content: BgImage
    },
    Dialer: {
        name: 'Dialer',
        content: Dialer
    },
    nsExec: {
        name: 'nsExec',
        content: nsExec
    },
    NSISdl: {
        name: 'NSISdl',
        content: NSISdl
    },
    Splash: {
        name: 'Splash',
        content: Splash
    },
    VPatch: {
        name: 'VPatch',
        content: VPatch
    }
};

var __DATE__ = "# ${__DATE__}\n\nDate when the script started compiling according to the current locale.\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var __FILE__ = "# ${__FILE__}\n\nCurrent script name.\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var __FILEDIR__ = "# ${__FILEDIR__}\n\nCurrent script directory.\n\n## History\n\nNot documented\n";

var __LINE__ = "# ${__LINE__}\n\nCurrent line number.\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var __TIME__ = "# ${__TIME__}\n\nTime when the script started compiling according to the current locale.\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var __TIMESTAMP__ = "# ${__TIMESTAMP__}\n\nDate & time of the last modification to the script file according to the current locale.\n\n## History\n\nAdded in NSIS v2.0 Beta 4\n";

var ADMINTOOLS = "# $ADMINTOOLS\n\nA directory where administrative tools are kept. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\nThis constant is available on Windows 2000, ME and above.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var APPDATA = "# $APPDATA\n\nThe application data directory. Detection of the current user path requires Internet Explorer 4 and above. Detection of the all users path requires Internet Explorer 5 and above. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\nThis constant is not available on Windows 95 with Internet Explorer 4 and Active Desktop not installed.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var CDBURN_AREA = "# $CDBURN_AREA\n\nA directory where files awaiting to be burned to CD are stored.\n\nThis constant is available on Windows XP and above.\n\n## History\n\nNot documented\n";

var CMDLINE = "# $CMDLINE\n\nThe command line of the installer. The format of the command line can be one of the following:\n\n- \"full\\path to\\installer.exe\" PARAMETER PARAMETER PARAMETER\n- installer.exe PARAMETER PARAMETER PARAMETER\n- For parsing out the PARAMETER portion, see [`GetParameters`][1]. If `/D=` is specified on the command line (to override the install directory) it won't show up in `$CMDLINE`.\n\n## History\n\nAdded in NSIS v1.65\n\n[1]: ../Includes/FileFunc/GetParameters.md\n";

var COMMONFILES = "# $COMMONFILES\n\nThe common files directory. This is a directory for components that are shared across applications (usually `C:\\Program Files\\Common Files` but detected at runtime). On Windows x64, `$COMMONFILES` and `$COMMONFILES32` point to `C:\\Program Files (x86)\\Common Files` while `$COMMONFILES64` points to `C:\\Program Files\\Common Files`. Use `$COMMONFILES64` when installing x64 applications.\n\n## History\n\n`$COMMONFILES32` and `$COMMONFILES64` added in NSIS 2.26\n";

var COOKIES = "# $COOKIES\n\nInternet Explorer's cookies directory.\n\nThis constant is not available on Windows 95 and Windows NT with Internet Explorer 4 and Active Desktop not installed.\n\n## History\n\nNot documented\n";

var DESKTOP = "# $DESKTOP\n\nThe Windows desktop directory (usually `C:\\Windows\\Desktop` but detected at runtime). The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var DOCUMENTS = "# $DOCUMENTS\n\nThe documents directory. A typical path for the current user is `C:\\Documents and Settings\\Foo\\My Documents`. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\nThis constant is not available on Windows 95 with Internet Explorer 4 not installed.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var EXEDIR = "# $EXEDIR\n\nThe directory containing the installer executable (technically you can modify this variable, but it is probably not a good idea).\n\n## History\n\nNot documented\n";

var EXEFILE = "# $EXEFILE\n\nThe base name of the installer executable.\n\n## History\n\nAdded in NSIS v2.26\n";

var EXEPATH = "# $EXEPATH\n\nThe full path of the installer executable.\n\n## History\n\nAdded in NSIS v2.26\n";

var FAVORITES = "# $FAVORITES\n\nThe directory that contains shortcuts to the user's favorite websites, documents, etc. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\nThis constant is not available on Windows 95 with Internet Explorer 4 not installed.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var FONTS = "# $FONTS\n\nThe system's fonts directory.\n\n## History\n\nAdded in NSIS v2.0 Release Candidate 1\n";

var HISTORY = "# $HISTORY\n\nInternet Explorer's history directory.\n\nThis constant is not available on Windows 95 and Windows NT with Internet Explorer 4 and Active Desktop not installed.\n\n## History\n\nNot documented\n";

var HWNDPARENT = "# $HWNDPARENT\n\nThe decimal HWND of the parent window.\n\n## History\n\nNot documented\n";

var INSTDIR = "# $INSTDIR\n\nThe installation directory (`$INSTDIR` is modifiable using [`StrCpy`][1], [`ReadRegStr`][2], [`ReadINIStr`][3], etc. - This could be used, for example, in the [`.onInit`][4] function to do a more advanced detection of install location).\n\nNote that in uninstaller code, `$INSTDIR` contains the directory where the uninstaller lies. It does not necessarily contain the same value it contained in the installer. For example, if you write the uninstaller to [`$WINDIR`][5] and the user doesn't move it, `$INSTDIR` will be [`$WINDIR`][5] in the uninstaller. If you write the uninstaller to another location, you should keep the installer's `$INSTDIR` in the registry or an alternative storing facility and read it in the uninstaller.\n\n## History\n\nAdded in NSIS v1.0\n\n[1]: ../Reference/StrCpy.md\n[2]: ../Reference/ReadRegStr.md\n[3]: ../Reference/ReadINIStr.md\n[4]: ../Callbacks/onInit.md\n[5]: WINDIR.md\n";

var INTERNET_CACHE = "# $INTERNET_CACHE\n\nThe directory that contains link objects that may exist in the Printers folder.\n\nThis constant is not available on Windows 95 and Windows 98.\n\n## History\n\nNot documented\n";

var LANGUAGE = "# $LANGUAGE\n\nThe identifier of the language that is currently used. For example, English is 1033. You can change this variable in [`.onInit`][1].\n\n## History\n\nAdded in NSIS 2.0 Alpha 3\n\n[1]: ../Callbacks/onInit.md\n";

var LOCALAPPDATA = "# $LOCALAPPDATA\n\nThe local (nonroaming) application data directory.\n\nThis constant is available on Windows 2000 and above.\n\n## History\n\nAdded in NSIS v2.07\n";

var MUSIC = "# $MUSIC\n\nThe user's music files directory. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\nThis constant is available on Windows XP, ME and above.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var NETHOOD = "# $NETHOOD\n\nThe directory that contains link objects that may exist in the My Network Places/Network Neighborhood folder.\n\nThis constant is not available on Windows 95 with Internet Explorer 4 and Active Desktop not installed.\n\n## History\n\nNot documented\n";

var NSIS_MAX_STRLEN = "# ${NSIS_MAX_STRLEN}\n\nNSIS maximum string length used to build the script. The default is 1024 bytes, the [special build][1]'s string lenght is 8192 bytes.\n\n## History\n\nNot documented\n\n[1]: http://nsis.sourceforge.net/Special_Builds\n";

var NSIS_VERSION = "# ${NSIS_VERSION}\n\nNSIS version used to build the script.\n\n## History\n\nNot documented\n";

var NSISDIR = "# ${NSISDIR}\n\nA symbol that contains the path where NSIS is installed. Useful if you want to call resources that are in NSIS directory e.g. Icons, UIs etc.\n\nWhen compiled with support for keeping makensis and the data in the same place (the default on Windows), it is in the same place as makensis, on other platforms it is set at compile time (See the INSTALL file for info). In both instances you can modify it at runtime by setting the NSISDIR environment variable. See [section 3.1.3][1] for more info.\n\n## History\n\nAdded in NSIS v2.0 Alpha 2\n\n[1]: http://nsis.sourceforge.net/Docs/Chapter3.html#3.1.3\n";

var OUTDIR = "# $OUTDIR\n\nThe current output directory (set implicitly via [`SetOutPath`][1] or explicitly via [`StrCpy`][2], [`ReadRegStr`][3], [`ReadINIStr`][4], etc)\n\n## History\n\nAdded in NSIS v1.4 Beta\n\n[1]: ../Reference/SetOutPath.md\n[2]: ../Reference/StrCpy.md\n[3]: ../Reference/ReadRegStr.md\n[4]: ../Reference/ReadINIStr.md\n";

var PICTURES = "# $PICTURES\n\nThe user's music files directory. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\nThis constant is available on Windows XP, ME and above.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var PLUGINSDIR = "# $PLUGINSDIR\n\nThe path to a temporary folder created upon the first usage of a plug-in or a call to [`InitPluginsDir`][1]. This folder is automatically deleted when the installer exits. This makes this folder the ideal folder to hold INI files for [InstallOptions][2], bitmaps for the splash plug-in, or any other file that a plug-in needs to work.\n\n## History\n\nNot documented\n\n[1]: ../Reference/InitPluginsDir.md\n[2]: http://nsis.sourceforge.net/Docs/InstallOptions/Readme.html\n";

var PRINTHOOD = "# $PRINTHOOD\n\nThe directory that contains link objects that may exist in the Printers folder.\n\nThis constant is not available on Windows 95 and Windows 98.\n\n## History\n\nNot documented\n";

var PROFILE = "# $PROFILE\n\nThe user's profile directory. A typical path is `C:\\Documents and Settings\\Foo`.\n\nThis constant is available on Windows 2000 and above.\n\n## History\n\nNot documented\n";

var PROGRAMFILES = "# $PROGRAMFILES, $PROGRAMFILES32, $PROGRAMFILES64\n\nThe program files directory (usually `C:\\Program Files` but detected at runtime). On Windows x64, `$PROGRAMFILES` and `$PROGRAMFILES32` point to `C:\\Program Files (x86)` while `$PROGRAMFILES64` points to `C:\\Program Files`. Use `$PROGRAMFILES64` when installing x64 applications.\n\n## History\n\n`$PROGRAMFILES32` and `$PROGRAMFILES64` added in NSIS 2.26\n";

var QUICKLAUNCH = "# $QUICKLAUNCH\n\nThe quick launch folder for IE4 active desktop and above. If quick launch is not available, simply returns the same as [`$TEMP`][1].\n\n## History\n\nAdded in NSIS v1.0i\n\n[1]: TEMP.md\n";

var RECENT = "# $RECENT\n\nThe directory that contains shortcuts to the user's recently used documents.\n\n## History\n\nNot documented\n";

var RESOURCES = "# $RESOURCES\n\nThe resources directory that stores themes and other Windows resources (usually `C:\\Windows\\Resources` but detected at runtime).\n\nThis constant is available on Windows XP and above.\n\n## History\n\nNot documented\n";

var RESOURCES_LOCALIZED = "# $RESOURCES_LOCALIZED\n\n---\n\nThe localized resources directory that stores themes and other Windows resources (usually `C:\\Windows\\Resources` but detected at runtime).\n\nThis constant is available on Windows XP and above.\n\n## History\n\nNot documented\n\n---\n";

var SENDTO = "# $SENDTO\n\nThe directory that contains Send To menu shortcut items.\n\n## History\n\nAdded in NSIS v2.0 Release Candidate 1\n";

var SMPROGRAMS = "# $SMPROGRAMS\n\nThe start menu programs folder (use this whenever you want `$STARTMENU\\Programs`). The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\n## History\n\nAdded in NSIS v1.0i\n\n[1]: ../Reference/SetShellVarContext.md\n";

var SMSTARTUP = "# $SMSTARTUP\n\nThe start menu programs / startup folder. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\n## History\n\nAdded in NSIS v1.0i\n\n[1]: ../Reference/SetShellVarContext.md\n";

var STARTMENU = "# $STARTMENU\n\nThe start menu folder (useful in adding start menu items using [`CreateShortCut`][1]). The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][2] setting. The default is the current user.\n\n## History\n\nNot documented\n\n[1]: ../Reference/CreateShortCut.md\n[2]: ../Reference/SetShellVarContext.md\n";

var SYSDIR = "# $SYSDIR\n\nThe Windows system directory (usually `C:\\Windows\\System` or `C:\\WinNT\\System32` but detected at runtime).\n\n## History\n\nNot documented\n";

var TEMP = "# $TEMP\n\nThe system temporary directory (usually `%APPDATA%\\Local\\Temp` or `C:\\Windows\\Temp` but detected at runtime).\n\n## History\n\nNot documented\n";

var TEMPLATES = "# $TEMPLATES\n\nThe document templates directory. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var VIDEOS = "# $VIDEOS\n\nThe user's video files directory. The context of this constant (All Users or Current user) depends on the [`SetShellVarContext`][1] setting. The default is the current user.\n\nThis constant is available on Windows XP, ME and above.\n\n## History\n\nNot documented\n\n[1]: ../Reference/SetShellVarContext.md\n";

var WINDIR = "# $WINDIR\n\nThe Windows directory (usually `C:\\Windows` or `C:\\WinNT` but detected at runtime).\n\n## History\n\nNot documented\n";

var variables = {
    HISTORY: {
        name: '$HISTORY',
        content: HISTORY
    },
    __DATE__: {
        name: '${__DATE__}',
        content: __DATE__
    },
    __FILE__: {
        name: '${__FILE__}',
        content: __FILE__
    },
    __FILEDIR__: {
        name: '${__FILEDIR__}',
        content: __FILEDIR__
    },
    __LINE__: {
        name: '${__LINE__}',
        content: __LINE__
    },
    __TIME__: {
        name: '${__TIME__}',
        content: __TIME__
    },
    __TIMESTAMP__: {
        name: '${__TIMESTAMP__}',
        content: __TIMESTAMP__
    },
    ADMINTOOLS: {
        name: '$ADMINTOOLS',
        content: ADMINTOOLS
    },
    APPDATA: {
        name: '$APPDATA',
        content: APPDATA
    },
    CDBURN_AREA: {
        name: '$CDBURN_AREA',
        content: CDBURN_AREA
    },
    CMDLINE: {
        name: '$CMDLINE',
        content: CMDLINE
    },
    COMMONFILES: {
        name: '$COMMONFILES',
        content: COMMONFILES
    },
    COOKIES: {
        name: '$COOKIES',
        content: COOKIES
    },
    DESKTOP: {
        name: '$DESKTOP',
        content: DESKTOP
    },
    DOCUMENTS: {
        name: '$DOCUMENTS',
        content: DOCUMENTS
    },
    EXEDIR: {
        name: '$EXEDIR',
        content: EXEDIR
    },
    EXEFILE: {
        name: '$EXEFILE',
        content: EXEFILE
    },
    EXEPATH: {
        name: '$EXEPATH',
        content: EXEPATH
    },
    FAVORITES: {
        name: '$FAVORITES',
        content: FAVORITES
    },
    FONTS: {
        name: '$FONTS',
        content: FONTS
    },
    HWNDPARENT: {
        name: '$HWNDPARENT',
        content: HWNDPARENT
    },
    INSTDIR: {
        name: '$INSTDIR',
        content: INSTDIR
    },
    INTERNET_CACHE: {
        name: '$INTERNET_CACHE',
        content: INTERNET_CACHE
    },
    LANGUAGE: {
        name: '$LANGUAGE',
        content: LANGUAGE
    },
    LOCALAPPDATA: {
        name: '$LOCALAPPDATA',
        content: LOCALAPPDATA
    },
    MUSIC: {
        name: '$MUSIC',
        content: MUSIC
    },
    NETHOOD: {
        name: '$NETHOOD',
        content: NETHOOD
    },
    NSIS_MAX_STRLEN: {
        name: '$NSIS_MAX_STRLEN',
        content: NSIS_MAX_STRLEN
    },
    NSIS_VERSION: {
        name: '$NSIS_VERSION',
        content: NSIS_VERSION
    },
    NSISDIR: {
        name: '$NSISDIR',
        content: NSISDIR
    },
    OUTDIR: {
        name: '$OUTDIR',
        content: OUTDIR
    },
    PICTURES: {
        name: '$PICTURES',
        content: PICTURES
    },
    PLUGINSDIR: {
        name: '$PLUGINSDIR',
        content: PLUGINSDIR
    },
    PRINTHOOD: {
        name: '$PRINTHOOD',
        content: PRINTHOOD
    },
    PROFILE: {
        name: '$PROFILE',
        content: PROFILE
    },
    PROGRAMFILES: {
        name: '$PROGRAMFILES',
        content: PROGRAMFILES
    },
    QUICKLAUNCH: {
        name: '$QUICKLAUNCH',
        content: QUICKLAUNCH
    },
    RECENT: {
        name: '$RECENT',
        content: RECENT
    },
    RESOURCES_LOCALIZED: {
        name: '$RESOURCES_LOCALIZED',
        content: RESOURCES_LOCALIZED
    },
    RESOURCES: {
        name: '$RESOURCES',
        content: RESOURCES
    },
    SENDTO: {
        name: '$SENDTO',
        content: SENDTO
    },
    SMPROGRAMS: {
        name: '$SMPROGRAMS',
        content: SMPROGRAMS
    },
    SMSTARTUP: {
        name: '$SMSTARTUP',
        content: SMSTARTUP
    },
    STARTMENU: {
        name: '$STARTMENU',
        content: STARTMENU
    },
    SYSDIR: {
        name: '$SYSDIR',
        content: SYSDIR
    },
    TEMP: {
        name: '$TEMP',
        content: TEMP
    },
    TEMPLATES: {
        name: '$TEMPLATES',
        content: TEMPLATES
    },
    VIDEOS: {
        name: '$VIDEOS',
        content: VIDEOS
    },
    WINDIR: {
        name: '$WINDIR',
        content: WINDIR
    }
};

export { callbacks as Callbacks, commands as Commands, includes as Includes, plugins as Plugins, variables as Variables };
