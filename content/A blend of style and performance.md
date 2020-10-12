---
layout: post
title: "A blend of style and performance"
date: 2015-04-06 11:56:06
type: post
tags:
  - Website
  - DevOps
  - Caching
  - CSS
  - JavaScript
---

Recently, I had the privilege of designing and building the Wylye Valley Art Trail website.  The 2015 trail consists of **75** venues, and in-excess of **300** artists – I’m sure you’ll agree, that’s a reasonable size!

In many ways, the website had to embrace an “**all things, to all people**” approach; the content needed to include artist images, alongside an array of useful information pertaining to each venue _(e.g. opening times, contact details, map displays, artist information, access arrangements etc)._

> _There was also a fair amount of inconsistency between venues, which needed to be catered for – “square peg, round hole” was a common theme._

Personally, I felt a [CMS](http://en.wikipedia.org/wiki/Content_management_system) **wasn’t** the best option *(too much cruft & bloat).*  As such I hand-coded the entire project, from the data entry screens through to the final website.  Whilst this was a lot more work from a “coding” perspective, it enabled me to remain in complete control over “_bits_” being sent across the wire - so to speak.

---

## Style

For style, I leant towards [Google’s Material Design](http://www.google.com/design/spec/material-design/introduction.html) guide and icononography – it seemed to be appropriate for creating a slick, functional & informative website, yet leaving enough room for artistic display.

## Performance

Underlying all the design and information details, was an _absolute_ requirement to maintain a top browsing performance - image based websites and performance, don’t always go hand in hand!

## Getting The Right Blend

By utilising many modern tips and techniques, I was able to not only create what I believe, to be a very functional and useable website, but one that also scored highly from a performance aspect, without a sacrifice on aesthetics.

To substantiate this, below are a couple of [YSlow](http://yslow.org/) screen shots.

The first clearly indicates an overall **Grade A** score _(I was well chuffed with that),_ whilst the other shows initial home page weight, alongside the **much reduced** “_cached_” page weight.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/5ab3a190-b6e7-4c80-92be-2c823b0ed674-min.png"/>
{{< /rawhtml >}}

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/8441e694-4c61-4add-afd5-b264bfe9f6f6-min.png"/>
{{< /rawhtml >}}

---

**At the time of posting, I feel I have utilised a lot of good modern practice – however, I have little doubt that in 18 months time, this will be seen as “_so last year_” - but isn’t that why we love this industry?**

---

## Summary of technologies & processes

## Stack

- [SQL 2014](https://msdn.microsoft.com/en-us/library/bb500435.aspx) Database
- ASP.NET 4.5 [Web Pages](http://www.asp.net/web-pages)
- Server Side: C# (Razor)
- Front End: HTML, CSS, JavaScript

## Tooling

- Visual Studio 2013
- [Visual Studio Online](https://www.visualstudio.com/en-us/products/what-is-visual-studio-online-vs.aspx) Version Control Repository ([GIT](http://en.wikipedia.org/wiki/Git_%28software%29))
- [Web Essentials](http://vswebessentials.com/) (VS Plugin)
- [SASS](http://sass-lang.com/) (CSS Pre-processor)
- [Gulp](http://gulpjs.com/) (Build Process / Task Runner)
- [TinyJPG](https://tinyjpg.com/) (Image optimisation)

## Front End Libraries

- [jQuery](https://jquery.com/) (JavaScript)
- [AngularJS](https://angularjs.org/) - for the Admin data entry section (JavaScript)
- [Bootstrap 3](http://getbootstrap.com/) (CSS)
- Bootstrap [Material Design Plugin](https://fezvrasta.github.io/bootstrap-material-design/) (JavaScript / CSS)
- Google Maps (JavaScript)
- [Media Boxes](http://codecanyon.net/item/media-boxes-portfolio-responsive-grid/5683020) (JavaScript)
- [loadCSS](https://github.com/filamentgroup/loadCSS) (JavaScript / CSS)
- Some IE fall-back libraries

## Performance & Architecture On Server

- Use of [Dapper ORM](https://github.com/StackExchange/dapper-dot-net) (fastest DotNet ORM)
- Creation of an [ASP.NET Web Pages DAL](http://css.dzone.com/news/creating-data-access-layer) _(Data Access Layer)_ as inspired by [@stevelydford](https://twitter.com/stevelydford) blog [post](http://css.dzone.com/news/creating-data-access-layer)
- Extensive use of Database caching
- Server side [Minification](http://en.wikipedia.org/wiki/Minification_%28programming%29) of CSS & JavaScript
- Server side [Cache Busting (without querystrings)](https://normansolutions.co.uk/post/cache-busting-in-c-without-querystrings)
- Extensive use of HTTP Static Content caching & expiration headers

## Performance & Architecture On Client

- Use of Gulp to [concatenate](http://en.wikipedia.org/wiki/Concatenation) CSS & JavaScript
- Use of Gulp to [auto-prefix](https://www.npmjs.com/package/gulp-autoprefixer) CSS
- Use of Gulp to strip out unnecessary CSS using [UNCSS](https://www.npmjs.com/package/gulp-uncss)
- Use of [Local Storage](http://diveintohtml5.info/storage.html) to store a [JSON](http://en.wikipedia.org/wiki/JSON) object for all mapping data
- Use of sprites, reducing all map markers down to a single image
- Use of [Lazy Loading](http://en.wikipedia.org/wiki/Lazy_loading) for gallery images
- Gallery images served from a different domain, to take advantage of [browser parallelism](http://sgdev-blog.blogspot.sg/2014/01/maximum-concurrent-connection-to-same.html)
- Use of [loadCSS](https://github.com/filamentgroup/loadCSS) to enable the loading of CSS asynchronously
- Implemented "[Critical CSS – Above The Fold](https://css-tricks.com/authoring-critical-fold-css/)" to ensure fast styling on first page load
- Use of JavaScript injected [Preload / Prerender](https://docs.google.com/presentation/d/18zlAdKAxnc51y_kj-6sWLmnjl6TLnaru_WH0LJTjP-o/present?slide=id.p19) to ensure faster access to a predicted "next" page
