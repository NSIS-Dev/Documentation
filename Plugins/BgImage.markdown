# BgImage.dll 

Displays an image or a gradient with user defined texts and/or images behind the NSIS window. Can also play Wave files.

## Usage

    BgImage::SetBg /GRADIENT 0 0x80 0 0x80 0 0
    BgImage::AddImage background.bmp 150 0
    BgImage::Redraw
    BgImage::Clear
    BgImage::Destroy

Do not call `SetBg (which creates the window) from a section or a function called by a section. `BgImage` must be run from the GUI thread as the installation thread is not built to handle GUI.

### Available Functions

`SetBg [/FILLSCREEN|/TILED] path_to_bitmap`
`SetBg /GRADIENT R G B R G B`

Sets the background and creates the window if necessary

* Use `/FILLSCREEN` to make the image fill the screen
* Use `/TILED` to set a tiled background
* Use `/GRADIENT` to set a gradient background

If `SetReturn on` was called returns "success" on the stack or an error string if there was an error

Do not use in [`.onInit`][1]!

`AddImage [/TRANSPARENT R G B] path_to_bitmap X Y`

Adds an image to the background window at (X,Y)

* X and Y can be negative to specify distance from right/bottom
* Use `/TRANSPARENT` to make BgImage draw the image transparently. Define the transparent color using R G B

If `SetReturn on` was called returns "success" on the stack or an error string if there was an error

`AddText text font_handle R G B X Y X Y`

Adds text to the background window

* Use NSIS's [`CreateFont`][2] to create a font and pass it as `font_handle`
* Use R G B to set the text color
* The first X Y is for the top left corner of the text box
* The second X Y is for the bottom right corner of the text box
* X and Y can be negative to specify distance from right/bottoms

If `SetReturn on` was called returns "success" on the stack or an error string if there was an error

`Clear`

Clears all of the current background, images and texts

`Destroy`

 Destroys the current background window. Calls `Clear` automatically.

`Sound [/WAIT|/LOOP] path_to_wav`
`Sound /STOP`

Plays a wave file

* Use `/WAIT` to wait for the sound to finish playing
* Use `/LOOP` to loop the sound
* Use Sound `/STOP` to stop the loop

`SetReturn on|off`

Enable return values from `SetBg`, `AddImage` and `AddText`

Default value is off because all of the possible errors are either things you should handle when debugging your script such as "can't load bitmap" or errors you can do nothing about such as "memory allocation error"

## Example:

    Name "BgImage.dll test"
    OutFile "BgImage Test.exe"
    XPStyle on

    !define DEBUG
    !macro GetReturnValue
        !ifdef DEBUG
            Pop $R9
            StrCmp $R9 success +2
                DetailPrint "Error: $R9"
        !endif
    !macroend

    Function .onGUIInit
        # the plugins dir is automatically deleted when the installer exits
        InitPluginsDir

        # lets extract some bitmaps...
        File /oname=$PLUGINSDIR\1.bmp "${NSISDIR}\Contrib\Graphics\Wizard\llama.bmp"
        File /oname=$PLUGINSDIR\2.bmp "${NSISDIR}\Contrib\Graphics\Checks\modern.bmp"

        !ifdef DEBUG
            # turn return values on if in debug mode
            BgImage::SetReturn on
        !endif

        # set the initial background for images to be drawn on
        # we will use a gradient from drak green to dark red
        BgImage::SetBg /GRADIENT 0 0x80 0 0x80 0 0
        !insertmacro GetReturnValue

        # add an image @ (150,0)
        BgImage::AddImage $PLUGINSDIR\2.bmp 150 0
        !insertmacro GetReturnValue

        # add the same image only transparent (magenta wiped) @ (150,16)
        BgImage::AddImage /TRANSPARENT 255 0 255 $PLUGINSDIR\2.bmp 150 16
        !insertmacro GetReturnValue

        # create the font for the following text
        CreateFont $R0 "Comic Sans MS" 50 700

        # add a blue shadow for the text
        BgImage::AddText "Testing 1... 2... 3..." $R0 0 0 255 48 48 798 198
        !insertmacro GetReturnValue

        # add a green shadow for the text
        BgImage::AddText "Testing 1... 2... 3..." $R0 0 255 0 52 52 802 202
        !insertmacro GetReturnValue

        # add the text
        BgImage::AddText "Testing 1... 2... 3..." $R0 255 0 0 50 50 800 200
        !insertmacro GetReturnValue

        # show our creation to the world!
        BgImage::Redraw

        # Refresh doesn't return any value
    FunctionEnd

    Section
        # play some sounds
        FindFirst $0 $1 $WINDIR\Media\*.wav
        StrCmp $0 "" skipSound

        moreSounds:
            StrCmp $1 "" noMoreSounds
            BgImage::Sound /WAIT $WINDIR\Media\$1

            # Sound doesn't return any value either
            MessageBox MB_YESNO "Another sound?" IDNO noMoreSounds
            FindNext $0 $1
            Goto moreSounds

        noMoreSounds:
            FindClose $0

        skipSound:
        # change the background image to Mike, tiled
        BgImage::SetBg /TILED $PLUGINSDIR\1.bmp
        !insertmacro GetReturnValue

        # we have to redraw to reflect the changes
        BgImage::Redraw
        MessageBox MB_OK "Mike the llama"

        # clear everything
        BgImage::Clear

        # Clear doesn't return any value
        # set another gradient
        BgImage::SetBg /GRADIENT 0xFF 0xFA 0xBA 0xAA 0xA5 0x65
        !insertmacro GetReturnValue

        # add some text
        BgImage::AddText "A Desert for Mike" $R0 0 0 0 50 50 800 150
        !insertmacro GetReturnValue

        # add mike as an image
        BgImage::AddImage $PLUGINSDIR\1.bmp 50 150
        !insertmacro GetReturnValue

        # again, we have to call redraw to reflect changes
        BgImage::Redraw
    SectionEnd
    
    Function .onGUIEnd
        BgImage::Destroy
        # Destroy doesn't return any value
    FunctionEnd

## Credits:

Written by [Amir Szekely][3] with contributions by [Ximon Eighteen][4], [iceman_k][5], Lajos Molnar and Jason Reis

## License

As part of the NSIS distribution, this plug-in is licensed under [zlib/libpng][6]

[1]: ../Callbacks/onInit.markdown
[2]: ../Reference/CreateFont.markdown
[3]: http://nsis.sourceforge.net/User:Kichik
[4]: http://nsis.sourceforge.net/User:Sunjammer
[5]: http://nsis.sourceforge.net/User:Iceman_K
[6]: http://opensource.org/licenses/Zlib