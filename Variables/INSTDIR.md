# $INSTDIR

The installation directory (`$INSTDIR` is modifiable using [`StrCpy`][1], [`ReadRegStr`][2], [`ReadINIStr`][3], etc. - This could be used, for example, in the [`.onInit`][4] function to do a more advanced detection of install location).

Note that in uninstaller code, `$INSTDIR` contains the directory where the uninstaller lies. It does not necessarily contain the same value it contained in the installer. For example, if you write the uninstaller to [`$WINDIR`][5] and the user doesn't move it, `$INSTDIR` will be [`$WINDIR`][5] in the uninstaller. If you write the uninstaller to another location, you should keep the installer's `$INSTDIR` in the registry or an alternative storing facility and read it in the uninstaller.

## History

Added in NSIS v1.0

[1]: ../Reference/StrCpy.md
[2]: ../Reference/ReadRegStr.md
[3]: ../Reference/ReadINIStr.md
[4]: ../Callbacks/onInit.md
[5]: WINDIR.md