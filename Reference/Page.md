# Page

Adds an installer page. See the above sections for more information about built-in versus custom pages and about callback functions.

internal_page_type can be:

* license - license page
* components - components selection page
* directory - installation directory selection page
* instfiles - installation page where the sections are executed
* uninstConfirm - uninstall confirmation page

The last page of the installer has its cancel button disabled to prevent confusion. To enable it anyway, use `/ENABLECANCEL`.

## Parameters

    custom [creator_function] [leave_function] [caption] [/ENABLECANCEL]

	internal_page_type [pre_function] [show_function] [leave_function] [/ENABLECANCEL]

## History

Added in NSIS v2.0 Beta 0
