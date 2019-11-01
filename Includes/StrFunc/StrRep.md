# ${StrRep}

Searches for all "StrToReplace" in "String" replacing those with "ReplacementString".

## Syntax

    ResultVar String StrToReplace ReplacementString

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "StrToReplace".

    StrToReplaceFor
    String to search in "String".

    StringToBeReplacedWith
    String to replace "StringToReplace" when it is found in "String".

## Example

    ${StrRep} $0 "This is just an example" "an" "one"
    $0 = "This is just one example"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix
