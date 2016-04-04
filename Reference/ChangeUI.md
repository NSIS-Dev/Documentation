# ChangeUI

Replaces dialog (IDD\_LICENSE, IDD\_DIR, IDD\_SELCOM, IDD\_INST, IDD\_INSTFILES, IDD\_UNINST or IDD\_VERIFY)  with a dialog from ui_file.exe`. You can also specify 'all' as the dialog if you wish to replace all 7 of the dialogs at once from the same UI file. For some example UIs look at Contrib\UIs under your NSIS directory.

* IDD\_LICENSE must contain IDC\_EDIT1 (RICHEDIT control).
* IDD\_DIR must contain IDC\_DIR (edit box), IDC\_BROWSE (button) and IDC\_CHECK1 (checkbox).
* IDD\_SELCOM must contain IDC\_TREE1 (SysTreeView32 control), and IDC\_COMBO1 (combo box).
* IDD\_INST must contain IDC\_BACK (button), IDC\_CHILDRECT (static control the size of all other dialogs), IDC\_VERSTR (static), IDOK (button), and IDCANCEL (button). If an image control (static with SS\_BITMAP style) will be found in this dialog it will be used as the default for [`SetBrandingImage`][1].
* IDD\_INSTFILES must contain IDC\_LIST1 (SysListView32 control), IDC\_PROGRESS (msctls_progress32 control), and IDC\_SHOWDETAILS (button).
* IDD\_UNINST must contain IDC\_EDIT1 (edit box).
* IDD\_VERIFY must contain IDC\_STR (static).

## Parameters

    dialog ui_file.exe

## Example

	ChangeUI all "${NSISDIR}\Contrib\UIs\sdbarker_tiny.exe"

## History

Added in NSIS v2.0 Alpha 2

[1]: SetBrandingImage.md