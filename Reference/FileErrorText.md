# FileErrorText

---

Replaces the default text that comes up when a file cannot be written to. This string can contain a reference to `$0, which is the filename (`$0 is temporarily changed to this value). Example: "Can not write to file $\r$\n$0$\r$\ngood luck.".

Accepts variables. If variables are used, they must be initialized before [`File`][1] is used.

## Parameters

    text

## History

Added in NSIS v1.63beta

---

[1]: File.md