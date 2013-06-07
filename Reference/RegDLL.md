# ReadRegStr

---

Loads the specified DLL and calls DllRegisterServer (or entrypoint_name if specified). The error flag is set if an error occurs (i.e. it can't load the DLL, initialize OLE, find the entry point, or the function returned anything other than ERROR_SUCCESS (=0)).

Use [`SetOutPath`][1] to set the current directory for DLLs that depend on other DLLs that are now in the path or in the Windows directory

## Parameters:

    dllfile [entrypoint_name]

## Example:

If foo.dll depends on bar.dll which is located in $INSTDIR use:

	SetOutPath $INSTDIR
	RegDLL $INSTDIR\foo.dll

## History:

Added in NSIS v1.0i

---

[1]: SetOutPath.md