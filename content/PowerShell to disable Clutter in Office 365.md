---
layout: post
title: "PowerShell to disable Clutter in Office 365"
date: 2016-03-08 18:19:57
type: post
tags:
  - PowerShell
  - QuickTip
  - SysAdmin
  - Office 365
---

Most users of Office 365 will no doubt be aware of the [Clutter](https://support.office.com/en-us/article/Use-Clutter-to-sort-low-priority-messages-in-Outlook-2016-for-Windows-7b50c5db-7704-4e55-8a1b-dfc7bf1eafa0) folder; for the most part this Clutter folder works pretty well.

> I’m not intending to go into the algorithmic processes of how the Clutter folder works, in this blog post - even if I could!

Despite this being a rather impressive addition to email functionality, it can unfortunately present problems for some users.  These issues can be anything from [False - Positives](http://whatis.techtarget.com/definition/false-positive) to end users not fully understanding the process, and the requirement to check two folders _(in order of priority)._

Alas, it must also be said that in my experience, this latest addition to Outlook, has on occasion been used to _conveniently_ claim non-receipt of email; the modern day version of _**“the dog ate my homework”.**_

Despite all end users having complete control of their Clutter functionality _(to enable or disable),_ we have recognised a need to manage this centrally.

As such, after some Googling and script manipulating, we created three variants, allowing for centralised configuration of Clutter folders, via PowerShell.

- Disable for all users.
- Disable for individual user.
- Disable for specific groups.

## Show me the code!

```PowerShell
####Create an Office 365 session connection
$UserCredential = Get-Credential
$Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri https://outlook.office365.com/powershell-liveid/ -Credential $UserCredential -Authentication Basic -AllowRedirection
Import-PSSession $Session


###Use this Powershell script to disable Clutter across all accounts
Get-Mailbox | Set-Clutter -Enable $true

###Use this PowerShell script to disable Clutter for an individual (in this example "PTest")
Set-Clutter -Identity PTest@YourDomain.com -Enable $false

###Use this PowerShell script to enumerate through an AD Group (in this example "Students")
$AllStudents = Get-DistributionGroupMember -Identity "students"
foreach ($Student in $AllStudents){
    Set-Clutter -Identity $Student.Identity -Enable $false
}


###Close Office 365 session connection
Remove-PSSession $Session
```
