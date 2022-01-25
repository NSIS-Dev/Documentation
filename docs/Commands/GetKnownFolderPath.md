# GetKnownFolderPath

Get the path of a [known folder][1]. The error flag is set and the output variable is empty if the call fails or the `knownfolderid` guid is not available. This function is only able to resolve known folders on Windows Vista or higher.

## Parameters

    user_var(output) knownfolderid

## Example

    !include WinCore.nsh
    !include LogicLib.nsh

    Function .onInit
        ${If} $InstDir == ""
            GetKnownFolderPath $InstDir ${FOLDERID_UserProgramFiles} ; This exists on Win7+
            StrCmp $InstDir "" 0 +2 
            StrCpy $InstDir "$LocalAppData\Programs" ; Fallback directory
            StrCpy $InstDir "$InstDir\$(^Name)"
        ${EndIf}
    FunctionEnd

## History

Added in NSIS v3.06

[1]: https://docs.microsoft.com/en-us/windows/win32/shell/knownfolderid
