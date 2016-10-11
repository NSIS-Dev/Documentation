# IfAbort

If [`Abort`][1] is called it will "return" true. This can happen if the user chose abort on a file that failed to create (or overwrite) or if the user aborted by hand. This function can only be called from the leave function of the instfiles page.

## Parameters

    label_to_goto_if_abort [label_to_goto_if_no_abort]

## Example

    Page instfiles "" "" instfilesLeave
     
    Function instfilesLeave
        IfAbort 0 +2
        MessageBox MB_OK "user aborted"
    FunctionEnd

## History

Added in NSIS v2.0

[1]: Abort.md