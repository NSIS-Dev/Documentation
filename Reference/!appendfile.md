# !appendfile

---

Appends text to file.

## Parameters

    [/CHARSET=ACP|OEM|CP#|UTF8[SIG]|UTF16<LE|BE>[BOM]] [/RawNL] file text file text

## Example

    !tempfile FILE
	!appendfile "${FILE}" "XPStyle on$\n"
	!appendfile "${FILE}" "Name 'test'$\n"
	!include "${FILE}"
	!delfile "${FILE}"
	!undef FILE

## History

Added in NSIS v2.11

---
