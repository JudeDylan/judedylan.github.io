---
layout: post
title: "Stamp an iSAMS report with the current username"
date: 2014-11-30 08:28:45
type: post
tags:
  - iSAMS
  - MIS
  - JavaScript
  - SSRS
  - PowerShell
---

During the summer of 2014, we migrated the St Mary’s Shaftesbury MIS _([Management Information System](http://en.wikipedia.org/wiki/Management_information_system))_ from [Schoolbase](http://www.furlongsolutions.com/) to [iSAMS](http://www.isams.co.uk/).

> Please note, that the reasons for instigating this major system change, and the processes involved _(political & technical),_ are _not_ covered in this blog post.

Anyone who has ever had responsibility for changing a central IT system, will know that it’s never a pain free experience, and can be fraught with frustration.  Thankfully, in our particular instance, I can report that the majority of bespoke functionality and add-ons, were successfully ‘ported’ over from one system to another.  Data migration, for the most part, was also a success.

Once iSAMS was in place, there were some data report requirements; iSAMS uses [SSRS](http://msdn.microsoft.com/en-us/library/ms159106.aspx) for it’s reporting engine, so several reports had to be re-created within this environment.

One such requirement was for a health & emergency contact report, which in short, was to include the student photograph and an array of medical and parental contact information; ideal for trips etc.

> It goes without saying that this report also needed to be clearly stamped with instructions and guidance pertaining to [Data Protection](https://ico.org.uk/for_organisations/data_protection) legislation.

The report itself was a fairly complex composition of embedded reports and queries, which resulted in a nice presentation of the required data.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/756b7cef-8082-48ab-9b30-22f768c28cab-min.jpg" />
{{< /rawhtml >}}

## Traceability

Whilst the report performed the task perfectly, from a data extraction perspective, and was indeed ‘stamped’ _(in bright red)_ with instructions regarding the shredding of the document after use etc, there were no details about who had _actually_ printed the report.

After a _lot_ of Googling and code testing _(including the creation of bespoke SSRS functions within the report),_ I came to the conclusion that grabbing the name of the user who actually instigated the report, was not possible from the server.

Logically the workflow doesn’t allow for this, as from an SSRS perspective, the ‘user’ and indeed the ‘machine’ firing the report, are of course, the iSAMS generic user and iSAMS server!

## Resolved

A re-think of the workflow, led me to establishing the presence of an iSAMS ‘[cookie](http://en.wikipedia.org/wiki/HTTP_cookie)’ _(using the excellent_ [_fiddler_](http://www.telerik.com/fiddler) _program to sniff traffic),_ providing username details.  All I needed to do, was extract this cookie and send it as a form parameter, when the report was requested.  This parameter could then be included within the SSRS report, as an [SSRS Parameter](http://msdn.microsoft.com/en-us/library/dd220464.aspx) field, and displayed accordingly – simple!

I’m happy to report that after locating the iSAMS ASP form and establishing the appropriate function call, I was able add a small JavaScript snippet and HTML form field, to this page (_detailed below),_ which resulted in the user’s name _(from the cookie)_ being printed onto the report.

Job done!

```JavaScript
// Add this snippet to the ProcessForm() function in the reportingServicesReportSelection.asp
// located in "iSAMS\iSAMS.Framework\modules\StudentManagement\current"

//Get userName
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
try {
    var userNameCookie = getCookie("iSAMS=UserCode");
    if (userNameCookie.length >= 1) {
        document.form1.userName.value = userNameCookie.substr(0, userNameCookie.indexOf(
            '&'));
    } else {
        document.form1.userName.value = "-";
    }
} catch (err) {
    console.log(err);
}
//End Get userName
```

```HTML
<!--Add this line to the form with id="form1" in the reportingServicesReportSelection.asp
    located in "iSAMS\iSAMS.Framework\modules\StudentManagement\current" -->

<input type="hidden" name="userName" id="userName" value="" />
```

---

## A Real World Solution or Just a Proof Of Concept?

Of course, I fully appreciate that it only needs iSAMS to overwrite this page on an update, and my code snippet will vanish.

To cater for this _potential_ code destruction, we have implemented the below [PowerShell](http://en.wikipedia.org/wiki/Windows_PowerShell) script, which runs on a nightly schedule.  The script automatically emails the ICT Department, if there are any changes made to this particular file _(using the [Compare-Object](http://technet.microsoft.com/en-us/library/ee156812.aspx) PowerShell [cmdlet](http://msdn.microsoft.com/en-gb/library/ms714395%28v=vs.85%29.aspx))_.

**It’s a useful PowerShell script in it’s own right!**

```PowerShell
#################################################
$smtpServer="Your SMTP Server"
$from = "Your From Email Address"
$emailaddress = "Your Send To Email Addressk"
$subject = "The reportingServicesReportSelection.asp file has changed"
$body = "The reportingServicesReportSelection.asp file has changed, you need to re-add the script"
$strReference = "Your Path To An Original Copy Of The File"
$strDifference = "Your Path To a Deployed Copy Of The File"
#################################################

if (Compare-Object (gc $strReference) (gc $strDifference)) {

    Send-Mailmessage -smtpServer $smtpServer -from $from -to $emailaddress -subject $subject -body $body -bodyasHTML -priority High
}

else {
    return
}
```

---

Clearly an even better solution, would be having this functionality **officially** built into the iSAMS product, thus allowing for the creation of traceable reports.  However, in the meantime, whether you choose to view this as just a ‘_proof of concept_’ or a ‘_real world solution_’, it certainly seems to work for us.

---

_**Update**_

_It transpires that the framework files **do** indeed get overwritten on a nightly basis!_

_I believe this is performed by ISAMS referencing a ‘Framework.xml file’ (in the root), which stores file information, including file hashes._

_Using [onlinemd5.com](http://onlinemd5.com/) I created a hash of the ‘new’ file, and updated ‘Framework.xml’ accordingly.  The question is whether this ‘Framework.xml’ file is centrally updated by iSAMS, periodically?  I suppose only time will tell._

_It could be that only iSAMS can truly prevent the file from being overwritten – thus, a support email has been sent, asking for guidance._

_In the meantime, we will run with this process; of_ _course, if anyone else has a better solution, please suggest!_
