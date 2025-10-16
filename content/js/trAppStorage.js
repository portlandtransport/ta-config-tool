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


// functions related to storing/reading appliance state

function trAppCreateAppliance(appliance_id) {
	// re-initialize state to create a new configuration
	if (trApp.clone_appliance) {
		trApp.current_appliance = trApp.clone_appliance;
		trApp.current_appliance.private.id = appliance_id;
		trApp.current_appliance.public.id = appliance_id;
		trApp.current_appliance.private.nickname = "";
		trApp.current_appliance["_id"] = trApp.current_appliance.private.id;
		delete trApp.current_appliance["_rev"];
	} else {
		trApp.current_appliance.private = {}; // all data is public now
		trApp.current_appliance.public = {}; // public configuration elements, available to anyone who presents id
		trApp.current_appliance.private.id = appliance_id;
		trApp.current_appliance.public.id = appliance_id;
		trApp.current_appliance.public.stops = {};
		trApp.current_appliance.public.stop_cache = {};
	}
	
	// private piece
	trAppStoreConfiguration();

	return true;
}

function trAppStoreConfiguration() {
	/* stores either public or private parts of configuration
	inputs:
		none
	outputs:
		none
	operates on global trApp.current_appliance data
	errors are flagged only on synchronous saves, async saves are allowed to fail silently
	*/
	
	trApp.current_appliance["_id"] = trApp.current_appliance.private.id; // set couch id
	//trApp.current_appliance["author"] = trApp.author;
	trApp.current_appliance["created_at"] = (new Date()).toJSON();
	
	// create URL
      if (trApp.current_appliance.public.application != undefined && trApp.current_appliance.public.application.id != undefined) {
     		var application_data = trApp.applications.applicationData(trApp.current_appliance.public.application.id);
     		trAppFormatURLs(application_data,trApp.current_appliance)
      }
	
	// console.log("writing");
	// console.log(trApp.current_appliance);
	trFirebaseSetConfig(trApp.current_appliance);

	
}

function trAppFormatURLs(application,config) {

	if (typeof application.fields_to_encode != "object") {
		application.fields_to_encode = {};
	}
				
	if (config.public.stops != undefined && config.public.application != undefined && config.public.application.id != undefined && config.public.application.options != undefined) {
		// populate all the config values we will need
		
		if (config.public.timezone == undefined) {
			config.public.timezone = "America/Los_Angeles";
		}
  				  	
		var option_name_value_pair_array = new Array();
		var fully_qualified_option_name_value_pair_array = new Array();
		if (config.public.application.options == undefined) {
			config.public.application.options = [];
		}
		for (var i = 0; i < config.public.application.options.length; i++){ 
			var option = config.public.application.options[i]; 
			var value = option.value;
			if (application.fields_to_encode[option.name]) {
				value = encodeURIComponent(value);
			}
			option_name_value_pair_array.push(option.name+"="+value);
			fully_qualified_option_name_value_pair_array.push("option["+option.name+"]="+value);
		} 

		var parentid = trAppParentId(config.private.id);
		var parentname = window.trAppNameCache[parentid];
		option_name_value_pair_array.push("parentname="+encodeURIComponent(parentname));
		fully_qualified_option_name_value_pair_array.push("option[parentname]="+encodeURIComponent(parentname));
		
		option_name_value_pair_array.push("nickname="+encodeURIComponent(config.private.nickname));
		fully_qualified_option_name_value_pair_array.push("option[nickname]="+encodeURIComponent(config.private.nickname));

		option_name_value_pair_array.push("lat="+config.private.lat);
		fully_qualified_option_name_value_pair_array.push("option[lat]="+config.private.lat);
		
		option_name_value_pair_array.push("lng="+config.private.lng);
		fully_qualified_option_name_value_pair_array.push("option[lng]="+config.private.lng);
	  	
		config.public.application.simple_option_string = option_name_value_pair_array.join('&')+"";
		config.public.application.fully_qualified_option_string = fully_qualified_option_name_value_pair_array.join('&')+"";
		
		var multi_agency_stop_array = new Array();
		for (var agency in config.public.stops) {
			for (var stop_id in config.public.stops[agency]) {
				var all_true = true;
				for (var route_id in config.public.stops[agency][stop_id]) {
					all_true = all_true && config.public.stops[agency][stop_id][route_id];
				}
				if (all_true) {
					multi_agency_stop_array.push("stop["+agency+"]["+stop_id+"]=*");
				} else {
					for (var route_id in config.public.stops[agency][stop_id]) {
						if (config.public.stops[agency][stop_id][route_id]) {
							multi_agency_stop_array.push("stop["+agency+"]["+stop_id+"]="+route_id);
						}
					}
				}
			}
		}
		config.public.multi_agency_stop_string = multi_agency_stop_array.join("&");
		
		
		var expanded = [];
		
		for (var i = 0; i < application.templates.length; i++){ 
			var app_template = application.templates[i].app_url;
			var img_template = application.templates[i].img_url;
			var app_url = app_template.process(config.public);
			var img_url = img_template.process(config.public);
			expanded.push( { "app_url": app_url, "img_url": img_url } );
		} 
		
		config.external_configuration = {"url": expanded[0].app_url, "urls": expanded};

	}
	
}

function trAppLoadApplianceConfig(id,callback) {

	trFirebaseGetConfig(id).then(function(data){
		// console.log(data);
		trApp.current_appliance = data.value;
		if ((typeof callback) == "function") {
			callback();
		}
	}).catch(function(error){
		alert('Error: could not find appliance configuration. '+error);
	});

}

function trAppCloneApplianceConfig(id) {
    
	trFirebaseGetConfig(id).then(function(data){
		// console.log(data);
		trApp.clone_appliance = data.value;
		trAppActivateTab(1);
	}).catch(function(error){
		alert('Error: could not find appliance configuration. '+error);
	});
	/*
    alert('need to rewrite this function!');
    return;
	// query for it

	var query_url = "/"+trApp.dbname+"/"+id;
	$.ajax({
	  url: query_url,
  	async: false,
	  success: function(data) {
				trApp.clone_appliance = data;
				trAppActivateTab(1);
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	  	alert('Error: could not find appliance configuration.');
		},
	  dataType: "json"
	});
	*/
}

function trAppDeleteApplianceConfig(_docId,_rev,force,callback) {
	
	var answer = false;
	if (!force) {
		answer = confirm("Are you sure you want to delete this appliance configuration?");
	}

	if (answer || force) {
		// clear flags for any pending saves
		trApp.save_flags = { private: false, public: false };
		trFirebaseDeleteConfig(_docId).then(callback);
	}
}
