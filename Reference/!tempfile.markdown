# !tempfile

---

This command creates a temporary file. It puts its path into a define, named symbol.

## Parameters:

    symbol

## Example:

	!tempfile PACKHDRTEMP
	!packhdr "${PACKHDRTEMP}" '"C:\Program Files\UPX\upx.exe" "${PACKHDRTEMP}"'
	!tempfile FILE
	!define /date DATE "%H:%M:%S %d %b, %Y"
	!system 'echo built on ${DATE} > "${FILE}"'
	File /oname=build.txt "${FILE}"
	!delfile "${FILE}"
	!undef FILE
	!undef DATE

## History:

Added in NSIS v2.11

---
