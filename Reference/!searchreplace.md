# !searchreplace

Searches source\_string, looking for searchfor and replacing all instances of it with replacewith. Unlike [`!define`][1], `!searchreplace` allows you to redefine symbol_out without warning or error.

## Parameters

    [/ignorecase] symbol_out source_string searchfor replacewith

## Example

    # defines ${blah} to "i like ponies"
    !searchreplace blah "i love ponies" "love" "like"

## History

Added in NSIS v2.42

[1]: !define.md