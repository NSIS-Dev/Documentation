# GetFileVersion

Get version information from executable file.

## Syntax

	${GetFileVersion} "[Executable]" $var

	"[Executable]"      ; Executable file (*.exe *.dll ...)
	$var                ; Result: Version number

Note:

- Error flag if file doesn't exist 
- Error flag if file doesn't contain version information

## Example

	Section
		${GetFileVersion} "C:\ftp\program.exe" $R0
		; $R0="1.1.0.12"
	SectionEnd

## Credits

Written by [Instructor][1]

[1]: http://nsis.sourceforge.net/User:Instructor