# !insertmacro

Inserts the contents of a macro that was created with [`!macro`][1]. If the macro was created with parameters, then you must pass as many parameters to the macro as it requires.

## Parameters

    macro_name [parameter] [...]

## Example

	!macro Print text
		DetailPrint "${text}"
	!macroend
	!insertmacro Print "some text"
	!insertmacro Print "some more text"

## History

Added in NSIS v1.8b3

[1]: !macro.md