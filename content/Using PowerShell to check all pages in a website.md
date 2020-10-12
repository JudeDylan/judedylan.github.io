---
layout: post
title: "Using PowerShell to check all pages in a website"
date: 2013-12-17 08:49:20
type: post
tags:
  - PowerShell
  - Website
  - Script
  - SysAdmin
  - DevOps
---

Recently St Mary’s Shaftesbury had a new website built (_I would like to register, that whilst I was actively involved in the project management, I did not design this website_).

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/8335bce4-827b-40ca-a1f0-8ee1679236ae-min.jpg" />
{{< /rawhtml >}}

In truth this has been a pretty enormous, and sometimes quite arduous task, which I shan’t digress into with this blog post.  However, part of the process was transferring content from the previous website to the new one, in a systematic and controlled manner.

For the best part this worked very well, but it was soon discovered that there were some “odd” pieces of code appearing on certain pages; even more confusing, this code only appeared on certain computers.

The bottom line was, that as part of the process to transfer content, the dreaded “_copy and paste_” had been used without sanitising the text *(e.g. removing hidden formatting etc).*  Even stranger, this code only manifest itself when using ie8 – other browsers were happy to ignore it; hence the claim that it was only displaying on some computers.

So, the mystery of the rogue code resolved, the next task was to establish how to check every page on the website, using the appropriate browser.  Yes, we could sit a bored techie down to go through every page, or we could try and be clever with some PowerShell scripting.

A bit of Googling later, the below script was written.  It was actually a relatively simple process, for what is now a very effective tool.  In short, I knew that we had a sitemap _(well, of sorts – unfortunately it wasn’t a traditional_ [_sitemap.xml_](http://en.wikipedia.org/wiki/Sitemaps)_, which would have made life a lot easier!)_ – but it was at least a sitemap.

Using the PowerShell 3 [Invoke-WebRequest](http://technet.microsoft.com/en-us/library/hh849901.aspx) method to get the sitemap, the script then grabs appropriate href links from elements belonging to those meeting a specific css class (in this instance “rmLink”).  This is now technically a list of all pages in the website.

All that is now left to do, is to enumerate through each webpage (searching the html) looking for the “suspect” code, and to display the page url if and when found!

```PowerShell
Clear-Host
$hsg = Invoke-WebRequest -Uri http://www.stmarys.eu/sitemap.aspx
$links = $hsg.Links | Where class -eq 'rmLink' | select  href
$linksWithDomain =  $links | Foreach-Object{"http://www.stmarys.eu/" +  $_.href}
$linksWithDomain | foreach{
    $webClient = new-object System.Net.WebClient
    $webClient.Headers.Add("user-agent", "PowerShell Script")
       $output = ""
       $output = $webClient.DownloadString($_.toString())
       if ($output -like "*supportLists*") {
          "Dodgy Code On Page " + ($_.tostring())
       }
 }
```

We did indeed locate three pages, that had this rogue code present _(so it was worth the investment in time creating the script)_.  We also now have a pretty neat tool for checking webpages in the future!
