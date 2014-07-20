# AdvSplash.dll 

A small (5.5k), simple plug-in that lets you throw up a splash-screen in NSIS installers with cool fading effects (Windows 2000 or later) and transparency.

Create a Windows Bitmap (`.bmp`) image to be used as your splash screen. Optionally, you can also create a Wave (`.wav`) audio file to play while the image is being displayed.

By calling the plug-in in [`.onInit`][1], your splash-screen will be displayed before the setup interface shows up.

## Parameters

    delay fadeIn fadeOut keyColor fileName

Parameter | Description
----------|------------
`delay`   | length to show the screen for (in milliseconds)
`fadeIn`  | length to show the fadein scene (in milliseconds) (not included in `delay`, Windows 2000 or later)
`fadeOut` | length to show the fadeout scene (in milliseconds) (not included in `delay`, Windows 2000 or later)
`keyColor`| alpha key RGB values (e.g. `0xffff00 for yellow), use -1 when no transparency is used
`fileName`| Bitmap file-name (without `.bmp` extension). The file name of the optional audio must match (e.g. `mySplash.bmp` and `mySplash.wav`)

## Example

Simple splash:

    Function .onInit
      SetOutPath $PLUGINSDIR
      
      File /oname=spltmp.bmp "my_splash.bmp"

      AdvSplash::show 1000 600 400 -1 "$TEMP\spltmp"

    # $0 has '1' if the user closed the splash screen early,
    # '0' if everything closed normally, and '-1' if some error occurred.
      Pop $0

      Delete "$TEMP\spltmp.bmp"
    FunctionEnd

Transparent with sound:

    Function .onInit
      SetOutPath $PLUGINSDIR
      
      File /oname=spltmp.bmp "my_splash.bmp"
      File /oname=spltmp.wav "my_splashshit.wav"

      AdvSplash::show 1000 600 400 0xf00fee "$TEMP\spltmp"

    # $0 has '1' if the user closed the splash screen early,
    # '0' if everything closed normally, and '-1' if some error occurred.
      Pop $0

      Delete "$TEMP\spltmp.bmp"
      Delete "$TEMP\spltmp.wav"
    FunctionEnd

## Credits

Written by [Justin Frankel](https://en.wikipedia.org/wiki/Justin_Frankel) and [Amir Szekely][3]. Fading and transparency by [Nik Medved][4].

## License

As part of the NSIS distribution, this plug-in is licensed under [zlib/libpng][5]

[1]: ../Callbacks/onInit.md
[2]: https://en.wikipedia.org/wiki/Justin_Frankel
[3]: http://nsis.sourceforge.net/User:Kichik
[4]: http://nsis.sourceforge.net/User:Brainsucker
[5]: http://opensource.org/licenses/Zlib