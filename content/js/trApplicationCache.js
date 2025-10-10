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
        "img_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/assets/img/ping.png",
        "app_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/transitBoardByLine/transitBoardByLine.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
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
    "spacer": true
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
        "img_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/assets/img/ping.png",
        "app_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/messagePane/messagePane.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ]
  },
  {
    "hidden": true,
    "templates": [
      {
        "app_url": "http://transitappliance.com/apps/ohsu-parking/ohsu.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitappliance.com/apps/assets/img/ping.png"
      },
      {
        "app_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/ohsu-parking/ohsu.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/assets/img/ping.png"
      }
    ],
    "_rev": "2-d9faf32aee21a582481771ba3c8a3d3b",
    "description": "OHSU Parking",
    "url_template": "http://transitappliance.com/apps/ohsu-parking/ohsu.html?appl[id]=${id}&appl[timezone]=${timezone}&${multi_agency_stop_string}&${application.fully_qualified_option_string}",
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
        "img_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/assets/img/ping.png",
        "app_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/transitBoardHorizontal/transitBoardHorizontal.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}"
      }
    ],
    "fields": [

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
        "app_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/transitBoardVertical/transitBoardVertical.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/assets/img/ping.png"
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
        "app_url": "http://transitappliance.com/apps/streetcar-stop/streetcar-stop.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitappliance.com/apps/assets/img/ping.png"
      },
      {
        "app_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/streetcar-stop/streetcar-stop.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/assets/img/ping.png"
      }
    ],
    "_rev": "8-8119520fcbd77afdf9057ffa768b1c0b",
    "url_template": "http://transitappliance.com/apps/streetcar-stop/streetcar-stop.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
    "description": "Displays a single line at a time, showing arrivals in the next 60 minutes. Cycles through the lines, one line per slide. Great for small displays.",
    "agencies": [
      "Portland Streetcar"
    ],
    "title": "Streetcar Stop",
    "application_id": "streetcar-stop",
    "_id": "streetcar-stop",
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
    "templates": [
      {
        "app_url": "http://dev.transitappliance.com/apps/streetcar-stop/streetcar-stop.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://dev.transitappliance.com/apps/assets/img/ping.png"
      }
    ],
    "_rev": "8-8119520fcbd77afdf9057ffa768b1c0b",
    "url_template": "http://dev.transitappliance.com/apps/streetcar-stop/streetcar-stop.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
    "description": "Displays a single line at a time, showing arrivals in the next 60 minutes. Cycles through the lines, one line per slide. Great for small displays.",
    "agencies": [
      "Portland Streetcar"
    ],
    "title": "Streetcar Stop Development",
    "application_id": "dev-streetcar-stop",
    "_id": "dev-streetcar-stop",
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
    "templates": [
      {
        "app_url": "http://dev.transitappliance.com/apps/streetcarSingle/streetcarSingle.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://dev.transitappliance.com/apps/assets/img/ping.png"
      }
    ],
    "_rev": "8-8119520fcbd77afdf9057ffa768b1c0b",
    "url_template": "http://dev.transitappliance.com/apps/streetcarSingle/streetcarSingle.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
    "description": "Displays a single line at a time, showing arrivals in the next 60 minutes. Cycles through the lines, one line per slide. Great for small displays.",
    "agencies": [
      "Portland Streetcar"
    ],
    "title": "Streetcar Single Development",
    "application_id": "sc-single-dev",
    "_id": "sc-single-dev",
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
    "templates": [
      {
        "app_url": "http://transitappliance.com/apps/streetcarSingle/streetcarSingle.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://transitappliance.com/apps/assets/img/ping.png"
      },
      {
        "app_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/streetcarSingle/streetcarSingle.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
        "img_url": "http://d3e69nqsg1tckh.cloudfront.net/apps/assets/img/ping.png"
      }
    ],
    "_rev": "8-8119520fcbd77afdf9057ffa768b1c0b",
    "url_template": "http://transitappliance.com/apps/streetcarSingle/streetcarSingle.html?${multi_agency_stop_string}&${application.fully_qualified_option_string}&option[message]=+&appl[id]=${id}&appl[timezone]=${timezone}",
    "description": "Displays a single line at a time, showing arrivals in the next 60 minutes. Cycles through the lines, one line per slide. Great for small displays.",
    "agencies": [
      "Portland Streetcar"
    ],
    "title": "Streetcar Single",
    "application_id": "sc-single",
    "_id": "sc-single",
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


