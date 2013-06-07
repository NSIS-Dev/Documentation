# SetCompress

---

This command sets the compress flag which is used by the installer to determine whether or not data should be compressed. Typically the `SetCompress flag will affect the commands after it, and the last `SetCompress command in the file also determines whether or not the install info section and uninstall data of the installer is compressed. If compressflag is 'auto', then files are compressed if the compressed size is smaller than the uncompressed size. If compressflag is set to 'force', then the compressed version is always used. If compressflag is 'off' then compression is not used (which can be faster).

Note that this option has no effect when solid compression is used.

## Parameters:

    auto|force|off

## History:

*not documented*

---

[1]: GetCurrentAddress.md
[2]: GetFunctionAddress.md
[3]: GetLabelAddress.md
[4]: Return.md