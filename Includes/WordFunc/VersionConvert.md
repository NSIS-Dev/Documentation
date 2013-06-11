# VersionConvert

---

Convert version in the numerical format which can be compared.

## Syntax:

	${VersionConvert} "[Version]" "[CharList]" $var

	"[Version]"         ; Version
	                    ;
	"[CharList]"        ; List of characters, which will be replaced by numbers
	                    ; "abcdefghijklmnopqrstuvwxyz" (default)
	                    ;
	$var                ; Result: converted version

Note:

- Converted letters are separated with dot 
- If character is non-digit and not in list then it will be converted to dot

## Examples:

### Example 1

	Section
		${VersionConvert} "9.0a" "" $R0
		; $R0="9.0.01"

		${VersionConvert} "9.0c" "" $R1
		; $R1="9.0.03"

		${VersionCompare} "$R0" "$R1" $R2
		; $R2="2"   version2 is newer
	SectionEnd

### Example 2

	Section
		${VersionConvert} "0.15c-9m" "" $R0
		; $R0="0.15.03.9.13"

		${VersionConvert} "0.15c-1n" "" $R1
		; $R1="0.15.03.1.14"

		${VersionCompare} "$R0" "$R1" $R2
		; $R2="1"   version1 is newer
	SectionEnd

### Example 3

	Section
		${VersionConvert} "0.15c+" "abcdefghijklmnopqrstuvwxyz+" $R0
		; $R0="0.15.0327"

		${VersionConvert} "0.15c" "abcdefghijklmnopqrstuvwxyz+" $R1
		; $R1="0.15.03"

		${VersionCompare} "$R0" "$R1" $R2
		; $R2="1"   version1 is newer
	SectionEnd

## Credits:

Written by [Instructor][1]

---

[1]: http://nsis.sourceforge.net/User:Instructor