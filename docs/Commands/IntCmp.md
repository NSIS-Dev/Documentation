# IntCmp

Compares two integers val1 and val2. If val1 and val2 are equal, [`Goto`][1] jump\_if\_equal, otherwise if val1 < val2, [`Goto`][1] jump\_if\_val1\_less, otherwise if val1 > val2, [`Goto`][1] jump\_if\_val1_more.

## Parameters

    val1 val2 jump_if_equal [jump_if_val1_less] [jump_if_val1_more]

## Example

    IntCmp $0 5 is5 lessthan5 morethan5
    is5:
      DetailPrint "$$0 == 5"
      Goto done
    lessthan5:
      DetailPrint "$$0 < 5"
      Goto done
    morethan5:
      DetailPrint "$$0 > 5"
      Goto done
    done:

## History

Added in NSIS v1.50

[1]: Goto.md
