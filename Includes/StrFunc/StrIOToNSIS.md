# StrIOToNSIS

Convert "String" from Install Options plugin to be supported by NSIS. Escape, back-slash, carriage return, line feed and tab characters are converted.

## Syntax

    ResultVar String

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String to convert to be supportable for NSIS.

## Example

    ${StrIOToNSIS} $0 "\r\n\t\\This is just an example\\"
    $0 = "$\r$\n$\t\This is just an example\"

## Credits

Written by [deguix][1]

[1]: http://nsis.sourceforge.net/User:Deguix