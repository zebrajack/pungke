	function loadPages()
	{
		var oTable = $('#allpages').dataTable();
		$.getJSON("/pungke/pages/all",function(data)
		{
			oTable.fnClearTable();
			var rowNum=0;
			$.each(data, function(k, v)
			{
				var page=v;
				var id=page["id"];
				var number=page["number"];
				var name=page["name"];
				var priority=page["priority"];
				var partType=page["type"];
				var status=page["status"];
				var lastEvent=page["lastEvent"];
				var username=getOwnerName(page["owner"]);
				
				rowNum++;
				
				var tt="";
				tt+='<input type="checkbox"/>';
				tt+='<div class="page">'+name+'<div><span class="action-delete"></span><span class="export-excel"></span><span class="action-participant"></span><span class="action-edit"></span><span class="action-add-ac"></span><span class="action-expand" onclick="showHideAC(\''+number+'\')" name="'+number+'"></span></div></div>';
				tt+='<div class="archivebox" >Archive This Page | Archive all selected Pages</div>';
				tt+='<div style="display:none" class="page-activity" id="'+number+'">';
				tt+='<div class="expanded-ac">AC 1<span class="action-priority"></span><span class="action-edit"></span><span class="action-disconnect"></span><span class="action-connect"></span><span class="action-open"></span></div>';
				tt+='<div class="expanded-ac">AC 2</div>';
				tt+='<div class="expanded-ac">AC 3</div>';
				tt+='</div>';
				
				oTable.fnAddData([tt,lastEvent,partType,username,status,priority]);
				if(priority=='High')
				{
					$('tr:nth-child('+(rowNum)+')').addClass('high-priority');
				}
				
				/*
				if(page["priority"]=="High")
				{
					tt+='<tr class="high-priority">';
				}
				else
				{
					tt+='<tr>';
				}
				tt+='<td>';
				tt+='<input type="checkbox"/>';
				tt+='<div class="page">'+name+'<div><span class="action-delete"></span><span class="export-excel"></span><span class="action-participant"></span><span class="action-edit"></span><span class="action-add-ac"></span><span class="action-expand" name="'+number+'"></span></div></div>';
				tt+='<div class="archivebox" id="ab-page001">Archive This Page | Archive all selected Pages</div>';
				tt+='<div style="display:none" class="page-activity" id="'+number+'">';
				tt+='<div class="expanded-ac">AC 1<span class="action-priority"></span><span class="action-edit"></span><span class="action-disconnect"></span><span class="action-connect"></span><span class="action-open" id="add_tab"></span></div>';
				tt+='<div class="expanded-ac">AC 2</div>';
				tt+='<div class="expanded-ac">AC 3</div>';
				tt+='</div>';
				tt+='</td>';
				tt+='<td>'+lastEvent+'</td>';
				tt+='<td>'+partType+'</td>';
				tt+='<td>'+username+'</td>';
				tt+='<td>'+status+'</td>';
				tt+='<td>'+priority+'</td>';
				tt+='</tr>';
				*/
			});
			oTable.fnAdjustColumnSizing();

		});
		return oTable;
	}
	function getOwnerName(user)
	{
		var name=user["name"];
		return name;
	}
	function showHideAC(number)
	{
		var stl=$('#'+number).attr("style");
		if(stl=="display:none")
		{
			$('#'+number).attr("style","display:block");
		}
		else
		{
			$('#'+number).attr("style","display:none");
		}
	}

<!coding by cheng!>

function deletepage() {


	var anSelected=fnGetSelected(oTable);
        oTable.fnDeleteRow(anSelected[0],null,true);

}


function fnGetSelected(oTableLocal) {

       var aReturn=new Array();
       var aTrs=oTableLocal.fnGetNodes();
       for(var i=0;i<aTrs.length;i++) {
           if($(aTrs[i]).hasClass('row_selected')){

               aReturn.push(aTrs[i]);
           }

       }
       return aReturn;

}


function pageeditor() {



}


function participantseditor() {


}

function addactivities() {


}