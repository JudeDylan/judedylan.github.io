---
layout: post
title: "Secure a webpage without a logon?"
date: 2015-09-19 12:58:34
type: post
tags:
  - C#
  - Razor
  - Website
  - Security
---

Secure access to a webpage, without the need for a logon, can often be viewed as a bit of a holy grail solution.

Recently, I introduced a frictionless _(logon free)_ way of providing _secure(ish)_ access to some very basic web services.

_….I can hear all those security experts screaming already!_

> _Before I proceed any further, please note that this solution **must never be seen as a proper security authentication replacement!**_

What this can be viewed as, is an ideal solution for those ‘_edge’_ cases, where you may have a website, that **isn’t** specifically data sensitive, yet requires private access.

An ideal candidate could be an administration page for entering dates or events onto a basic website.

---

## Security by Obscurity

In many ways, this solution does follow the [Security by Obscurity](https://en.wikipedia.org/wiki/Security_through_obscurity) model, **but** with the crucial addition of an extra layer!

A lot of web services nowadays are using the ‘complex url’ pattern of keeping a resource public, yet almost impossible to guess _(for instance, some ways of sharing documents on Microsoft_ [_Oncedrive_](https://onedrive.live.com/about/en-gb/) _etc)._

To clarify, this is where the web address contains random characters (often appended to the end of the url), which mean absolutely nothing to the end user, but are actually a unique resource code.

**Complex URL forms the first part of this implementation.**

- Create a ‘key’ which is appended to a [query string](https://en.wikipedia.org/wiki/Query_string).
- Check the query string being sent to the server, on page request, to establish whether or not to display the resource.

Very basic, yet surprisingly secure(ish).

Of course, the main concern with this solution, is that whilst the web address may not be guessable, it is certainly shareable!

## Enter Secure Cookies

The crucial secondary level to this solution, is to ensure a secure cookie is present on each device you are allowing to access this web resource.

> No cookie – No access

Again, a simple principle, but surprisingly secure – indeed, let us not forget, that secure http cookies are pretty much what governs conventional web authentication processes anyway!

Of course throw it all onto port 443 (https) and you extend the security even further.

---

## The Code!

Below is an example of how this very basic process can be implemented in asp.net (c#).

**Adding cookie to the device _(also providing the ability to remove)_**

```C#
@{
    String cookieQueryString = Request.QueryString["cookieSetter"];

    switch (cookieQueryString)
    {
        @* QueryString "remove" - This deletes the cookie from the device *@
	case "remove":
            Response.Cookies["NSSecureMethodCookie"].Expires = DateTime.Now.AddYears(-30);
        break;

	@* QueryString "add" - This creates the cookie on the device *@
        case "add":
            HttpCookie aCookie = new HttpCookie("NSSecureMethodCookie");
            aCookie.HttpOnly = true;
            aCookie.Value = "Authorised";
            aCookie.Expires = DateTime.Now.AddYears(30);
            Response.Cookies.Add(aCookie);
            break;

    }
}

@* Visual feedback for cookie *@
@if (Request.Cookies["NSSecureMethodCookie"] != null)
{
    Response.Write("Cookie Found");
    Response.Write("<br/>");
    Response.Write(Request.Cookies["NSSecureMethodCookie"].Value);
    Response.Write("<br/>");
    Response.Write(Request.Cookies["NSSecureMethodCookie"].Expires);
    Response.Write("<br/>");

}
```

**Storing the complex query string in a web.config for easy maintenance**

```XML
  <appSettings>
    <add key="ComplexURLQueryString" value="hhqsdc332323vxzcjsdffbfsh12sdfdfgdfgdfgwerktyykfdhgdhjsdfsdfasdffdfww"/>
  </appSettings>
```

**Server side checking that cookie is present and query string matches**

```C#
@using System.Configuration;

@{

    string ComplexURLFromWebConfig = ConfigurationManager.AppSettings["ComplexURLQueryString"].ToString().Trim();

    @* QueryString sent from url *@
    string QueryStringComplexURL = (Request.QueryString["ComplexURLQueryString"] ?? "").ToString().Trim();


    if (ComplexURLFromWebConfig != QueryStringComplexURL || Request.Cookies["NSSecureMethodCookie"] == null)
    {
        var data = "Unathorised";
        Response.Write(data);
        Response.End();
    }

}
```

---

## Summary

I have used this approach on several basic web solutions, that _don’t_ require armour plating security, but equally shouldn't ideally be exposed to all and sundry.

My recommendation, would be to use this on internal sites _(behind the firewall)_ or small public sites.  It makes life remarkably simple for updating basic content, without having to implement a full authentication system.

Indeed, one _could_ argue that this is **even more secure** than some conventional username and password systems – _especially_ when you often see the ridiculously hackable passwords that some end users use!

Of course, it doesn't particularly scale well, and will cause slight annoyance if you clear down your cookies; but then again, it is only intended for quick solution, niche requirements.
