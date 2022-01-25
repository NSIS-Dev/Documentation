# EnumRegValue

Set user variable $x with the name of the 'index'th registry value in root\_key\Subkey. Valid values for root\_key are listed under [`WriteRegStr`][1]. Returns an empty string and sets the error flag if there are no more values or if there is an error.

## Parameters

    user_var(output) root_key subkey index

## Example

    StrCpy $0 0
    loop:
      ClearErrors
      EnumRegValue $1 HKLM Software\Microsoft\Windows\CurrentVersion $0
      IfErrors done
      IntOp $0 $0 + 1
      ReadRegStr $2 HKLM Software\Microsoft\Windows\CurrentVersion $1
      MessageBox MB_YESNO|MB_ICONQUESTION "$1 = $2$\n$\nMore?" IDYES loop
    done:

## History

Added in NSIS v1.50

[1]: WriteRegStr.md
