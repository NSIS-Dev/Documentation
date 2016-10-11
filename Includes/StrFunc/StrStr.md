# ${StrStr}

Searches for "StrToSearchFor" in "String".

## Syntax

    ResultVar String StrToSearchFor

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "StrToSearchFor".

    StrToSearchFor
    String to search in "String".

## Example

    ${StrStr} $0 "This is just an example" "just"
    $0 = "just an example"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix