# PEAddResource

Adds `file` as a resource to the installer and uninstaller. `restype` specifies the resource type and can be any string or # followed by a standard type or number. `resname` must be # followed by a number. `reslang` is optional and specifies the language id of the resource. Replacing standard NSIS resources is not supported, you should use [`Icon`][Icon] and [`ChangeUI`][ChangeUI] instead.

## Parameters

    [/OVERWRITE|/REPLACE] file restype resname [reslang]

## Example

    PEAddResource 0x020 0

## History

Added in NSIS v3.05

[Icon]: Icon.md
[ChangeUI]: ChangeUI.md
