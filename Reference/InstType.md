# InstType

---

Adds an install type to the install type list, or disables the custom install type. There can be as many as 32 types, each one specifying the name of the install type. If the name is prefixed with 'un.' it is an uninstaller install type. The name can contain variables which will be processed at runtime before the components page shows. Another way of changing the InstType name during runtime is the [`InstTypeSetText`][1] command. The difference is that with [`InstTypeSetText`][1] you are saving your precious user variables. The first type is the default (generally 'Typical'). If the `/NOCUSTOM` switch is specified, then the "custom" install type is disabled, and the user has to choose one of the pre-defined install types. Alternatively, if the `/CUSTOMSTRING` switch is specified, the parameter will override the "Custom" install type text. Alternatively, if the `/COMPONENTSONLYONCUSTOM` flag is specified, the component list will only be shown if the "Custom" install type is selected.

Accepts variables for type names. If variables are used, they must be initialized before the components page is created.

## Parameters:

    install_type_name | /NOCUSTOM | /CUSTOMSTRING=str | /COMPONENTSONLYONCUSTOM

## History:

Added in NSIS 1.0f

---

[1]: InstTypeSetText.md