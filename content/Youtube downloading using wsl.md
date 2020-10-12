---
layout: post
title: "YouTube downloading using WSL"
date: 2018-10-13 08:01:59
type: post
tags:
  - WSL
  - Linux
  - Quicktip
---

To be honest, as I'm sure any right-minded individual would agree, downloading videos from YouTube for personal gain is **wrong**.  However, there are occasions when it is arguably reasonable and possibly even legitimate to do such a thing.

It could be that you wish to use a video in a presentation and can’t rely on internet connectivity or just feel "safer" presenting the video offline for fear of an embarrassing spinning buffer wheel of doom!

Over the years, a market opened up for online YouTube downloading services *(often accompanied with their complimentary malware and/or questionable adverts).*

Many of these "services" have since become unusable.

There is however, a quite wonderful solution – albeit requiring Linux.

No fear, with the WSL (Windows Subsystem for Linux) on Windows 10, you are just a few steps away from seamless (at the time of writing) YouTube downloading – of course for reasonable and legitimate purposes!

---

#### **Prerequisites**

You will need Windows 10 WSL enabled (this [link](https://docs.microsoft.com/en-us/windows/wsl/install-win10 "link") will walk you through that process).

- Open a command prompt and enter **wsl**
- Enter **sudo apt-get update**
- Enter **sudo apt-get upgrade**
- Enter **sudo apt-get install python-pip**
- Enter **sudo pip install youtube-dl**

Aside from the occasional checking for update, you shouldn't need to perform the above prerequisites again.

---

**To download a video**

- Enter **sudo youtube-dl https://www.youtube.com/watch?v=HKnxmkOAj88** _(change the url as appropriate to the video required)_
- The video should download and save to a location accessible from Windows - this can vary, but a good place to start is your "user" folder within Windows.

If you experience issues, you can clear the cache by typing **sudo youtube-dl -rm chache-dir**

---

As noted as the top of this post, you should only use this process for reasonable and legitimate purposes.
