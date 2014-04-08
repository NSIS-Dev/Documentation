# !macro

---

Creates a macro named 'macro_name'. All lines between the `!macro` and the [`!macroend`][1] will be saved. To insert the macro later on, use [`!insertmacro`][2]. `!macro` definitions can have one or more parameters defined. The parameters may be accessed the same way a [`!define`][3] would (e.g. `${PARAMNAME}`) from inside the macro.

## Parameters:

	`macro_name [parameter] [...]`

## Example:

	!macro SomeMacro parm1 parm2 parm3
		DetailPrint "${parm1}"
		MessageBox MB_OK "${parm2}"
		File "${parm3}"
	!macroend

## History:

Added in NSIS v1.8b3

---

[1]: !macroend.markdown
[2]: !insertmacro.markdown
[3]: !define.markdown