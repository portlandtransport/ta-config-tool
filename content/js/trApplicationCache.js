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

function trApplicationCache(callback) {
	
	// ensure this is called as constructor
	
	if (!(this instanceof trApplicationCache)) {
		return new trApplicationCache(callback);
	}
	
	// make this a singleton
	
	if (typeof trApplicationCache.instance === "object") {
		// run callback
		callback();
		return trApplicationCache.instance;
	}
	
	trApplicationCache.instance = this;
	
	this.cache = {}; // our cache element
	
	// load all applications
	$.ajax({
	  url: "https://repository6.transitappliance.com/applications",
	  dataType: "json",
	  success: function(data) {
	  	jQuery.each(data,function(index,application) {
	  		delete application._id;
	  		delete application._rev;
	  		trApplicationCache.instance.cache[application.application_id] = application;
	  	});
	  	if (callback != undefined) {
	  		callback();
	  	}
	  }
	});
		
	this.applicationData = function(application_id) {
		if (this.cache[application_id]) {
			return this.cache[application_id];
		} else {
			return undefined;
		}
	}
	
	this.applicationIds = function() {
		var ids = new Array;
		for (var id in this.cache) {
			ids.push(id);
		}
		return ids;
	}

}


