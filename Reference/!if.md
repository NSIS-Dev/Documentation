# !if

---

This command, when paired with an [`!endif`][1] command, will tell the compiler whether or not to compile the lines in between the two lines. If value is non-zero, or the comparison of value and value2 depending on the operator results in true, the contained lines will be compiled. Otherwise, they will be skipped. op can be either `==` or `!=` (string comparison), `<=`, `< >` or `>=` (float comparison), `&` (bitwise AND comparison), `&&` or `||` (boolean comparison). If [!] is set, return value will be switched from true to false and vice versa.

## Parameters

    [!] value [op value2]

## Example

	!if 1 < 2
	  !echo "1 is smaller than 2!!"
	!else if ! 3.1 > 1.99
	  !error "this line should never appear"
	!else
	  !error "neither should this"
	!endif

## History

Added in NSIS v2.15

---

[1]: !endif.md