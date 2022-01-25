# .onVerifyInstDir

This callback enables control over whether or not an installation path is valid for your installer. This code will be called every time the user changes the install directory, so it shouldn't do anything crazy with [`MessageBox`][1] or the likes. If this function calls [`Abort`][2], the installation path in [`$INSTDIR`][3] is deemed invalid.

Example:

    Function .onVerifyInstDir
        IfFileExists $INSTDIR\Winamp.exe PathGood
        Abort ; if $INSTDIR is not a winamp directory, don't let us install there
        PathGood:
    FunctionEnd

[1]: ../Reference/MessageBox.md
[2]: ../Reference/Abort.md
[3]: ../Variables/INSTDIR.md
