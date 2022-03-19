# GetWinVer

Gets the Windows version as reported by GetVersionEx. `WinVer.nsh` is the preferred method for performing Windows version checks.

## Parameters

    user_var(output) Major|Minor|Build|ServicePack

## Example

    GetWinVer $1 Build

## History

Added in NSIS v3.08
