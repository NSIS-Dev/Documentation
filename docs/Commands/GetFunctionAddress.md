# GetFunctionAddress

Gets the address of the function and stores it in the output user variable. This user variable then can be passed to [`Call`][1] or [`Goto`][2]. Note that if you [`Goto`][2] an address which is the output of `GetFunctionAddress`, your function will never be returned to (when the function you Goto'd to returns, you return instantly).

## Parameters

    user_var(output) function_name

## Example

    Function func
        DetailPrint "function"
    FunctionEnd
     
    Section
        GetFunctionAddress $0 func
        Call $0
    SectionEnd

## History

Added in NSIS v1.80

[1]: Call.md
[2]: Goto.md
