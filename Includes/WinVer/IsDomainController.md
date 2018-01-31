# ${IsDomainController}

Checks if the server is a domain controller

## Syntax

    logic_lib_statement ${IsDomainController}

## Example

    ${If} ${IsDomainController}
        DetailPrint "Running on a domain controller."
    ${Else}
        DetailPrint "Not running on a domain controller."
    ${EndIf}

## Credits

*unknown*
