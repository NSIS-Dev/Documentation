# $COMMONFILES

The common files directory. This is a directory for components that are shared across applications (usually `C:\Program Files\Common Files` but detected at runtime). On Windows x64, `$COMMONFILES` and `$COMMONFILES32` point to `C:\Program Files (x86)\Common Files` while `$COMMONFILES64` points to `C:\Program Files\Common Files`. Use `$COMMONFILES64` when installing x64 applications.

## History

`$COMMONFILES32` and `$COMMONFILES64` added in NSIS 2.26
