# LangString

---

Defines a multilingual string. This means its value may be different (or not, it's up to you) for every language. It allows you to easily make your installer multilingual without the need to add massive switches to the script.

Each language string has a name that identifies it and a value for each language used by the installer. They can be used in any runtime string in the script. To use a language string all you need to add to the string is `$(LangString_name_here)` where you want the `LangString` to be inserted.

Notes:

* Unlike defines that use curly braces - {}, language strings use parenthesis - ().
* If you change the language in the [`.onInit`][1] function, note that language strings in [`.onInit`][1] will still use the detected language based on the user's default Windows language, because the language is initialized after [`.onInit`][1].
* Always set language strings for every language in your script.
* If you set the language ID to 0 the last used language by `LangString` or [`LoadLanguageFile`][2] will be used.

## Parameters

    name language_id string

## Example

	LangString message ${LANG_ENGLISH} "English message"
	LangString message ${LANG_FRENCH} "French message"
	LangString message ${LANG_KOREAN} "Korean message"

	MessageBox MB_OK "A translated message: $(message)"

## History

Added in NSIS v2.0 Release Candidate 2

---

[1]: ../Callbacks/onInit.md
[2]: LoadLanguageFile.md