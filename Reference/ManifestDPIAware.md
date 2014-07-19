# ManifestDPIAware

---

Declare that the installer is DPI-aware. A DPI-aware application is not scaled by the DWM (DPI virtualization) so the text is never blurry. NSIS does not scale the bitmap used by the tree control on the component page and some plugins might have compatibility issues so make sure that you test your installer at different DPI settings if you select true.

See [MSDN][1] for more information about DPI-aware applications.

## Parameters:

    notset|true|false

## History:

Added in NSIS v3.0a0

---

[1]: http://msdn.microsoft.com/en-us/library/dd464660