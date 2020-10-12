---
layout: post
title: "Office 365, Outlook & attachments"
date: 2016-01-17 13:22:59
type: post
tags:
  - Office 365
  - SysAdmin
  - QuickTip
---

Recently, we received rather confusing claims from specific users, stating they were receiving certain emails, often _**days**_ after they had been sent.  This behavior was not consistent across the user base.

> _Great – inconsistent errors; don’t you just love them?!_

Without dissecting the ins and outs of exchange message tracking in this post, suffice to say, it became clear that there _wasn’t_ anything technically wrong with the message flow mechanism; it had the hallmarks that emails were _not_ being sent from the client at the time the user thought.

Due to time constraints and slightly inconsistent information, this was unfortunately allowed to fester for far too long, without a satisfactory conclusion.

## Replicating the Process

Eventually, as expected, the issue raised its head again *(albeit in a slightly different context).*  This time, both I and the user sending the emails, were in a better position to analyse behavior.

> _When I saw the process being used, it jumped out at me instantly, what problem was._

---

## Some Workflow Facts

- This user primarily _(although not all the time)_ uses the web based, Office 365 Mail as their preferred method of sending emails – perfectly acceptable; indeed encouraged in some environments.

- This user, when sending attachments from Word, uses the ‘Share’ options from within Word to ‘Send as Attachment’ _(not the process I use, but again, perfectly acceptable)._

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/948dded5-4f41-4421-848f-133b9735fc32-min.png"/>
{{< /rawhtml >}}

## The Problem

It appears that when using this option to send attachments, if you _don’t_ have the native client version of Outlook running, no email is sent.

As soon as the user opened up Outlook _(the client)_ – the email went!

## Conclusion

Let’s be clear, this end user wasn’t doing _anything_ wrong, they were correctly using in-built functionality to perform a task.  They are not expected to know that Outlook needs to be running.  Alas, there is also no appropriate dialog box feedback from Word, explaining this.

Of course, I subsequently demonstrated that the web version of Office 365, was indeed just a webpage \_(agreed, a phenomenal webpage, but nevertheless, a webpage) - Word doesn’t know about this webpage and is expecting to use the inbuilt Outlook program.

---

## Lessons learnt:

- Ensure that you _always_ see the entire process from the end user’s perspective.
- Never assume that everyone performs daily tasks, in the same way that you do!

Of course having been in this industry for well over 15 years – this is nothing new; but clearly some lessons need to have time put aside, and re-learnt!
