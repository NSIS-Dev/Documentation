# !appendfile

---

Appends text to file.

## Parameters:

    file text

## Example:

    !tempfile FILE
	!appendfile "${FILE}" "XPStyle on$\n"
	!appendfile "${FILE}" "Name 'test'$\n"
	!include "${FILE}"
	!delfile "${FILE}"
	!undef FILE

## History:

Added in NSIS v2.11

---
