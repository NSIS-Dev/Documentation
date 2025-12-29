# UnsafeStrCpy

*This command has not yet been officially documented*

Works the same as [`StrCpy`][1], but allows ovewriting special variables such as [`$PLUGINSDIR`][2]. Use with extreme caution!

## Parameters

    user_var(destination) str [maxlen] [start_offset]

## Example

    UnsafeStrCpy $PLUGINSDIR "C:\CustomPluginLocation" 

## History

Added in NSIS v3.0

[1]: StrCpy.md
[2]: ../Variables/PLUGINSDIR.md
