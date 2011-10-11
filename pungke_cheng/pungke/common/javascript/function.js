//define function for filter
(function($) {
/*
 * Function: fnGetColumnData
 * Purpose:  Return an array of table values from a particular column.
 * Returns:  array string: 1d data array 
 * Inputs:   object:oSettings - dataTable settings object. This is always the last argument past to the function
 *           int:iColumn - the id of the column to extract the data from
 *           bool:bUnique - optional - if set to false duplicated values are not filtered out
 *           bool:bFiltered - optional - if set to false all the table data is used (not only the filtered)
 *           bool:bIgnoreEmpty - optional - if set to false empty values are not filtered from the result array
 * Author:   Benedikt Forchhammer <b.forchhammer /AT\ mind2.de>
 */
$.fn.dataTableExt.oApi.fnGetColumnData = function ( oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty ) {
	// check that we have a column id
	if ( typeof iColumn == "undefined" ) return new Array();
	
	// by default we only wany unique data
	if ( typeof bUnique == "undefined" ) bUnique = true;
	
	// by default we do want to only look at filtered data
	if ( typeof bFiltered == "undefined" ) bFiltered = true;
	
	// by default we do not wany to include empty values
	if ( typeof bIgnoreEmpty == "undefined" ) bIgnoreEmpty = true;
	
	// list of rows which we're going to loop through
	var aiRows;
	
	// use only filtered rows
	if (bFiltered == true) aiRows = oSettings.aiDisplay; 
	// use all rows
	else aiRows = oSettings.aiDisplayMaster; // all row numbers

	// set up data array	
	var asResultData = new Array();
	
	for (var i=0,c=aiRows.length; i<c; i++) {
		iRow = aiRows[i];
		var aData = this.fnGetData(iRow);
		var sValue = aData[iColumn];
		
		// ignore empty values?
		if (bIgnoreEmpty == true && sValue.length == 0) continue;

		// ignore unique values?
		else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;
		
		// else push the value onto the result data array
		else asResultData.push(sValue);
	}
	
	return asResultData;
}}(jQuery));


function fnCreateSelect( aData )
{
	var r='<select><option value=""></option>', i, iLen=aData.length;
	for ( i=0 ; i<iLen ; i++ )
	{
		r += '<option value="'+aData[i]+'">'+aData[i]+'</option>';
	}
	return r+'</select>';
}

/*-----fliter up----*/


	jQuery(document).ready(function() {

	//tab
	$('#tabs').tabs().find( ".ui-tabs-nav" ).sortable({ axis: "x" });
	
	
	//add tab		
		var tab_counter = 3;
		
		// tabs init with a custom tab template and an "add" callback filling in the content
		var $tabs = $( "#tabs").tabs({
			tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>X</span></li>",
			add: function( event, ui ) {
				var tab_content = $("#temp").html();
				$( ui.panel ).append( "<p>" + tab_content + "</p>" );
			}
		});

		function addTab() {
			var tab_title = ("AC-edit");
			$tabs.tabs( "add", "#tabs-" + tab_counter, tab_title );
			tab_counter++;
		}

	$( "#add_tab" ).click(function() {
		addTab();
		var itabindex = tab_counter - 2;
		$( "#tabs" ).tabs( "option", "selected", itabindex );
				 });


	//remove tab
	$( "#tabs span.ui-icon-close" ).live( "click", function() {
			var index = $( "li", $tabs ).index( $( this ).parent() );
			$tabs.tabs( "remove", index );
			tab_counter--;
		});


	
	//toggle activity
	$(".action-expand").click(function(){
		var pageid = $(this).attr("name");
		var pageAc = $("#"+pageid)
		pageAc.toggle();
		var AcStatus = $(this).html();
	});
	
	//archive box
		$(".page input").click(function(){
			var checkBoxid = $(this).attr("name");
			var checkBoxDiv = $("#"+checkBoxid);
			checkBoxDiv.toggle();
		});
	

//table filter
	var oTable = loadPages();
	//var oTable = $('#allpages').dataTable();
	
	/* Add a select menu for each TH element in the table footer */
	$("#allpages-dofilter span").each( function ( i ) {
		
		if (i == 2 || i == 3 || i == 4 || i == 5) {
			this.innerHTML = fnCreateSelect(oTable.fnGetColumnData(i));
			$('select', this).change(function(){
				oTable.fnFilter($(this).val(), i);
				
			});
		}
	} );
	} );


	//toggle col
	function fnShowHide( iCol )
	{
		/* Get the DataTables object again - this is not a recreation, just a get of the object */
		var oTable = $('#allpages').dataTable();
		
		var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
		oTable.fnSetColumnVis( iCol, bVis ? false : true );
	}


//=------------------allac table-------------------==
	//table
	oTable = $('#allac').dataTable ({
			//hide col
			"aoColumnDefs": [ 
						{ "bSearchable": false, "bVisible": false, "aTargets": [ 6 ] },
						{ "bSearchable": false, "bVisible": false, "aTargets": [ 7 ] },
					] 
	});
	
	$("#allac-dofilter span").each( function ( i ) {

		if ( i == 3 || i == 4 || i == 5) {
			this.innerHTML = fnCreateSelect(oTable.fnGetColumnData(i));
			$('select', this).change(function(){
				oTable.fnFilter($(this).val(), i);
				
			});
		}
	} );

	
	//toggle col
	function fnShowHideAC( iCol )
	{
		/* Get the DataTables object again - this is not a recreation, just a get of the object */
		var oTable = $('#allac').dataTable();
		
		var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
		oTable.fnSetColumnVis( iCol, bVis ? false : true );
	}
	
	//archive box
	$(".activity input").click(function(){
		var checkBoxid = $(this).attr("name");
		var checkBoxDiv = $("#"+checkBoxid);
		checkBoxDiv.toggle();
	});
	
	//connect2
	$(".connectbox").click(function(){
		var connecBoxid = $(this).attr("name");
		var connecBoxDiv = $("#"+connecBoxid);
		connecBoxDiv.toggle();
	});
	
	//disconnect2
	$(".disconnectbox").click(function(){
		var disconnecBoxid = $(this).attr("name");
		var disconnecBoxDiv = $("#"+disconnecBoxid);
		disconnecBoxDiv.toggle();
	});
	
	//hide connect2
	$(".connect2-close").click(function(){
		$(this).parent().hide();
			});
	
	//hide disconnect2
	$(".disconnect2-close").click(function(){
		$(this).parent().hide();
			});
			
			

	
