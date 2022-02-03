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

// manages state changes betwee sections of the configuration application (as represented by sections in the accordian)

function trAppController(old_tab,new_tab) {
	
	if (new_tab == 'tab7') {
		//debug display
		$('#fold7').html("<PRE>"+dump(trApp)+"</PRE>");
		return;
	}
	
	if (new_tab == 'tab8') {
		// log out content, needs no prerequisites
		return;
	}
	
	// header should never get expanded
	if (new_tab == 'title_tab') {
		trAppActivateTab(0);
		return;
	}
	
	// actions on LEAVING a section
	if (old_tab == 'tab1') {
		// need to make sure we have an id and initialize state for appliance
		var create_type = $('input[name=appliance_type]:checked').val();
		if (create_type == 'soft') {
			// do something
			var appliance_id = "SOFT:"+createUUID();
			if (!trAppCreateAppliance(appliance_id)) {
				trAppClearState();
			}
		} else {
			var hardware_id = $('input[name="hardware_id"]').val();
			
			var revert = false;
			
			if (hardware_id != undefined && hardware_id != "") {
				hardware_id = "MAC:"+hardware_id;
				var query_url = "/"+trApp.dbname+"/"+hardware_id;
				$.ajax({
				  url: query_url,
			  	async: false,
				  success: function(data) {
							// appliance exists
							alert('This appliance ID is already in use.');
							trAppClearState();
							revert = true;
				  },
				  dataType: "json"
				});
			} else {
				alert('Hardware ID may not be blank!');
				revert = true;
			}
			if (revert) {
				trAppActivateTab(1);
				return;
			} else {
				if (!trAppCreateAppliance(hardware_id)) {
					trAppClearState();
				}
			}
		}
	} else if (old_tab == 'tab5' && (trApp.current_appliance.private != undefined && trApp.current_appliance.private.id != undefined && trApp.current_appliance.private.id != "")) {
		trAppSaveOptions();
	}
	
	// validate each level deep
	

	
	if (new_tab >= 'tab2') {
		// make sure we have an id
		if (trApp.current_appliance.private != undefined && trApp.current_appliance.private.id != undefined && trApp.current_appliance.private.id != "") {
			if (new_tab >= 'tab3') {
				// TODO: need more robust test here
				if (trApp.current_appliance.private != undefined && trApp.current_appliance.private.nickname != undefined) {
					if (new_tab >= 'tab4') {
						if (trAppCountStops() > 0) {
							if (new_tab >= 'tab5') {
								if (trApp.current_appliance.public.application != undefined && trApp.current_appliance.public.application.id != undefined) {
									if (new_tab == 'tab6') {
										if (trApp.current_appliance.public.application == undefined || trApp.current_appliance.public.application.options == undefined) {
											alert("You haven't selected your display options yet!");
											trAppActivateTab(5);
											return;
										}
									}
								} else {
									alert("You have not selected a display application yet!");
									trAppActivateTab(4);
									return;
								}
							}
						} else {
							alert("Your configuration does not have any stops in it!");
							trAppActivateTab(3);
							return;
						}
					}
				} else {
					alert("You haven't registered your appliance display yet!");
					trAppActivateTab(2);
					return;
				}			
			}
		} else {
			alert("You haven't created your display configuration yet!");
			trAppActivateTab(0);
			return;
		}
	}
	
	// load new section, move it to top of screen if we are scrolling
	
	$('html,body').animate({scrollTop : $('#'+new_tab).offset().top},'fast');

	if (new_tab == 'tab0') {
		trAppDisplayMyAppliances();
	} else if (new_tab == 'tab1') {
		trApp.current_appliance = {};
		$("#fold2").html("");
		trAppCreateApplianceForm();
	} else if (new_tab == 'tab2') {
		trAppEditAppliance();
	} else if (new_tab == 'tab3') {
		trAppEditPublicApplianceConfig();				
	}	else if (new_tab == 'tab4') {
		trAppSelectApplication();
	} else if (new_tab == 'tab5') {
		trAppConfigureOptions();
	} else if (new_tab == 'tab6') {
		trAppTryIt();
	}
}

function trAppActivateTab(tab) {
	$('#accordion').accordion( 'activate' , tab+1 );
}