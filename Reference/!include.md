# !include

---

This command will include 'file' as if it was part of the original script. Note that if a file is included in another directory, the current directory is still where the script was compiled from (not where the included file resides). If the compiler can't find the file it will look for it in every include directory. See [`!addincludedir`][1] for more information. If the `/NONFATAL` switch is used and no files are found, a warning will be issued instead of an error.

## Parameters

    [/NONFATAL] file

## Example

	!include WinMessages.nsh
	!include Library.nsh
	!include C:\MyConfig.nsi
	!include ..\MyConfig.nsh
	!include /NONFATAL file_that_may_exist_or_not.nsh

## History

Added in NSIS v1.1d

---

[1]: !addincludedir.md