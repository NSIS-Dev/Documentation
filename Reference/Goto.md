# Goto

If label is specified, goto the label 'label_to_jump_to:'.

If `+offset` or `-offset` is specified, jump is relative by offset instructions. Goto +1 goes to the next instruction, Goto -1 goes to the previous instruction, etc.

If a user variable is specified, jumps to absolute address (generally you will want to get this value from a function like [`GetLabelAddress`][1]). Compiler flag commands and SectionIn aren't instructions so jumping over them has no effect.

## Parameters

    label_to_jump_to | +offset| -offset| user_var(target)

## Example

    Goto label
    Goto +2
    Goto -2
    Goto $0

## History

Added in NSIS v1.4 Beta

[1]: GetLabelAddress.md