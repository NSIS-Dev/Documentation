# WriteINIStr

Writes entry\_name=value into [section\_name] of ini\_filename. The error flag is set if the string could not be written to the ini file.

## Parameters

    ini_filename section_name entry_name value

## Example

    WriteINIStr $TEMP\something.ini section1 something 123
    WriteINIStr $TEMP\something.ini section1 somethingelse 1234
    WriteINIStr $TEMP\something.ini section2 nsis true

## History

Added in NSIS v1.0f
