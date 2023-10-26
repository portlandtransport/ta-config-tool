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

// startup and page load activities, like setting up Google Maps with the correct api key

// some pseudo-constants

trApp.unselected_stop_icon_url = "images/bus.png";
trApp.selected_stop_icon_url = "images/bus_outline.png";
trApp.unselected_stop_icon = undefined; // define after gmaps loaded
trApp.selected_stop_icon = undefined; // define after gmaps loaded

trApp.applications = new trApplicationCache(function(){return true});


function trAppClearState() {
	trApp.current_appliance = {}; // global for state of current appliance
	trApp.save_flags = { private: false, public: false }; // initialize save flags
	trApp.markers_by_location = {};
	trApp.infowindows_cache = {};
	$('#fold2').html('');
	$('#fold3').html('');
	$('#fold4').html('');
	$('#fold5').html('');
	$('#fold6').html('');
}

function trAppInitialize() {
	
	// intialize global state
	
	trAppClearState();
	
	trApp.stop_cache = new trAppStopCache;
	
	// start save loop timer
	
	setTimeout(function(){
	  // do saves here
	  if (trApp.save_flags.private) {
	  	trAppStoreConfiguration();
	  	trApp.save_flags.private = false;
	  }
	  if (trApp.save_flags.public) {
	 		trAppStoreConfiguration();
	  	trApp.save_flags.public = false;
	  	//$('#debug_area').html('<div><pre>'+dump(trApp.current_appliance['public'])+'</pre></div>');
	  }
	  setTimeout(arguments.callee, 2000);
	}, 2000);

	// All our jQuery UI handler stuff
	
	// Accordion
	$("#accordion").accordion({ header: "h3", autoHeight: false });
	
	$("#accordion").bind('accordionchange', function(event, ui) {
		var new_tab = ui.newHeader.attr('id');
		var old_tab = ui.oldHeader.attr('id');
		trAppController(old_tab,new_tab);
	});
	
	// Tabs
	$('#tabs').tabs();
	
	// Buttons
	$( "button, input:submit, a", ".demo" ).button();	
	
	// Dialog			
	$('#dialog').dialog({
		autoOpen: false,
		width: 600,
		buttons: {
			"Ok": function() { 
				$(this).dialog("close"); 
			}, 
			"Cancel": function() { 
				$(this).dialog("close"); 
			} 
		}
	});
	
	// Dialog Link
	$('#dialog_link').click(function(){
		$('#dialog').dialog('open');
		return false;
	});
	
	// Datepicker
	$('#datepicker').datepicker({
		inline: true
	});
	
	// Slider
	$('#slider').slider({
		range: true,
		values: [17, 67]
	});
	
	// Progressbar
	$("#progressbar").progressbar({
		value: 20 
	});
	
	//hover states on the static widgets
	$('#dialog_link, ul#icons li').hover(
		function() { $(this).addClass('ui-state-hover'); }, 
		function() { $(this).removeClass('ui-state-hover'); }
	);
}

// get things started


//async function trAppLoadMaps() {
	
	// load google maps
	
	/*
  var element = document.createElement('script');
  element.src = '//maps.google.com/maps/api/js?key=AIzaSyBK_0AJsSRvsSZ92CO53F8IgOzVXUB1SEQ&callback=trAppMapsLoaded';
  element.type = 'text/javascript';
  var scripts = document.getElementsByTagName('script')[0];
  scripts.parentNode.insertBefore(element, scripts);
  

  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyBK_0AJsSRvsSZ92CO53F8IgOzVXUB1SEQ",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });
  */

//}

async function trAppLoadMaps() {
	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
	const { GeoCoder } = await google.maps.importLibrary("geocoding");
	//trApp.unselected_stop_icon = new google.maps.MarkerImage(trApp.unselected_stop_icon_url);
	//trApp.selected_stop_icon = new google.maps.MarkerImage(trApp.selected_stop_icon_url);
	trAppInitialize();
	trAppDisplayMyAppliances();
	trAppActivateTab(0);
}




