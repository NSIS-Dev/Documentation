# ${LineFind}

Find specified lines in text file, and edit or view these lines in callback function.

## Syntax

    ${LineFind} "[File1]" "[File2|/NUL]" "[LineNumbers]" "Function"

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
        ${LineFind} "C:\a.log" "C:\a-edited.log" "3:-1" "Example1"
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example1
        ${TrimNewLines} '$R9' $R9
        StrCpy $R9 $R9 '' 2
        StrCpy $R9 '$R9$\r$\n'
        ;start from 3 line and delete first two symbols

        Push $0
    FunctionEnd

### Show changed lines

    Section
        ${LineFind} "C:\a.log" "a.log" "{5:12 15 -6:-5 -1}" "Example2"
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example2
        ${TrimNewLines} '$R9' $R9
        StrCpy $R9 "$R9   ~Changed line ($R8)~$\r$\n"

        Push $0
    FunctionEnd

### Delete lines

    Section
        ${LineFind} "C:\a.log" "\logs\a.log" "2:3 10:-5 -3:-2" "Example3"
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example3
        StrCpy $0 SkipWrite

        Push $0
    FunctionEnd

### Insert lines

    Section
        ${LineFind} "C:\a.log" "" "10" "Example4
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example4
        FileWrite $R4 "---First Line---$\r$\n"
        FileWrite $R4 "---Second Line ...---$\r$\n"

        Push $0
    FunctionEnd

### Replace in file with count of changes - "WordFunc.nsh" required

    !include "WordFunc.nsh"

    Section
        StrCpy $R0 0
        ${LineFind} "C:\a.log" "C:\logs\a.log" "1:-1" "Example5"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        MessageBox MB_OK "Changed lines=$R0"
    SectionEnd

    Function Example5
        StrCpy $1 $R9

        ${WordReplace} '$R9' ' ' '_' '+*' $R9

        StrCmp $1 $R9 +2
        IntOp $R0 $R0 + 1
        ;$R0   count of changed lines

        Push $0
    FunctionEnd

### Line string to cut or delete

    Section
        ${LineFind} "\a.log" "C:\logs\a.log" "" "Example6"
        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        MessageBox MB_OK "Processed lines=$R1:$R2"
    SectionEnd

    Function Example6
        ;(Cut lines from a line to another line (also including that line))
        StrCmp $R0 finish stop
        StrCmp $R0 start finish
        StrCmp $R9 'Start Line$\r$\n' 0 skip
        StrCpy $R0 start
        StrCpy $R1 $R8
        goto code
        finish:
        StrCmp $R9 'Finish Line$\r$\n' 0 code
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
        ; StrCmp $R9 'Start Line$\r$\n' 0 code
        ; StrCpy $R0 start
        ; StrCpy $R1 $R8
        ; goto skip
        ; finish:
        ; StrCmp $R9 'Finish Line$\r$\n' 0 skip
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
        ${LineFind} "C:\a.log" "/NUL" "1:-1" "Example7"
        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example7
        MessageBox MB_OKCANCEL '$$R9  "Line"=[$R9]$\n$$R8     "#" =[$R8]' IDOK +2
        StrCpy $0 StopLineFind

        Push $0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
