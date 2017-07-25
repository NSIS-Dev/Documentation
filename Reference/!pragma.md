# !pragma

The pragma commands allows you to change compiler features and behavior.

## Parameters

    /REGEDIT5 root_key subkey key_name value

## Example

    !pragma warning disable 9000 ; Disable warning about using "Setup.exe" as the name
    OutFile "Setup.exe"

## History

Added in NSIS v3.02

[1]: http://www.un4seen.com/petite/
[2]: http://upx.sourceforge.net/