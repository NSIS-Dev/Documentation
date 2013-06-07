# LoadLanguageFile

---

Loads a language file for the construction of a language table. All of the language files that come with NSIS are in Contrib\Language Files
After you have inserted the language file `${`LANG_langfile} will be defined as the language id (for example, `${LANG_ENGLISH}` will be defined as 1033). Use it with [`LangString`][1], [`LicenseLangString`][2], [`LangDLL`][3] and [`VIAddVersionKey`][4].

## Parameters:

    language_file.nlf

## History:

Added in NSIS v2.0 Alpha 3

---

[1]: LangString.md
[2]: LicenseLangString.md
[3]: LangDLL.md
[4]: VIAddVersionKey.md