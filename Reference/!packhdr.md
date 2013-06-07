# !packhdr

---

This option makes the compiler use an external EXE packer (such as Petite or UPX) to compress the executable header. Specify a temporary file name (such as "temp.dat") and a command line (such as "C:\program files\upx\upx -9 temp.dat") to compress the header.

## Parameters:

    tempfile command

## Example:

	!packhdr "$%TEMP%\exehead.tmp" '"C:\Program Files\UPX\upx.exe" "$%TEMP%\exehead.tmp"'

## History:

Added in NSIS v1.32

---
