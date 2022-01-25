# UninstallCaption

Sets what the titlebars of the uninstaller will display. By default it is '$(^Name) Uninstall', where [`Name`][1] is specified with the Name command. You can, however, override it with 'MyApp uninstaller' or whatever. If you specify an empty string (""), the default will be used (you can specify " " to simulate a empty string).

Accepts variables. If variables are used, they must be initialized in [`un.onInit`][2].

## Parameters

    caption

## History

Added in NSIS v1.56

[1]: Name.md
[2]: ../Callbacks/un.onInit.md
