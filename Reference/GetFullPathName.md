# GetFullPathName

---

Assign to the user variable $x, the full path of the file specified. If the path portion of the parameter is not found, the error flag will be set and $x will be empty. If `/SHORT` is specified, the path is converted to the short filename form. However, if `/SHORT` is not specified, the path isn't converted to its long filename form. To get the long filename, call GetLongPathName using the System plug-in. Note that GetLongPathName is only available on Windows 98, Windows 2000 and above.

## Parameters

    [/SHORT] user_var(output) path_or_file

## Example

	StrCpy $INSTDIR $PROGRAMFILES\NSIS
	SetOutPath $INSTDIR
	GetFullPathName $0 ..
	DetailPrint $0 # will print C:\Program Files
	GetFullPathName /SHORT $0 $INSTDIR
	DetailPrint $0 # will print C:\Progra~1\NSIS

Using GetLongPathName:

	StrCpy $0 C:\Progra~1\NSIS
	System::Call 'kernel32::GetLongPathName(t r0, t .r1, i ${NSIS_MAX_STRLEN}) i .r2'
	StrCmp $2 error +2
	StrCpy $0 $1
	DetailPrint $0 # will print C:\Program Files\NSIS, where supported

## History

Added in NSIS v1.70

---
