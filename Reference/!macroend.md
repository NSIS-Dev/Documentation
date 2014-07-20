# !macroend

---

Ends a macro that was started with [`!macro`][1].

## Example

	!macro SomeMacro parm1 parm2 parm3
		DetailPrint "${parm1}"
		MessageBox MB_OK "${parm2}"
		File "${parm3}"
	!macroend

## History

Added in NSIS v1.8b3

---

[1]: !macro.md