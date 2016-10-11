# .onInit

This callback will be called when the installer is nearly finished initializing. If the `.onInit` function calls [`Abort`][1], the installer will quit instantly.

## Example

    Function .onInit
        MessageBox MB_YESNO "This will install. Continue?" IDYES NoAbort
        Abort ; causes installer to quit.
        NoAbort:
    FunctionEnd
 
or:

    Function .onInit
        ReadINIStr $INSTDIR $WINDIR\wincmd.ini Configuration InstallDir
        StrCmp $INSTDIR "" 0 NoAbort
        MessageBox MB_OK "Windows Commander not found. Unable to get install path."
        Abort ; causes installer to quit.
        NoAbort:
    FunctionEnd

[1]: ../Reference/Abort.md