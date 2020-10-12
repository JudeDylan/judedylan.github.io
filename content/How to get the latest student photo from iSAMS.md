---
layout: post
title: "How to get the latest student photo from iSAMS"
date: 2017-10-22 15:59:57
type: post
tags:
  - SSRS
  - iSAMS
  - QuickTip
  - SQL
---

It’s been eight months since my last blog post, having taken on a new job, been on the receiving end of a full-on enterprise ransomware attack _(that wasn’t nice!)_ and quite frankly experiencing one heck of a baptism of fire - I felt it was time do write a quick blog post tip!

In my new role, I haven’t had a lot of time or indeed need, to write many database queries.

However, recently I was asked if I could assist in the production of a simple SSRS report that displayed amongst other things, photos of students.

Having created a first draft, it soon became apparent that the photo I was pulling into the report, was the <u>first</u> photograph ever taken of the student on the system – this could have indeed been the correct one, or it may have been a photograph taken several years ago; as you can no doubt imagine, a pupil’s appearance can change a lot over several years!

The difficulty is that in iSAMS, you can’t simply write a query to get the latest photo; there isn’t a flag that states “this is the current photograph” (well, not that I am aware of anyway).

After some [stackoverflow](https://stackoverflow.com/) searching, I established that what was required was a “**greatest-n-per-group**” query.  Simply put, you want to link a table to another table, but ONLY display the **latest** record in the reference table, irrespective of how many rows there are per individual (e.g. you just want the latest photo of each student).

This is the full query that I used on iSAMS as the basis for the SSRS report.  The section that specifically deals with obtaining the latest photograph of the student, is highlighted.

```SQL
SELECT p.txtschoolid,
       p.txtsurname,
       p.txtforename,
       A.txtcontactssurname,
       A.txtcontactsforename,
       AL.tblpupilmanagementaddresslinkid,
       A.tblpupilmanagementaddressesid,
       ( '(' + Isnull(A.txtrelationtype, '') ) + ')' + Char(13) + Char(10) +
       ( Isnull(A.txtcontactstitle, '') + ' '
         + Isnull(A.txtcontactsforename, '') + ' '
         + Isnull(A.txtcontactssurname, '') ) + Char(13) + Char(10) + (
       Isnull(A.txtsecondarytitle, '') + ' '
       + Isnull(A.txtsecondaryforename, '') + ' '
       + Isnull(A.txtsecondarysurname, '') ) AS ParentNames,
       ( p.txtprename + ' ' + p.txtsurname ) AS PupilName,
       p.txttype,
       y.txtyearcode,
       'https://YOURSCHOOLNAME.isams.co.uk' + pic.txtpath AS Photo
FROM   tblpupilmanagementaddresslink AL
       INNER JOIN tblpupilmanagementpupils p
               ON( AL.txtschoolid = p.txtschoolid )
       INNER JOIN tblpupilmanagementaddresses A
               ON( AL.intaddressid = A.tblpupilmanagementaddressesid )
       INNER JOIN tblschoolmanagementyears y
               ON( p.intncyear = y.intncyear )

--THIS IS THE SECTION THAT ESTABLISHES THE LATEST STUDENT PHOTO
       JOIN tblpupilmanagementpictures pic
         ON( p.txtschoolid = pic.txtschoolid )
			LEFT OUTER JOIN tblpupilmanagementpictures pic2
                    ON( p.txtschoolid = pic2.txtschoolid )
                      AND ( pic.intorder < pic2.intorder )
		WHERE  pic2.txtschoolid IS NULL
--END OF SECTION

       AND p.intsystemstatus = '1'
       AND a.txtrelationtype IN( 'Parents', 'Mother', 'Father' )
```
