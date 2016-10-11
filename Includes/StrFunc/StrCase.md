# ${StrCase}

Converts "String" to "Type" Case. Uses [LogicLib][1].

## Syntax

    ResultVar String Type(|L|U|T|S|<>)

## Parameters

    ResultVar
    Destination where result is returned.

    String
    String to convert to "Type" case.
    
    Type
    Type of string case to convert to:

      - "" = Original Case (same as "String")
      - L = Lower Case (this is just an example. a very simple one.)
      - U = Upper Case (THIS IS JUST AN EXAMPLE. A VERY SIMPLE ONE.)
      - T = Title Case (This Is Just An Example. A Very Simple One.)
      - S = Sentence Case (This is just an example. A very simple one.)
      - <> = Switch Case (This is just an example. A very simple one.)
      
    Default value is "" (Original Case).

## Example

    ${StrCase} $0 '"Você" is "You" in English.' "U"
    $0 = '"VOCÊ" IS "YOU" IN ENGLISH.'

## Credits

Written by [deguix][2]

[1]: ../LogicLib
[2]: http://nsis.sourceforge.net/User:Deguix