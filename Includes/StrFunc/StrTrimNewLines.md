# StrTrimNewLines

Deletes unnecessary new lines at end of "String".

## Syntax

    ResultVar String

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String where to search unnecessary new lines at end of "String".

## Example

    ${StrTrimNewLines} $0 "$\r$\nThis is just an example$\r$\n$\r$\n"
    $0 = "$\r$\nThis is just an example"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix