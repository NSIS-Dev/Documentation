# InstallDir

Sets the default installation directory. See the variables section for variables that can be used to make this string (especially [`$PROGRAMFILES`][1]). Note that the part of this string following the last \ will be used if the user selects 'browse', and may be appended back on to the string at install time (to disable this, end the directory with a \ (which will require the entire parameter to be enclosed with quotes). If this doesn't make any sense, play around with the browse button a bit.

## Parameters

    definstdir

## History

Added in NSIS v1.0f

[1]: ../Variables/PROGRAMFILES.md
