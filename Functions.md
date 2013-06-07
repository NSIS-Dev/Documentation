# Callback Functions

You can create callback functions which have special names, that will be called by the installer at certain points in the install. Below is a list of currently available callbacks:

## Install Callbacks

### .onGUIInit

This callback will be called just before the first page is loaded and the installer dialog is shown, allowing you to tweak the user interface.

Example:

	!include "WinMessages.nsh"

	Function .onGUIInit
		# 1028 is the id of the branding text control
		GetDlgItem $R0 $HWNDPARENT 1028
		CreateFont $R1 "Tahoma" 10 700
		SendMessage $R0 ${WM_SETFONT} $R1 0
		# set background color to white and text color to red
		SetCtlColors $R0 FFFFFF FF0000
	FunctionEnd

### .onInit

This callback will be called when the installer is nearly finished initializing. If the '.onInit' function calls Abort, the installer will quit instantly.

Here are two examples of how this might be used:

	Function .onInit
		MessageBox MB_YESNO "This will install. Continue?" IDYES NoAbort
		Abort ; causes installer to quit.
		NoAbort:
	FunctionEnd
 
or:

	Function .onInit
		ReadINIStr $INSTDIR $WINDIR\wincmd.ini Configuration InstallDir
		StrCmp $INSTDIR "" 0 NoAbort
		MessageBox MB_OK "Windows Commander not found. Unable to get install path."
		Abort ; causes installer to quit.
		NoAbort:
	FunctionEnd

### .onInstFailed

This callback is called when the user hits the 'cancel' button after the install has failed (if it could not extract a file, or the install script used the Abort command).

Example:

	Function .onInstFailed
		MessageBox MB_OK "Better luck next time."
	FunctionEnd

### .onInstSuccess

This callback is called when the install was successful, right before the install window closes (which may be after the user clicks 'Close' if AutoCloseWindow or SetAutoClose is set to false).

Example:

	Function .onInstSuccess
		MessageBox MB_YESNO "Congrats, it worked. View readme?" IDNO NoReadme
		Exec notepad.exe ; view readme or whatever, if you want.
		NoReadme:
	FunctionEnd

### .onGUIEnd

This callback is called right after the installer window closes. Use it to free any user interface related plug-ins if needed.

### .onMouseOverSection

This callback is called whenever the mouse position over the sections tree has changed. This allows you to set a description for each section for example. The section id on which the mouse is over currently is stored, temporarily, in $0.

Example:

	Function .onMouseOverSection
		FindWindow $R0 "#32770" "" $HWNDPARENT
		GetDlgItem $R0 $R0 1043 ; description item (must be added to the UI)

		StrCmp $0 0 "" +2
		SendMessage $R0 ${WM_SETTEXT} 0 "STR:first section description"

		StrCmp $0 1 "" +2
		SendMessage $R0 ${WM_SETTEXT} 0 "STR:second section description"
	FunctionEnd

### .onRebootFailed

This callback is called if Reboot fails. WriteUninstaller, plug-ins, File and WriteRegBin should not be used in this callback.

Example:

	Function .onRebootFailed
		MessageBox MB_OK|MB_ICONSTOP "Reboot failed. Please reboot manually." /SD IDOK
	FunctionEnd

### .onSelChange

Called when the selection changes on the component page. Useful for using with SectionSetFlags and SectionGetFlags.

Selection changes include both section selection and installation type change.

### .onUserAbort

This callback is called when the user hits the 'cancel' button, and the install hasn't already failed. If this function calls Abort, the install will not be aborted.

Example:

	Function .onUserAbort
		MessageBox MB_YESNO "Abort install?" IDYES NoCancelAbort
		Abort ; causes installer to not quit.
		NoCancelAbort:
	FunctionEnd

### .onVerifyInstDir

This callback enables control over whether or not an installation path is valid for your installer. This code will be called every time the user changes the install directory, so it shouldn't do anything crazy with MessageBox or the likes. If this function calls Abort, the installation path in $INSTDIR is deemed invalid.

Example:

	Function .onVerifyInstDir
		IfFileExists $INSTDIR\Winamp.exe PathGood
		Abort ; if $INSTDIR is not a winamp directory, don't let us install there
		PathGood:
	FunctionEnd

## Uninstall Callbacks

### un.onGUIInit

This callback will be called just before the first page is loaded and the installer dialog is shown, allowing you to tweak the user interface.

Have a look at .onGUIInit for an example.

### un.onInit

This callback will be called when the uninstaller is nearly finished initializing. If the 'un.onInit' function calls Abort, the uninstaller will quit instantly. Note that this function can verify and/or modify $INSTDIR if necessary.

Here are two examples of how this might be used:

	Function un.onInit
		MessageBox MB_YESNO "This will uninstall. Continue?" IDYES NoAbort
		Abort ; causes uninstaller to quit.
		NoAbort:
	FunctionEnd

or:

	Function un.onInit
		IfFileExists $INSTDIR\myfile.exe found
		Messagebox MB_OK "Uninstall path incorrect"
		Abort
		found:
	FunctionEnd

### un.onUninstFailed

This callback is called when the user hits the 'cancel' button after the uninstall has failed (if it used the Abort command or otherwise failed).

Example:

	Function un.onUninstFailed
		MessageBox MB_OK "Better luck next time."
	FunctionEnd

###un.onUninstSuccess

This callback is called when the uninstall was successful, right before the install window closes (which may be after the user clicks 'Close' if SetAutoClose is set to false)..

Example:

	Function un.onUninstSuccess
		MessageBox MB_OK "Congrats, it's gone."
	FunctionEnd

### un.onGUIEnd

This callback is called right after the uninstaller window closes. Use it to free any user interface related plug-ins if needed.

### un.onRebootFailed

This callback is called if Reboot fails. WriteUninstaller, plug-ins, File and WriteRegBin should not be used in this callback.

Example:

	Function un.onRebootFailed
		MessageBox MB_OK|MB_ICONSTOP "Reboot failed. Please reboot manually." /SD IDOK
	FunctionEnd

### un.onSelChange

Called when the selection changes on the component page. Useful for using with SectionSetFlags and SectionGetFlags.

Selection changes include both section selection and installation type change.

### un.onUserAbort

This callback is called when the user hits the 'cancel' button and the uninstall hasn't already failed. If this function calls Abort, the install will not be aborted.

Example:

	Function un.onUserAbort
		MessageBox MB_YESNO "Abort uninstall?" IDYES NoCancelAbort
		Abort ; causes uninstaller to not quit.
		NoCancelAbort:
	FunctionEnd