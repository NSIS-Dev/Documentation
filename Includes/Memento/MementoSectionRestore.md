# MementoSectionRestore

Add a call to `${MementoSectionRestore}` to [`.onInit`][1] to restore the state of all sections from the registry.

## Syntax

    ${MementoSectionRestore}

## Example

	Function .onInit
		${MementoSectionRestore}
	FunctionEnd

## Credits

Written by [kichik][2]

[1]: ../../Callbacks/onInit.md
[2]: http://nsis.sourceforge.net/User:Kichik