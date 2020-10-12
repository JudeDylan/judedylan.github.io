---
layout: post
title: "Tracking devices in UniFi WiFi"
date: 2015-01-02 12:15:14
type: post
tags:
  - JavaScript
  - UniFi
  - SysAdmin
  - DevOps
---

Several years ago, we migrated from a [Cisco](http://www.cisco.com/cisco/web/UK/index.html#x6CjTZEDlwuM6WO1.97) Wi-Fi infrastructure to a [UniFi](http://www.ubnt.com/enterprise/) setup.

UniFi _(from Ubiquiti Networks)_ offer a pretty remarkable WiFi solution, especially when it comes down to cost.  I shan’t go into the in’s and out’s of UniFi, as apart from anything else, I can’t claim to be an expert in the technology.  In many ways, it just works!

> _What’s interesting, is the database supporting the UniFi controller is_ [_MongoDB_](http://www.mongodb.org/) _(a [NoSQL](http://en.wikipedia.org/wiki/NoSQL) database, that can be queried using JavaScript)._

Again, whilst I wouldn’t claim to be a MongoDB expert, I do like the idea of being able to use JavaScript to query data.

---

## Lost iPad

Recently, we had a situation where an iPad had gone missing.  Although it is possible to establish an approximate location of a given device, using UniFi’s controller system, clearly this is only effective whilst the device is connected; the next best option is a singular ‘**last seen**’ log entry.

So in this particular instance, there wasn’t any _real_ ‘tracking’ data available to work with.  However, UniFi _was_ logging connection information, so I concluded that there must be a way of _extracting_ this information from the backend.

The first thing I did was download and install a [GUI](http://en.wikipedia.org/wiki/Graphical_user_interface) based MongoDB management tool called [RoboMongo](http://robomongo.org/) *(ok I could have consoled my way to success, but the GUI just felt a little easier).*

Installing and configuring RoboMogo is really very easy.  In our instance, it was just install and connect to ‘localhost’ using port 27117.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/24606e84-8a7e-4e66-96f3-fc7345f4de47-min.jpg"/>
{{< /rawhtml >}}

## Tracking Script

> _Once RoboMongo was installed, it was then a matter of scripting out an appropriate query._

Using the _‘[beg, borrow and manipulate](https://normansolutions.co.uk/post/plotting-earthquakes-on-a-firefly-vle-page)’_ principle – I ended up with an effective script.

The script takes two parameters – a **device ID** _(which is a wildcard by default)_ and the total number of **hours** that you wish to search back.

It produces a list of results, detailing the device _(or devices_), along with every AP the device(s) has connected to, complete with the time at this location; all going back for as long you declared in hours _(or have enough data to search)._

```JavaScript
// How many hours to summarize
var hours = 1400;
// User to summarize
var user = "Ipad";
var users = db.user.find({
    "hostname": new RegExp(user)
});

for (var j = 0; j < users.length(); j++) {
    var user = users[j];
    var sessions = db.session.find({
        "mac": user.mac,
        disassoc_time: {
            $gt: new Date().getTime() / 1000 - hours * 3600
        }

    }).sort({
        disassoc_time: -1
    });


    for (var k = 0; k < sessions.length(); k++) {
        var session = sessions[k];
        var hostname = user.hostname + " ";
        var aps = db.device.find({
            "mac": session.ap_mac
        });
        for (var a = 0; a < aps.length(); a++) {
            var ap = aps[a];
        }
        print("AP: " + ap.name + " | DateTime: " + new Date(session.disassoc_time * 1000) + " | " + "Username: " + hostname.substr(0, 29));
    }
}

```

---

## Result

In our particular instance, the results were astonishing; we could trace a complete history of the device’s journey _(even though it was no longer turned on)._

I am also very happy to report that the device in question, was found safe and well.
