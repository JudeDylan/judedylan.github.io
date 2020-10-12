---
layout: post
title: "How to populate an O365 DG from a Security Group"
date: 2019-06-28 09:41:46
type: post
tags:
  - SysAdmin
  - Exchange
  - PowerShell
  - QuickTip
---

Having fully migrated our on-prem Exchange to Exchange Online, there were a few little gotchas along the way that we had to contend with - which was to be expected.

One of the more surprising elements was the realisation that our local mail-enabled Security Groups would need to be broken up into two elements; a conventional **Security Group** _(maintaining local permission management)_ and an **Exchange Online Distribution Group** for email purposes etc.

Having built a process for splitting these groups and successfully creating the online companion groups _(namely Office 365 Distribution Groups)_, we ideally needed to ensure they were equally populated.

Having written the below PowerShell script, this enabled us to take members of an existing (and still synchronised) on premise Security Group and populate the new Office 365 Distribution Group with identical membership.

---

This needs to be run from the Exchange Online PowerShell console ([details here](https://docs.microsoft.com/en-us/powershell/exchange/exchange-online/connect-to-exchange-online-powershell/mfa-connect-to-exchange-online-powershell?view=exchange-ps#what-do-you-need-to-know-before-you-begin "Exchange Online PowerShell ")):

```PowerShell
#Connect to MSOL`

Connect-MsolService

#Assign details of the required group (e.g. staff) to a variable called $groupGUID`

$groupGUID = Get-MsolGroup -SearchString "Staff"
#Assign members of that group to a variable called $groupUser targeting the group ID`

$groupUser = Get-MsolGroupMember -GroupObjectId $groupGUID.ObjectId

#Enumerate over each user in the group adding them as members to new Office 365 Distribution group`

$groupUser | foreach { Add-DistributionGroupMember -Identity "Staff Email" -Member $_.EmailAddress }
```

---

Suffice to say this made life a lot easier resulting in a **successful** migration of our on premise Mail Enabled Security Groups.
