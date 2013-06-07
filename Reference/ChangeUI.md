# ChangeUI

---

Replaces dialog (IDD_LICENSE, IDD_DIR, IDD_SELCOM, IDD_INST, IDD_INSTFILES, IDD_UNINST or IDD_VERIFY) by a dialog with the same resource ID in ui_file.exe. You can also specify 'all' as the dialog if you wish to replace all 7 of the dialogs at once from the same UI file. For some example UIs look at Contrib\UIs under your NSIS directory.

* IDD_LICENSE must contain IDC_EDIT1 (RICHEDIT control).
* IDD_DIR must contain IDC_DIR (edit box), IDC_BROWSE (button) and IDC_CHECK1 (checkbox).
* IDD_SELCOM must contain IDC_TREE1 (SysTreeView32 control), and IDC_COMBO1 (combo box).
* IDD_INST must contain IDC_BACK (button), IDC_CHILDRECT (static control the size of all other dialogs), IDC_VERSTR (static), IDOK (button), and IDCANCEL (button). If an image control (static with SS_BITMAP style) will be found in this dialog it will be used as the default for [`SetBrandingImage`][1].
* IDD_INSTFILES must contain IDC_LIST1 (SysListView32 control), IDC_PROGRESS (msctls_progress32 control), and IDC_SHOWDETAILS (button).
* IDD_UNINST must contain IDC_EDIT1 (edit box).
* IDD_VERIFY must contain IDC_STR (static).

## Parameters:

    dialog ui_file.exe

## Example:

	ChangeUI all "${NSISDIR}\Contrib\UIs\sdbarker_tiny.exe"

## History:

Added in NSIS v2.0 Alpha 2

---

[1]: SetBrandingImage.md