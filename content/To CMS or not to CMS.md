---
layout: post
title: "To CMS or not to CMS?"
date: 2013-12-13 22:44:12
type: post
tags:
  - Website
  - Blog
  - CMS
  - Razor
  - C#
---

OK, the time has come for a website refresh – it’s something that I like to try and do annually _(well, I say annually, what I really mean is that I did it last year)._ The question, is do I roll my own, as I have always done, or jump into the CMS world?

There are many CMS systems out there, and I have had a used several of them (varying levels of experience); to summarise:

- [Wordpress](http://wordpress.com/) _(I have built a few sites, but never really felt totally “at home” with php)_
- [Umbraco](http://umbraco.com/) _(I love it, but it is a pretty huge system)_
- [Orchard](http://www.orchardproject.net/) _(again, I love it, but it is pretty heavyweight)_
- [Ghost](https://ghost.org/) _(new kid on the block – tempting, it would be a nice introduction to some [nodejs](http://nodejs.org/), which I really want to learn more about)_
- [Miniblog](https://github.com/madskristensen/miniblog) _(another new kid on the block, from the genius that is_ [_Mads Kristensen_](http://madskristensen.net/)_; a minimalistic blogging platform)_

To be honest, the list could go on; but the question really was, do I use a CMS or not?

I heard about [Miniblog](https://github.com/madskristensen/miniblog) after listening to an excellent [Dot Net Rocks show with Mads](http://www.dotnetrocks.com/default.aspx?ShowNum=927), and it caught my interest.  Let’s be straight, I am not a coding genius, however, I do have what I believe to me an excellent understanding of modern patterns and practices, and can spot a well written _(or not, as the case may be)_ system.  I am impressed with Miniblog.

It took me a few hours looking through the code and following the work flows to fully understand how it all hangs together – but what I saw was a really neat piece of work that utilised modern HTML practices and decent caching _(and cache-busting!_) – it sits on top of [Bootstrap 3](http://getbootstrap.com/), so has all the wonderful responsive design juice and goodness provided with that framework; to be honest the list is impressive and is better checked out from the [readme](https://github.com/madskristensen/MiniBlog/blob/master/README.md) file.

I did find I had to tweak a few bits and bobs, some out of necessity and some out of preference.  One main necessity issue was with the paging, for some strange reason the paging, which allows you to go back and forth between posts, stopped too early, thus not allowing you to go back to the last few posts.  For good or ill, I managed to resolve this by changing the below in the  \_Layout.cshtml:

```C#
@if (Blog.GetPosts(Blog.PostsPerPage * 2).Count() > Blog.PostsPerPage)
```

to

```C#
@if (Blog.GetPosts(Blog.PostsPerPage).Count() > Blog.PostsPerPage)
```

Other issues were more out of preference; for example, I am a stickler for cdn fall-backs, and whilst it is great that Miniblog utilises the [Bootstrap cdn](http://www.bootstrapcdn.com/) (and [jQuery](https://developers.google.com/speed/libraries/devguide)), I just had to implement a fall-back.  This was achieved with a small amount of JavaScript (and HTML) as below:

```JavaScript
//cdn fallback for Bootstrap css
<div id="bootstrapCssTest" class="hide"></div> // (HTML in  _Layout.cshtml)
if ($('#bootstrapCssTest').is(':visible') === true) {
    $('<link href="\css/bootstrap.min.css" rel="stylesheet" type="text/css" />').appendTo('head');
}

//cdn fallback for Bootstrap js
if (typeof ($.fn.modal) === 'undefined') {
    $('<script src="\scripts/bootstrap.min.js">\x3C/script>').appendTo('head');
}

//cdn fallback for jQuery
<script>window.jQuery || document.write('<script src="\scripts/jQuery.min.js">\x3C/script>')</script>
```

Other preferences were alteration of styling _(overriding some Bootstrap classes, adding tweet buttons to the bottom of posts etc)_ and the implementation of a “recent” articles option, on the navigation bar, this was achieved using the below code:

```HTML
<ul class="nav navbar-nav">
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Recent Articles <b class="caret"></b></a>
        <ul class="dropdown-menu">
            @foreach (var postTitle in Storage.GetAllPosts().Where(pub => pub.IsPublished == true).Where(pubDate => pubDate.PubDate <= DateTime.Now).Take(10))
            {
                <li><a href="@postTitle.AbsoluteUrl">@postTitle.Title</a></li>
            }
        </ul>
    </li>
</ul>
```

Add some [Less CSS](http://lesscss.org/) support and use the bundling options of [Web Essentials](http://vswebessentials.com/) *(again from Mads Kristensen)* and away you go!

So far, I am really impressed with Miniblog – it has been a bit of a journey over the past few days, getting to grips with it all, but I am look forward to blogging more in the future!

…….and the best part, is that I can use [Windows Live Writer](http://en.wikipedia.org/wiki/Windows_Live_Writer) to create blogs – it fully integrates….no hacking away in a webpage….lovely!
