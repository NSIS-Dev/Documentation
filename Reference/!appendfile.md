# !appendfile

Appends text to file. The text is written as ANSI (ACP) unless the file already has a BOM. Using `/CHARSET` will force a specific character encoding. `$\n` will be translated to `$\r$\n` on Windows unless you specify `/RawNL`.

## Parameters

    [/CHARSET=ACP|OEM|CP#|UTF8[SIG]|UTF16<LE|BE>[BOM]] [/RawNL] file text file text

## Example

    !tempfile FILE
    !appendfile "${FILE}" "XPStyle on$\n"
    !appendfile "${FILE}" "Name 'test'$\n"
    !include "${FILE}"
    !delfile "${FILE}"
    !undef FILE

## History

Added in NSIS v2.11
