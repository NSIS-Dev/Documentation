# !assert

This command will stop the compiler if the expression is not true. The expression is evaluated in a similar fashion to [!if][].

## Parameters

    value [op value2] message

## Example

    !assert ${NSIS_CHAR_SIZE} = 2 "Unicode required"

## History

Added in NSIS v3.09

[!if]: !if.md
