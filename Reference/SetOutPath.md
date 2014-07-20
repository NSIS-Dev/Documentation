# SetOutPath

---

Sets the output path ([`$OUTDIR`][1]) and creates it (recursively if necessary), if it does not exist. Must be a full pathname, usually is just [`$INSTDIR`][2] (you can specify [`$INSTDIR`][2] if you are lazy with a single "-").

## Parameters

    outpath

## Example

	SetOutPath $INSTDIR
	File program.exe

## History

Added in NSIS v1.0f

---

[1]: ../Variables/OUTDIR.md
[2]: ../Variables/INSTDIR.md