# RequestExecutionLevel

Specifies the requested execution level for Windows Vista and Windows 7. The value is embedded in the installer and uninstaller's XML manifest and tells Vista/7, and probably future versions of Windows, what privileges level the installer requires. *user* requests a normal user's level with no administrative privileges. *highest* will request the highest execution level available for the current user and will cause Windows to prompt the user to verify privilege escalation. The prompt might request for the user's password. *admin* requests administrator level and will cause Windows to prompt the user as well. Specifying none, which is also the default, will keep the manifest empty and let Windows decide which execution level is required. Windows Vista/7 automatically identifies NSIS installers and decides administrator privileges are required. Because of this, none and admin have virtually the same effect.

It's recommended that every application is marked with a required execution level. Unmarked installers are subject to compatibility mode. Workarounds of this mode include automatically moving any shortcuts created in the user's start menu to all users' start menu. Installers that don't install anything into system folders nor write to the local machine registry (HKLM) should specify \e{user} execution level.

More information about this topic can be found at [MSDN][1]. Keywords include "UAC", "requested execution level", "vista manifest" and "vista security".

## Parameters

    none|user|highest|admin

## History

Added in NSIS v2.21

[1]: http://msdn.microsoft.com/en-us/library/bb756929
