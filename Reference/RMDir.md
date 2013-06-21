# RMDir

---

Remove the specified directory (fully qualified path with no wildcards). Without `/r`, the directory will only be removed if it is completely empty. If `/r` is specified, the directory will be removed recursively, so all directories and files in the specified directory will be removed. If `/REBOOTOK` is specified, any file or directory which could not have been removed during the process will be removed on reboot -- if any file or directory will be removed on a reboot, the reboot flag will be set. The error flag is set if any file or directory cannot be removed.

**Warning:** using RMDir /r $INSTDIR in the uninstaller is not safe. Though it is unlikely, the user might select to install to the Program Files folder and so this command will wipe out the entire Program Files folder, including other programs that has nothing to do with the uninstaller. The user can also put other files but the program's files and would expect them to get deleted with the program. Solutions are [available][2] for easily uninstalling only files which were installed by the installer.

## Parameters:

    [/r] [/REBOOTOK] directory_name

## Example:

	RMDir $INSTDIR
	RMDir $INSTDIR\data
	RMDir /r /REBOOTOK $INSTDIR
	RMDir /REBOOTOK $INSTDIR\DLLs

Note that the current working directory can not be deleted. The current working directory is set by [`SetOutPath`][1]. For example, the following example will not delete the directory.

	SetOutPath $TEMP\dir
	RMDir $TEMP\dir

The next example will succeed in deleting the directory.

	SetOutPath $TEMP\dir
	SetOutPath $TEMP
	RMDir $TEMP\dir

## History:

Added in NSIS v1.0f

---

[1]: SetOutPath.md
[2]: http://nsis.sourceforge.net/Uninstall_only_installed_files