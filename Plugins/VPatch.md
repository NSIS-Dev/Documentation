# VPatch

VPatch allows to create a patch file to update previous versions of your software. The GenPat utility generates the patch file. The plug-in can use the patch to update a file. Using a patch, you can reduce the download size of your updates because only the differences between the files are included in the patch file.

## Usage

### Generate the patch file

Make sure you have the source file (original version) and the target file (version to update to). For example, `DATA.DTA` (currently on user system) and `DATA_20.DTA` (version 2.0 of this data file). Now call the command line tool `GenPat.exe`:

    `GENPAT oldfile.txt newfile.txt patch.pat

Now, the patch will be generated, this will take some time.

Using the `/B=(BlockSize)` parameter of the GenPat utility (put it after the filenames), you can use a different block size. A smaller block size may result in a smaller patch, but the generation will take more time (the default blocksize is 64).

If you have trouble using this command-line utility, you can download a GUI (graphical user interface) for VPatch from its own [website][1].

### Update the file during installation

Use the VPatch plug-in to update a file using a patch file:

`vpatch::vpatchfile "patch.pat" "oldfile.txt" "temporary_newfile.txt"`

The result of the patch operating will be added to the stack and can be one of the following texts:

- OK
- OK, new version already installed
- An error occurred while patching
- Patch data is invalid or corrupt
- No suitable patches were found

Check `example.nsi` for an example. You should check whether the stack string starts with "OK" because then the patch has succeeded and you can rename "temporary_newfile.txt" to "oldfile.txt" to replace the original, if you want.

### Multiple patches in one file

GenPat appends a patch to the file you specified. If there is already a patch for the same original file, with the same CRC/MD5, in the patch file, the patch will be replaced. For example, if you want to be able to upgrade version 1 and 2 to version 3, you can put a 1 > 3 and 2 > 3 patch in one file.

You can also put patches for different files in one patch file, for example, a patch from file A version 1 to file A version 2 and a patch from file B version 1 to file B version 2. Just call the plug-in multiple times with the same patch file. It will automatically select the right patch (based on the file CRC).

### Patch generator (GenPat) exit codes

In version 3 the following exit codes (known as error levels in the DOS period) can be returned by GenPat. GenPat will return an exit code based on success of the patch generation. Here is a list of the possible exit codes:

Exit code | Description
----------|------------
0         | Success
1         | Arguments missing
2         | Other error
3         | Source file already has a patch in specified patch file (ERROR), use /R switch to override

These exit codes can be useful when you generate patch files through a NSIS script.

## Credits

Written by Koen van de Sande.

[1]: http://www.tibed.net/vpatch
