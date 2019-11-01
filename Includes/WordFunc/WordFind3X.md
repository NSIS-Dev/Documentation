# ${WordFind3X}

Find a word that contains a string, between two delimiters.

## Syntax

    ${WordFind3X} "[string]" "[delimiter1]" "[center]" "[delimiter2]" "[E][options]" $var

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
        ${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "+1" $R0
        ; $R0="1.AAB"
    SectionEnd

### Example 2

    Section
        ${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1" $R0
        ; $R0="2.BAA"
    SectionEnd

### Example 3

    Section
        ${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{{" $R0
        ; $R0="[1.AAB];"
    SectionEnd

### Example 4

    Section
        ${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{}" $R0
        ; $R0="[1.AAB];[3.BBB];"
    SectionEnd

### Example 5

    Section
        ${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "-1{*" $R0
        ; $R0="[1.AAB];[2.BAA];"
    SectionEnd

### Example 6

    Section
        ${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "AA" "];" "/2.BAA" $R0
        ; $R0="2"
    SectionEnd

### With errorlevel output

    Section
        ${WordFind3X} "[1.AAB];[2.BAA];[3.BBB];" "[" "XX" "];" "E+1" $R0
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
