# InstProgressFlags

Valid values for flag are "smooth" (smooth the progress bar) or "colored" (color the progress bar with the colors set by [`InstallColors`][1].

Note: neither "smooth" or "colored" work with [`XPStyle`][2] on when the installer runs on Windows XP with a modern theme.

## Parameters

    [flag [...]]

## Example

    InstProgressFlags #default old-school windows look
    InstProgressFlags smooth" #new smooth look
    InstProgressFlags smooth colored #colored smooth look whee

## History

Added in NSIS v1.60

[1]: InstallColors.md
[2]: XPStyle.md