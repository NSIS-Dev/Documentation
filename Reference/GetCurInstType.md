# GetCurInstType

---

Get the current [`InstType`][1] and stores it in user\_var. If the first install type is selected, 0 will be put in user\_var. If the second install type is selected, 1 will be put in user\_var, and so on. The value of `${NSIS_MAX_INST_TYPES}` (32 by default) means that the custom install type was selected.

## Parameters

    user_var

## History

Added in NSIS v2.0 Beta 4

---

[1]: InstType.md