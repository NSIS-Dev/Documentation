# LockWindow

---

`LockWindow` on prevents the main window from redrawing itself upon changes. When `LockWindow off` is used, all controls that weren't redrawn since `LockWindow on` will be redrawn. This makes the pages flickering look nicer because now it flickers a group of controls at the same time, instead of one control at a time. The individual control flickering is more noticeable on old computers.

## Parameters:

    on|off

## History:

Added in NSIS v2.0

---
