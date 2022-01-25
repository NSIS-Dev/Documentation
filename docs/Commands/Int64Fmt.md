# Int64Fmt

*This function is only available when building a 64-bit installer.*

Formats the number in "numberstring" using the format "format", and sets the output to user variable $x. Example format strings include "%08X" "%u"

## Parameters

    user_var(output) format numberstring

## Example

    Int64Fmt $0 "%I64x" 244837743786702

## History

Added in NSIS v3.03
