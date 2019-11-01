# ${BannerTrimPath}

Trim string path for banner.

## Syntax

    ${BannerTrimPath} "[PathString]" "[Option]" $var

    "[PathString]"    ;
                      ;
    "[Option]"        ; [Length][A|B|C|D]
                      ;
                      ; Length  -Maximum string length
                      ;   A     -Trim center path (default)
                      ;           (C:\root\...\third path) 
                      ;           If A mode not possible Then will be used B mode
                      ;   B     -Trim right path
                      ;           (C:\root\second path\...)
                      ;           If B mode not possible Then will be used C mode
                      ;   C     -Trim right string
                      ;           (C:\root\second path\third p...)
                      ;   D     -Trim right string + filename
                      ;           (C:\root\second p...\third path)
                      ;           If D mode not possible Then will be used C mode
                      ;
    $var              ; Result:  Trimmed path

## Examples

### Trim center path to 35 characters max

    Section
        ${BannerTrimPath} "C:\Server\Documents\Terminal\license.htm" "35A" $R0
        ;$R0=C:\Server\...\Terminal\license.htm
    SectionEnd

### Banner plugin

    !include "WinMessages.nsh"
    !include "FileFunc.nsh"

    Section
        Banner::show "Starting..."
        Banner::getWindow
        Pop $R1
        ${Locate} "$WINDIR" "/L=F /M=*.* /B=1" "LocateCallback"
        Banner::destroy
    SectionEnd

    Function LocateCallback
        StrCmp $R0 $R8 code
        StrCpy $R0 $R8
        ${BannerTrimPath} "$R8" "38B" $R8
        GetDlgItem $1 $R1 1030
        SendMessage $1 ${WM_SETTEXT} 0 "STR:$R8"

        code:
        StrCmp $R9 '' end
        ;...

        end:
        Push $0
    FunctionEnd

### NxS plugin

    !include "FileFunc.nsh"

    Section
        nxs::Show /NOUNLOAD `$(^Name) Setup`\
          /top `Setup searching something$\nPlease wait$\nIf you can...`\
          /h 1 /can 1 /end
        ${Locate} "$WINDIR" "/L=F /M=*.* /B=1" "LocateCallback"
        nxs::Destroy
    SectionEnd

    Function LocateCallback
        StrCmp $R0 $R8 abortcheck
        StrCpy $R0 $R8
        ${BannerTrimPath} "$R8" "55A" $R8
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
