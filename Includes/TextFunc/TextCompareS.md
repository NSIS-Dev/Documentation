# ${TextCompareS}

Compare two text files, case sensitive

## Syntax

    ${TextCompareS} "[File1]" "[File2]" "[Option]" "Function"

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
        ${TextCompareS} "C:\1.txt" "C:\2.txt" "FastDiff" "Example1"
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
        FileWrite $R3 "$R0 | $R1$\r$\n"
        ${TextCompareS} "$R0" "$R1" "FastDiff" "Example2"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2

        Exec "notepad.exe $R2"
    FunctionEnd

    Function Example2
        FileWrite $R3 '$8=$9'
        FileWrite $R3 '$6=$7$\r$\n'

        Push $0
    FunctionEnd

### Compare line-by-line - Equal

    Section
        StrCpy $R0 'Text1.txt'
        StrCpy $R1 'Text2.txt'

        GetTempFileName $R2
        FileOpen $R3 $R2 w
        FileWrite $R3 "$R0 | $R1$\r$\n"
        ${TextCompareS} "$R0" "$R1" "FastEqual" "Example3"
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
        FileWrite $R3 "$R0 | $R1$\r$\n"
        ${TextCompareS} "$R0" "$R1" "SlowDiff" "Example4"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK end

        FileWrite $R3 "$\r$\n$R1 | $R0$\r$\n"
        ${TextCompareS} "$R1" "$R0" "SlowDiff" "Example4"
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
        FileWrite $R3 "$R0 | $R1$\r$\n"
        ${TextCompareS} "$R0" "$R1" "SlowEqual" "Example5"
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
        ${TextCompareS} "C:\1.txt" "C:\2.txt" "FastDiff" "Example6"

        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example6
        MessageBox MB_OKCANCEL '$$9    "Line File1" =[$9]$\n$$8    "Line #"      =[$8]$\n$$7    "Line File2" =[$7]$\n$$6    "Line #"      =[$6]' IDOK +2
        StrCpy $0 StopTextCompare

        Push $0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
