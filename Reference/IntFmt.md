# IntFmt

Formats the number in "numberstring" using the format "format", and sets the output to user variable $x. Example format strings include "%08X" "%u"

## Parameters

    user_var(output) format numberstring

## Example

	IntFmt $0 "0x%08X" 195948557
	IntFmt $0 "%c" 0x41

## History

Added in NSIS v1.60b
