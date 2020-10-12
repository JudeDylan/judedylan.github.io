---
layout: post
title: "Cache-busting in C# without querystrings"
slug: "cache-busting-in-c-without-querystrings"
date: 2014-07-14 21:38:20
type: post
tags:
  - Razor
  - Website
  - JavaScript
  - CSS
  - C#
  - Caching
---

A key benefit of working with the web _(or more specifically http)_ is it’s native ability to [cache](http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html).  This can be ‘tuned’ to make websites extremely fast and slick, especially after initial page load.

The simplest example could be a file _(be it css, JavaScript or even a jpeg image)_ that once downloaded to a user’s device, will remain stored on that device ‘locally’ ensuring each subsequent request for this _same_ file, no longer needs to be re-downloaded.  Indeed, the file could remain on the device until a pre-defined expiry date, or until the user clears their local temporary internet files etc.

In addition, if you use a popular [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) to serve up common files _(e.g._ [_jQuery_](https://developers.google.com/speed/libraries/devguide#jquery) _etc)_ then you could benefit from a user _already_ having that file in their local cache, from another website; thus your site appears faster, thanks to this file having already being downloaded – sweet!

> _I love caching and where possible, always enable it._

---

## But What Happens when you change a file?

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/69a07192-85fb-4c5c-8bd3-4551d6be261a-min.png" />
{{< /rawhtml >}}

So we accept that caching is a good thing.  _However_, when you **deliberately** change a file _(update your css or JavaScript etc),_ of course you **don’t** want the cached version being served to the end user – and no, it isn’t good enough to just say ‘_**refresh your browser**_’.

The obvious answer, is to rename your file.  But of course, you then have to rename _all_ references to this file, within your website – not ideal!

## Enter Cache-Busting

> _‘_[_Who you gonna call….._](http://www.youtube.com/watch?v=m9We2XsVZfc)_” Ok…don’t worry, I won’t go there, far too cheesy!_

For a long time, I used Microsoft’s own [Bundling and Minification](http://www.asp.net/mvc/tutorials/mvc-4/bundling-and-minification) solution, which for the record, I still think is excellent.  _However_, when it comes to cache-busting, the Microsoft solution, resolves this by appending a unique [query-string](http://en.wikipedia.org/wiki/Query_string) to the end of the file.

> _For example: a file called ‘**styles.css**’ could become ‘**styles?v=r0sLDicvP58AIXN**’_

This solutions works well, in the sense that it certainly provides a ‘_new’_ file name – but on my travels I have subsequently learnt, that the query-string method is not the best accepted practice for cache-busting, and can _fail_ under certain circumstances.

## An Alternative Approach

I use the excellent [MiniBlog](https://github.com/madskristensen/miniblog) framework for my blog site, and love the way it deals with caching and cache busting _(amongst other things)._

MiniBlog _(and no doubt others)_ take an approach of actually changing the _path_ as against the filename*.*  This path is created, based on a time stamp _(or specifically, time-ticks)_ and is remarkably simple.  It’s now my preferred method of cache-busting.

---

## The Steps

Firstly, you need to create a c# class, that will be responsible for creating the _unique new path_ to any given file.

> _In the below example, you may note that this class also allows for the use of a CDN path, in which the cache-bust would not be required._

```C#
public static string FingerPrint(string rootRelativePath, string cdnPath = "")
{
    if (!string.IsNullOrEmpty(cdnPath) && !HttpContext.Current.IsDebuggingEnabled)
    {
        return cdnPath;
    }
        if (HttpRuntime.Cache[rootRelativePath] == null)
    {
        string relative = VirtualPathUtility.ToAbsolute("~" + rootRelativePath);
        string absolute = HostingEnvironment.MapPath(relative);
        if (!File.Exists(absolute))
        {
            throw new FileNotFoundException("File not found", absolute);
        }
        DateTime date = File.GetLastWriteTime(absolute);
        int index = relative.LastIndexOf('/');
        string result = relative.Insert(index, "/v-" + date.Ticks);
        HttpRuntime.Cache.Insert(rootRelativePath, result, new CacheDependency(absolute));
    }
        return HttpRuntime.Cache[rootRelativePath] as string;
}
```

> _The key to the unique path creation is the **File.GetLastWriteTime** syntax – this literally establishes the last time a file was changed, and uses that, as a basis to create a unique numerical value of time-ticks._

Of course, we _will_ need to somehow establish the **real** path, as to where the file is located _(as against this virtual one);_ in short, we need some routing.

This is very easily done, with the below code snippet added to the [web.config](http://en.wikipedia.org/wiki/Web.config) file – using some [regex](http://en.wikipedia.org/wiki/Regular_expression) wizardry, this tells incoming requests, that when it comes across one of these _‘special paths’_, to route it to the correct location.

```XML
<rules>
  <rule name="fingerprint" stopProcessing="true">
    <match url="(.*)(v-[0-9]+/)([\S]+)"/>
    <action type="Rewrite" url="{R:1}/{R:3}"/>
  </rule>
</rules>
```

Finally, to actually use the cache-busting feature in your page, just path your appropriate links and scripts _(css, js etc)_ using the below method.

[Click for code snippet](https://gist.github.com/0405e7113b5d82eb55c4)

```html
<link rel="stylesheet" href="@CacheBust.FingerPrint("/css/mainStyle.css")" />
<link rel="shortcut icon" href="@CacheBust.FingerPrint("/favicon.ico")" type="image/x-icon" />
<script src="@CacheBust.FingerPrint("/scripts/mainScripts.js")"></script>
```

---

## The Result

As you can see from the below screen shot, the example css and JavaScript paths are indeed, very **unique!**

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/2005d37a-97fe-43df-a2ea-7854ca5241a5-min.png" />
{{< /rawhtml >}}

I have created a _very basic_ ASP.net website, which you can download from my [GitHub account here](https://github.com/normansolutions/CacheBustExample).  This example will display a webpage detailing the path to a css file, a JavaScript file and a favicon image.

Making changes to any of the files within the project, will clearly demonstrate a new path on a refresh.

**_Give it a go - it certainly works for me!_**
