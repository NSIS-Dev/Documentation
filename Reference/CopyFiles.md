# CopyFiles

Copies files from the source to the destination on the installing system. Useful with [`$EXEDIR`][1] if you want to copy from installation media, or to copy from one place to another on the system. You might see a Windows status window of the copy operation if the operation takes a lot of time (to disable this, use `/SILENT`). The last parameter can be used to specify the size of the files that will be copied (in kilobytes), so that the installer can approximate the disk space requirements. On error, or if the user cancels the copy (only possible when `/SILENT` was omitted), the error flag is set. If `/FILESONLY` is specified, only files are copied.

Fully-qualified path names should always be used with this instruction. Using relative paths will have unpredictable results.

## Parameters

    [/SILENT] [/FILESONLY] filespec_on_destsys destination_path [size_of_files_in_kb]

## Example

    CreateDirectory $INSTDIR\backup
    CopyFiles $INSTDIR\*.dat $INSTDIR\backup

## History

Added in NSIS v1.1a

[1]: ../Variables/EXEDIR.md