# FindFirst

Performs a search for 'filespec', placing the first file found in filename\_output (a user variable). It also puts the handle of the search into handle\_output (also a user variable). If no files are found, both outputs are set to empty, and the error flag is set. Best used with [`FindNext`][1] and [`FileClose`][2]. Note that the filename output is without path.

## Parameters

    user_var(handle output) user_var(filename output) filespec

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

[1]: FindNext.md
[2]: FileClose.md