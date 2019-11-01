# AllowRootDirInstall

Controls whether or not installs are allowed in the root directory of a drive, or directly into a network share. Set to 'true' to change the safe behavior, which prevents users from selecting C:\ or \\Server\Share as an install (and later on, uninstall) directory. For additional directory selection page customizability, see [`.onVerifyInstDir`][1].

## Parameters

    true|false

## History

Added in NSIS v1.80

[1]: ../Callbacks/onVerifyInstDir.md
