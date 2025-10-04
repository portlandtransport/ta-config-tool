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

var trStoredApplications = [
  {
    "hidden": true,
    "_rev": "2-ff9be6fef49432ae18b521423a353a3f",
    "description": "Display routes to popular destinations",
    "url_template": "http://transitboard.com/hotel/tbdhotel.min.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "agencies": [
      "TriMet"
    ],
    "title": "Transit Board(tm) Hotel",
    "application_id": "com.transitboard.hotel",
    "secondary": true,
    "_id": "com.transitboard.hotel",
    "fields": [
      {
        "advice": "",
        "label": "Human-readable location of the appliance",
        "html": "\u003Cinput type=\"text\" width=\"80\" id=\"originName\" name=\"originName\" /\u003E"
      },
      {
        "advice": "Drag the marker to the exact location of your appliance",
        "label": "Exact appliance location",
        "html": "\n      \u003Cscript type=\"text/javascript\"\u003E\n// this won't be executed until the element has been built because the\n// script won't be added to the page\n$(document).ready( function () {\n    var latlon = {\n\tlat: trApp.current_appliance.private.lat,\n\tlon: trApp.current_appliance.private.lng\n    };\n\n    // check for a pre-set value\n    $.each(trApp.current_appliance.public.application.options,\n\t   function (ind, opt) {\n\t       if (opt.name == 'origin') {\n\t\t   var lll = opt.value.split(',');\n\t\t   latlon = {lat: lll[0], lon: lll[1]};\n\t\t   return false;\n\t       }\n\t   });\n\n    var pos = new google.maps.LatLng(latlon.lat, latlon.lon);\n    $('#origin').val(pos.lat() + ',' + pos.lng());\n\n    var map = new google.maps.Map(\n\tjQuery('#tbdhmap').get(0),\n\t{\n\t    zoom: 15,\n\t    center: pos,\n\t    mapTypeId: google.maps.MapTypeId.ROADMAP\n\t});\n\n    var marker = new google.maps.Marker({\n\tposition: pos,\n\tmap: map,\n\ttitle: 'Appliance Location',\n\tdraggable: true\n    });\n\n    google.maps.event.addListener(marker, 'dragend', function () {\n\tvar pos = marker.getPosition();\n\t$('#origin').val(pos.lat() + ',' + pos.lng());\n    });\n});\n      \u003C/script\u003E\n      \u003Cdiv id=\"tbdhmap\" style=\"width: 600px; height: 400px\"\u003E\u003C/div\u003E\n      \u003Cinput type=\"hidden\" name=\"origin\" id=\"origin\" /\u003E\n"
      },
      {
        "advice": "The destination IDs for this appliance",
        "label": "Destinations",
        "html": "\n  \u003C!-- jsbin.com/amojef/59 --\u003E\n  \u003Cdiv id=\"tbdhselectdests\"\u003E\n    Show destinations within \u003Cspan class=\"tbdhmiles\" style=\"color: red\"\u003E\u003C/span\u003E miles:\n    \u003Cdiv class=\"tbdhslider\"\u003E\u003C/div\u003E\n    Drag destinations from the left list to the right list to add them to your configuration!\n    \u003Ctable width=\"100%\" cols=\"2\" style=\"cellborder: 0px\"\u003E\n      \u003Ctr\u003E\n        \u003Ctd width=\"50%\"\u003E\n          \u003Cul class=\"tbdhdestslist\"\u003E\u003C/ul\u003E\n        \u003C/td\u003E\n        \u003Ctd width=\"50%\" class=\"tbdhdestsdrop\"\u003E\n          \u003Cul\u003E\u003C/ul\u003E\n        \u003C/td\u003E\n      \u003C/tr\u003E\n    \u003C/table\u003E\n    \u003Cinput type=\"hidden\" name=\"destinations\" class=\"tbdhdestinationinp\" /\u003E\n  \u003C/div\u003E\n\u003Cscript\u003E\n$(document).ready(function () {\n  var lat=trApp.current_appliance.private.lat;\n  var lon=trApp.current_appliance.private.lng;\n  \n  var div = $('#tbdhselectdests');\n  \n  // update the value in the input box\n  var updateValue = function () {\n    var dests = [];\n      \n    div.find('td.tbdhdestsdrop ul li span.tbdhdestid').each(function () {\n        dests.push($(this).text());\n      });\n    \n    div.find('input.tbdhdestinationinp').val(dests.join(','));\n  };\n  \n  // prepopulate the selected list\n    var dests = [];\n    $.each(trApp.current_appliance.public.application.options, function (ind, opt) {\n\tif (opt.name == 'destinations') {\n\t    dests = opt.value.split(',');\n\t    return false;\n\t}\n    });\n\n      if (dests.length \u003E 0) {\n\t  var keys = JSON.stringify(dests);\n\n\t  $.ajax({\n\t      url: 'http://transitappliance.couchone.com/destinations/_all_docs',\n\t      data: {\n\t\t  keys: keys,\n\t\t  include_docs: true\n\t      },\n\t      dataType: 'jsonp',\n\t      success: function (data) {\n\t\t  $.each(data.rows, function (ind, row) {\n\t\t      // fair enough, it's not very DRY\n\t\t      var li = $('\u003Cli\u003E\u003Cspan class=\"tbdhdestid\" style=\"display: none\"\u003E' + row.doc._id +\n\t\t\t\t '\u003C/span\u003E\u003Cspan class=\"tbdhdestname\"\u003E' + row.doc.properties.name + \n\t\t\t\t '\u003C/span\u003E\u003Ca href=\"#\" title=\"remove destination \"' + row.doc.properties.name + \n\t\t\t\t '\"\u003E(remove)\u003C/a\u003E\u003C/li\u003E');\n\t\t      \n\t\t      li.find('a').click(function (e) {\n\t\t\t  e.preventDefault();\n\t\t\t  $(this).parent('li').remove();\n\t\t\t  updateValue();\n\t\t      });\n\t\t      \n\t\t      div.find('td.tbdhdestsdrop ul').append(li);\n\t\t      \n\t\t      // just to make sure\n\t\t      updateValue();\n\t\t  });\n\t      }\n\t  });\n      } \n        \n  \n  div.find('td.tbdhdestsdrop').droppable({\n    drop: function (e, ui) {\n      // check it isn't already dropped.\n      var dests = [];\n      \n      $(this).find('ul li span.tbdhdestid').each(function () {\n        dests.push($(this).text());\n      });\n      \n      if (jQuery.inArray(ui.draggable.find('span.tbdhdestid').text(), dests) == -1) {\n        // add the outer tags back; for some reason $(...).append(ui.draggable) didn't work. This\n        // creates a copy.\n        var li = $('\u003Cli\u003E' + ui.draggable.html() + \n                                  '\u003Ca href=\"#\" title=\"remove destination '+ \n                                  ui.draggable.find('span.tbdhdestname') + '\"\u003E(remove)\u003C/a\u003E' +\n                                 '\u003C/li\u003E');\n    \n        // remove the li if the remove button is clicked\n        li.find('a').click(function (e) {\n            e.preventDefault();\n            $(this).parent('li').remove();\n            updateValue();\n        });\n        \n        // this is a jQuery element for the droppable\n        $(this).find('ul').append(li);\n        \n        // finally update the form element value\n        updateValue();\n      }\n    }\n  });                                     \n  \n  // use sortable so that they snap back if they don't make it to the droppable, and if they\n  // do they don't leave a hole\n  div.find('ul.tbdhdestslist').sortable().disableSelection();\n  \n  var slider = div.find('.tbdhslider').slider({\n    min: 1,\n    max: 40,\n    value: 10 \n  }).bind('slide', function (e, slide) {\n      div.find('span.tbdhmiles').text(slide.value);\n  }).bind('slidechange', function (e, slide) {\n    $.ajax({\n      url: 'http://transitappliance.couchone.com/destinations/_design/geo/_spatiallist/radius/full',\n      data: {\n        // w,s,e,n\n        // 1.5 deg should be enough\n        bbox: [(lon - 0.75), (lat - 0.75), (lon + 0.75), (lat + 0.75)].join(','),\n        radius: slide.value * 1609\n      },\n      dataType: 'jsonp',\n      success: function (data) {\n        if (data.features.length === 0)\n          div.find('ul.tbdhdestslist').html('No destinations within given radius.');\n        else\n          div.find('ul.tbdhdestslist').html('');\n        \n        $.each(data.features, function (ind, feat) {\n          div.find('ul.tbdhdestslist').append('\u003Cli\u003E\u003Cspan style=\"display: none\" class=\"tbdhdestid\"\u003E' +\n                                              feat.properties._id + '\u003C/span\u003E\u003Cspan class=\"tbdhdestname\"\u003E' + \n                                              // it gets converted to a feature twice, once when uploaded and once when downloaded\n                                              feat.properties.properties.name + '\u003C/span\u003E\u003C/li\u003E');\n        });\n      }\n    });    \n  });\n  \n  // init; the hash is to trick it into thinking that we're calling it from within jQuery.\n  slider.trigger('slide', {value: slider.slider('value')});\n  slider.trigger('slidechange', {value: slider.slider('value')});\n});\n\u003C/script\u003E\n"
      },
      {
        "advice": "The URL of a custom stylesheet for this appliance",
        "label": "Custom stylesheet",
        "html": "\u003Cinput type=\"text\" width=\"80\" name=\"stylesheet\" /\u003E"
      },
      {
        "advice": "The timeout for the destination slide shows",
        "label": "imageTimeout",
        "html": "\u003Cinput type=\"text\" width=\"5\" name=\"imageTimeout\" /\u003E"
      },
      {
        "advice": "The CloudMade Style ID for the preferred basemap",
        "label": "CloudMade Style ID",
        "html": "\u003Cinput type=\"text\" width=\"80\" name=\"cloudmadeStyle\" /\u003E"
      },
      {
        "advice": "An alternate tile URL for the basemap",
        "label": "Alternate Tile URL",
        "html": "\u003Cinput type=\"text\" width=\"120\" name=\"tileUrl\" /\u003E"
      },
      {
        "advice": "The attribution for the custom tile layer. Only honored if a custom tile URL is specified",
        "label": "Basemap attribution",
        "html": "\u003Cinput type=\"text\" width=\"80\" name=\"tileAttr\" /\u003E"
      },
      {
        "advice": "The maximum zoom level for the basemap. Default 16.",
        "label": "Maximum Zoom Level",
        "html": "\u003Cinput type=\"text\" width=\"80\" name=\"maxZoom\" /\u003E"
      }
    ]
  },
  {
    "_rev": "2-d2497c0861c33f36723140e36abc04f5",
    "description": "Message Pane",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Message Pane",
    "application_id": "msgpane",
    "_id": "msgpane",
    "fields": [
      {
        "advice": "A full HTML page - populate this OR Image URL, not both.",
        "label": "Content URL",
        "html": "\u003Cinput name='content_url'\u003E"
      },
      {
        "advice": "URL of image file to display - populate this OR Content URL, not both.",
        "label": "Image URL",
        "html": "\u003Cinput name='image_url'\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ],
    "url_template": "http://transitappliance.com/apps/messagePane/messagePane.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "templates": [
      {
        "img_url": "http://transitappliance.com/apps/assets/img/ping.png",
        "app_url": "http://transitappliance.com/apps/messagePane/messagePane.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      },
      {
        "img_url": "http://alt1.transitboard.com.s3-website-us-east-1.amazonaws.com/apps/assets/img/ping.png",
        "app_url": "http://alt1.transitboard.com.s3-website-us-east-1.amazonaws.com/apps/messagePane/messagePane.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ]
  },
  {
    "templates": [
      {
        "app_url": "http://transitboard.com/apps/ohsu-parking/ohsu.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitboard.com/apps/assets/img/ping.png"
      },
      {
        "app_url": "http://alt1.transitboard.com/apps/ohsu-parking/ohsu.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://alt1.transitboard.com/apps/assets/img/ping.png"
      }
    ],
    "_rev": "2-d9faf32aee21a582481771ba3c8a3d3b",
    "description": "OHSU Parking",
    "url_template": "http://transitboard.com/apps/ohsu-parking/ohsu.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "OHSU Parking",
    "application_id": "ohsuparking",
    "_id": "ohsuparking",
    "fields": [
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ]
  },
  {
    "_rev": "5-a19ff1f52b2fd6b6a294bd5f5506e8d0",
    "description": "Displays arrivals grouped by transit line, with additional info on the right",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Transit Board™ Horizontal Split",
    "application_id": "tbdhorizontal",
    "_id": "tbdhorizontal",
    "url_template": "http://transitappliance.com/apps/transitBoardHorizontal/transitBoardHorizontal.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "templates": [
      {
        "app_url": "http://transitappliance.com/apps/transitBoardHorizontal/transitBoardHorizontal.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitappliance.com/apps/assets/img/ping.png"
      },
      {
        "img_url": "http://alt1.transitboard.com.s3-website-us-east-1.amazonaws.com/apps/assets/img/ping.png",
        "app_url": "http://alt1.transitboard.com.s3-website-us-east-1.amazonaws.com/apps/transitBoardHorizontal/transitBoardHorizontal.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ],
    "fields": [
      {
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E",
        "label": "Banner Title",
        "advice": "Will appear at top of display after the words: Transit Board for"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E",
        "label": "Font size:"
      },
      {
        "label": "Trip block size:",
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "label": "Logo:",
        "html": "\u003Cinput type='text' name='logo' value='' size='45'\u003E",
        "advice": "URL path to optional logo to display"
      },
      {
        "advice": "URL path to optional custom stylesheet",
        "label": "Stylesheet:",
        "html": "\u003Cinput type='text' name='stylesheet' value='' size='45'\u003E"
      },
      {
        "advice": "Show this many of the nearest Car2Go vehicles",
        "label": "Car2Go vehicles:",
        "html": "\u003Cinput type='text' name='car2go' value='0' size='5'\u003E"
      },
      {
        "advice": "Number of columns to arrange arrivals in",
        "html": "\u003Cinput type='text' name='columns' value='2' size='5'\u003E",
        "label": "Columns:"
      },
      {
        "label": "Suppress scrolling:",
        "html": "\u003Cinput type='checkbox' name='suppress_scrolling' value='1'\u003E",
        "advice": "Disable display from scrolling beyond set of arrivals on initial screen"
      },
      {
        "html": "\u003Cinput type='text' name='num_pages' value='1' size='5'\u003E",
        "advice": "Number of pages to rotate through",
        "label": "Number of Pages:"
      },
      {
        "label": "Page Delay:",
        "html": "\u003Cinput type='text' name='page_delay' value='15' size='5'\u003E",
        "advice": "Seconds of delay between pages"
      },
      {
        "html": "\u003Cinput type='checkbox' name='suppress_downtown_only' value='1'\u003E",
        "label": "Suppress \"Downtown Only\" arrivals:",
        "advice": "Suppress display of arrivals that include the string \"Downtown Only\""
      },
      {
        "html": "\u003Cinput type='checkbox' name='reset_config' value='1'\u003E",
        "label": "Reset:",
        "advice": "Will cause the display to reload its configuration at the next status update interval"
      },
      {
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E",
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this."
      },
      {
        "html": "\u003Cinput type='text' class='splitpct' id='splitpct' name='splitpct' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.splitpct').SpinButton({min:2,max:100,step: 1 });});\u003C/script\u003E",
        "advice": "Horizontal portion of screen devoted to transit display (100 means no other info)",
        "label": "Screen Split:"
      },
      {
        "label": "Supplemental Info URL:",
        "html": "\u003Cinput type='text' name='suppl_url' value='' size='45'\u003E",
        "advice": "URL path to html page to be shown on right hand side of display"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      },
      {
        "advice": "Put supplemental content on left",
        "html": "\u003Cinput type='checkbox' name='supplemental_left' value='1'\u003E",
        "label": "Supplemental split on left side"
      }
    ]
  },
  {
    "_rev": "2-882cf8587e8f3560aa295a1ace073dda",
    "description": "Displays arrivals grouped by transit line, with additional info on the right",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Transit Board™ Horizontal Split (development version)",
    "application_id": "tbdhorizontal_dev",
    "_id": "tbdhorizontal_dev",
    "templates": [
      {
        "img_url": "http://dev.transitappliance.com/apps/assets/img/ping.png",
        "app_url": "http://dev.transitappliance.com/apps/transitBoardHorizontal/transitBoardHorizontal.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ],
    "url_template": "http://dev.transitappliance.com/apps/transitBoardHorizontal/transitBoardHorizontal.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "fields": [
      {
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E",
        "advice": "Will appear at top of display after the words: Transit Board for"
      },
      {
        "label": "Font size:",
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E",
        "label": "Trip block size:"
      },
      {
        "label": "Logo:",
        "advice": "URL path to optional logo to display",
        "html": "\u003Cinput type='text' name='logo' value='' size='45'\u003E"
      },
      {
        "advice": "URL path to optional custom stylesheet",
        "label": "Stylesheet:",
        "html": "\u003Cinput type='text' name='stylesheet' value='' size='45'\u003E"
      },
      {
        "advice": "Show this many of the nearest Car2Go vehicles",
        "html": "\u003Cinput type='text' name='car2go' value='0' size='5'\u003E",
        "label": "Car2Go vehicles:"
      },
      {
        "advice": "Number of columns to arrange arrivals in",
        "html": "\u003Cinput type='text' name='columns' value='2' size='5'\u003E",
        "label": "Columns:"
      },
      {
        "advice": "Disable display from scrolling beyond set of arrivals on initial screen",
        "label": "Suppress scrolling:",
        "html": "\u003Cinput type='checkbox' name='suppress_scrolling' value='1'\u003E"
      },
      {
        "html": "\u003Cinput type='text' name='num_pages' value='1' size='5'\u003E",
        "advice": "Number of pages to rotate through",
        "label": "Number of Pages:"
      },
      {
        "advice": "Suppress display of arrivals that include the string \"Downtown Only\"",
        "html": "\u003Cinput type='checkbox' name='suppress_downtown_only' value='1'\u003E",
        "label": "Suppress \"Downtown Only\" arrivals:"
      },
      {
        "label": "Reset:",
        "advice": "Will cause the display to reload its configuration at the next status update interval",
        "html": "\u003Cinput type='checkbox' name='reset_config' value='1'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E",
        "label": "Screen Margins:"
      },
      {
        "html": "\u003Cinput type='text' class='splitpct' id='splitpct' name='splitpct' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.splitpct').SpinButton({min:2,max:100,step: 1 });});\u003C/script\u003E",
        "label": "Screen Split:",
        "advice": "Horizontal portion of screen devoted to transit display (100 means no other info)"
      },
      {
        "label": "Supplemental Info URL:",
        "advice": "URL path to html page to be shown on right hand side of display",
        "html": "\u003Cinput type='text' name='suppl_url' value='' size='45'\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      },
      {
        "advice": "Put supplemental content on left",
        "html": "\u003Cinput type='checkbox' name='supplemental_left' value='1'\u003E",
        "label": "Supplemental split on left side"
      }
    ]
  },
  {
    "templates": [
      {
        "app_url": "http://alt1.transitboard.com/apps/transitBoardHorizontalSecure/transitBoardHorizontal.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://alt1.transitboard.com/apps/assets/img/ping.png"
      }
    ],
    "_rev": "4-7d9275cb74c072f9549af7de4ca6f278",
    "description": "Displays arrivals grouped by transit line, with additional info on the right",
    "url_template": "http://alt1.transitboard.com/apps/transitBoardHorizontalSecure/transitBoardHorizontal.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Transit Board™ Horizontal Split Secure",
    "application_id": "tbdhorizontals",
    "_id": "tbdhorizontals",
    "fields": [
      {
        "advice": "Will appear at top of display after the words: Transit Board for",
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Trip block size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "URL path to optional logo to display",
        "label": "Logo:",
        "html": "\u003Cinput type='text' name='logo' value='' size='45'\u003E"
      },
      {
        "advice": "URL path to optional custom stylesheet",
        "label": "Stylesheet:",
        "html": "\u003Cinput type='text' name='stylesheet' value='' size='45'\u003E"
      },
      {
        "advice": "Show this many of the nearest Car2Go vehicles",
        "label": "Car2Go vehicles:",
        "html": "\u003Cinput type='text' name='car2go' value='0' size='5'\u003E"
      },
      {
        "advice": "Number of columns to arrange arrivals in",
        "label": "Columns:",
        "html": "\u003Cinput type='text' name='columns' value='2' size='5'\u003E"
      },
      {
        "advice": "Disable display from scrolling beyond set of arrivals on initial screen",
        "label": "Suppress scrolling:",
        "html": "\u003Cinput type='checkbox' name='suppress_scrolling' value='1'\u003E"
      },
      {
        "advice": "Number of pages to rotate through",
        "label": "Number of Pages:",
        "html": "\u003Cinput type='text' name='num_pages' value='1' size='5'\u003E"
      },
      {
        "advice": "Seconds of delay between pages",
        "label": "Page Delay:",
        "html": "\u003Cinput type='text' name='page_delay' value='15' size='5'\u003E"
      },
      {
        "advice": "Suppress display of arrivals that include the string \"Downtown Only\"",
        "label": "Suppress \"Downtown Only\" arrivals:",
        "html": "\u003Cinput type='checkbox' name='suppress_downtown_only' value='1'\u003E"
      },
      {
        "advice": "Will cause the display to reload its configuration at the next status update interval",
        "label": "Reset:",
        "html": "\u003Cinput type='checkbox' name='reset_config' value='1'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Horizontal portion of screen devoted to transit display (100 means no other info)",
        "label": "Screen Split:",
        "html": "\u003Cinput type='text' class='splitpct' id='splitpct' name='splitpct' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.splitpct').SpinButton({min:2,max:100,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "URL path to html page to be shown on right hand side of display",
        "label": "Supplemental Info URL:",
        "html": "\u003Cinput type='text' name='suppl_url' value='' size='45'\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ]
  },
  {
    "_rev": "17-305d5e63828a4baa272ea739cf3c39ef",
    "description": "Displays arrivals grouped by transit line",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Transit Board™ by Line",
    "application_id": "tbdline",
    "_id": "tbdline",
    "url_template": "http://transitappliance.com/apps/transitBoardByLine/transitBoardByLine.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "templates": [
      {
        "app_url": "http://transitappliance.com/apps/transitBoardByLine/transitBoardByLine.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitappliance.com/apps/assets/img/ping.png"
      },
      {
        "img_url": "http://alt1.transitboard.com.s3-website-us-east-1.amazonaws.com/apps/assets/img/ping.png",
        "app_url": "http://alt1.transitboard.com.s3-website-us-east-1.amazonaws.com/apps/transitBoardByLine/transitBoardByLine.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ],
    "fields": [
      {
        "label": "Banner Title",
        "advice": "Will appear at top of display after the words: Transit Board for",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "label": "Trip block size:",
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "html": "\u003Cinput type='text' name='logo' value='' size='45'\u003E",
        "advice": "URL path to optional logo to display",
        "label": "Logo:"
      },
      {
        "html": "\u003Cinput type='text' name='stylesheet' value='' size='45'\u003E",
        "label": "Stylesheet:",
        "advice": "URL path to optional custom stylesheet"
      },
      {
        "html": "\u003Cinput type='radio' name='show_weather' value='0' checked='checked'\u003E None \u003Cinput type='radio' name='show_weather' value='top'\u003E Top \u003Cinput type='radio' name='show_weather' value='bottom'\u003E Bottom",
        "label": "Include weather:",
        "advice": "Also requires setting up API key separately"
      },
      {
        "html": "\u003Cinput type='text' name='car2go' value='0' size='5'\u003E",
        "advice": "Show this many of the nearest Car2Go vehicles",
        "label": "Car2Go vehicles:"
      },
      {
        "advice": "Show this many of the nearest bikeshare locations",
        "html": "\u003Cinput type='text' name='gbfs' value='0' size='5'\u003E",
        "label": "Bikeshare locations:"
      },
      {
        "advice": "Number of columns to arrange arrivals in",
        "html": "\u003Cinput type='text' name='columns' value='2' size='5'\u003E",
        "label": "Columns:"
      },
      {
        "label": "Suppress scrolling:",
        "advice": "Disable display from scrolling beyond set of arrivals on initial screen",
        "html": "\u003Cinput type='checkbox' name='suppress_scrolling' value='1'\u003E"
      },
      {
        "label": "Suppress \"Downtown Only\" arrivals:",
        "html": "\u003Cinput type='checkbox' name='suppress_downtown_only' value='1'\u003E",
        "advice": "Suppress display of arrivals that include the string \"Downtown Only\""
      },
      {
        "label": "Reset:",
        "advice": "Will cause the display to reload its configuration at the next status update interval",
        "html": "\u003Cinput type='checkbox' name='reset_config' value='1'\u003E"
      },
      {
        "label": "Screen Margins:",
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E",
        "label": "Expert Options"
      },
      {
        "label": "Display agency in arrivals",
        "html": "\u003Cinput type='checkbox' name='add_agency' value='1'\u003E",
        "advice": "Will add agency name to text of displayed transit arrival"
      },
      {
        "advice": "Will remove name of stop from text of arrivals display",
        "html": "\u003Cinput type='checkbox' name='suppress_stop_location' value='1'\u003E",
        "label": "Suppress stop location from arrivals"
      }
    ]
  },
  {
    "_rev": "14-cf2e7b85758cf3449b96c9df875fd727",
    "description": "Displays arrivals grouped by transit line (development version)",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Transit Board™ by Line (development version)",
    "application_id": "tbdline_dev",
    "_id": "tbdline_dev",
    "templates": [
      {
        "img_url": "http://dev.transitappliance.com/apps/assets/img/ping.png",
        "app_url": "http://dev.transitappliance.com/apps/transitBoardByLine/transitBoardByLine.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ],
    "url_template": "http://dev.transitappliance.com/apps/transitBoardByLine/transitBoardByLine.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "fields": [
      {
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E",
        "advice": "Will appear at top of display after the words: Transit Board for"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E",
        "label": "Font size:"
      },
      {
        "label": "Trip block size:",
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "URL path to optional logo to display",
        "label": "Logo:",
        "html": "\u003Cinput type='text' name='logo' value='' size='45'\u003E"
      },
      {
        "advice": "URL path to optional custom stylesheet",
        "html": "\u003Cinput type='text' name='stylesheet' value='' size='45'\u003E",
        "label": "Stylesheet:"
      },
      {
        "label": "Include weather:",
        "html": "\u003Cinput type='radio' name='show_weather' value='0' checked='checked'\u003E None \u003Cinput type='radio' name='show_weather' value='top'\u003E Top \u003Cinput type='radio' name='show_weather' value='bottom'\u003E Bottom",
        "advice": "Also requires setting up API key separately"
      },
      {
        "html": "\u003Cinput type='text' name='car2go' value='0' size='5'\u003E",
        "advice": "Show this many of the nearest Car2Go vehicles",
        "label": "Car2Go vehicles:"
      },
      {
        "label": "Bikeshare locations:",
        "html": "\u003Cinput type='text' name='gbfs' value='0' size='5'\u003E",
        "advice": "Show this many of the nearest bikeshare locations"
      },
      {
        "advice": "Number of columns to arrange arrivals in",
        "html": "\u003Cinput type='text' name='columns' value='2' size='5'\u003E",
        "label": "Columns:"
      },
      {
        "advice": "Disable display from scrolling beyond set of arrivals on initial screen",
        "html": "\u003Cinput type='checkbox' name='suppress_scrolling' value='1'\u003E",
        "label": "Suppress scrolling:"
      },
      {
        "advice": "Suppress display of arrivals that include the string \"Downtown Only\"",
        "label": "Suppress \"Downtown Only\" arrivals:",
        "html": "\u003Cinput type='checkbox' name='suppress_downtown_only' value='1'\u003E"
      },
      {
        "label": "Reset:",
        "advice": "Will cause the display to reload its configuration at the next status update interval",
        "html": "\u003Cinput type='checkbox' name='reset_config' value='1'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E",
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options"
      },
      {
        "advice": "Will add agency name to text of displayed transit arrival",
        "label": "Display agency in arrivals",
        "html": "\u003Cinput type='checkbox' name='add_agency' value='1'\u003E"
      },
      {
        "label": "Suppress stop location from arrivals",
        "html": "\u003Cinput type='checkbox' name='suppress_stop_location' value='1'\u003E",
        "advice": "Will remove name of stop from text of arrivals display"
      }
    ]
  },
  {
    "templates": [
      {
        "app_url": "http://alt1.transitboard.com/apps/transitBoardByLineSecure/transitBoardByLine.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://alt1.transitboard.com/apps/assets/img/ping.png"
      }
    ],
    "_rev": "4-1f75587565e168150ae8eff3db0a4a3a",
    "url_template": "http://alt1.transitboard.com/apps/transitBoardByLineSecure/transitBoardByLine.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "description": "Displays arrivals grouped by transit line secure",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Transit Board™ by Line Secure",
    "application_id": "tbdlines",
    "_id": "tbdlines",
    "fields": [
      {
        "advice": "Will appear at top of display after the words: Transit Board for",
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Trip block size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "URL path to optional logo to display",
        "label": "Logo:",
        "html": "\u003Cinput type='text' name='logo' value='' size='45'\u003E"
      },
      {
        "advice": "URL path to optional custom stylesheet",
        "label": "Stylesheet:",
        "html": "\u003Cinput type='text' name='stylesheet' value='' size='45'\u003E"
      },
      {
        "advice": "Also requires setting up API key separately",
        "label": "Include weather:",
        "html": "\u003Cinput type='radio' name='show_weather' value='0' checked='checked'\u003E None \u003Cinput type='radio' name='show_weather' value='top'\u003E Top \u003Cinput type='radio' name='show_weather' value='bottom'\u003E Bottom"
      },
      {
        "advice": "Show this many of the nearest Car2Go vehicles",
        "label": "Car2Go vehicles:",
        "html": "\u003Cinput type='text' name='car2go' value='0' size='5'\u003E"
      },
      {
        "advice": "Show this many of the nearest bikeshare locations",
        "label": "Bikeshare locations:",
        "html": "\u003Cinput type='text' name='gbfs' value='0' size='5'\u003E"
      },
      {
        "advice": "Number of columns to arrange arrivals in",
        "label": "Columns:",
        "html": "\u003Cinput type='text' name='columns' value='2' size='5'\u003E"
      },
      {
        "advice": "Disable display from scrolling beyond set of arrivals on initial screen",
        "label": "Suppress scrolling:",
        "html": "\u003Cinput type='checkbox' name='suppress_scrolling' value='1'\u003E"
      },
      {
        "advice": "Suppress display of arrivals that include the string \"Downtown Only\"",
        "label": "Suppress \"Downtown Only\" arrivals:",
        "html": "\u003Cinput type='checkbox' name='suppress_downtown_only' value='1'\u003E"
      },
      {
        "advice": "Will cause the display to reload its configuration at the next status update interval",
        "label": "Reset:",
        "html": "\u003Cinput type='checkbox' name='reset_config' value='1'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ]
  },
  {
    "hidden": true,
    "_rev": "8-387b7b4aee1b293b15814947336ad852",
    "url_template": "http://transitboard.com/apps/tbdmsg.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "description": "Experimental, do not use.",
    "agencies": [
      "TriMet",
      "Portland Streetcar",
      "SF-MUNI",
      "AC Transit"
    ],
    "title": "Transit Board™ Message (experimental)",
    "application_id": "tbdmsg",
    "_id": "tbdmsg",
    "fields": [
      {
        "advice": "Will appear at top of display after the words: Transit Board for",
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make ticker scroll a little faster or slower (e.g., 110 = 10% faster)",
        "label": "Scroll speed:",
        "html": "\u003Cinput type='text' class='pct-spin' name='scroll-speed-adjust' value='100' size='5'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ],
    "templates": [
      {
        "img_url": "http://transitboard.com/assets/img/ping.png",
        "app_url": "http://transitboard.com/apps/tbdmsg.html?appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}"
      },
      {
        "img_url": "http://alt1.transitboard.com.s3-website-us-east-1.amazonaws.com/apps/assets/img/ping.png",
        "app_url": "http://alt1.transitboard.com.s3-website-us-east-1.amazonaws.com/apps/tbdmsg.html?appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}"
      }
    ]
  },
  {
    "hidden": true,
    "templates": [
      {
        "app_url": "http://transitboard.com/apps/tbdpersonal.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitboard.com/assets/img/ping.png"
      },
      {
        "app_url": "http://alt1.transitboard.com/apps/tbdpersonal.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://alt1.transitboard.com/apps/assets/img/ping.png"
      }
    ],
    "_rev": "8-8119520fcbd77afdf9057ffa768b1c0b",
    "url_template": "http://transitboard.com/apps/tbdpersonal.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
    "description": "Displays a single line at a time, showing arrivals in the next 60 minutes. Cycles through the lines, one line per slide. Great for small displays.",
    "agencies": [
      "TriMet",
      "Portland Streetcar",
      "SF-MUNI",
      "AC Transit"
    ],
    "title": "Transit Board™ Personal",
    "application_id": "tbdpersonal",
    "_id": "tbdpersonal",
    "fields": [
      {
        "advice": "The number of routes to cycle through, one per page. If there are more than n routes, the next n arrivals will be shown.",
        "label": "Number of Arrivals",
        "html": "\u003Cinput type='text' name='number' size='5' value='5'\u003E"
      },
      {
        "advice": "The delay between changing slides (in seconds).",
        "label": "Delay",
        "html": "\u003Cinput type='text' name='timeout' size='2' value='3'\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ]
  },
  {
    "_rev": "3-20c1257113e02b67c4035906177f1ad5",
    "description": "Portland Streetcar arrivals grouped by transit line (experimental)",
    "agencies": [
      "Portland Streetcar"
    ],
    "title": "Portland Streetcar by Line",
    "application_id": "tbdstreetcar",
    "_id": "tbdstreetcar",
    "fields": [
      {
        "advice": "Will appear at top of display after the words: Transit Board for",
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Trip block size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make ticker scroll a little faster or slower (e.g., 110 = 10% faster)",
        "label": "Scroll speed:",
        "html": "\u003Cinput type='text' class='pct-spin' name='scroll-speed-adjust' value='100' size='5'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ],
    "templates": [
      {
        "img_url": "http://transitappliance.com/apps/assets/img/ping.png",
        "app_url": "http://transitappliance.com/apps/streetcarByLine/streetcarByLine.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      },
      {
        "img_url": "http://alt1.transitboard.com/apps/assets/img/ping.png",
        "app_url": "http://alt1.transitboard.com/apps/streetcarByLine/streetcarByLine.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ],
    "url_template": "http://transitappliance.com/apps/streetcarByLine/streetcarByLine.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}"
  },
  {
    "_rev": "2-f68af5853de5987b72f7d28904400c94",
    "description": "Portland Streetcar arrivals grouped by transit line (development)",
    "agencies": [
      "Portland Streetcar"
    ],
    "title": "Portland Streetcar by Line",
    "application_id": "tbdstreetcar_dev",
    "_id": "tbdstreetcar_dev",
    "fields": [
      {
        "advice": "Will appear at top of display after the words: Transit Board for",
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Trip block size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make ticker scroll a little faster or slower (e.g., 110 = 10% faster)",
        "label": "Scroll speed:",
        "html": "\u003Cinput type='text' class='pct-spin' name='scroll-speed-adjust' value='100' size='5'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ],
    "templates": [
      {
        "img_url": "http://dev.transitappliance.com/apps/assets/img/ping.png",
        "app_url": "http://dev.transitappliance.com/apps/streetcarByLine/streetcarByLine.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ],
    "url_template": "http://dev.transitappliance.com/apps/streetcarByLine/streetcarByLine.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}"
  },
  {
    "_rev": "9-fff5fde848b5dc7a0773abf457807307",
    "description": "Displays arrivals grouped by transit line, with additional info on the right",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Transit Board™ Vertical Split",
    "application_id": "tbdvertical",
    "_id": "tbdvertical",
    "fields": [
      {
        "advice": "Will appear at top of display after the words: Transit Board for",
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Trip block size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "URL path to optional logo to display",
        "label": "Logo:",
        "html": "\u003Cinput type='text' name='logo' value='' size='45'\u003E"
      },
      {
        "advice": "URL path to optional custom stylesheet",
        "label": "Stylesheet:",
        "html": "\u003Cinput type='text' name='stylesheet' value='' size='45'\u003E"
      },
      {
        "advice": "Show this many of the nearest Car2Go vehicles",
        "label": "Car2Go vehicles:",
        "html": "\u003Cinput type='text' name='car2go' value='0' size='5'\u003E"
      },
      {
        "advice": "Number of columns to arrange arrivals in",
        "label": "Columns:",
        "html": "\u003Cinput type='text' name='columns' value='2' size='5'\u003E"
      },
      {
        "advice": "Disable display from scrolling beyond set of arrivals on initial screen",
        "label": "Suppress scrolling:",
        "html": "\u003Cinput type='checkbox' name='suppress_scrolling' value='1'\u003E"
      },
      {
        "advice": "Number of pages to rotate through",
        "label": "Number of Pages:",
        "html": "\u003Cinput type='text' name='num_pages' value='1' size='5'\u003E"
      },
      {
        "advice": "Seconds of delay between pages",
        "label": "Page Delay:",
        "html": "\u003Cinput type='text' name='page_delay' value='15' size='5'\u003E"
      },
      {
        "advice": "Suppress display of arrivals that include the string \"Downtown Only\"",
        "label": "Suppress \"Downtown Only\" arrivals:",
        "html": "\u003Cinput type='checkbox' name='suppress_downtown_only' value='1'\u003E"
      },
      {
        "advice": "Will cause the display to reload its configuration at the next status update interval",
        "label": "Reset:",
        "html": "\u003Cinput type='checkbox' name='reset_config' value='1'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Horizontal portion of screen devoted to transit display (100 means no other info)",
        "label": "Screen Split:",
        "html": "\u003Cinput type='text' class='splitpct' id='splitpct' name='splitpct' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.splitpct').SpinButton({min:2,max:100,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "URL path to html page to be shown on right hand side of display",
        "label": "Supplemental Info URL:",
        "html": "\u003Cinput type='text' name='suppl_url' value='' size='45'\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ],
    "templates": [
      {
        "img_url": "http://transitappliance.com/apps/assets/img/ping.png",
        "app_url": "http://transitappliance.com/apps/transitBoardVertical/transitBoardVertical.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      },
      {
        "app_url": "http://alt1.transitboard.com/apps/transitBoardVertical/transitBoardVertical.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://alt1.transitboard.com/apps/assets/img/ping.png"
      }
    ],
    "url_template": "http://transitappliance.com/apps/transitBoardVertical/transitBoardVertical.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}"
  },
  {
    "_rev": "1-60ff7f6b0f1c422acff6eca51d8f2f07",
    "description": "Displays arrivals grouped by transit line, with additional info on the right",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "Transit Board™ Vertical Split, development version",
    "application_id": "tbdvertical_dev",
    "_id": "tbdvertical_dev",
    "fields": [
      {
        "advice": "Will appear at top of display after the words: Transit Board for",
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make trip block a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Trip block size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='trip-size-adjust' name='trip-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:300,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "URL path to optional logo to display",
        "label": "Logo:",
        "html": "\u003Cinput type='text' name='logo' value='' size='45'\u003E"
      },
      {
        "advice": "URL path to optional custom stylesheet",
        "label": "Stylesheet:",
        "html": "\u003Cinput type='text' name='stylesheet' value='' size='45'\u003E"
      },
      {
        "advice": "Show this many of the nearest Car2Go vehicles",
        "label": "Car2Go vehicles:",
        "html": "\u003Cinput type='text' name='car2go' value='0' size='5'\u003E"
      },
      {
        "advice": "Number of columns to arrange arrivals in",
        "label": "Columns:",
        "html": "\u003Cinput type='text' name='columns' value='2' size='5'\u003E"
      },
      {
        "advice": "Disable display from scrolling beyond set of arrivals on initial screen",
        "label": "Suppress scrolling:",
        "html": "\u003Cinput type='checkbox' name='suppress_scrolling' value='1'\u003E"
      },
      {
        "advice": "Number of pages to rotate through",
        "label": "Number of Pages:",
        "html": "\u003Cinput type='text' name='num_pages' value='1' size='5'\u003E"
      },
      {
        "advice": "Suppress display of arrivals that include the string \"Downtown Only\"",
        "label": "Suppress \"Downtown Only\" arrivals:",
        "html": "\u003Cinput type='checkbox' name='suppress_downtown_only' value='1'\u003E"
      },
      {
        "advice": "Will cause the display to reload its configuration at the next status update interval",
        "label": "Reset:",
        "html": "\u003Cinput type='checkbox' name='reset_config' value='1'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Horizontal portion of screen devoted to transit display (100 means no other info)",
        "label": "Screen Split:",
        "html": "\u003Cinput type='text' class='splitpct' id='splitpct' name='splitpct' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.splitpct').SpinButton({min:2,max:100,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "URL path to html page to be shown on right hand side of display",
        "label": "Supplemental Info URL:",
        "html": "\u003Cinput type='text' name='suppl_url' value='' size='45'\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ],
    "url_template": "http://dev.transitappliance.com/apps/transitBoardVertical/transitBoardVertical.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "templates": [
      {
        "app_url": "http://dev.transitappliance.com/apps/transitBoardVertical/transitBoardVertical.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://dev.transitappliance.com/apps/assets/img/ping.png"
      }
    ]
  },
  {
    "hidden": true,
    "templates": [
      {
        "app_url": "http://transitboard.com/apps/tbdjs.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitboard.com/assets/img/ping.png"
      },
      {
        "app_url": "http://alt1.transitboard.com/apps/tbdjs.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://alt1.transitboard.com/apps/assets/img/ping.png"
      }
    ],
    "_rev": "42-818e121d4aff9abb2d602a53c4c79907",
    "description": "Displays arrivals in a columnar table, chronologically beginning with the earliest arrival. Will split the display into multiple pages and cycle through them if necessary",
    "url_template": "http://transitboard.com/apps/tbdjs.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "agencies": [
      "TriMet",
      "Portland Streetcar",
      "SF-MUNI",
      "AC Transit"
    ],
    "title": "Transit Board™",
    "application_id": "transitboard",
    "_id": "transitboard",
    "fields": [
      {
        "advice": "Will appear at top of display after the words: Transit Board for",
        "label": "Banner Title",
        "html": "\u003Cinput type='text' name='banner' size='30'\u003E"
      },
      {
        "advice": "Make fonts a little bigger or a little smaller - percentage value (e.g., 110 = 10% larger)",
        "label": "Font size:",
        "html": "\u003Cinput type='text' class='pct-spin' id='font-size-adjust' name='font-size-adjust' value='100' size='5'\u003E\u003Cscript\u003E$(document).ready(function() {$('.pct-spin').SpinButton({min:2,max:200,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Make ticker scroll a little faster or slower (e.g., 110 = 10% faster)",
        "label": "Scroll speed:",
        "html": "\u003Cinput type='text' class='pct-spin' name='scroll-speed-adjust' value='100' size='5'\u003E"
      },
      {
        "advice": "Some displays, particularly HDTVs, may display some content outside the visible area.\u003Cbr\u003EThese options allow you to add margins to any edge of the display to adjust for this.",
        "label": "Screen Margins:",
        "html": "\u003Ctable class='transparent_table'\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='top' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='left' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='right' value='0' size='5'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' class='margin-spin' name='bottom' value='0' size='5'\u003E\u003C/td\u003E\u003Ctd\u003E\u003C/td\u003E\u003C/tr\u003E\u003C/table\u003E\u003Cscript\u003E$(document).ready(function() {$('.margin-spin').SpinButton({min:0,max:50,step: 1 });});\u003C/script\u003E"
      },
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ]
  },
  {
    "templates": [
      {
        "app_url": "http://trimet.org/onsite/multi_stop_arrivals.html?locationIDs={eval}var stop_list = new Array;for (var stop_id in stops['TriMet']) {stop_list.push(stop_id)}; return stop_list.join(','){/eval}&${application.simple_option_string}&Route=true",
        "img_url": "http://trimet.org/onsite/images/tm-logo.png"
      }
    ],
    "_rev": "8-e099be0c6ff270878a2532d908a80e3e",
    "url_template": "http://trimet.org/onsite/multi_stop_arrivals.html?locationIDs={eval}var stop_list = new Array;for (var stop_id in stops['TriMet']) {stop_list.push(stop_id)}; return stop_list.join(','){/eval}&${application.simple_option_string}&Route=true",
    "description": "Similar to the displays on the Transit Mall",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "TriMet Javascript Display",
    "application_id": "trimet",
    "form": "\u003Ctr\u003E\u003Ctd\u003EPage Delay:\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' name='pagedelay' value='1'\u003E\u003C/td\u003E\u003C/tr\u003E\u003Ctr\u003E\u003Ctd\u003EScroll Speed:\u003C/td\u003E\u003Ctd\u003E\u003Cinput type='text' name='scrollSpeed' value='7'\u003E\u003C/td\u003E\u003C/tr\u003E",
    "_id": "trimet",
    "fields": [
      {
        "advice": "",
        "label": "Page Delay:",
        "html": "\u003Cinput type='text' name='pagedelay' value='1'\u003E"
      },
      {
        "advice": "",
        "label": "Scroll Speed:",
        "html": "\u003Cinput type='text' name='scrollSpeed' value='7'\u003E"
      }
    ]
  },
  {
    "templates": [
      {
        "app_url": "http://transitboard.com/apps/whitaker-parking/ohsu.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitboard.com/apps/assets/img/ping.png"
      },
      {
        "app_url": "http://alt1.transitboard.com/apps/whitaker-parking/ohsu.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://alt1.transitboard.com/apps/assets/img/ping.png"
      }
    ],
    "_rev": "2-cc8cf8d0dfe2669773af5c9bb85fa912",
    "description": "OHSU Whitaker Parking",
    "url_template": "http://transitboard.com/apps/whitaker-parking/ohsu.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
    "agencies": [
      "TriMet",
      "Portland Streetcar"
    ],
    "title": "OHSU Whitaker Parking",
    "application_id": "whitakerparking",
    "_id": "whitakerparking",
    "fields": [
      {
        "advice": "Leave empty unless you know what this is for!",
        "label": "Expert Options",
        "html": "\u003Ctextarea name='expert' cols='30' rows='3'\u003E\u003C/textarea\u003E"
      }
    ]
  }
];

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

	trStoredApplications .forEach((application) => {
		delete application._id;
		delete application._rev;
		trApplicationCache.instance.cache[application.application_id] = application;
    });

	if (callback != undefined) {
		callback();
	}

	/*
	
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

	*/
		
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


