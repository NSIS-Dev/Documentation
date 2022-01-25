# GetFileTime

Gets the last write time of "filename". Sets the user output variables with the high and low dwords of the timestamp on success; on failure the outputs are empty and the error flag is set.

## Parameters

    filename user_var(high dword output) user_var(low dword output)

## History

Added in NSIS v1.60
