# InstallDirRegKey

---

This attribute tells the installer to check a string in the registry, and use it for the install dir if that string is valid. If this attribute is present, it will override the [`InstallDir`][1] attribute if the registry key is valid, otherwise it will fall back to the [`InstallDir`][1] default. When querying the registry, this command will automatically remove any quotes. If the string ends in ".exe", it will automatically remove the filename component of the string (i.e. if the string is "C:\program files\poop\poop.exe", it will know to use "C:\program files\poop"). For more advanced install directory configuration, set `$INSTDIR` in [`.onInit`][2].

Language strings and variables cannot be used with `InstallDirRegKey`.

## Parameters:

    root_key subkey key_name

## Example:

	InstallDirRegKey HKLM Software\NSIS ""
	InstallDirRegKey HKLM Software\ACME\Thingy InstallLocation

## History:

Added in NSIS v1.0f

---

[1]: InstallDir.md
[2]: ../Functions/.onInit.md