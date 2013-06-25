# ReserveFile

---

Reserves a file in the data block for later use. Files are added to the compressed data block in the order they appear in the script. Functions, however, are not necessarily called in the order they appear in the script. Therefore, if you add a file in a function called early but put the function at the end of the script, all of the files added earlier will have to be decompressed to get to the required file. This process can take a long time if there a lot of files. `.onInit is one such function. It is called at the very beginning, before anything else appears. If you put it at the very end of the script, extract some files in it and have lots of files added before it, the installer might take a very long time to load. This is where this command comes useful, allowing you to speed up the loading process by including the file at the top of the data block instead of letting NSIS seek all the way down to the bottom of the compressed data block.

See [`File`][2] for more information about the parameters.

## Parameters:

    [/nonfatal] [/r] [/x file|wildcard [...]] file [file...]

## History:

Added in NSIS v2.0 Beta 0

---

[1]: ../Callbacks/.onInit.md
[2]: File.md