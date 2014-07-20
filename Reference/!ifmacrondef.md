# !ifmacrondef

---

The opposite of [`!ifmacrodef`][1]. The lines will be compiled when the macro gflag does not exist. This command, when paired with an [`!endif`][2] command, will tell the compiler whether or not to compile the lines in between the two lines. If the macro gflag exists, then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as `&` (boolean and) or `|` (boolean or) along with more gflags -- precedence is simple, left to right.

## Parameters

    gflag [bcheck gflag [...]]]

## Example

    !ifmacrondef SomeMacro
        !echo "SomeMacro is not defined"
    !endif

## History

Added in NSIS v2.0

---

[1]: !ifmacrodef.md
[2]: !endif.md