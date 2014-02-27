# $PLUGINSDIR

---

The path to a temporary folder created upon the first usage of a plug-in or a call to [`InitPluginsDir`][1]. This folder is automatically deleted when the installer exits. This makes this folder the ideal folder to hold INI files for [InstallOptions][2], bitmaps for the splash plug-in, or any other file that a plug-in needs to work.

## History:

Not documented

---

[1]: ../Reference/InitPluginsDir.md
[2]: http://nsis.sourceforge.net/Docs/InstallOptions/Readme.html