# !getdllversion

This is similar to [`GetDLLVersionLocal`][1], only it stores the version number in defines and can therefore be used anywhere, not just inside functions and sections.

## Parameters

    localfilename define_basename

## Example

	!getdllversion "$%windir%\explorer.exe" expv_
	!echo "Explorer.exe version is ${expv_1}.${expv_2}.${expv_3}.${expv_4}"

## History

Added in NSIS v3.0a0

[1]: GetDLLVersionLocal.md