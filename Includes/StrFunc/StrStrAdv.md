# StrStrAdv

Searches for "StrToSearchFor" in "String" in the direction specified by "SearchDirection" and looping "Loops" times.

## Syntax

    ResultVar String StrToSearchFor SearchDirection(>|<) ResultStrDirection(>|<) DisplayStrToSearch(1|0) Loops CaseSensitive(0|1)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "StrToSearchFor".

    StrToSearchFor
    String to search in "String".

    SearchDirection (>|<)
    Where do you want to direct the search. Default is ">" (to right).
    (< = To left, > = To right)

    ResultStrDirection (>|<)
    Where the result string will be based on in relation of
    "StrToSearchFor"
    position. Default is ">" (to right). (< = To left, > = To right)

    DisplayStrToSearch (1|0)
    Display "StrToSearchFor" in the result. Default is "1" (True).
    (1 = True, 0 = False)

    Loops
    Number of times the code will search "StrToSearchFor" in "String" not
    including the original execution. Default is "0" (1 code execution).

    CaseSensitive(0|1)
    If "1" the search will be case-sensitive (differentiates between cases).
    If "0" it is case-insensitive (does not differentiate between cases).
    Default is "0" (Case-Insensitive).

## Example

    ${StrStrAdv} $0 "This IS really just an example" "IS " ">" ">" "0" "0" "1"
    $0 = "really just an example"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix