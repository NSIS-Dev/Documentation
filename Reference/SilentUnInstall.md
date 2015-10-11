# SilentUnInstall

Specifies whether or not the uninstaller should be silent. If it is 'silent' or 'silentlog', the uninstall section will run quietly, with no screen output from the uninstaller itself (the script can still display whatever it wants, use [`MessageBox`][1]'s `/SD` to specify a default for silent installers). Note that if this is set to 'normal' and the user runs the uninstaller with `/S` on the command line, it will behave as if SilentUnInstall 'silent' was used.

Note: see also [`LogSet`][2].

## Parameters

    normal|silent

## History

Added in NSIS v1.7b2

[1]: MessageBox.md
[2]: LogSet.md