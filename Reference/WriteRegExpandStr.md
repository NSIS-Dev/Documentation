# WriteRegExpandStr

---

Write a string to the registry. root_key must be one of:

* HKCR or HKEY_CLASSES_ROOT
* HKLM or HKEY_LOCAL_MACHINE
* HKCU or HKEY_CURRENT_USER
* HKU or HKEY_USERS
* HKCC or HKEY_CURRENT_CONFIG
* HKDD or HKEY_DYN_DATA
* HKPD or HKEY_PERFORMANCE_DATA
* SHCTX or SHELL_CONTEXT

If root_key is SHCTX or SHELL_CONTEXT, it will be replaced with HKLM if [`SetShellVarContext`][1] is set to all and with HKCU if [`SetShellVarContext`][1] is set to current.

The error flag is set if the string could not be written to the registry. The type of the string will be REG_SZ for [`WriteRegStr`][2], or REG_EXPAND_STR for [`WriteRegExpandStr`][3]. If the registry key doesn't exist it will be created.

## Parameters:

    root_key subkey key_name value

## History:

Added in NSIS v1.6beta2

---

[1]: SetShellVarContext.md
[2]: WriteRegStr.md
[3]: WriteRegExpandStr.md