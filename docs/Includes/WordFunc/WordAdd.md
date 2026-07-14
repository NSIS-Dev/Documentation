# ${WordAdd}

Add words to string1 from string2 if not exist or delete words if exist.

## Syntax

```nsis
${WordAdd} "[string1]" "[delimiter]" "[E][options]" $var
```

```
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
```

## Examples

### add

```nsis
Section
    ${WordAdd} "C:\io.sys C:\WINDOWS" " " "+C:\WINDOWS C:\config.sys" $R0
    ; $R0="C:\io.sys C:\WINDOWS C:\config.sys"
SectionEnd
```

### delete

```nsis
Section
    ${WordAdd} "C:\io.sys C:\logo.sys C:\WINDOWS" " " "-C:\WINDOWS C:\config.sys C:\IO.SYS" $R0
    ; $R0="C:\logo.sys"
SectionEnd
```

### add to one

```nsis
Section
    ${WordAdd} "C:\io.sys" " " "+C:\WINDOWS C:\config.sys C:\IO.SYS" $R0
    ; $R0="C:\io.sys C:\WINDOWS C:\config.sys"
SectionEnd
```

### delete one

```nsis
Section
    ${WordAdd} "C:\io.sys C:\logo.sys C:\WINDOWS" " " "-C:\WINDOWS" $R0
    ; $R0="C:\io.sys C:\logo.sys"
SectionEnd
```

### No new words found

```nsis
Section
    ${WordAdd} "C:\io.sys C:\logo.sys" " " "+C:\logo.sys" $R0
    StrCmp $R0 "C:\io.sys C:\logo.sys" 0 +2
    MessageBox MB_OK "No new words found to add"
SectionEnd
```

### No words deleted

```nsis
Section
    ${WordAdd} "C:\io.sys C:\logo.sys" " " "-C:\config.sys" $R0
    StrCmp $R0 "C:\io.sys C:\logo.sys" 0 +2
    MessageBox MB_OK "No words found to delete"
SectionEnd
```

### With errorlevel output

```nsis
Section
    ${WordAdd} "C:\io.sys C:\logo.sys" "" "E-C:\logo.sys" $R0
    ; $R0="1" (delimiter is empty "")

    IfErrors 0 noerrors
    MessageBox MB_OK 'Errorlevel=$R0' IDOK end

    noerrors:
    MessageBox MB_OK 'No errors'

    end:
SectionEnd
```

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
