# ${WordFind}

Multi-features string function.

## Syntax

```nsis
${WordFind} "[string]" "[delimiter]" "[E][options]" $var
```

```
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
```

Notes:

- Accepted numbers 1,01,001,...

## Examples

### Find word by number

```nsis
Section
    ${WordFind} "C:\io.sys C:\Program Files C:\WINDOWS" " C:\" "-02" $R0
    ; $R0="Program Files"
SectionEnd
```

### Delimiter exclude

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys C:\WINDOWS" "sys" "-2}" $R0
    ; $R0=" C:\logo.sys C:\WINDOWS"
SectionEnd
```

### Sum of words

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys C:\WINDOWS" " C:\" "#" $R0
    ; $R0="3"
SectionEnd
```

### Sum of delimiters

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys C:\WINDOWS" "sys" "*" $R0
    ; $R0="2"
SectionEnd
```

### Find word number

```nsis
Section
    ${WordFind} "C:\io.sys C:\Program Files C:\WINDOWS" " " "/Files" $R0
    ; $R0="3"
SectionEnd
```

### }}

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys C:\WINDOWS" " " "+2}}" $R0
    ; $R0=" C:\WINDOWS"
SectionEnd
```

### {}

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys C:\WINDOWS" " " "+2{}" $R0
    ; $R0="C:\io.sys C:\WINDOWS"
SectionEnd
```

### *}

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys C:\WINDOWS" " " "+2*}" $R0
    ; $R0="C:\logo.sys C:\WINDOWS"
SectionEnd
```

### Get parent directory

```nsis
Section
    StrCpy $R0 "C:\Program Files\NSIS\NSIS.chm"
;               "C:\Program Files\NSIS\Include\"
;               "C:\\Program Files\\NSIS\\NSIS.chm"

    ${WordFind} "$R0" "\" "-2{*" $R0
    ; $R0="C:\Program Files\NSIS"
    ;     "C:\\Program Files\\NSIS"
SectionEnd
```

### Coordinates

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys C:\WINDOWS" ":\lo" "E+1{" $R0
    ; $R0="C:\io.sys C"
    IfErrors end

    StrLen $0 $R0             ; $0 = Start position of word (11)
    StrLen $1 ':\lo'          ; $1 = Word length (4)
    ; StrCpy $R0 $R1 $1 $0    ; $R0 = :\lo

    end:
SectionEnd
```

### With errorlevel output

```nsis
Section
    ${WordFind} "[string]" "[delimiter]" "E[options]" $R0

    IfErrors 0 end
    StrCmp $R0 1 0 +2       ; errorlevel 1?
    MessageBox MB_OK 'delimiter not found' IDOK end
    StrCmp $R0 2 0 +2       ; errorlevel 2?
    MessageBox MB_OK 'no such word number' IDOK end
    StrCmp $R0 3 0 +2       ; errorlevel 3?
    MessageBox MB_OK 'syntax error'

    end:
SectionEnd
```

### Without errorlevel output

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys" "_" "+1" $R0

    ; $R0="C:\io.sys C:\logo.sys" (error: delimiter "_" not found)
SectionEnd
```

### If found

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys" ":\lo" "E+1{" $R0

    IfErrors notfound found
    found:
    MessageBox MB_OK 'Found' IDOK end
    notfound:
    MessageBox MB_OK 'Not found'

    end:
SectionEnd
```

### If found 2

```nsis
Section
    ${WordFind} "C:\io.sys C:\logo.sys" ":\lo" "+1{" $R0

    StrCmp $R0 "C:\io.sys C:\logo.sys" notfound found        ; error?
    found:
    MessageBox MB_OK 'Found' IDOK end
    notfound:
    MessageBox MB_OK 'Not found'

    end:
SectionEnd
```

### To accept one word in string if delimiter not found

```nsis
Section
    StrCpy $0 'OneWord'
    StrCpy $1 1

    loop:
    ${WordFind} "$0" " " "E+$1" $R0
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
```

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
