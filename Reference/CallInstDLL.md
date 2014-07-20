# CallInstDLL

---

Calls a function named function_name inside a NSIS extension DLL, a plug-in. See the example plugin for how to make one. Extension DLLs can access the stack and variables. Note: To automatically extract and call plug-in DLLs, use a plug-in command instead of `CallInstDLL`.

## Parameters

    dllfile function_name

## Example

	Push "a parameter"
	Push "another parameter"
	CallInstDLL $INSTDIR\somedll.dll somefunction

## History

Added in NSIS v1.7b

---
