# ${RunningX64}

Checks if the installer is running on x64. Requires [LogicLib][1].

## Syntax

    logic_lib_statement ${RunningX64}

## Example

    ${If} ${RunningX64}
        MessageBox MB_OK "running on x64"
    ${EndIf}

## Credits

*unknown*

[1]: https://github.com/NSIS-Handbook/Documentation/tree/master/Includes/LogicLib
