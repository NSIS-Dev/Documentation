# IntOp

Combines value1 and (depending on OP) value2 into the specified user variable (user_var). OP is defined as one of the following:

* "+" ADDs value1 and value2
* "-" SUBTRACTs value2 from value1
* "∗" MULTIPLIEs value1 and value2
* "/" DIVIDEs value1 by value2
* "%" MODULUSs value1 by value2
* "|" BINARY ORs value1 and value2
* "&" BINARY ANDs value1 and value2
* "^" BINARY XORs value1 and value2
* ">>" RIGHT SHIFTs value1 by value2
* "<<" LEFT SHIFTs value1 by value2
* "~" BITWISE NEGATEs value1 (i.e. 7 becomes 4294967288)
* "!" LOGICALLY NEGATEs value1 (i.e. 7 becomes 0)
* "||" LOGICALLY ORs value1 and value2
* "&&" LOGICALLY ANDs value1 and value2

## Parameters

    user_var(output) value1 OP [value2]

## Example

	IntOp $0 1 + 1
	IntOp $0 $0 + 1
	IntOp $0 $0 << 2
	IntOp $0 $0 ~
	IntOp $0 $0 & 0xF

## History

Added in NSIS v1.50
