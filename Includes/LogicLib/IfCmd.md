# ${IfCmd}

Conditionally executes an inline statement, depending on a true value of the provided NSIS function. This is short for 

## Syntax

    ${IfCmd} command ${||} statement ${|}

This is short for

    ${IfThen} ${Cmd} `command` ${|} statement ${|}

which is short for

    ${If} ${Cmd} `command`
        statement
    ${EndIf}
    
Notes:
* the command is terminated by `${||}`, not enclosed by quotes as with `${Cmd}`
* you can (probably) use any command that accepts a jump target (label etc.) as the last parameter
* only one jump target is supported

## Example

    StrCpy $R2 ""

    ${IfCmd} MessageBox MB_YESNO "Please click Yes" IDYES ${||} StrCpy $R2 $R2A ${|}
    ${Unless} ${Cmd} `MessageBox MB_YESNO|MB_DEFBUTTON2 "Please click No" IDYES`
        StrCpy $R2 $R2B
    ${EndUnless}

    ${If} $R2 == "AB"
        MessageBox "You clicked Yes"
    ${Else}
        MessageBox "You clicked No"
    ${EndIf}

## Credits

Written by dselkirk and eccles
