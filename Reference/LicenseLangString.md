# LicenseLangString

Does the same as [`LangString`][1] only it loads the string from a text/RTF file and defines a special [`LangString`][1] that can be used only by [`LicenseData`][2].

## Parameters

    name language_id license_path

## Example

    LicenseLangString license ${LANG_ENGLISH} license-english.txt
    LicenseLangString license ${LANG_FRENCH} license-french.txt
    LicenseLangString license ${LANG_GERMAN} license-german.txt
    LicenseData $(license)

## History

Added in NSIS v2.0 Beta 4

[1]: LangString.md
[2]: LicenseData.md
