# ${If}

Conditionally executes a block of statements, depending on the value of an expression.

## Syntax

    ${If} expression

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
        ${Abort}; ${Errors}; ${RebootFlag}; ${Silent}
    Built-in NSIS other tests:
        ${FileExists} a
    Any conditional NSIS instruction test:
        ${Cmd} a
    Section flag tests:
        ${SectionIsSelected} a; ${SectionIsSectionGroup} a;
        ${SectionIsSectionGroupEnd} a; ${SectionIsBold} a;
        ${SectionIsReadOnly} a; ${SectionIsExpanded} a;
        ${SectionIsPartiallySelected} a

## Examples

### Check if condition is met

    StrCpy $0 true

    ${If} $0 == true
        MessageBox MB_OK "It's true"
    ${Else}
        MessageBox MB_OK "This will never be true"
    ${EndIf}

### Integer tests

    ${If} 1 > 0
        MessageBox MB_OK "1 is greater than 0"
    ${EndIf}

    ${If} 2 > 1
    ${AndIf} 2 < 3
        MessageBox MB_OK "2 is greater than 1 and smaller than 3"
    ${EndIf}

### File conditions

    ${If} ${FileExists} $SYSDIR\notepad.exe
        Exec $SYSDIR\notepad.exe
    ${Else}
        MessageBox MB_OK "Could not find notepad.exe"
    ${EndIf}

    ${If} ${FileExists} $PROGAMFILES\*.*
        MessageBox MB_OK "Directory $$PROGRAMFILES exists"
    ${EndIf}

### Section test

    Section "My Section" mySection
        MessageBox MB_OK "Executing section"

        ${If} ${SectionIsSelected} ${mySection}
            MessageBox MB_OK "It's selected, dummy!"
        ${EndIf}
    SectionEnd

## Credits

Written by dselkirk and eccles
