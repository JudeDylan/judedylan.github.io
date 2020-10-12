---
layout: post
title: "Encourage those Windows to restart!"
date: 2018-10-01 19:47:29
type: post
tags:
  - Powershell
  - SysAdmin
  - Quicktip
---

A common issue with supporting a primarily Windows based user body, is that thanks to the "always on" expectation emboldened by smartphones and tablets, it can be a constant battle to try and encourage end users to restart their computers with some degree of regularity - yes IT friends, you know exactly what I mean!

There are legitimate reasons as to why restarting your PC frequently will reap benefits, although that is beyond the scope of this article - but suffice to say it's not always to do with the quality of Windows; indeed more often than not it's third party software solutions that are the culprit.

Forcing an early hours restart on machines can prove to be a beneficial solution.  Clearly this must only be performed in appropriate circumstances and I wouldn't recommend forcing a restart on key workstations or servers!

There are several options for automatically restarting computers _(lets face it, people have been using batch files for years)_ but I have found that by far the best solution is to automatically "feed-in" all machines within a specific Active Directory OU.  This negates the need to manually maintain a text file of machine names.

The below PowerShell script will take all computers within a given OU and force a restart.  All that is needed is for this script to be scheduled with Task Scheduler at an appropriate time (e.g. 3am every day).

It goes without saying that you should always test this script before implementation and also be extremely mindful of how your end users will react if their computers are automatically restarted every day - communication as always is key!

Since implementing this process, we have registered a noticeable decline in helpdesk support calls pertaining to those "odd issues" surrounding end user PC's so for us, it has clearly proven beneficial.
