# PageEx

---

Adds an installer page or an uninstaller page if the un. prefix was used. Every `PageEx` must have a matching [`PageExEnd`][1]. In a `PageEx` block you can set options that are specific to this page and will not be used for other pages. Options that are not set will revert to what was set outside the `PageEx` block or the default if nothing was set. To set the sub-caption for a page use [`Caption`][2] or [`SubCaption`][3] to set the default. To set the callback functions for a page set with `PageEx` use [`PageCallbacks`][4]. See the above sections for more information about built-in versus custom pages.

## Parameters

    [un.](custom|uninstConfirm|license|components|directory|instfiles)

## Example

	PageEx license
		LicenseText "Readme"
		LicenseData readme.rtf
	PageExEnd

	PageEx license
		LicenseData license.txt
		LicenseForceSelection checkbox
	PageExEnd

## History

Added in NSIS v2.0 Beta 4

---

[1]: PageExEnd.md
[2]: Caption.md
[3]: SubCaption.md
[4]: PageCallbacks.md