# $INSTDIR

---

The installation directory ([`$INSTDIR`][1] is modifiable using [`StrCpy`][2], [`ReadRegStr`][3], [`ReadINIStr`][4], etc. - This could be used, for example, in the [`.onInit`][5] function to do a more advanced detection of install location).

Note that in uninstaller code, [`$INSTDIR`][1] contains the directory where the uninstaller lies. It does not necessarily contain the same value it contained in the installer. For example, if you write the uninstaller to [`$WINDIR`][6] and the user doesn't move it, [`$INSTDIR`][1] will be [`$WINDIR`][6] in the uninstaller. If you write the uninstaller to another location, you should keep the installer's [`$INSTDIR`][1] in the registry or an alternative storing facility and read it in the uninstaller.

## History:

Added in NSIS v1.0

---

[1]: ../Variables/INSTDIR.md
[2]: ../Reference/StrCpy.md
[3]: ../Reference/ReadRegStr.md
[4]: ../Reference/ReadINIStr.md
[5]: ../Callbacks/onInit.md
[6]: $WINDIR.md