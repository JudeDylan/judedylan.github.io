---
layout: post
title: "How to delete an email from all Exchange mailboxes"
date: 2018-10-16 15:45:26
type: post
tags:
  - Powershell
  - SysAdmin
  - QuickTip
  - Exchange
---

It's not uncommon to receive unwanted emails which have managed to work their way through the array of filtering systems in production.  Recently our organisation received such an email - a classic phishing email sent to multiple end user accounts.

Once aware, we were obviously able to block any further inbound instances of this email using our Office 365 Exchange Admin Centre Mail Flow Rules.  However this wouldn't of course remove any emails that had already landed _(so to speak)_ and were waiting dormant in a user's inbox ready to "pounce" metaphorically speaking, on the unsuspecting individual!

Ideally, we required the ability to traverse all email boxes automatically and delete the aforementioned email.

This was achieved using the below PowerShell scripts.  The first case gave a good overview of who had the email present in their inbox, whereas the second allowed us to remove it completely from all users.

A **very useful script** - not only for the removal of unwanted email, but also for when an email _may_ have been sent inadvertently to multiple users and needs to be removed with some urgency - now who would do that!?

---

**Prerequisites**

Open the Exchange Management PowerShell _(this usually needs to be done on the Exchange Server)._

You may also need to enable the appropriate Snapin by entering:

```PowerShell
Add-PSSnapin Microsoft.Exchange.Management.Powershell.Snapin**
```

---

#### **Case 1**

To purely search for the presence of an email _(as against deleting all instances of an email)_, you need to copy the results to an existing mailbox - you could use your own account or a spare one.

```PowerShell
Get-Mailbox -ResultSize unlimited | Search-Mailbox -SearchQuery 'Subject:"*Error Set*"' -TargetMailBox "SpareUser" -TargetFolder "SPAMFILES"`
```

**Explanation**

**SearchQuery** is the parameter used to search for a given email - in this instance it will search in the "Subject" for anything containing the words "Error Set" _(you can use wildcards)._

**TargetMailBox** is the parameter used for the user account which you wish to copy the result to.

**TargetFolder** is the parameter used for the name of the folder that you wish to deposit the emails into, within the user account mailbox _(it will self create if it doesn't exist)._

In summary, the above example will create a folder in the "SpareUser" email account titled "SPAMFILES" and deposit a copy of all email instances where the subject line contains the words "Error Set".

---

**Case 2**

To **delete** all instances of emails that match a given search query, you would run the following.

```PowerShell
Get-Mailbox -ResultSize unlimited | Search-Mailbox -SearchQuery 'Subject:"*Error Set*"' -DeleteContent`
```

**Explanation**

**SearchQuery** is the parameter used to search for a given email - in this instance it will search in the "Subject" for anything containing the words "Error Set" *(you can use wildcards).*

All emails matching the above query will be **deleted**.
