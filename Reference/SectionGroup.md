# SectionGroup

This command inserts a section group. The section group must be closed with [`SectionGroupEnd`][1], and should contain 1 or more sections. If the section group name begins with a !, its name will be displayed with a bold font. If `/e` is present, the section group will be expanded by default. If index_output is specified, the parameter will be [`!define`][2]d with the section index (that can be used for [`SectionSetText`][3] etc). If the name is prefixed with 'un.' the section group is an uninstaller section group.

## Parameters

    [/e] section_group_name [index_output]

## Example

    SectionGroup "some stuff"
        Section "a section"
        SectionEnd

        Section "another section"
        SectionEnd
    SectionGroupEnd

## History

Added in NSIS v2.05

[1]: SectionGroupEnd.md
[2]: !define.md
[3]: SectionSetText.md
