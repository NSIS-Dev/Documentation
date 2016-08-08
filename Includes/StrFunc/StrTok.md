# StrTok

Returns the part "ResultPart" between two "Separators" inside "String".

## Syntax

    ResultVar String Separators ResultPart[L] SkipEmptyParts(1|0)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search for "Separators".

    Separators
    Characters to find on "String".

    ResultPart[L]
    The part want to be found on "StrToTokenize" between two "Separators".
    Can be any number, starting at 0, and "L" that is the last part.
    Default is L (Last part).

    SkipEmptyParts(1|0)
    Skips empty string parts between two "Separators". Default is 1 (True).
    (1 = True, 0 = False)

## Example

    ${StrTok} $0 "This is, or is not, just an example" " ," "4" "1"
    $0 = "not"
    
    ${StrTok} $0 "This is, or is not, just an example" " ," "4" "0"
    $0 = "is"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix