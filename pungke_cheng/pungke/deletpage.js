function deletepage() {

var oTable;

$(document).ready(function() {
	oTable = $('#example').dataTable();
	
	/* Immediately remove the first row. You wouldn't want to do it this way... */
	oTable.fnDeleteRow( 0 );
} );




}