# ExitWhile

Exits a block of statements until started by [`${DoWhile}`][1].

## Syntax

	${ExitWhile}

## Example

	StrCpy $0 0
	ClearErrors

	${DoWhile} $0 < 10
		IntOp $0 $0 + 1
		${If} ${Errors}
			MessageBox MB_OK "An unexpected error occured!"
			${ExitWhile}
		${EndIf}
	${Loop}

## Credits

Written by dselkirk and eccles

[1]: DoWhile.md