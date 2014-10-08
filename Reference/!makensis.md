# !makensis

---

This command will [`!execute`][1] a new instance of MakeNSIS with the parameters you specify.

## Parameters

	parameters [compare comparevalue | symbol]

## Example

	!makensis '-DGENERATEUNINST "${__FILE__}"' = 0
	!system '"signtool" sign ...' = 0

## History

Added in NSIS v3.0b1

---

[1]: !execute.md