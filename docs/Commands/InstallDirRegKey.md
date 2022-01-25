# InstallDirRegKey

This attribute tells the installer to check a string in the registry and use it as the install dir if that string is valid. If this attribute is present, it will override the [`InstallDir`][1] attribute if the registry key is valid, otherwise it will fall back to the [`InstallDir`][1] value. When querying the registry, this command will automatically remove any quotes. If the string ends in ".exe", it will automatically remove the filename component of the string (i.e. if the string is "C:\\Program Files\\Foo\\app.exe", it will know to use "C:\\Program Files\\Foo"). For more advanced install directory configuration, set [`$INSTDIR`][2] in [`.onInit`][3].

Language strings and variables cannot be used with `InstallDirRegKey`.

## Parameters

    root_key subkey key_name

## Example

    InstallDirRegKey HKLM Software\NSIS ""
    InstallDirRegKey HKLM Software\ACME\Thingy InstallLocation

## History

Added in NSIS v1.0f

[1]: InstallDir.md
[2]: ../Variables/INSTDIR.md
[3]: ../Callbacks/onInit.md
