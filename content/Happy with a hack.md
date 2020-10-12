---
layout: post
title: "Happy with a hack?"
date: 2014-10-03 21:37:41
type: post
tags:
  - Website
  - Script
  - CMS
  - JavaScript
---

Most software developers at some point, will almost certainly encounter the need to [hack](http://en.wikipedia.org/wiki/Kludge#In_computer_science) together a solution.

To quote Wikipedia, the term **hack**, for the purposes of this blog post is:

> _"a solution to a problem, doing a task, or fixing a system that is inefficient, inelegant, or even unfathomable, but which nevertheless (more or less) works."_

Let me register now - **I don't like 'hacking' solutions together.** Some people are perfectly fine with it _(I personally know many who are);_ but whether it is an OCD tendency, a touch of perfectionism or just professional satisfaction, I always feel _very_ uncomfortable when I have to hack together the resolution to a problem.

_**However, sometimes you genuinely have no choice!**_

---

## Recently, was one such time

St Mary's Shaftesbury commissioned the creation of three marketing videos from [More Than Media](http://www.morethanmedia.tv/) - personally, I think these videos are pretty darn excellent - I hope you agree:

Here's an example of the main one:

---

Once the videos were ready for public consumption, it was an obvious requirement for them to be placed onto the school website.  Without digressing into the mechanics of the school website [CMS](http://en.wikipedia.org/wiki/Content_management_system), suffice to say, that beyond the usual editing and blogging options, there is no easy way of changing the main site structure, in-house.

To my knowledge, this requires a change request being made to the company responsible for the CMS, no doubt levying a financial charge, alongside the obvious development delay.

Not an ideal solution for a _**‘can it be done by the end of the day’**_ type of request!

## Enter the hack

It was agreed that the top banner of the site, which at the time, was hard coded with a slide show, would be the best location for the videos - especially using [Vimeo's Hubnut](http://vimeo.com/tools/widget) solution, which is designed to neatly display multiple videos in one slot _(more on Hubnut in a moment)._

In short, the solution I came up with, was to _dynamically_, on page load, replace the html content in this banner, with a 'responsive coded iframe' - horrid I know, but hey, little choice!

Frankly, it worked *(it's worth noting that I used a great site called [embedresponsively](http://embedresponsively.com/)* *to get nice responsive embed code for Vimeo - I highly recommend you check it out, if you’re ever embedding videos).*

---

## So, all done? _Not quite!_

It transpires that the aforementioned Vimeo Hubnut, is a [Flash](http://get.adobe.com/flashplayer/) only solution _(at the time of writing)._

So, when viewing the website on an iPad - **yep, you've got it** - a nice blank space at the top of the page, instead of a video!

So, progressing further down the rabbit hole of this hack, I now had little option but to [sniff the user agent string](https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent), and then conditionally display the video(s) as appropriate to the device (e*.g. if it's an [IOS](http://en.wikipedia.org/wiki/IOS) device, don't use the Vimeo Hubnut).*

So, resurrecting some old JavaScript code from a previous life - I applied this _hack to the hack!_

---

## All done now? _Not quite!_

Feeling reasonably comfortable with the process, I went home for the weekend, only to establish that on my [Microsoft Surface](http://www.microsoft.com/surface/en-gb), I _also_ couldn't see the videos – **Oh dear, I politely said to myself.**

Agent string sniffing here, was **not** going to provide me with the answer.

So after referencing the techies handbook _(aka Google)_ – I discovered a method of being able to establish whether a device has Flash installed (both as an ActiveX or as a plug-in).

> _Once this hack on hack on hack was applied - all was well – oh my!_

---

Below is the final code that was used on the site:

```JavaScript
var mobile = $('#home_template').hasClass('mobile');

if (!mobile) {
    var iPadAgent = navigator.userAgent.match(/iPad/i) === null;
    var iPodAgent = navigator.userAgent.match(/iPhone/i) === null;
    var AndroidAgent = navigator.userAgent.match(/Android/i) === null;
    var webOSAgent = navigator.userAgent.match(/webOS/i) === null;
    var hasFlash = false;

    if (iPadAgent && iPodAgent && AndroidAgent && webOSAgent) {
        try {
            var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (fo) {
                hasFlash = true;
            }
        } catch (e) {
            if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] !== undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                hasFlash = true;
            }
        }

        if (hasFlash == true) {
            $("#home_banner_feature").html("<style>.embed-container { position: static; padding-bottom: 46.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='http://player.vimeo.com/hubnut/album/3005503?color=44bbff&background=ffffff&slideshow=1&video_title=0&video_byline=0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>");
        } else {
            $("#home_banner_feature").html("<style>.embed-container { position: static; padding-bottom: 46.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='//player.vimeo.com/video/103632940' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>");
        }
    } else {
        $("#home_banner_feature").html("<style>.embed-container { position: static; padding-bottom: 46.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='//player.vimeo.com/video/103632940' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>");
    }
}
```

---

## So, to answer the title of this blog post

**Am I happy with a hack**? **NO**

**Does it work, and is everybody else happy?** **YES**

**Feel free to draw your own conclusion!**
