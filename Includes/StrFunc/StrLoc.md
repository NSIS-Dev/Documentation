# ${StrLoc}

Searches for "StrToSearchFor" in "String" and returns its location, according to "CounterDirection".

## Syntax

    ResultVar String StrToSearchFor CounterDirection(>|<)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "StrToSearchFor".

    StrToSearchFor
    String to search in "String".

    CounterDirection(>|<)
    Direction where the counter increases to. Default is ">".
    (> = increases from left to right, < = increases from right to left)

## Example

    ${StrLoc} $0 "This is just an example" "just" "<"
    $0 = "11"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
