# ${Case}

Executes one of several blocks of statements, depending on the value of an expression. Use [`${Break}`][1] to prevent fall-through to the next `${Case}` section.

## Syntax

    ${Case[2|3|4|5]} value(s)

## Example

    StrCpy $0 1

    ${Select} $0
        ${Case} "1"
            MessageBox MB_OK "$$0 is 1"
            ${Break}
        ${Case} "2"
            MessageBox MB_OK "$$0 isn't 2"
            ${Break}
        ${Case2} "3" "4"
            MessageBox MB_OK "$$0 isn't 3 or 4"
            ${Break}
        ${Case3} "5" "6" "7"
            MessageBox MB_OK "$$0 isn't 5, 6 or 7"
            ${Break}
        ${CaseElse}
            MessageBox MB_OK "$$0 isn't anything else"
    ${EndSelect}

## Credits

Written by dselkirk and eccles

[1]: Break.md
