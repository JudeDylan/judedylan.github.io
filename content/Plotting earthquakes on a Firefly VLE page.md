---
layout: post
title: "Plotting earthquakes on a Firefly VLE page"
date: 2014-01-10 11:49:19
type: post
tags:
  - JavaScript
  - VLE
  - Firefly
---

Like many technically minded people, I subscribe to a variety of IT focussed information sources ([RSS Feeds](http://en.wikipedia.org/wiki/RSS), Newsletters etc); one such newsletter being "**Powertip of the day**" from [Powershell.com](http://powershell.com/).

A recent “[Powertip of the day](http://powershell.com/cs/blogs/tips/archive/2013/12/31/getting-most-recent-earthquakes.aspx)” demonstrated how it was possible to query an online earthquake activity data resource, using [PowerShell](http://en.wikipedia.org/wiki/Windows_PowerShell).  In truth, I didn’t have too much success with this particular example _(the data wasn’t up-to-date),_ but crucially, it set me thinking that this could be an excellent resource for a Geography department, especially when using [Firefly](http://fireflysolutions.co.uk/).

> _I love the way the modern web enables, and encourages integration of information from **various** web services and resources – in my opinion, this is one of the more exciting areas of web technology._

I eventually found a more reliable service for supplying earthquake data, namely [earthquake.usgs.gov](http://earthquake.usgs.gov/) – better still, they have an [api](http://en.wikipedia.org/wiki/Application_programming_interface)!  There is also no shortage of examples on how to query the USGS data, so it wasn’t too difficult to beg, borrow and manipulate code, to fit the purpose.

---

## This is what I created

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/c4f87a96-48c9-4fc6-9dea-3227b99e5a8f-min.jpg"/>
{{< /rawhtml >}}

---

## And this is how I did it

It will come as no surprise, that Google Maps is involved!

So firstly, we need to import/link to the Maps API – this is as simple as adding the below script tag.

```HTML
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
```

We then have a small JavaScript function designed to initialize the map and setup some configuration options *(map style, zoom level etc).*  This is also where we connect to the USGS data, by injecting an appropriate script tag into the head.

```JavaScript
var map;

function initialize() {
    var mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

    var script = document.createElement('script');
    script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
    document.getElementsByTagName('head')[0].appendChild(script);
}

```

Arguably, the bulk of the work is then carried out here.  In short, it enumerates through the data, plotting as required onto the Google Map.  There is also a “most recent” list which sits just below the map – this list, is set to only display the most recent 10 events, whilst the map will plot **ALL** events _(in the past 24 hours)._

```JavaScript
window.eqfeed_callback = function (results) {
        var strHtml = '<ul>';
        for (var i = 0; i < results.features.length; i++) {
            var earthquake = results.features[i];
            var coords = earthquake.geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: getCircle(earthquake.properties.mag)
            });

            if (i < 10) {
                strHtml += '<li><a target = "_blank" href=' + earthquake.properties.url + ' title=' + earthquake.properties.place + '>Magnitude: ' + earthquake.properties.mag + 'Md - ' + earthquake.properties.place + ' at ' + formatAMPM(new Date(earthquake.properties.time)) + '</a></li>';
            };
        }
        strHtml += '</ul>';
        $("#earthQuake").html(strHtml);
    }
```

We then add a couple of further functions, primarily designed to “paint” the pretty circles and provide a neater “time” display –  all polished off with a window load event _(which basically fires the “initialize” function above, on page load)._

```JavaScript
function getCircle(magnitude) {
      return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / Math.PI,
          strokeColor: 'white',
          strokeWeight: .5
      };
  }

function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
  }

google.maps.event.addDomListener(window, "load", initialize)
```

Add some styling to the map _(nice drop shadow and rounded corners etc)._

```CSS
#map_canvas {
        max-width: 95%;
        height: 350px;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 7px 7px 5px #888;
  }
```

…and of course the actual html!

```HTML
<h1>Earthquake Map <em>(the past 24 hours)</em></h1>
  <div id="map_canvas"></div>
<h2><u>Most recent events</u></h2>
  <div id="earthQuake"></div>
```

**There you go – earthquakes on a Firefly VLE page – a New Year’s gift for any Geography department!**

---

## Complete code to paste into a Firefly component

```HTML
<style>
    #map_canvas {
        max-width: 95%;
        height: 350px;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 7px 7px 5px #888;
    }
</style>

<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

<script>

    var map;

    function initialize() {
        var mapOptions = {
            zoom: 2,
            center: new google.maps.LatLng(2.8, -187.3),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);

        var script = document.createElement('script');
        script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    window.eqfeed_callback = function (results) {
        var strHtml = '<ul>';
        for (var i = 0; i < results.features.length; i++) {
            var earthquake = results.features[i];
            var coords = earthquake.geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: getCircle(earthquake.properties.mag)
            });

            if (i < 10) {
                strHtml += '<li><a target = "_blank" href=' + earthquake.properties.url + ' title=' + earthquake.properties.place + '>Magnitude: ' + earthquake.properties.mag + 'Md - ' + earthquake.properties.place + ' at ' + formatAMPM(new Date(earthquake.properties.time)) + '</a></li>';
            };
        }
        strHtml += '</ul>';
        $("#earthQuake").html(strHtml);
    }

    function getCircle(magnitude) {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: .2,
            scale: Math.pow(2, magnitude) / Math.PI,
            strokeColor: 'white',
            strokeWeight: .5
        };
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    google.maps.event.addDomListener(window, "load", initialize);
</script>

<h1>Earthquake Map <em>(the past 24 hours)</em></h1>
<div id="map_canvas"></div>
<h2><u>Most recent events</u></h2>
<div id="earthQuake"></div>
```
