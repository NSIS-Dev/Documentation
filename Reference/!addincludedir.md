# !addincludedir

---

Adds another include directory to the include directories list. This list is searched when [`!include`](!include.md) is used. This list's initial value is `${NSISDIR}\Include` alone.

## Parameters

    directory

## Example

    !addincludedir ..\include
	!include something.nsh

## History

Added in NSIS v2.0 Beta 1

---
