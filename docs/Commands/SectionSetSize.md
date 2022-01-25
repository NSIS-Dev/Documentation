# SectionSetSize

Sets the Size of the section specified by section_index. Note that the Index starts with Zero. The Value for Size must be entered in KiloByte and supports only whole numbers.

## Parameters

    section_index new_size

## Example

    Section test test_section_id
    SectionEnd

    Function .onInit
        # set required size of section 'test' to 100 bytes
        SectionSetSize ${test_section_id} 100
    FunctionEnd

## History

Added in NSIS v2.0 Beta 4
