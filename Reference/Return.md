# Rename

Returns from a [`Function`][1] or [`Section`][2].

## Example

    Function func
        StrCmp $0 "return now" 0 +2
        Return
        # do stuff
    FunctionEnd

    Section
        Call func
        ;"Return" will return here
    SectionEnd

## History

Added in NSIS v1.80

[1]: Function.md
[2]: Section.md