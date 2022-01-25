# SectionSetText

Sets the description for the section section_index. If the text is set to "" then the section will be hidden. The error flag will be set if an out of range section is specified.

## Parameters

    section_index section_text

## Example

    Section "" test_section_id
    SectionEnd

    Function .onInit
        # change section's name to $WINDIR
        SectionSetText ${test_section_id} $WINDIR
    FunctionEnd

## History

Added in NSIS v1.98
