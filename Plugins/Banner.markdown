# Banner.dll 

The Banner plug-in shows a banner with customizable text. It uses the `IDD_VERIFY` dialog of the UI.

There are three functions – `show`, `getWindow` and `destroy`.

## Usage

    Banner::show "Text to show"
    Banner::getWindow
    Banner::destroy

### Modern UI

The Modern UI has two labels on the `IDD_VERIFY` dialog. To change all the texts, use:

    Banner::show /set 76 "Text 1 (replaces Please wait while Setup is loading...)" "Normal text"

### Custom UI

If you have more labels on your `IDD_VERIFY` dialog, you can use multiple `/set` parameters to change the texts.

Example:

    Banner::show /set 76 "bah #1" /set 54 "bah #2" "Normal text"

The second parameter for `/set is the ID of the control.

## Example:

    Name "Banner.dll test"
    OutFile "Banner Test.exe"
    ShowInstDetails show    

    Function .onInit
        Banner::show "Calculating important stuff..."

        Banner::getWindow
        Pop $1    

        again:
        IntOp $0 $0 + 1
        Sleep 1
        StrCmp $0 100 0 again

        GetDlgItem $2 $1 1030
        SendMessage $2 ${WM_SETTEXT} 0 "STR:Calculating more important  stuff..."    

        again2:
        IntOp $0 $0 + 1
        Sleep 1
        StrCmp $0 200 0 again2

        Banner::destroy
    FunctionEnd    

    Section
        DetailPrint "Using previous calculations to quickly calculate 1*2000..."
        Sleep 1000
        DetailPrint "Eureka! It's $0!!!"
        DetailPrint ""
    SectionEnd

## Credits:

Written by [Nik Medved][1] and [Amir Szekely][2] in honor of the messages dropped during the battle

[1]: http://nsis.sourceforge.net/User:Brainsucker
[2]: http://nsis.sourceforge.net/User:Kichik