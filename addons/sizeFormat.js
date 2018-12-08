_z
	.declare('sizeFormat')
	.method(function( bytes ) {
		if(bytes < 1024) return bytes + " Bytes";
		else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
		else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
		else if(bytes < 1099511627776) return(bytes / 1073741824).toFixed(3) + " GB";
		else return(bytes / 1099511627776).toFixed(3) + " TB";
		
		if (bytes < 1024)
			return bytes + " bytes";
		else
		{
			return (bytes/1024).toFixed(2) + " kb";
		}
	});