# !finalize

---

This option will execute 'command' using a call to system() after the output EXE has been generated. You can typically use it to sign (Authenticode) your installer. If 'command' contains a '%1' it will be replaced by the executable filename.
On POSIX platforms, `!execute` will use system() just like [!system][1].

## Parameters:

    command

## Example:

	!finalize 'sign.bat "%1" "Product Installer" http://example.com'

## History:

*not documented*

---

[1]: !system.md