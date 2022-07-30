# ${MementoSectionEnd}

Replace [`Section`][1] with `${MementoSection}` and [`SectionEnd`][2] with [`${MementoSectionEnd}`][3]
for sections that whose state should be remembered by Memento.

## Syntax

    ${MementoSectionEnd}

## Example

    !include Memento.nsh

    !define MEMENTO_REGISTRY_ROOT HKLM
    !define MEMENTO_REGISTRY_KEY Software\Microsoft\Windows\CurrentVersion\Uninstall\MyProgram

    Function .onInit
        ${MementoSectionRestore}
    FunctionEnd

    Function .onInstSuccess
        ${MementoSectionSave}
    FunctionEnd

    ${MementoSection} "name" "some_id"
        ; some code...
    ${MementoSectionEnd}

    ${MementoUnselectedSection} dinosaur sec_dinosaur
        ; some code...
    ${MementoSectionEnd}

    ${MementoSectionDone}

## Credits

Written by [kichik][4]

[1]: ../../Reference/Commands/Section.md
[2]: ../../Reference/Commands/SectionEnd.md
[3]: MementoSectionEnd.md
[4]: http://nsis.sourceforge.net/User:Kichik
