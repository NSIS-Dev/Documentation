# IntPtrCmp

Compares two integers val1 and val2. If val1 and val2 are equal, [`Goto`][1] jump\_if\_equal, otherwise if val1 < val2, [`Goto`][1] jump\_if\_val1\_less, otherwise if val1 > val2, [`Goto`][1] jump\_if\_val1_more. Same as [IntCmp][2], but treats the values as pointer sized integers.

## Parameters

    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]

## History

Added in NSIS v3.03

[1]: Goto.md
[2]: IntCmp.md