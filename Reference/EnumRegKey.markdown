# EnumRegKey

---

Set user variable $x with the name of the 'index'th registry key in root\_key\Subkey. Valid values for root\_key are listed under [`WriteRegStr`][1]. Returns an empty string if there are no more keys, and returns an empty string and sets the error flag if there is an error.

## Parameters:

    user_var(output) root_key subkey index

## Example:

	StrCpy $0 0
	loop:
	  EnumRegKey $1 HKLM Software $0
	  StrCmp $1 "" done
	  IntOp $0 $0 + 1
	  MessageBox MB_YESNO|MB_ICONQUESTION "$1$\n$\nMore?" IDYES loop
	done:

## History:

Added in NSIS v1.50

---

[1]: WriteRegStr.markdown