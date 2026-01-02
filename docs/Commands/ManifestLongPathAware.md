# ManifestLongPathAware

Declare that the installer can handle paths longer than `MAX_PATH`. Only supported on Windows 10 Anniversary Update and later.

> [!NOTE]
> Instructions like [`CopyFiles`][CopyFiles] and [`CreateShortcut`][CreateShortcut] do not support long paths!

## Parameters

    notset|true|false

## History

Added in NSIS v3.05

[CopyFiles]: CopyFiles.md
[CreateShortcut]: CreateShortcut.md
