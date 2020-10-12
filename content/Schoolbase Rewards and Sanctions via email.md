---
layout: post
title: "Schoolbase Rewards and Sanctions via email"
date: 2014-05-08 10:04:30
type: post
tags:
  - Schoolbase
  - MIS
  - Crystal Reports
---

At St Mary’s Shaftesbury, one of the _many_ additional functions we have built, to work alongside our [Schoolbase](http://www.furlongsolutions.com/products/schoolbase) [MIS](http://en.wikipedia.org/wiki/Management_information_system) *(Management Information System)*, is the automation of a weekly ‘Rewards and Sanctions’ report.

Despite this being one of the more simpler technical features we have implemented, it remains one of the most popular; indeed, if this weekly report fails to _magically_ appear in appropriate email in-boxes on time, we are informed by concerned parties, quicker than you can say ‘where’s my rewards and sanctions report!

## how the magic works!

These reports are written in [Crystal Reports](http://www.crystalreports.com/), and scheduled for weekly email delivery, using an excellent and free _(for up to 6 reports),_ software application called [Crystal Delivery](http://www.groffautomation.com/).

_(please note: we have historically used version 8.4.0 of Crystal Delivery, which was completely free with no report limitation.  It appears that this version is no longer available on their website; a newer, and possibly better version 10.4.2, is now the preferred download – this is still free to use, for up to 6 reports)_

Whilst nowadays, we tend to prefer a more web centric approach for data delivery _(embedding directly into our_ [_Firefly VLE_](http://fireflysolutions.co.uk/) _etc),_ Crystal still has a significant role to play, and is for the best part, an excellent [business intelligence](http://en.wikipedia.org/wiki/Business_intelligence) and data reporting tool; indeed at the time of posting, Schoolbase as a product, now uses Crystal as it’s main report generation system.

_It’s worth mentioning, that we have been using Crystal Reports to access a wealth of data, since we started using Schoolbase nearly ten years ago._

---

## installation

1.  Download and install Crystal Delivery from the main Groff website [here](http://www.groffautomation.com/) - _(selecting either the free 6 report version or the fully purchased option)._
2.  You may also need to download and install Microsoft SQL Compact 3.5 from [here](http://groffautomation.com/files/SSCERuntime_x86-ENU.msi).
3.  Again, depending on your environment, you may need to download and install the Crystal Reports Runtime from [here](http://groffautomation.com/files/CRRuntime_32bit_13_0_5.msi).

> _I did experience a few minor issues when testing out the latest version, and I would strongly recommend you install all the above prerequisites prior to adding any reports._

Once you have installed Crystal Delivery, create an SQL View on your Schoolbase database, so that Crystal Reports can access appropriate data, specific to rewards and sanctions.

This view can be created, by running the below script on your Schoolbase database:

```SQL
CREATE VIEW DBA_RandSView
AS
SELECT TOP (100) PERCENT Sanctions.Sanction
	,Pupil.Pu_Surname
	,Pupil.Pu_GivenName
	,Years.YearDesc
	,PupSanction.PupSanDate
	,PupSanction.PupSanCount
	,PupSanction.PupNewNote
	,Staff.UserName
	,Sanctions.SanIdent
	,Pupil.PupOrigNum
	,PupSanction.PupSanNote
FROM dbo.PupSanction AS PupSanction
INNER JOIN dbo.Staff AS Staff ON PupSanction.UserIdent = Staff.UserIdent
INNER JOIN dbo.Pupil AS Pupil ON PupSanction.PupOrigNum = Pupil.PupOrigNum
INNER JOIN dbo.Sanctions AS Sanctions ON PupSanction.SanIdent = Sanctions.SanIdent
INNER JOIN dbo.Years AS Years ON Pupil.YearIdent = Years.YearIdent
ORDER BY Years.YearDesc
	,PupSanction.PupSanDate
```

Finally, you can download a copy of the _actual_ crystal report, that will be used to generate the rewards and sanctions export, from my GitHub account [here](https://github.com/normansolutions/SBCrystalReports/blob/master/R&SReport.rpt?raw=true) – save this to a central location _(e.g. a ‘schedules’ folder on your server)._

---

## A note on data location

**Please be advised that you _will_ need a copy of Crystal Reports in order to** [**change the Datasource Location**](http://www.sdn.sap.com/irj/scn/index?rid=/library/uuid/7070ebe4-ca28-2e10-d9ad-c11039edbd9a&overridelayout=true).

> _Open the report in Crystal, and change the data-source location ([using these instructions](http://www.sdn.sap.com/irj/scn/index?rid=/library/uuid/7070ebe4-ca28-2e10-d9ad-c11039edbd9a&overridelayout=true)) connecting to your own Schoolbase database._
>
> _If you prefer, you could create an [ODBC](http://en.wikipedia.org/wiki/Open_Database_Connectivity) connection titled **Schoolbase**, which this report should recognise (no Crystal Reports required)._

---

## configuration

Start the Crystal Delivery application, and configure the email settings _(Tools > Mail Settings):_

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/d14eb04a-6456-4e19-aa10-cb9352e06773-min.png"/>
{{< /rawhtml >}}

Enter your SMTP server details etc:

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/1201b59e-6c29-4a80-b114-0a41b29dcc16-min.png"/>
{{< /rawhtml >}}

Create a new Schedule, by clicking the ‘Schedule’ button, and locate the Crystal Report _(titled ‘R&SReport.rpt’)_ that you downloaded previously:

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/8f3227d1-94e9-48e2-be50-de8b4d059abd-min.png"/>
{{< /rawhtml >}}

Locate an export directory and create a default export file name, by clicking on the ‘Export Directory’ tab, ensuring you create this as a **pdf** type document _(this can just be a local folder on the server):_

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/f6ae4eb4-ed26-437d-9a81-20db6dbb809c-min.png"/>
{{< /rawhtml >}}

Ensure you have the ‘Email File’ check box ticked:

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/c7a6f3ff-4d7a-4227-8d4d-f9978762f55b-min.png"/>
{{< /rawhtml >}}

You then need to provide appropriate filters for the query using the ‘Parameters’ tab.  In our instance, we set the two query parameters as below:

_Date From:  **Today (Days):-7**_  
_Date To: **Today (Days):0**_

This will provide a data export, of rewards and sanctions for **_only the past week_**:

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/71763c7a-1669-47a6-b50a-14eed2f6c1e0-min.png"/>
{{< /rawhtml >}}

Compose the email body content on the ‘Export Email’ tab:

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/9feb5b58-672e-4e06-b7b3-c3c2c0b3b37f-min.jpg"/>
{{< /rawhtml >}}

Finally, set the scheduling requirements on the ‘Schedule’ tab; in this example, we have this scheduling at 4AM, only on a Monday:

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/ecbebd28-77c6-4dfd-832f-61e258845bf9-min.png"/>
{{< /rawhtml >}}

---

## ...and that’s it!

You may of course wish to edit the Crystal Report to suite your own requirements – indeed I would _encourage_ this.  We have different exports that target specific groups (_House Mistresses, Head’s of School etc)_ – all governed by different query filters.

We also have colour format changes based on ‘_Reward’_ or ‘_Sanction’_ etc.

---

## Final note

I should mention, that we have historically run these schedules on Crystal Delivery version 8.4.0 _(which we still have)_ and in truth, whilst testing out version 10.4.2, I did experience some ‘flaky’ behaviour.  Equally, to be fair, 10.4.2 is currently in a beta release; as such we will probably stick with 8.4.0 for the time being!
