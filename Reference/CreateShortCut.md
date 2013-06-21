# CreateShortCut

---

Creates a shortcut 'link.lnk' that links to 'target.file', with optional parameters 'parameters'. The icon used for the shortcut is 'icon.file,icon_index_number'; for default icon settings use empty strings for both icon.file and icon_index_number. start_options should be one of: SW_SHOWNORMAL, SW_SHOWMAXIMIZED, SW_SHOWMINIMIZED, or an empty string. keyboard_shortcut should be in the form of 'flag|c' where flag can be a combination (using |) of: ALT, CONTROL, EXT, or SHIFT. c is the character to use (a-z, A-Z, 0-9, F1-F24, etc). Note that no spaces are allowed in this string. A good example is "ALT|CONTROL|F8". `$OUTDIR` is used for the working directory. You can change it by using [`SetOutPath`][1] before creating the Shortcut. description should be the description of the shortcut, or comment as it is called under XP. The error flag is set if the shortcut cannot be created (i.e. either of the paths (link or target) does not exist, or some other error).

## Parameters:

    link.lnk target.file [parameters [icon.file [icon_index_number [start_options [keyboard_shortcut [description]]]]]]

## Example:

	CreateDirectory $INSTDIR\some\directory

## History:

Added in NSIS 1.0f

---

[1]: SetOutPath.md