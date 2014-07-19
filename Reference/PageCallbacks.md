# PageCallbacks

---

Sets the callback functions for a page defined using [`PageEx`][1]. Can only be used inside a [`PageEx`][1] block. See the above sections for more information about callback functions.

## Parameters:

    ([creator_function] [leave_function]) | ([pre_function] [show_function] [leave_function])

## Example:

	PageEx license
		PageCallbacks licensePre licenseShow licenseLeave
	PageExEnd

## History:

Added in NSIS v2.0 Beta 0

---

[1]: PageEx.markdown