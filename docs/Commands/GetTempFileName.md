# GetTempFileName

Assign to the user variable $x, the name of a temporary file. The file will have been created, so you can then overwrite it with what you please. The name of the temporary file is guaranteed to be unique. If to want the temporary file to be created in another directory than the Windows temp directory, specify a base_dir. [`Delete`][1] the file when done with it.

## Parameters

    user_var(output) base_dir

## Example

    GetTempFileName $0
    File /oname=$0 something.dat
    # do something with something.dat
    Delete $0

## History

Added in NSIS v1.90

[1]: Delete.md
