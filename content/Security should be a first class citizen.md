---
layout: post
title: "Security should be a first class citizen"
date: 2016-11-29 16:32:17
type: post
tags:
  - Security
  - DevOps
  - SysAdmin
  - Rambling
---

Let’s face it, information security is **important**.  With more and more data being stored and accessed via the internet, we are becoming increasingly reliant on “third parties” to secure our personal data responsibly.  So how is it that we are seeing so many data breaches and poor practices?

Be under no illusion, this is a difficult topic to cover in a brief blog post, as the subject extends across many surfaces of both technical and behavioral patterns.

> This post is **not** designed to lambast end user behavior; it’s primarily concerned with some IT suppliers attitude to security.

Information security is a very generic term.  It can cover anything from encryption of data _(both at rest and in transit)_ through to unintended exposure to browser bugs.

## The list is long

With so many potential attack vectors available, it’s not exactly surprising that the IT industry sometimes get’s it wrong.  However, “getting it wrong” isn’t _always_ the issue.  Indeed in many walks of life, people get things wrong, but with considered, responsible and honest action, damage can be significantly mitigated.

As I see it, more often than not, the problem can be the attitude _(or even just plain naivety),_ of some software vendors when it comes to dealing with security.  Working primarily in the education sector, I am astonished at just how many websites _(evangelized as being for education)_ have data capture processes and even logon screens that are not hosted on secure webpages *(not HTTPS).*  I have in the past three months alone felt impelled to advise three companies about this very fact.  To be fair, all but one of them, were exceptionally thankful for the information and promised to rectify the issue.

I was pleased to read that from January 2017, the [Google Chrome browser plans to start highlighting Not Secure websites](https://medium.servertastic.com/chrome-plans-to-start-highlighting-not-secure-websites-2babf35b46e6#.4eplxevw0) – people shall soon be greeted with the below warning when visiting such sites.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/3d488715-8503-44db-9883-2dc416a037cd-min.png"/>
{{< /rawhtml >}}

Nowadays, with free certificates available from organizations such as [Let’s Encrypt](https://letsencrypt.org/), there really isn’t any reason not to secure webpages transmitting personal data.

## Even more alarming!

Another very recent incident, which was **extremely** alarming, pertained to the use of a secure [VPN](https://en.wikipedia.org/wiki/Virtual_private_network) to a very large medical institution _(I shan’t divulge the specific institution, but suffice to say, they’re big in health in the UK!)._

We noticed that a certificate on the site which was used as part of the the initial VPN connection process, had expired!  If this wasn’t worrying enough, when we raised the query, the response from the 1st Line Support desk was to “ignore” the certificate warning and just click continue.  **Suffice to say, we didn’t**.

In my opinion, this exposed a clear lack of understanding in the importance of using valid certificates.  To be fair once contact was made with 3rd Line Support, the issue was rectified and they were equally appalled at the recommendation to just click “continue”.

However, the point remains that this is a major institution, dealing with potentially sensitive personal data, frequently making claims about the need for good security, and yet the recommendation from 1st Line Support was to click continue on an invalid certificate warning.  Need I say more.

## Anyone can do it

One of the primary issues as I see it, is that anybody can set themselves up as a software vendor.  A quick tutorial on the internet and away you go; [SQL Injection](https://en.wikipedia.org/wiki/SQL_injection) exposure included for free!

To be honest, I’m not entirely sure what the best solution is.  I don’t think that academic qualification is necessarily the answer; in truth, most IT qualifications quickly become outdated anyway.  It’s also worth noting that I don’t have a dedicated academic qualification in internet security, yet through sheer passion, avid podcast listening, blogpost reading and attendance of seminars, I would claim to have a solid knowledge and understanding in this arena.

Whatever the future holds, I for one, firmly believe that security needs to be taken seriously.  Products _(both old and new)_ need investment, so they’re not subject to common attack vectors _(ahem…TalkTalk)._

In addition, IT practices need to be better focused, in order that they don’t unnecessarily expose backdoors _(be it_ [_database backups held on web facing servers_](https://www.troyhunt.com/the-capgemini-leak-of-michael-page-data-via-publicly-facing-database-backup/) _or just poor password management)._

---

## Useful links

- [Troy Hunt Blog](https://www.troyhunt.com/)
- [Risky Business Podcast](http://risky.biz/)
- [Excellent Video Explaining CRSF](https://www.youtube.com/watch?v=9inczw6qtpY)
- [Have I Been Pwned Website](https://haveibeenpwned.com/)
- [KeePass Password Safe](http://keepass.info/)
- [OWASP Top Ten](https://www.owasp.org/index.php/Top_10_2013-Top_10)
