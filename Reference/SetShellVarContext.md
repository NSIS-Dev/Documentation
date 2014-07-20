# SetShellVarContext

---

Sets the context of [`$SMPROGRAMS`][1] and other shell folders. If set to 'current' (the default), the current user's shell folders are used. If set to 'all', the 'all users' shell folder is used. The all users folder may not be supported on all OSes. If the all users folder is not found, the current user folder will be used. Please take into consideration that a "normal user" has no rights to write in the all users area. Only admins have full access rights to the all users area. You can check this by using the UserInfo plug-in. See Contrib\UserInfo\UserInfo.nsi for an example.

Note that, if used in installer code, this will only affect the installer, and if used in uninstaller code, this will only affect the uninstaller. To affect both, it needs to be used in both.

## Parameters

	current|all

## Example

	SetShellVarContext current
	StrCpy $0 $DESKTOP
	SetShellVarContext all
	StrCpy $1 $DESKTOP
	MessageBox MB_OK $0$\n$1

## History

Added in NSIS v1.98

---

[1]: ../Variables/SMPROGRAMS