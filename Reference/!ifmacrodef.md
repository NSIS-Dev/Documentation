# !ifmacrodef

---

This command, when paired with an [`!endif`][1] command, will tell the compiler whether or not to compile the lines in between the two lines. If the macro gflag exists, then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as `&` (boolean and) or `|` (boolean or) along with more gflags -- precedence is simple, left to right.

## Parameters:

    gflag [bcheck gflag [...]]]

## Example:

    !macro SomeMacro
    !macroend
    !ifmacrodef SomeMacro
      !echo "SomeMacro is defined"
    !endif

## History:

Added in NSIS v2.0

---

[1]: !endif.md