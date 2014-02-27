# Rename

---

Rename source_file to dest_file. You can use it to move a file from anywhere on the system to anywhere else and you can move a directory to somewhere else on the same drive. The destination file must not exist or the move will fail (unless you are using `/REBOOTOK`). If `/REBOOTOK` is specified, and the file cannot be moved (if, for example, the destination exists), then the file is moved when the system reboots. If the file will be moved on a reboot, the reboot flag will be set. The error flag is set if the file cannot be renamed (and `/REBOOTOK` is not used) or if the source file does not exist.

If no absolute path is specified the current folder will be used. The current folder is the folder set using the last [`SetOutPath`][1] instruction. If you have not used [`SetOutPath`][1] the current folder is [`$EXEDIR`][1].

## Parameters:

    [/REBOOTOK] source_file dest_file

## Example:

	Rename $INSTDIR\file.ext $INSTDIR\file.dat

## History:

Added in NSIS v1.2

---

[1]: SetOutPath.md
[2]: ../Variables/$EXEDIR.md