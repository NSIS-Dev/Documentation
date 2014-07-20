# VIAddVersionKey

---

Adds a field in the Version Tab of the File Properties. This can either be a field provided by the system or a user defined field. The following fields are provided by the System:

* ProductName
* Comments
* CompanyName
* LegalCopyright
* FileDescription
* FileVersion
* ProductVersion
* InternalName
* LegalTrademarks
* OriginalFilename
* PrivateBuild
* SpecialBuild

The name of these fields are translated on the target system, whereas user defined fields remain untranslated.


## Parameters

    [/LANG=lang_id] keyname value

## Example

	VIAddVersionKey /LANG=${LANG_ENGLISH} "ProductName" "Test Application"
	VIAddVersionKey /LANG=${LANG_ENGLISH} "Comments" "A test comment"
	VIAddVersionKey /LANG=${LANG_ENGLISH} "CompanyName" "Fake company"
	VIAddVersionKey /LANG=${LANG_ENGLISH} "LegalTrademarks" "Test Application is a trademark of Fake company"
	VIAddVersionKey /LANG=${LANG_ENGLISH} "LegalCopyright" "© Fake company"
	VIAddVersionKey /LANG=${LANG_ENGLISH} "FileDescription" "Test Application"
	VIAddVersionKey /LANG=${LANG_ENGLISH} "FileVersion" "1.2.3"

## History

Added in NSIS v2.0 Beta 4

---
