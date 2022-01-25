# BGGradient

Specifies whether or not to use a gradient background window. If 'off', the installer will not show a background window, if no parameters are specified, the default black to blue gradient is used, and otherwise the top\_color or bottom\_color are used to make a gradient. top\_color and bottom\_color are specified using the form RRGGBB (in hexadecimal, as in HTML, only minus the leading '#', since # can be used for comments). 'textcolor' can be specified as well, or 'notext' can be specified to turn the big background text off.

## Parameters

    [off|(topc botc [textcolor|notext])]

## History

Added in NSIS v1.2f
