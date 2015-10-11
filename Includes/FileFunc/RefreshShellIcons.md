# RefreshShellIcons

After changing file associations, you can call this function to refresh the shell immediately.

## Syntax

	${RefreshShellIcons}

## Example

	Section
		WriteRegStr HKCR "Winamp.File\DefaultIcon" "" "$PROGRAMFILES\Winamp\WINAMP.EXE,2"
		${RefreshShellIcons}
	SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor