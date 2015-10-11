# DirVerify

If 'DirVerify leave' is used, the Next button will not be disabled if the installation directory is not valid or there is not enough space. A flag that you can read in the leave function using [`GetInstDirError`][1] will be set instead.

## Parameters

    auto|leave

## Example

	PageEx directory
		DirVerify leave
		PageCallbacks "" "" dirLeave
	PageExEnd

## History

Added in NSIS v2.0 Release Candidate 1

[1]: GetInstDirError.md