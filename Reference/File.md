# File

Adds file(s) to be extracted to the current output path ([`$OUTDIR`][1]).

* Note that the output file name is $OUTDIR\filename\_portion\_of\_file.
* Use `/oname=X` switch to change the output name. X may contain variables and can be a fully qualified path or a relative path in which case it will be appended to [`$OUTDIR`][1] set by [`SetOutPath`][2]. When using this switch, only one file can be specified. If the output name contains spaces, quote the entire parameter, including /oname, as shown in the examples below.
* Wildcards are supported.
* If the `/r` switch is used, matching files and directories are recursively searched for in subdirectories. If just one path segment is specified (e.g. File /r something), the current directory will be recursively searched. If more than one segment is specified (e.g. File /r something\*.*), the last path segment will be used as the matching condition and the rest for the directory to search recursively. If a directory name matches, all of its contents is added recursively. Directory structure is preserved.
* Use the `/x `switch to exclude files or directories.
* If the `/a` switch is used, the attributes of the file(s) added will be preserved.
* The `File` command sets the error flag if overwrite mode is set to 'try' and the file could not be overwritten, or if the overwrite mode is set to 'on' and the file could not be overwritten and the user selects ignore.
* If the `/nonfatal` switch is used and no files are found, a warning will be issued instead of an error.

## Parameters

    [/nonfatal] [/a] ([/r] [/x file|wildcard [...]] (file|wildcard) [...] | /oname=file.dat infile.dat)

## Example

    File something.exe
    File /a something.exe
    File *.exe
    File /r *.dat
    File /r data
    File /oname=temp.dat somefile.ext
    File /oname=$TEMP\temp.dat somefile.ext
    File "/oname=$TEMP\name with spaces.dat" somefile.ext
    File /nonfatal "a file that might not exist"
    File /r /x CVS myproject\*.*
    File /r /x *.res /x *.obj /x *.pch source\*.*

**Note:** when using the `/r` switch, both matching directories and files will be searched. This is always done with or without the use of wildcards, even if the given path perfectly matches one directory. That means, the following directory structure:

    <DIR> something
      file.dat
      another.dat
    <DIR> dir
      something
      <DIR> dir2
        file2.dat
    <DIR> another
      <DIR> something
        readme.txt

with the following `File` usage:

    File /r something

will match the directory named something on the root directory, the file named something in the directory named dir and the directory named something in the directory named another. To match only the directory named something on the root directory, use the following:

    File /r something\*.*

When adding \*.*, it will be used as the matching condition and something will be used as the directory to search. When only something is specified, the current directory will be recursively searched for every and directory named something and another\something will be matched.

## History

Added in NSIS v1.0f

[1]: ../Variables/OUTDIR.md
[2]: SetOutPath.md
