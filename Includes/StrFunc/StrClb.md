# StrClb

Makes an action with the clipboard depending on value of parameter "Action".  Uses [LogicLib][1].

## Syntax

    ResultVar String Action(|>|<|<>)

## Parameters

    String
    If "Action" = ">" or "<>" - String to put on the clipboard.

    Action
    Can be one of the following values:

      - "" = Cleans the clipboard.
      - ">" = Set string to clipboard.
      - "<" = Get string from clipboard.
      - "<>" = Swap string with clipboard's.

## Credits

Written by [deguix][2]

[1]: ../LogicLib
[2]: http://nsis.sourceforge.net/User:Deguix