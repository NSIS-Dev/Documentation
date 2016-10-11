# !error

This command will issue an error to the script compiler and will stop execution of the script. You can also add a message to this error.

## Parameters

    message

## Example

    !ifdef VERSION & NOVERSION
        !error "both VERSION and NOVERSION are defined"
    !endif

## History

Added in NSIS v1.1u
