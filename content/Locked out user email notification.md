---
layout: post
title: "Locked out user email notification"
date: 2015-06-20 15:11:29
type: post
tags:
  - DevOps
  - PowerShell
  - SysAdmin
  - QuickTip
---

It recently occurred to me, that whilst my current full-time position is an IT Systems Manager, the majority of my blog posts thus far, have been more web centric – which is great, as I love the web and web technologies!

However, I felt in the interest of balance, I should introduce a few more tips and tricks that we use on a regular basis, in a more ‘operations’ capacity.

> _This post is a **QuickTip**, in the sense that it won’t digress into inner details, the whys and wherefores; designed to be quickly referenced._

---

## Problem

You have an [Network Password Policy](<https://technet.microsoft.com/en-us/library/hh994572(v=ws.10).aspx>) in place – you would like to be notified _(preferably by email)_ when an account is locked out.

## Solution

In truth, there are numerous solutions on the internet about how to implement this functionality - this post is just how we do it.

Place a copy of the below PowerShell script in an appropriate folder on your Domain Controller _(configure relevant email variables in the script, accordingly)._

```PowerShell
########################################################################
# Please Configure the following variables - $smtpServer and $from
# Leave the $event and $body variables as they are
$smtpServer="YOUR SMTP SERVER"
$from = "SET FROM EMAIL ADDRESS"
$event = Get-EventLog -LogName Security -InstanceId 4740 -Newest 1
$body = $event.Message + "`r`n`t" + $event.TimeGenerated
########################################################################

Send-Mailmessage -smtpServer $smtpServer -from $from -to $from -subject "Account Lockout" -body $body -priority High
```

[Schedule a task](https://technet.microsoft.com/en-us/library/cc766428.aspx) on your Domain Controller, to trigger whenever the event log receives a **Security Log Event 4740.**

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/458ccbea-34b5-4af6-9783-65df213bd415-min.jpg"/>
{{< /rawhtml >}}

Set the task scheduler action to **Start a Program** _(path to the local PowerShell executable)._

Pass in the the PowerShell script as an optional argument using the **–file** switch.

(example: **\-file "\\LockOutNotification.ps1")**

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/76c31e7d-9abb-4bdf-8618-f92eb2a5e691-min.jpg"/>
{{< /rawhtml >}}

---

## That’s it!

You should now receive an email notification each time a user account is locked out.

_(please note: as mentioned previously in this article, there a numerous posts on the internet about how to perform this functionality, and I would not wish to claim any form of unique authorship of the procedure – this is just the method that we have implemented at St Mary’s Shaftesbury)_
