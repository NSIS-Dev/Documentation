# DeleteRegValue

Deletes a registry value. Valid values for root_key are listed under [`WriteRegStr`][1]. The error flag is set if the value could not be removed from the registry (or if it didn't exist to begin with).

## Parameters

    root_key subkey key_name

## Example

    DeleteRegValue HKLM "Software\My Company\My Software" "some value"

## History

Added in NSIS v1.0f

[1]: WriteRegStr.md
