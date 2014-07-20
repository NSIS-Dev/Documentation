# FindClose

---

Closes a search opened with [`FindFirst`][1].

## Parameters

    handle

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

---

[1]: FindFirst.md