# FindNext

Continues a search began with [`FindFirst`][1]. handle should be the handle\_output\_variable returned by [`FindFirst`][1]. If the search is completed (there are no more files), filename\_output is set to empty, and the error flag is set. Note that the filename output is without path.

## Parameters

    handle user_var(filename_output)

## Example

	FindFirst $0 $1 $INSTDIR\*.txt
	loop:
	  StrCmp $1 "" done
	  DetailPrint $1
	  FindNext $0 $1
	  Goto loop
	done:
	FindClose $0

## History

Added in NSIS v1.60

[1]: FindFirst.md