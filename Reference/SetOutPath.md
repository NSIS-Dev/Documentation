# SetOutPath

---

Sets the output path (`$OUTDIR`) and creates it (recursively if necessary), if it does not exist. Must be a full pathname, usually is just `$INSTDIR` (you can specify `$INSTDIR` if you are lazy with a single "-").

## Parameters:

    outpath

## Example:

	SetOutPath $INSTDIR
	File program.exe

## History:

Added in NSIS 1.0f

---
