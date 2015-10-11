# GetErrorLevel

Returns the last error level set by [`SetErrorLevel`][1] or -1 if it was never used.

## Parameters

    user_var(error level output)

## Example

	GetErrorLevel $0
	IntOp $0 $0 + 1
	SetErrorLevel $0

## History

Added in NSIS v2.02

[1]: SetErrorLevel.md