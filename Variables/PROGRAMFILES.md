# $PROGRAMFILES, $PROGRAMFILES32, $PROGRAMFILES64

---

The program files directory (usually `C:\Program Files` but detected at runtime). On Windows x64, `$PROGRAMFILES` and `$PROGRAMFILES32` point to `C:\Program Files (x86)` while `$PROGRAMFILES64` points to `C:\Program Files`. Use `$PROGRAMFILES64` when installing x64 applications.

## History

`$PROGRAMFILES32` and `$PROGRAMFILES64` added in NSIS 2.26

---