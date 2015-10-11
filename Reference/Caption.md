# Caption

When used outside a [`PageEx`][1] block: Sets the text for the titlebar of the installer. By default, it is 'Name Setup', where [`Name`][2] is specified with the [`Name`][2] instruction. You can, however, override it with 'MyApp Installer' or whatever. If you specify an empty string (""), the default will be used (you can however specify " " to achieve a blank string).

When used inside a [`PageEx`][1] block: Sets the subcaption of the current page.

Accepts variables. If variables are used, they must be initialized on [`.onInit`][3].

## Parameters

    caption

## Example

	PageEx license
		Caption "This is a license page"
	PageExEnd

## History

Added in NSIS v1.2f

[1]: PageEx.md
[2]: Name.md
[3]: ../Callbacks/onInit.md