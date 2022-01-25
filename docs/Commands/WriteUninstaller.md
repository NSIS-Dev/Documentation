# WriteUninstaller

Writes the uninstaller to the filename (and optionally path) specified. Only valid from within an install section or function, and requires that you have an uninstall section in your script. See also Uninstall configuration. You can call this one or more times to write out one or more copies of the uninstaller.

## Parameters

    [Path\]exename.exe

## Example

    WriteUninstaller $INSTDIR\uninstaller.exe

## History

Added in NSIS v1.80
