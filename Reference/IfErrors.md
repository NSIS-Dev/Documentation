# IfErrors

Checks and clears the error flag, and if it is set, it will [`Goto`][1] jumpto\_iferror, otherwise it will [`Goto`][1] jumpto\_ifnoerror. The error flag is set by other instructions when a recoverable error (such as trying to delete a file that is in use) occurs.

## Parameters

    jumpto_iferror [jumpto_ifnoerror]

## Example

    ClearErrors
    File file.dat
    IfErrors 0 +2
    Call ErrorHandler

## History

Added in NSIS v1.2g

[1]: Goto.md
