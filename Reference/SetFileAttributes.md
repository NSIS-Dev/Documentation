# SetFileAttributes

---

Sets the file attributes of 'filename'. Valid attributes can be combined with | and are:

* NORMAL or FILE_ATTRIBUTE_NORMAL (you can use 0 to abbreviate this)
* ARCHIVE or FILE_ATTRIBUTE_ARCHIVE
* HIDDEN or FILE_ATTRIBUTE_HIDDEN
* OFFLINE or FILE_ATTRIBUTE_OFFLINE
* READONLY or FILE_ATTRIBUTE_READONLY
* SYSTEM or FILE_ATTRIBUTE_SYSTEM
* TEMPORARY or FILE_ATTRIBUTE_TEMPORARY

The error flag will be set if the file's attributes cannot be set (i.e. the file doesn't exist, or you don't have the right permissions). You can only set attributes. It's not possible to unset them. If you want to remove an attribute use NORMAL. This way all attributes are erased. This command doesn't support wildcards.

## Parameters

    filename attribute1|attribute2|...

## History

Added in NSIS v1.2c

---
