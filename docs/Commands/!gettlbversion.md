# !gettlbversion

Get the version information from a .TLB file.

## Parameters

    [/noerrors] [/packed] localfilename define_basename

## Example

    !gettlbversion /packed "$%WINDIR%\System32\stdole32.tlb" TLBVER_
    !echo "${TLBVER_HIGH}.${TLBVER_LOW}"

## History

Added in NSIS v3.03
