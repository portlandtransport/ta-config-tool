/*
MIT License

Copyright (c) 2022 Portland Transport

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function trAppParentId(id) {
	// Purpose: derive parent id for sub-screens
	var id_sections = id.split(":");
	var last_section = id_sections[id_sections.length - 1];
	if (last_section.length == 1 || last_section == "OS") {
		id_sections.pop();
		return id_sections.join(":");
	} else {
		return id;
	}
}


function trAppDisplayMyAppliances() {
	
	//Purpose: list current configurations, allow creation of a new one
	
	var return_html = "<p>";

	// build name cache
	window.trAppNameCache = {};

	trFirebaseGetConfigList().then( function(rows) {
		if (rows.length > 0) {
			// sort by nickname
			//console.log(data.rows);
			rows.sort(function(a, b) {	
				var first;
				var second;
				
				if ( typeof a.value != "undefined" && typeof a.value.private != "undefined" && typeof a.value.private.nickname != "undefined") {
					first = a.value.private.nickname;
				} else {
					first = "";
				}
				
				if ( typeof b.value != "undefined" && typeof b.value.private != "undefined" && typeof b.value.private.nickname != "undefined") {
					second = b.value.private.nickname;
				} else {
					second = "";
				}
	
				if (first < second) return -1;
				if (first > second) return 1;
				return 0;
			});

			// table of existing configs
			if (document.tag == undefined) {
				document.tag = "";
			}
			return_html += "<table border='1' class='transparent_table'><tr valign='top'><td class='transparent_table'><table><tr><th>Appliance</th><th>Street Address</th></tr>\n";
			$(rows).each(function(index,return_data) {
				//console.log(return_data);
				var hw_id = trAppHardwareId(return_data.value.private.id);				
				
				var edit_string = "<a href=\"javascript:trAppLoadApplianceConfig('"+return_data.value.private.id+"'); trAppActivateTab( 2 );\">edit</a> | <a target=\"_blank\" href=\"http://transitappliance.com/cgi-bin/test_by_id.pl?id="+return_data.value.private.id+"\">test</a> | <a href=\"javascript:trAppDeleteApplianceConfig('"+return_data.value._id+"','"+return_data.value._rev+"',false,trAppDisplayMyAppliances);\">delete</a> | <a href=\"javascript:trAppCloneApplianceConfig('"+return_data.value._id+"')\">clone</a> | <a href=\"javascript:trAppReset('"+return_data.value._id+"')\">reset</a>";
				//trAppLoadApplianceConfig(return_data.id)
				//var url = trAppBuildURL();
				//if (url != undefined && url != "") {
				//	edit_string += "<a target='_blank' href='"+url+"'>try the configuration</a>";
				//} else {
				//	edit_string += "[configuation not yet completed]";
				//}
				var address = return_data.value.private.address;
				if (!populated(address) && !populated(hw_id)) {
					// delete the appliance, user apparently aborted before minimum config
					//trAppDeletePrivateApplianceConfig(return_data._docId,true)
		
				} else {
		
					//if (hw_id != "") {
						address += "<br><span class='fineprint'>"+return_data.value.public.application.id+" "+return_data.value.private.id+"</span>";
						//address += "<br><span class='fineprint'>"+" "+return_data.value.private.id+"</span>";
					//}
					var nickname = return_data.value.private.nickname;
					if (nickname == undefined) {
						nickname = "[not yet named]";
					}
					window.trAppNameCache[return_data.value.private.id] = nickname;
					
					return_html += "<tr class='appliance_listing' valign=\"top\"><td><b class='nickname'>"+nickname+"</b><br><span class='fineprint'>"+edit_string+"</span></td><td>"+address+"</td></tr>";
				}

		
			});
			return_html += "</table></td><td class='transparent_table'>&nbsp;&nbsp</td><td class='transparent_table'>\n";
			return_html += "<nobr><form style='padding: 0px' id='create_appliance' onsubmit=\"trApp.clone_appliance = undefined;trAppActivateTab(1);return false;\">"+
					"<input type='image' src='images/create_another.png'></form><form action='#' onsubmit='return false;'>"+
					"<input value='"+document.tag+"' id='filter_field' placeholder='filter' type=text></form></nobr></td></table>";
		
		} else {
			return_html += "<table class='transparent_table' width='100%'><tr><td class='transparent_table' align='center'><h2>You have no display configurations yet</h2><img src='images/arrow-down-3.png'><br>";
			return_html += "<form onsubmit=\"trAppActivateTab(1);return false\"><input type='image' src=\"images/getstarted.png\"></form></td></tr></table>";
		}
	

		return_html += "</p>";
		$("#main_content").html(return_html);
		$("#filter_field").change(function() {
			var tag = $("#filter_field").val();
			if (tag == undefined) {
				tag = "";
			}
			document.tag = tag;
			trAppDisplayFilter(tag);
		});
	    var tag = $("#filter_field").val();
		if (tag == undefined) {
			tag = "";
		}
		if (tag != "") {
		    document.tag = tag;
		    trAppDisplayFilter(tag);
		}
		
	}).catch(function(error) {
		$("#main_content").html("Sorry, we could not retrieve your Transit Appliance configurations. Error information:<p>"+error);
	});
	
}

function trAppDisplayFilter(filter_string) {
    $("b.nickname").each(function(index,el) {
        var nickname = $(el).text();
        var nick_parent = $(el).closest('tr');
        if (filter_string == "") {
            $(nick_parent).show();
        } else {
            var pattern = new RegExp(filter_string,'i');
            if (pattern.test(nickname)) {
                $(nick_parent).show();
            } else {
                $(nick_parent).hide();
            }
        }
    })
}

function trAppCreateApplianceForm() {
	
	var return_html = "<table class='transparent_table'><tr valign='top'><td class='transparent_table'><form id='create_appliance' onsubmit=\"trAppActivateTab(2);return false;\"><table><tr><th>Is Your Display?</th></tr><tr><td>\
				<input type='radio' name='appliance_type' value='soft' checked>A web browser on a general-purpose computer?</td></tr>\
				<tr><td><input type='radio' name='appliance_type' value='hard'>A dedicated hardware appliance?\
				<blockquote id='hardware_id_form'>Hardware appliances display a network id in the form XX:XX:XX:XX:XX:XX at startup<br>when they are not yet configured. Please enter it here: <input style='border: solid 1px' type='text' size='18' name='hardware_id'></blockquote>\
			</td></tr></table></form></td><td class='transparent_table'>&nbsp;&nbsp;</td><td class='transparent_table'><form onsubmit=\"trAppActivateTab(2);return false;\"><input type='image' src='images/createit.png'></form></td></table>";
	$("#fold1").html(return_html);
	$('#hardware_id_form').hide();
	
	$($('input[name="appliance_type"]:radio')).click(function() {
		if (jQuery('input[name="appliance_type"]:radio:checked').val() == 'hard') {
			$('#hardware_id_form').show();
		} else {
			$('#hardware_id_form').hide();
		}
	});
}

/*
This block of code manages the private data
for a given appliance
*/

function trAppHardwareId(id) {
	// recognizes whether the id is MAC address and returns it, otherwise returns empty string
	var regex = /^MAC/;
	if (id.search(regex) != -1) {
		return id.substring(4);
	} else {
		return "";
	}
}

function trAppReset(id) {
	// set SQS queue entry to trigger reset of running display

	jQuery.ajax({
		url: "https://transitappliance.com/cgi-bin/create_reset.pl",
		dataType: "jsonp",
		data: {"id": id},
		success: function(data) {
			if (data.status == "ok") {
				alert("Reset request has been queued for "+id);
			} else {
				alert("Could not queue reset request");
			}
		},
		error: function(data) {
			alert("Could not queue reset request");
		}
	});
	
}
