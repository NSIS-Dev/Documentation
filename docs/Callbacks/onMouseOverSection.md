# .onMouseOverSection

This callback is called whenever the mouse position over the sections tree has changed. This allows you to set a description for each section for example. The section id on which the mouse is over currently is stored, temporarily, in $0.

## Example

    Function .onMouseOverSection
        FindWindow $R0 "#32770" "" $HWNDPARENT
        GetDlgItem $R0 $R0 1043 ; description item (must be added to the UI)

        StrCmp $0 0 "" +2
        SendMessage $R0 ${WM_SETTEXT} 0 "STR:first section description"

        StrCmp $0 1 "" +2
        SendMessage $R0 ${WM_SETTEXT} 0 "STR:second section description"
    FunctionEnd
