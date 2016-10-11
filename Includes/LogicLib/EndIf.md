# ${EndIf}

Ends an open condition started by [`${If}`][1] or [`${IfNot}`][2].

## Syntax

    ${EndIf}

## Example

    StrCpy $0 true

    ${If} $0 == true
        MessageBox MB_OK "It's true"
    ${EndIf}

## Credits

Written by dselkirk and eccles

[1]: If.md
[2]: IfNot.md