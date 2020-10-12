---
layout: post
title: "PowerShell to secure AD users RDP access"
date: 2014-02-13 20:42:36
type: post
tags:
  - DevOps
  - PowerShell
  - SysAdmin
  - Script
---

It’s a sad fact that security can all too often be the [poor relative](http://www.troyhunt.com/2012/07/lessons-in-website-security-anti.html) in software and systems design _(please note that this blog post is not intended to address system security per se; the_ [_OWASP_](https://www.owasp.org/index.php/Main_Page) _website and / or security expert_ [_Troy Hunt’s blog_](http://www.troyhunt.com/), _are good references for that topic)._

This post is primarily designed to demonstrate a quick fix for what _could_ potential be a security hole pertaining to Active Directory user accounts and Remote Desktop access.

---

## AD User Options

When creating a new user in AD, depending on the network environment, several account configurations are automatically set _(profile paths, home folder settings, group membership etc)._

One of these options, is to **allow** or **deny** the user access to a [Remote Desktop Session](<http://msdn.microsoft.com/en-us/library/aa383496(v=vs.85).aspx>); in many instances this will automatically be set to allow, which is not _necessarily_ a bad thing.  However this _may_ be a security weakness, depending on circumstances _(e.g. possibly if one was to create a generic ‘visitors’ account etc)._

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/979763a7-af18-4ace-a47e-e6441a5f114f-min.jpg"/>
{{< /rawhtml >}}

Clearly, this can be controlled manually _(by ticking / unticking the appropriate check box)_ or indeed by using [Group Policy](http://en.wikipedia.org/wiki/Group_Policy).  However, there may also be times when it is preferable to run a script, that will _quickly_ change this setting for _all_ users, in a specific OU or OU’s.

For example, you may wish to **instantly** deny this permission for _all_ users on the entire network, allowing for a more controlled re-enabling, per OU.

> Enter PowerShell and [Quest ActiveRoles ADManagement](http://www.quest.com/powershell/activeroles-server.aspx), a set of free, predefined commands for Windows PowerShell.

Quest have offered this set of PowerShell extensions _(_[_cmdlets_](<http://msdn.microsoft.com/en-us/library/ms714395(v=vs.85).aspx>) _- or whatever the correct terminology for this add-on is!_ free of charge for several years; at this stage, it my be worth noting that [Quest appear to have been purchased by Dell](http://www.dell.com/learn/us/en/uscorp1/secure/2012-09-28-dell-acquisition-quest-software) – although from what I can gather, there doesn’t appear to be any negative change in the availability of this extension.

---

## The Script

The workflow is:

- To add the Quest Snapin _(which you will need to have downloaded and installed from [Quest ActiveRoles ADManagement](http://www.quest.com/powershell/activeroles-server.aspx))._
- To locate all users in the appropriate OU of choice, in your Active Directory _(you will need to populate this with your own LDAP / AD settings etc)._
- To select _only_ those users where this checkbox is currently set to **false** _(e.g. enabled)._
- To change this checkbox on all selected users, to **true** _(e.g. disabled)._

```PowerShell
Add-PSSnapin Quest.ActiveRoles.ADManagement -ErrorAction SilentlyContinue
Get-QADUser * -OrganizationalUnit "ou=Your Sub-OU,ou=Your OU,dc=Your LDAP,dc=Your LDAP" |
?{$_.TsAllowLogon -ne $true} |
Set-QADUser -TsAllowLogon $true
```

---

Clearly you can modify this script to enable all users by just reversing the true and false settings as appropriate, within the script.

---

_As with any scripting solution, especially those associated with Active Directory, you are advised to test thoroughly before deploying in anger!_
