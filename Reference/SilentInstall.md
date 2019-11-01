# SilentInstall

Specifies whether or not the installer should be silent. If it is 'silent' or 'silentlog', all sections that have the SF_SELECTED flag are installed quietly (you can set this flag using [`SectionSetFlags`][1]), with no screen output from the installer itself (the script can still display whatever it wants, use [`MessageBox`][2]'s `/SD` to specify a default for silent installers). Note that if this is set to 'normal' and the user runs the installer with `/S` (case sensitive) on the command line, it will behave as if `SilentInstall` 'silent' was used.

Note: see also [`LogSet`][3].

## Parameters

    normal|silent|silentlog

## History

Added in NSIS v1.0f

[1]: SectionSetFlags.md
[2]: MessageBox.md
[3]: LogSet.md
