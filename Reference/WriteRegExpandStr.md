# WriteRegExpandStr

---

Write a string to the registry. root\_key must be one of:

* HKCR or HKEY\_CLASSES\_ROOT
* HKLM or HKEY\_LOCAL\_MACHINE
* HKCU or HKEY\_CURRENT\_USER
* HKU or HKEY_USERS
* HKCC or HKEY\_CURRENT\_CONFIG
* HKDD or HKEY\_DYN\_DATA
* HKPD or HKEY\_PERFORMANCE\_DATA
* SHCTX or SHELL_CONTEXT

If root\_key is SHCTX or SHELL\_CONTEXT, it will be replaced with HKLM if [`SetShellVarContext`][1] is set to all and with HKCU if [`SetShellVarContext`][1] is set to current.

The error flag is set if the string could not be written to the registry. The type of the string will be REG\_SZ for [`WriteRegStr`][2], or REG\_EXPAND\_STR for [`WriteRegExpandStr`][3]. If the registry key doesn't exist it will be created.

## Parameters

    root_key subkey key_name value

## History

Added in NSIS v1.6beta2

---

[1]: SetShellVarContext.md
[2]: WriteRegStr.md
[3]: WriteRegExpandStr.md