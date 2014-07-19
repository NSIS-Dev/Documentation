# !ifndef

---

The opposite of [`!ifdef`][1]. This command, when paired with an [`!endif`][2] command, will tell the compiler whether or not to compile the lines in between the two lines. If gflag is globally defined (using [`!define`][3] or the `/D` switch), then the contained lines will be compiled. Otherwise, they will be skipped. 'bcheck' can be specified as `&` (boolean and) or `|` (boolean or) along with more gflags -- precedence is simple, left to right.

## Parameters:

    gflag [bcheck gflag [...]]]

## Example:

	!define SOMETHING
	!ifdef SOMETHING
		!echo "SOMETHING is defined"
	!endif

	!undef SOMETHING
	!ifndef SOMETHING
		!echo "SOMETHING is not defined"
	!endif

## History:

Added in NSIS v1.1f

---

[1]: !ifdef.md
[2]: !endif.md
[3]: !define.md