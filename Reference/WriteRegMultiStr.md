# WriteRegMultiStr

Writes a multi-string value. The `/REGEDIT5` switch must be used and specifies that the data is in the hex format used by `.reg` files on Windows 2000 and later.

## Parameters

    root_key subkey key_name value

## Example

    WriteRegMultiStr HKLM "Software\My Company\My Software" "String Value" "dead beef"

## History

Added in NSIS v3.02
