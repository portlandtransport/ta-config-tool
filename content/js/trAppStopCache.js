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

function trAppStopCache() {
	
	// ensure this is called as constructor
	
	if (!(this instanceof trAppStopCache)) {
		return new trAppStopCache();
	}
	
	// make this a singleton
	
	if (typeof trAppStopCache.instance === "object") {
		return trAppStopCache.instance;
	}
	
	trAppStopCache.instance = this;
	
	this.cache = {}; // our cache element
	
	this.addToCache = function(agency,stop_id,data) {
		if (this.cache[agency] == undefined) {
			this.cache[agency] = {};
		}
		this.cache[agency][stop_id] = data;
	}
	
	this.getCacheItem = function(agency,stop_id,callback) {
		
		var is_development = false;
		var stops_db = "transit_stops_production";
		if (location.href.match(/development/)) {
			var stops_db = "transit_stops_loading";
			is_development = true;
		}
		
		// get the stop info

		var service_url = "https://stops6.transitappliance.com/stop/"+agency+":"+stop_id;
		
		/*
		var alternate_url = "http://stops2.transitappliance.com/stop/"+agency+":"+stop_id;

		if (Math.random() > 0.5) {
			service_url = alternate_url;
		}
		*/

		//trArrLog("Loading info for "+stop.agency+" stop "+stop.stop_id+"<br>");
		jQuery.ajax({
	    type: "GET",
			url: service_url,
			timeout: 2000,
			dataType: "json",
			success: function(data) {
				if (typeof data !== "undefined") {
					//debug_alert(data.rows[0].value);
					trAppStopCache.instance.addToCache(data.agency,data.stop_id,data);
					//trArrLog("success<br>");
					callback();
				} else {
					//trAppStopCache().cache[agency][stop_id] = false;
					//trArrLog("<font color='orange'>"+stop.agency+" stop "+stop.stop_id+" is not defined - no arrivals will be reported for this stop.</font><br>");
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				//trArrLog("<font color='red'>error "+dump(jqXHR.status)+"</font><br>");
			}				
		});
	}
	
	this.stopData = function(agency,stop_id) {
		if (this.cache[agency]) {
			if (this.cache[agency][stop_id]) {
				return this.cache[agency][stop_id];
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}
	

}


