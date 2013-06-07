# SetDatablockOptimize

---

This command tells the compiler whether or not to do datablock optimizations. Datablock optimizations have the compiler check to see if any data being added to the data block is already in the data block, and if so, it is simply referenced as opposed to added (can save a little bit of size). It is highly recommended to leave this option on.

## Parameters:

    on|off

## History:

Added in NSIS v1.1i

---
