# ${FileReadFromEnd}

Read text file from end line by line.

## Syntax

    ${FileReadFromEnd} "[File]" "Function"

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
        ${FileReadFromEnd} "C:\a.log" "Example1"

        IfErrors 0 +2
        MessageBox MB_OK "Error"
    SectionEnd

    Function Example1
        MessageBox MB_OKCANCEL '"Line"=[$9]$\n   "#"=[$8]$\n  "-#"=[$7]' IDOK +2
        StrCpy $0 StopFileReadFromEnd

        Push $0
    FunctionEnd

### Reverse text file

    Section
        GetTempFileName $R0
        FileOpen $R1 $R0 w
        ${FileReadFromEnd} "C:\a.log" "Example2"
        FileClose $R1

        IfErrors 0 +2
        MessageBox MB_OK "Error" IDOK +2
        Exec '"notepad.exe" "$R0"'
    SectionEnd

    Function Example2
        StrCmp $7 -1 0 +5
        StrCpy $1 $9 1 -1
        StrCmp $1 '$\n' +3
        StrCmp $1 '$\r' +2
        StrCpy $9 '$9$\r$\n'

        FileWrite $R1 "$9"

        Push $0
    FunctionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor