# LicenseForceSelection

---

Specifies if the displayed license must be accept explicit or not. This can be done either by a checkbox or by radiobuttons. By default the "next button" is disabled and will only be enabled if the checkbox is enabled or the right radio button is selected. If off is specified the "next button" is enabled by default.

## Parameters:

    (checkbox [accept_text] | radiobuttons [accept_text] [decline_text] | off)

## Example:

	LicenseForceSelection checkbox
	LicenseForceSelection checkbox "i accept"
	LicenseForceSelection radiobuttons
	LicenseForceSelection radiobuttons "i accept"
	LicenseForceSelection radiobuttons "i accept" "i decline"
	LicenseForceSelection radiobuttons "" "i decline"
	LicenseForceSelection off

## History:

Added in NSIS v2.0 Beta 4

---
