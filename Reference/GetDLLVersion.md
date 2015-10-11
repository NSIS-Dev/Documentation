# GetDLLVersion

Gets the version information from the DLL (or any other executable containing version information) in "filename". Sets the user output variables with the high and low dwords of version information on success; on failure the outputs are empty and the error flag is set. 

## Parameters

    filename user_var(high dword output) user_var(low dword output)

## Example

The following example reads the DLL version and copies a human readable version of it into `$0:

	GetDlgItem $0 $HWNDPARENT 1 # next/install button

## History

Added in NSIS v1.60
