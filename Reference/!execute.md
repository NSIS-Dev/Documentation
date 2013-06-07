# !execute

---

This command will execute 'command' using a call to CreateProcess(). Unlike [!system][1], it does not use the command line processor, so input/output redirection and commands like 'cd', 'dir' and 'type' can not be used. `!execute` also ignores the return value of the executed command. Currently, the only known advantage of `!execute` over [!system][1] is that it does not give trouble when the current working directory is specified using UNC.
On POSIX platforms, `!execute` will use system() just like [!system][1].

## Parameters:

    command

## Example:

	!execute '"%WINDIR%\notepad.exe" "${NSISDIR}\license.txt"'

## History:

Added in NSIS v2.01

---

[1]: !system.md