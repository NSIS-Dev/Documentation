# ${ConfigWrite}

Write value from entry name in config file.

## Syntax

    ${ConfigWrite} "[File]" "[Entry]" "[Value]" $var

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
        ${ConfigWrite} "C:\AUTOEXEC.BAT" "SET winbootdir=" "D:\WINDOWS" $R0
        ;$R0=CHANGED
    SectionEnd

### Example 2

    Section
        ${ConfigWrite} "C:\apache\conf\httpd.conf" "Timeout " "30" $R0
        ;$R0=SAME
    SectionEnd

### Example 3

    Section
        ${ConfigWrite} "C:\apache\conf\httpd.conf" "Timeout " "" $R0
        ;$R0=DELETED
    SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor
