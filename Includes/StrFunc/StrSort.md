# ${StrSort}

Searches for "CenterStr" in "String", and returns only the value between "LeftStr" and "RightStr", including or not the "CenterStr" using "IncludeCenterStr" and/or the "LeftStr" using "IncludeLeftStr" and "RightStr" using "IncludeRightStr".

## Syntax

    ResultVar String LeftStr CenterStr RightStr IncludeLeftStr(1|0) IncludeCenterStr(1|0) IncludeRightStr(1|0)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search "CenterStr".

    LeftStr
    The first occurrence of "LeftStr" on the left of "CenterStr".
    If it is an empty value, or was not found, will return
    everything on the left of "CenterStr".

    CenterStr
    String to search in "String".

    RightStr
    The first occurrence of "RightStr" on the right of "CenterStr".
    If it is an empty value, or was not found, will return
    everything on the right of "CenterStr".

    IncludeLeftStr(1|0)
    Include or not the "LeftStr" in the result value. Default is 1
    (True). (1 = True, 0 = False)

    IncludeCenterStr(1|0)
    Include or not the "CenterStr" in the result value. Default is 1
    (True). (1 = True, 0 = False)

    IncludeRightStr(1|0)
    Include or not the "RightStr" in the result value. Default is 1
    (True). (1 = True, 0 = False)

## Example

    ${StrSort} $0 "This is just an example" " just" "" "ple" "0" "0" "0"
    $0 = "This is an exam"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix