# SetOverwrite

This command sets the overwrite flag which is used by the [`File`][1] command to determine whether or not the file should overwrite any existing files that are present. If overwriteflag is 'on', files are overwritten (this is the default). If overwriteflag is 'off', files that are already present are not overwritten. If overwriteflag is 'try', files are overwritten if possible (meaning that if the file is not able to be written to, it is skipped without any user interaction). If overwriteflag is 'ifnewer', then files are only overwritten if the existing file is older than the new file. If overwriteflag is 'ifdiff', then files are only overwritten if the existing file is older or newer than the new file. Note that when in 'ifnewer' or 'ifdiff' mode, the destination file's date is set, regardless of what [`SetDateSave`][2] is set to.

## Parameters

    on|off|try|ifnewer|ifdiff|lastused

## Example

    SetOverwrite off
    File program.cfg # config file we don't want to overwrite
    SetOverwrite on

## History

Added in NSIS v1.0f

[1]: File.md
[2]: SetDateSave.md