# GetTime

---

* Get local or system time.
* Get file time (access, creation and modification).

## Syntax

	${GetTime} "[File]" "[Option]" $var1 $var2 $var3 $var4 $var5 $var6 $var7
	"[File]"        ; Ignored if "L" or "LS"
	                ;
	"[Option]"      ; [Options]
	                ;   L   Local time
	                ;   A   last Access file time
	                ;   C   Creation file time
	                ;   M   Modification file time
	                ;   LS  System time (UTC)
	                ;   AS  last Access file time (UTC)
	                ;   CS  Creation file time (UTC)
	                ;   MS  Modification file time (UTC)
	                ;
	$var1           ; Result1: day
	$var2           ; Result2: month
	$var3           ; Result3: year
	$var4           ; Result4: day of week name
	$var5           ; Result5: hour
	$var6           ; Result6: minute
	$var7           ; Result7: seconds

Note:

- Error flag if file isn't exist 
- Error flag if syntax error 
- See also [Time plugin][1]

## Examples

### Get local time

	Section
		${GetTime} "" "L" $0 $1 $2 $3 $4 $5 $6
		; $0="01"      day
		; $1="04"      month
		; $2="2005"    year
		; $3="Friday"  day of week name
		; $4="16"      hour
		; $5="05"      minute
		; $6="50"      seconds

		MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\nTime=$4:$5:$6'
	SectionEnd

### Get file time

	Section
		${GetTime} "$WINDIR\Explorer.exe" "C" $0 $1 $2 $3 $4 $5 $6
		; $0="12"       day
		; $1="10"       month
		; $2="2004"     year
		; $3="Tuesday"  day of week name
		; $4="2"        hour
		; $5="32"       minute
		; $6="03"       seconds

		IfErrors 0 +2
		MessageBox MB_OK "Error" IDOK +2
		MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\nTime=$4:$5:$6'
	SectionEnd

### Get system time

	Section
		${GetTime} "" "LS" $0 $1 $2 $3 $4 $5 $6
		; $0="01"      day
		; $1="04"      month
		; $2="2005"    year
		; $3="Friday"  day of week name
		; $4="11"      hour
		; $5="05"      minute
		; $6="50"      seconds

		MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\nTime=$4:$5:$6'
	SectionEnd

### Convert time to 12-hour format AM/PM

	Section
		${GetTime} "" "L" $0 $1 $2 $3 $4 $5 $6

		StrCmp $4 0 0 +3
		StrCpy $4 12
		goto +3
		StrCmp $4 12 +5
		IntCmp $4 12 0 0 +3
		StrCpy $7 AM
		goto +3
		IntOp $4 $4 - 12
		StrCpy $7 PM

		MessageBox MB_OK 'Date=$0/$1/$2 ($3)$\nTime=$4:$5:$6 $7'
	SectionEnd

## Credits

Written by [Instructor][2]

---

[1]: http://nsis.sourceforge.net/Time_plugin
[2]: http://nsis.sourceforge.net/User:Instructor