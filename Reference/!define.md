# !define

---

This command will add gflag to the global define list. This will have a similar effect as using the `/D` switch on the command line (the define only becomes effective after the `!define` command).
If `/date` or `/utcdate` are used, value will be passed into strftime and the result will be used as the value of gflag. strftime converts special symbols into certain parts of the current time or date. For example, %H will be converted into the current hour in 24-hour format. For a complete list of available symbols, search for strftime on MSDN. On POSIX, you can get the list by using man strftime.
If `/math` is used, the result of 'val1 OP val2', where OP may be +,-,*,&,|,^,/ or % , will be used as the value of gflag. Note that val1 AND val2 MUST be integer values!
If `/file` is used, the entire text file specified (including whitespace and newlines) will be read and stuffed into gflag.

## Parameters

    [/ifndef | /redef] ([/date|/utcdate] gflag [value]) | (/math gflag val1 OP val2) | (/file gflag filename.txt)

## Example

    !define USE_SOMETHING
	!define VERSION 1.2
	!define /date NOW "%H:%M:%S %d %b, %Y"
	!define /math RESULT 3 + 10
	!define /math REST 15 % ${RESULT}
	!define /file BUNCHASTUFF somesourcefile.cpp
	!define /redef USE_SOMETHING ${RESULT} ;redefine USE_SOMETHING

## History

Added in NSIS v1.1f

---
