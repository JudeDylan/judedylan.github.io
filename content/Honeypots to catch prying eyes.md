---
layout: post
title: "Honeypots to catch prying eyes!"
date: 2016-06-06 18:47:51
type: post
tags:
  - SysAdmin
  - Security
  - QuickTip
---

As I have mentioned in previous [blog posts](https://normansolutions.co.uk/post/welcome-to-podcast-university), I regularly listen to numerous technical podcasts.  A relatively new edition to my listening collection is the information security podcast [Risky Business](http://risky.biz/netcasts/risky-business) – it’s great!

On a recent episode, the company [thinkst](http://thinkst.com/), were discussing a project they have been working on, to do with [Honeypots](<https://en.wikipedia.org/wiki/Honeypot_(computing)>).

> <font color="#404040">Not only are these Honeypots an extremely funky security layer, they are also free (at the time of posting).</font>

## Ok….What are these Honeypot things?

Put simply, they are conventional documents or folders that you ‘sprinkle’ around your system _(local or Cloud based) –_ ideally naming them with rather tempting titles like **Passwords.docx** or **Bank Details.pdf,**  and if anyone opens them, you receive an email alert.  A good old fashioned Honeypot.

What’s ever better, is that these are so _ridiculously_ easy to set up, there is really no reason not to do it!

---

## The process

Firstly, it’s worth mentioning that there are several variants to these Honeypots – you can even have them configured to check whether certain SQL scripts have been run on your database or whether your website has been cloned.  However, for this blog post, I am just going to explain the most basic option – downloading a Word document *(or pdf)*  and saving it onto your system.

_One piece of advice, that caught me out initially, is you must remember to create a **separate** Honeypot token for each deployment.  It’s not that you can’t use the same token in more than one location – you certainly can, the problem is that when the token is activated, you don’t know where it was activated from – **so remember, use one token for each location!**_

- Visit [**http://canarytokens.org/generate**](http://canarytokens.org/generate "http://canarytokens.org/generate")
- Enter your email address and a comment as to where this token is to be used _(e.g. Dropbox Security Alert)._

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/d0387578-87d8-424c-95e1-0ae4089bddf1-min.png" />
{{< /rawhtml >}}

- Ensure you select the DNS/HTTP option _(the default)._
- Click on **Generate Token** - you now have a “live” Canarytoken _(Honeypot)._

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/624a8eaa-5e08-41dc-9dd9-d656a0453e02-min.png"/>
{{< /rawhtml >}}

- Click on the MS Word option and select “click here” to download the Word file.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/f48a4c68-c7f4-43c6-b99a-d25a6bc8a978-min.png" />
{{< /rawhtml >}}

- When you have downloaded the Word document, just rename it to something tempting (e.g. **Passwords**).
- Now save this document anywhere you like – my suggestion would be into the root of your cloud service (OneDrive, Dropbox etc).
- **That’s it, job done** - if anyone opens this document, you will be notified by email, which also includes additional information such as the users IP address, access time etc.

> You will note from the Canarytokens webpage, that you can also download a pdf document.

Another extremely useful option is **Windows Directory Browsing** – this works in the same manner as the above process, except you download a zipped folder.  You  unzip the folder and rename it accordingly (e.g. **Payroll** etc) and whenever anyone **browses** that directory, an alert is fired.  You can also store real documents within the folder should you choose, although you need to be mindful that you will receive an alert each and every time you access it!

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/d7d66650-e04e-4e87-95e9-167e5e420d9a-min.png" />
{{< /rawhtml >}}

_You can even upload an executable, have it signed by the company, and then re-download.  This could be useful if you have a bespoke program, where you wish to receive an alert whenever someone runs it?  Of course you do have to trust their signing process!_

---

## In summary

From my brief testing of these Honeypots, it’s worth noting that they only seem to be activated when accessed via a conventional Windows environment – they don’t appear to “fire” when being accessed from a webpage view – which to be fair, makes sense.

With more and more data becoming remotely accessible _(be it Cloud or RDP etc),_ then this is a wonderful tool to have in your arsenal.  It’s not a silver bullet, but it is a layer of security well worth checking out – and it’s free!
