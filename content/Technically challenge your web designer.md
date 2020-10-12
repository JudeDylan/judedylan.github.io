---
layout: post
title: "Technically challenge your web designer!"
date: 2014-04-29 20:46:26
type: post
tags:
  - Blog
  - Website
  - JavaScript
  - CMS
---

I must confess to have slightly struggled with the title of this blog post, as I didn’t wish to be responsible for encouraging unnecessary complaints and animosity between clients and web designers!

However, I have all to often witnessed situations where a web design company _(or web designer)_ will not be implementing recognised ‘best practice’ _(either through a lack of skills, or out of sheer laziness)_, and will conveniently ‘hide’ behind the belief that a client is highly unlikely to spot poor architectural design!

> _Well, here’s the truth – you **don’t** need to be a technical web expert to spot some basic poor development practices._

Indeed, if you can use a browser, and have a basic understanding of how a webpage works, then you can easily learn a few tips, that will help you challenge your designer / developer.

---

## What this post will _not_ cover

Just to clarify; this is not intended to be a deep-dive technical article on the inner workings of speed, performance and optimisation in modern web design _(for that, there are plenty of other resources and_ [_gurus_](http://stevesouders.com/) _to be found on the internet, with far greater expertise than me)._

I shan’t be covering [Image Sprites](http://css-tricks.com/css-sprites/), [CDN’s _(Content Deliver Networks)_](http://en.wikipedia.org/wiki/Content_delivery_network), [Mobile Design](http://en.wikipedia.org/wiki/Responsive_web_design), [Poor Coding](http://css-tricks.com/judging-css-spotting-bad-code/) or [Modern UX Design Patterns](http://clearleft.com/) etc.

## This post will primarily focus on:

- Page size and loading speed.
- Optimisation / placement of components and scripts on a webpage.

---

## Why only these?

Aside from not wishing to provide _bedtime_ reading material for potential visitors, [IMHO](http://en.wiktionary.org/wiki/IMHO), I believe these basic factors are a good tell-tale benchmark as to whether a developer has good or poor understanding of modern web design architecture; it could also have a **significant** bearing on how Google will rank your website in search results _[(Google now use site speed in web search ranking).](http://googlewebmastercentral.blogspot.co.uk/2010/04/using-site-speed-in-web-search-ranking.html)_

## One final point before we start – don’t be too critical!

Most organisations nowadays, require the ability to update website content themselves – enter the [CMS _(Content Management System)_](http://en.wikipedia.org/wiki/Content_management_system)*.*  The CMS is excellent on so many levels, but it does have the problem of needing to be ‘**all things to all people**’ – as such, even with the best software engineers and designers in the world, you will almost certainly end up with a system that carries an element of ‘bloat’.

Unfortunately, it’s a bit of a trade off; flexibility verses efficiency.  _However_, it still shouldn’t be used as an excuse for poor design architecture.  The goal, is to aim for perfection with the understanding that this is not always going to be achievable – be questioning, but also realistic.

_(There is an assumption that very basic web design protocols are already in place (correct use of_ [_Headers_](http://blog.woorank.com/2013/04/how-to-use-heading-tags-for-seo/)_,_ [_Keywords_](http://www.googlekeywordtool.com/) _and_ [_Meta Tags_](http://en.wikipedia.org/wiki/Meta_element) \_etc) – if your web designer isn’t implementing these, then you may as well give up now!

---

## Ok, let’s get to the meat!

Google [Chrome](http://www.google.com/intl/en_uk/chrome/browser/) is your friend here _(or more specifically the web_ [_developer tools_](https://developers.google.com/chrome-developer-tools/) _that come with Chrome)._

- If you haven’t done so already; go download, and install Google Chrome from [here](http://www.google.com/intl/en_uk/chrome/browser/).
- Once installed, go and grab the Chrome version of YSlow from [here](https://chrome.google.com/webstore/detail/yslow/ninejjcohidippngpapiilnmkgllmakh).

> _It’s worth noting that there are alternative options to these developer tools for other browsers (e.g. Internet Explorer and Firefox etc) – but at the time of posting, I think it is fair to state, that the Chrome Dev Tools are currently recognised as the better choice._

You should pretty much now have all you need to analyse your website in detail.

---

## Page size and loading speed

It stands to reason that if your page size if too large _(in file size),_ then it is going to take a lot longer to download and display, clearly having a negative impact on your customers _(as well as your search ranking)._

Ok – open up Chrome, visit your website and then click on the ‘YSlow’ icon which you should see located at the top right hand side of your Chrome browser window.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/69a0adc5-5c7d-4850-ac39-5dc4438a3240-min.png" />
{{< /rawhtml >}}

You will then be presented with the ‘YSlow’ dashboard – similar to the below screen shot.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/267637b4-937b-49d8-bb11-06b38fc7c17b-min.jpg" />
{{< /rawhtml >}}

Click the yellow **‘Run Test’** button.

After a brief delay _(status indicated by a progress bar),_ you will be presented will an array of information on the YSlow **Grade** tab _(this tab also includes a general overall webpage grading score; you are ideally aiming for an ‘A’ grade here)_.

However, leaving the Grade tab alone, if you click on the **Statistics** tab – you will be presented with two pie charts, visually detailing the size of your web page.

One of these pie charts will be the _initial_ page size, whereas the other will be the _cached_ page size – which basically means the page size _after_ someone re-visits your website _(this should be significantly less than the initial page size – if it isn’t, then your web developer needs to investigate the ‘caching’ options of the website)._

---

**Real world example:**

The below screen shot was taken from a website that initially had huge performance loading issues.  You will note that the page size _(total weight)_ is _nearly 2MB,_ and the cached page is much smaller at 600K - (_I should mention that this had previously been significantly worse, weighing in with a 5MB initial page load; alas, I no longer have a screen shot of the initial check)._

This test was enough to present a justified concern to the company.  It’s still quite large, but arguably acceptable for a CMS – or not?

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/935ae518-4f7b-4db2-b7bf-1f5a5a70841c-min.jpg" />
{{< /rawhtml >}}

The below screen shot was taken from my own website – which I’m not claiming to be a masterpiece by _any_ means, but purely as a reference point, you can see the initial page load is only 412K and the cached page size _(remember, that’s the one that gets loaded again after an initial visit)_ is actually **0.0K!**

Incidentally, it also scored a **Grade A,** which I was quite chuffed about!

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/684a3232-724c-4037-83ac-f9f60e04c5e8-min.jpg" />
{{< /rawhtml >}}

Before we leave **Page Size** – it’s worth noting that HTTP Requests are also _very_ important.  If you view an HTTP Request as a ‘trip’ to the server, then the more ‘trips’ you have to make, the more work the browser has to do, the more power it consumes _(this can even drain batteries on mobile devices),_ the slower the page loads – well, you get the idea!

So you need to keep your HTTP Requests to as **few as possible**.  Again, look at the charts above for HTTP Requests –  I think you will agree, there is quite a difference!

_(Disclaimer: please be advised that the above website stats are not a scientific ‘like with like’ comparison, but do serve a purpose for blog demonstration)_

---

## Optimisation and placement of scripts

This secondary test is arguably slightly more involved than the page size inspection, but can still be _very_ _easily_ performed, using the magic of Chrome developer tools.

It primarily focuses on ensuring your CSS and JavaScript files _(two key elements to a modern website)_ are not only placed in the most efficient part of your web page, but also reduced to as few files as possible.

Remember we mentioned about keeping the HTTP Requests down?  Well every CSS and JavaScript file, is an **individual** HTTP Request – if you have 15 CSS files and 15 JavaScript files, then you have 30 HTTP Requests before you even start downloading any pictures and content!

Ok – open up Chrome, press the **‘F12’** key on your keyboard and visit _(or refresh)_ your website - you should then be presented with the Chrome Developer Tools, similar to the below screen shot.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/15f2e8b7-1651-4889-8707-b89ff0a9d9ce-min.jpg" />
{{< /rawhtml >}}

Be under no illusion – options for the [Chrome Dev Tools are vast](https://developers.google.com/chrome-developer-tools/), and I would encourage you to investigate them further – however, for now, we are just looking at individual elements being loaded onto the page.

This initial view shows you **individual items** being loaded by your website; indeed you may recognised some of the pictures.  It also provides you will a useful ‘Timeline’ indicator, detailing how long each element is taking to load!

You can sort and filter to only show ‘JavaScript’ or ‘CSS’ files _(by clicking on the ‘Type’ heading or the filter icon etc)._ What you are looking for, is the presence of too many scripts, or duplicated files.

JavaScript files will end in **‘.js’** and will display the type **‘text/javascript’** (or possibly _‘application/javascript’_), whereas CSS files will end in **‘.css’** and display the type **‘text/css’**.

_In another **real world example,** here I spotted a_ [_jQuery_](http://jquery.com/) _script being loaded onto the webpage twice (for no logical reason) – a small, but nevertheless poor mistake - again, this was enough to present a justified concern to the company, who surprise, surprise, removed the duplicate!_

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/4777a4d1-6a3d-4986-9989-de66d979fab1-min.jpg" />
{{< /rawhtml >}}

There is a process which **all** web developers should now be using called ‘[combination and minification](http://www.asp.net/mvc/tutorials/mvc-4/bundling-and-minification)’ – this is where the web developer, attempts to combine all files of the same type _(be it JavaScript or CSS)_ into one single file, and then ‘squishes’ that file to make it’s overall size a lot smaller.

> _This obviously makes the download page size smaller, but also reduces those all important HTTP Requests!_

In an ideal world you would have just one CSS file and one JavaScript file on your webpage.  For different, legitimate reasons, this is almost always impossible; **but** there is no reason why a significant percentage of these files cannot be combined together and ‘squished’.

So, the takeaway from this test, is to **count the number of JavaScript and CSS files**, and ask if there are too many and /or whether they are too big?

---

## Quick note on page blocking

A final, but important point to mention, is the **placement of scripts.**

Ideal rule of thumb is: **CSS to be placed in the head of the page** (e.g. at the top) whereas **JavaScript should ideally be placed as far down the page as possible** (e.g. at the bottom).  Failure to do this, can give the perception of a slow loading webpage.

As before, there has to be flexibility and understanding with this rule, but in short, if you ‘right click’ on your webpage and then select **‘View Page Source’** _(you don’t need the Chrome Dev Tools to do this),_ and then see a vast quantity of JavaScript files sat at the top of the page, then **contact your web developer** and ask if there is a reason for this.

---

## Conclusion

I understand that this blog post could have gone into _much_ greater depth about poor web design practices, and I am completely aware that this has only touched the surface in a couple of areas - _for instance, don’t get me going on unnecessary in-line styling, hacky JavaScript and poor security implementation for starters!_

However, my goal wasn’t to write an exhaustive article about poor web design in it’s entirety, but simply to encourage the layperson, to look at their website with a more ‘technical’ eye and have the confidence to question legitimate poor practice; and where relevant, **_challenge their web designer!_**
