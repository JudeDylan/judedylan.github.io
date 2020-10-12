---
layout: post
title: "Creating a Firefly VLE online users feature"
date: 2013-12-18 23:44:05
type: post
tags:
  - Website
  - Firefly
  - VLE
  - JavaScript
  - C#
---

At St Mary's Shaftesbury we use [Firefly](http://fireflysolutions.co.uk/) for our [VLE](http://en.wikipedia.org/wiki/Virtual_learning_environment).  I won’t give you a sales pitch on Firefly, but suffice to say, that after a bit of a journey from [Moodle](https://moodle.org/) through [SharePoint](http://en.wikipedia.org/wiki/Microsoft_SharePoint) we have rested at Firefly – quite simply, at this point in time _(history has taught me that things can change!),_ this product, the company and their approach to IT, is nothing short of excellent.  I like Firefly; I like the chaps and chapesses at Firefly!

Apart from having an extremely intelligent approach to the design of their product, they also invite you to “dig” into the system, and do magic things yourself, if you are so inclined – my type of IT product.

Over recent months, we have indeed done a fair bit of customisation, some reasonably advanced and some not so – a lot of this customisation has involved implementing improved integration with our [MIS](http://en.wikipedia.org/wiki/Management_information_system) system _(_[_Schoolbase_](http://www.furlongsolutions.com/products/schoolbase)_) –_ more on that in future blog posts!

One feature that we did have in our previous SharePoint system, which was surprisingly popular, and in many ways greatly missed – was an “**online users**” section.  So this is how I set about building this into Firefly.

---

## Creating the online users module

The main intention was to make this feature as portable as possible, without the need to change any core structural feature of Firefly – as such the only area that did require a slight alteration, was to create a [nonclustered](http://technet.microsoft.com/en-us/library/ms190457.aspx) index on the **Hits** table, based on a descending date field – this was run past the Firefly team, who agreed that it shouldn’t have any negative impact.

The main reason for this requirement, is that the Hits table is massive _(literally millions of rows in our instance)_ – and without this index, the performance of the appropriate SQL query would be unacceptable.

_Index creation screenshot:_

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/fe4b9026-0650-41be-9671-d2b11347d11d-min.jpg"/>
{{< /rawhtml >}}

**Server Side**

Once the Hits table was indexed efficiently, the next stage was to create a server side process, which would query the Hits table _(and perform any necessary filters to limit the users being displayed – for example not to show any parents who may also be online etc)._ This was achieved by creating an aspx page located in a sub folder of the plugins folder on the server _(e.g. “Plugins \\ ClientASPXFiles \\ STMWhoOnline.aspx”)._

**This aspx page utilises the Firefly security model, so that you cannot browse to it as an unauthorised user etc.**

The process reduces the count to show only the latest ten users, ordered by date descending, based on the most recent top 500 rows in the Hits table – because technically it is not known as to how many hit’s an individual user is going to create, and it is impractical to query the entire Hits table, an arbitrary figure of the last 500 hits, gives a good chance of getting at least the last 10 unique users http hits, without causing unnecessary strain on querying the entire table.

```SQL
SELECT TOP 500 UPPER(REPLACE(REPLACE(user_identity, '@STMARYS.EU', ''), 'ST-MARYS\\', '')) as Online, guid, date FROM hits h INNER JOIN tokens t ON (h.user_guid COLLATE DATABASE_DEFAULT = t.guid COLLATE DATABASE_DEFAULT) WHERE AND t.user_identity NOT like('%_1')AND t.user_identity NOT like('%_2') ORDER BY [date] DESC
```

The page then uses some basic array and looping procedures to ensure that it is only displaying a single latest instance per user.

```C#
if (myReader.Read())
  {
    while (myReader.Read())
      {
        DateTime loggedDate = Convert.ToDateTime(myReader["date"].ToString());
        if (loggedDate.AddMinutes(5) >= DateTime.Now)
          {
            if (!checkForDup.Contains(myReader["Online"].ToString()))
              {
                if (count < 10)
                  {
                    sb.Append("{\"user\":\"" + myReader["Online"].ToString() + "\",\"guid\":\"" + myReader["guid"].ToString() + "\",\"logged\":\"" + loggedDate.TimeOfDay.ToString() + "\"},");
                    checkForDup.Add(myReader["Online"].ToString());
                    count++;
                  }
              }
          }
      }
  }
else
  {
    sb.Append("");
  }
```

The final top ten results are then returned in a [json](http://en.wikipedia.org/wiki/JSON) format, which can easily be read by a client side script making an ajax call.

Finally, to make the server side query as efficient as possible, the page is actually set to cache all results every 10 seconds, so that if multiple users are online, the server is not querying unnecessarily _(tens of times per second etc)_ causing drain on server resources.

```C#
<%@ outputcache duration="10" location="Server" varybyparam="None" %>
```

---

**Client Side**

All that is required on the client side, it a small snippet of JavaScript to create an ajax call every 10 seconds, polling the server file _(created above)_ and then presenting the json returned from this file in a standard html <li> element, with an <a href> hyperlink to the users profile, and a hover tooltip displaying the actual date/time of the most recent “hit”.

This JavaScript is placed by literally adding a Firefly formatted text component, and then using the code editor – copying in the JavaScript.

```HTML
<br/>
<h3>Most recent visitors</h3>
<script>
(function doPoll() {
    var count = 0;
    $.ajax({
        url: "http://YOUR_DOMAIN_NAME/plugins/clientaspxfiles/stmwhoonline.aspx",
        dataType: "json",
        success: function (json) {
            var strHtml = '<ul>';
            for (var i = 0; i < json.length; i++) {
                strHtml += '<li><a href=\profile?guid=' + json[i].guid + ' title=' + json[i].logged + '>' + json[i].user + '</a></li>';
                count++;
            }
            strHtml += '</ul>';
            if (count < 10) {
                $("#online").html(strHtml).hide().fadeIn();
            } else {
                $("#online").html(strHtml);
            }
        }
    });
    setTimeout(doPoll, 10000);
})();


</script>
```

---

## Conclusion

This process works remarkably well, and when using an SQL profiler, with the query reduced to only take the top 500 hits and the utilising of caching, the SQL load is exceptionally efficient.

Technically, there is a theory that by only querying the last 500 hits, you cannot be scientifically absolute in stating that you are getting all the last top ten individual users _(e.g. one user may clock up 300 hits by themselves etc),_ but in our tests, this proved to be more than adequate and indeed does always appears to show the most recent top ten.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/b26a9c4-6c9d-47b1-af6d-34a4725c0b99-min.jpg"/>
{{< /rawhtml >}}

As an addition, I have also adjusted our query accordingly to create other “_more secure_” pages, for administrative purposes only, to establish currently logged on parents etc – this was in many ways more enlightening from an IT perspective, than the knowledge of the school users – indeed we were quite astonished to establish, that there were parents logged onto the portal almost constantly!
