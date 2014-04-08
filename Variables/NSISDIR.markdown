# ${NSISDIR}

---

A symbol that contains the path where NSIS is installed. Useful if you want to call resources that are in NSIS directory e.g. Icons, UIs etc.

When compiled with support for keeping makensis and the data in the same place (the default on Windows), it is in the same place as makensis, on other platforms it is set at compile time (See the INSTALL file for info). In both instances you can modify it at runtime by setting the NSISDIR environment variable. See [section 3.1.3][1] for more info.

## History:

Added in NSIS v2.0 Alpha 2

---

[1]: http://nsis.sourceforge.net/Docs/Chapter3.html#3.1.3