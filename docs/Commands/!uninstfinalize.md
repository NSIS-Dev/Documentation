# !finalize

This option will execute 'command' using a call to _system()_ after the uninstaller EXE has been generated. You can typically use it to sign (Authenticode) your installer. If 'command' contains a '%1' it will be replaced by the executable filename.
On POSIX platforms, `!execute` will use _system()_ just like [`!system`][1].

## Parameters

    command

## Example

    !uninstfinalize 'sign.bat "%1" "MyProduct Installer" http://example.com'

## History

Added in NSIS v3.08

[1]: !system.md
