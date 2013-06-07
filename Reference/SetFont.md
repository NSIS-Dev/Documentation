# SetFont

---

Sets the installer font. Please remember that the font you choose must be present on the user's machine as well. Don't use rare fonts that only you have.

Use the `/LANG` switch if you wish to set a different font for each language.

There are two LangStrings named ^Font and ^FontSize which contain the font and font size for every language.

## Parameters:

    [/LANG=lang_id] font_face_name font_size

## Example:

	 SetFont /LANG=${LANG_ENGLISH} "English Font" 9
	 SetFont /LANG=${LANG_FRENCH} "French Font" 10

## History:

Added in NSIS v1.3

---
