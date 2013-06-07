# LogSet

---

Sets whether install logging to install.log will happen. `$INSTDIR` must have a value before you call this function or it will not work. Note that the NSIS_CONFIG_LOG build setting must be set (scons NSIS_CONFIG_LOG=yes) on compile time (it is not by default) to support this.

See [Building NSIS][1] for more information about recompiling NSIS.

## Parameters:

    on|off

## History:

Added in NSIS v1.98

---

[1]: http://nsis.sourceforge.net/Docs//AppendixG.html#G