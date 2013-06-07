# SetCompressor

---

This command sets the compression algorithm used to compress files/data in the installer. It can only be used outside of sections and functions and before any data is compressed. Different compression methods can not be used for different files in the same installer. It is recommended to use it on the very top of the script to avoid compilation errors.

Three compression methods are supported: ZLIB, BZIP2 and LZMA.

ZLIB (the default) uses the deflate algorithm, it is a quick and simple method. With the default compression level it uses about 300 KB of memory.

BZIP2 usually gives better compression ratios than ZLIB, but it is a bit slower and uses more memory. With the default compression level it uses about 4 MB of memory.

LZMA is a new compression method that gives very good compression ratios. The decompression speed is high (10-20 MB/s on a 2 GHz CPU), the compression speed is lower. The memory size that will be used for decompression is the dictionary size plus a few KBs, the default is 8 MB.

If `/FINAL` is used, subsequent calls to SetCompressor will be ignored.

If `/SOLID` is used, all of the installer data is compressed in one block. This results in greater compression ratios.

## Parameters:

    [/SOLID] [/FINAL] zlib|bzip2|lzma

## History:

Added in NSIS v2.0 Alpha 2

---
