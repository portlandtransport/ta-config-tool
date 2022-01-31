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


function trAppLoadMaps() {
	
	// load google maps
	
  var element = document.createElement('script');
  element.src = '//maps.google.com/maps/api/js?key=AIzaSyBK_0AJsSRvsSZ92CO53F8IgOzVXUB1SEQ&callback=trAppMapsLoaded';
  element.type = 'text/javascript';
  var scripts = document.getElementsByTagName('script')[0];
  scripts.parentNode.insertBefore(element, scripts);

}

function trAppMapsLoaded() {

	trApp.unselected_stop_icon = new google.maps.MarkerImage(trApp.unselected_stop_icon_url);
	trApp.selected_stop_icon = new google.maps.MarkerImage(trApp.selected_stop_icon_url);
	trAppInitialize();
	trAppDisplayMyAppliances();
	trAppActivateTab(0);
}

