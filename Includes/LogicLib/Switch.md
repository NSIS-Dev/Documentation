# ${Switch}

Jumps to one of several labels, depending on the value of an expression. Use ${Break} to prevent fall-through to the next ${Case} section.

## Syntax

    ${Switch} expression

## Example

    {For} $0 1 10
        ${Switch} $0
            ${Case} "1"
                MessageBox MB_OK "$$0 is 1"
                ${Break}
            ${Case} "2"
                MessageBox MB_OK "$$0 is 2"
                ${Break}
            ${Case2} "3" "5"
                MessageBox MB_OK "$$0 is 3 or 5"
                ${Break}
            ${CaseElse}
                MessageBox MB_OK "$$0 is something else ($0)"
        ${EndSwitch}
    ${Next}

## Credits

Written by dselkirk and eccles
