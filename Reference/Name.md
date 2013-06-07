# Name

---

Sets the name of the installer. The name is usually simply the product name such as 'MyApp' or 'CrapSoft MyApp'. If you have one or more ampersands (&) in the name, set the second parameter to the same name, only with doubled ampersands. 

Accepts variables. If variables are used, they must be initialized in `.onInit.

## Parameters:

    name [name_doubled_ampersands]

## Example:

	Name "Foobar"

If your product's name is "Foo & Bar", use:

	Name "Foo & Bar" "Foo && Bar"

If you have ampersands in the name and use a [`LangString`][1] for the name, you will have to create another one with doubled ampersands to use as the second parameter.

## History:

*not documented*

---

[1]: LangString.md