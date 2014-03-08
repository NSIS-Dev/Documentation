# Section

---

Begins and opens a new section. If section\_name is empty, omitted, or begins with a -, then it is a hidden section and the user will not have the option of disabling it. If the section name is 'Uninstall' or is prefixed with 'un.', then it is a an uninstaller section. If section\_index\_output is specified, the parameter will be [`!define`][1]d with the section index (that can be used for [`SectionSetText`][2] etc). If the section name begins with a !, the section will be displayed as bold. If the /o switch is specified, the section will be unselected by default.

## Parameters:

    [/o] [([!]|[-])section_name] [section_index_output]

## Example:

	Section "-hidden section"
	SectionEnd
	 
	Section # hidden section
	SectionEnd
	 
	Section "!bold section"
	SectionEnd
	 
	Section /o "optional"
	SectionEnd
	 
	Section "install something" SEC_IDX
	SectionEnd

To access the section index, curly brackets must be used and the code must be located below the section in the script.

	Section test1 sec1_id
	SectionEnd
	 
	Section test2 sec2_id
	SectionEnd
	 
	Function .onInit
		SectionGetText ${sec2_id} $0
		MessageBox MB_OK "name of ${sec2_id}:$\n$0" # will correctly display 'name of 1: test2'
	FunctionEnd

	Function .onInit
		SectionGetText ${sec2_id} $0
		MessageBox MB_OK "name of ${sec2_id}:$\n$0" # will incorrectly display 'name of ${sec2_id}: test1'
		# plus a warning stating:
		#   unknown variable/constant "{sec2_id}" detected, ignoring
	FunctionEnd
	 
	Section test1 sec1_id
	SectionEnd
	 
	Section test2 sec2_id
	SectionEnd

## History:

Added in NSIS v1.0f

---

[1]: !define.md
[2]: SectionSetText.md