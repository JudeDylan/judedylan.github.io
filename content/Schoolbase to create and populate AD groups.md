---
layout: post
title: "Schoolbase to create and populate AD groups"
date: 2014-01-22 11:52:12
type: post
tags:
  - Schoolbase
  - MIS
  - C#
  - SysAdmin
  - Devops
---

At St Mary’s we use [Schoolbase](http://www.furlongsolutions.com/products/schoolbase) from Furlong Solutions, for our [MIS](http://en.wikipedia.org/wiki/Management_information_systems) - we have done so for several years _(indeed my understanding is that we were the second or third official school to have the system in production)._

We have had, and continue to have, an excellent and honest relationship with Furlong.  From my experience, I cannot speak highly enough of their commitment, flexibility and moral approach to supporting schools.  Of the many MIS companies that I have been involved with in recent years _(one way or another),_ Furlong often exceed expectation, when faced with a desperate requirement for a quick solution turnaround _(very_ [_Agile_](http://en.wikipedia.org/wiki/Agile_software_development) _like)._

> _For blog integrity, I should register that [IMHO](http://en.wiktionary.org/wiki/IMHO), there are some aspects of Schoolbase which alas, impress me less (primarily concerning [UX](http://en.wikipedia.org/wiki/User_experience) / [UI](http://en.wikipedia.org/wiki/User_interface)) – this should however, not reduce any of the aforementioned compliments; the dream is that Furlong will someday employ a team of experienced professional UX designers - you could then have one exceptional product, backed by one exceptional company!_

## So, AD groups from Schoolbase?

Like most enterprise environments, we use [Active Directory](http://en.wikipedia.org/wiki/Active_Directory) groups extensively for managing security permissions on resources _(printers / folder etc)._

To manually create these groups in AD, when they _already_ exist in Schoolbase, does feel very inefficient; an ideal candidate for the [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) _(do not repeat)_ principle?  Agreed it’s _not_ specifically a software concern, but it is _still_ a repetition process – and always _potentially_ dangerous!

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/b9cc4743-d4d1-489e-b2d4-df224189ffa0-min.jpg"/>
{{< /rawhtml >}}

###### _(picture credit:_ [_http://deviq.com/most-popular-principles/don-t-repeat-yourself_](http://deviq.com/most-popular-principles/don-t-repeat-yourself "http://deviq.com/most-popular-principles/don-t-repeat-yourself")_)_

I enjoy writing small utilities that serve specific purposes - I tend to do this in [C#](<http://en.wikipedia.org/wiki/C_Sharp_(programming_language)>) nowadays.

One such utility, is the ability to enumerate through group information held in Schoolbase, creating and populating Active Directory groups appropriately.  This maintains consistent synchronisation between the two systems – ensuring Schoolbase remains the prime point of entry _(the [Oracle](http://www.oracle.com/index.html), so to speak – Geek joke - pun intended!)_ thus reducing the chance of users being granted incorrect AD permissions to resources.

We previously managed this with an array of [VBScripts](http://en.wikipedia.org/wiki/VBScript) – the C# solution is much more efficient!

---

## The solution!

Luckily, we are able use an _existing_ Schoolbase [SQL View](<http://en.wikipedia.org/wiki/View_(SQL)>) to gather all appropriate group information from the Schoolbase database – this view is called “**GroupRep**”.

We connect this sql view to a [C# Console Application](<http://msdn.microsoft.com/en-us/library/0wc2kk78(v=vs.90).aspx>).  I recommend a console application, primarily because it can be triggered from a [batch file](http://en.wikipedia.org/wiki/Batch_file) running in [task scheduler](http://en.wikipedia.org/wiki/Windows_Task_Scheduler) etc.

The workflow of this program is detailed below, followed by the actual code itself.

> _**If viewing code is not your thing**, please feel free to [jump straight to the section below the code](#jumpToStandAlone), which contains a link to the compiled standalone executable, a database connection configuration file and an example batch file for triggering the whole thing!_

## The workflow

- We use [Linq to SQL](http://msdn.microsoft.com/en-us/library/bb425822.aspx) to connect to the “GroupRep” view, passing in query filters - _from the batch file_ - in order to _only_ select those groups matching specific subject name(s) etc.
- We then enumerate through the data result, where necessary, _removing_ existing members from any Schoolbase named AD group, in the specific OU – this will **only** remove group membership from these groups in this OU – it will not touch any other AD groups.
- We then use this same enumeration process to create new AD Groups based on the Schoolbase group name _(where they do not exist already)._
- Finally we populate / re-populate these Schoolbase AD groups, with appropriate students - based on the Schoolbase student **ADS Username** field.

---

> _It’s worth noting that there are numerous optimisations within the code, designed to prevent repetitive and unnecessary tasks._

```C#
namespace CreateADGroups
{
    class Program
    {
        static void Main(string[] args)
        {
            string activeDirPath = args[0];
            string activeDirOU = args[1];
            string usersLocation = args[2];
            string filterIn = args[3];
            string filterOut = args[4];

            var DBConnString = System.Configuration.ConfigurationManager.ConnectionStrings["CreateADGroups.Properties.Settings.SchoolbaseConnectionString"].ToString();
            GetGroupDataDataContext GroupData = new GetGroupDataDataContext(DBConnString);
            List<string> groupNameIncludeFilter = new List<string> { };
            List<string> groupNameExcludeFilter = new List<string> { };
            List<string> groupBeenChecked = new List<string> { };

            string[] filterInLoop = filterIn.Split('|');
            foreach (string filterInWord in filterInLoop)
            {
                groupNameIncludeFilter.Add(filterInWord);
            }

            string[] filterOutLoop = filterOut.Split('|');
            foreach (string filterOutWord in filterOutLoop)
            {
                groupNameExcludeFilter.Add(filterOutWord);
            }


            var groupRecord = from x in GroupData.GroupReps.AsEnumerable()
                              where groupNameIncludeFilter.Any(f => x.Subject.ToLower().Contains(f.ToLower()))
                              && groupNameExcludeFilter.Any(e => !x.Subject.ToLower().Contains(e.ToLower()))
                              select x;

            foreach (var groupName in groupRecord)
            {
                try
                {

                    if (!groupBeenChecked.Contains(groupName.GroupName.ToString()))
                    {
                        RemoveUserFromGroup(groupName.GroupName, activeDirOU, activeDirPath);
                        Create(activeDirOU + "," + activeDirPath, groupName.GroupName);
                        groupBeenChecked.Add(groupName.GroupName.ToString());
                    }
                    AddToGroup(groupName.PupADSname, groupName.GroupName, usersLocation, activeDirOU, activeDirPath);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Group Name Log (" + e.Message.ToString() + ")");
                }

            }

        }


        static void Create(string ouPath, string name)
        {
            if (!DirectoryEntry.Exists("LDAP://CN=" + name + "," + ouPath))
            {
                try
                {
                    // bind to the container, e.g. LDAP://cn=Users,dc=...
                    DirectoryEntry entry = new DirectoryEntry("LDAP://" + ouPath);

                    // create group entry
                    DirectoryEntry group = entry.Children.Add("CN=" + name, "group");

                    // set properties
                    group.Properties["sAmAccountName"].Value = name;

                    // save group
                    group.CommitChanges();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Create Group Log " + ouPath.ToString() + " - " + name.ToString() + "(" + e.Message.ToString() + ")");
                }
            }
            else { Console.WriteLine(ouPath + " already exists"); }
        }



        static void RemoveUserFromGroup(string groupDn, string activeDirOU, string activeDirPath)
        {
            try
            {
                List<string> usersInGroup = new List<string> { };
                DirectoryEntry dirEntry = new DirectoryEntry("LDAP://CN=" + groupDn + "," + activeDirOU + "," + activeDirPath);

                foreach (var dn in dirEntry.Properties["member"])
                {
                    usersInGroup.Add(dn.ToString());
                }

                foreach (var user in usersInGroup)
                {
                    dirEntry.Properties["member"].Remove(user);
                    dirEntry.CommitChanges();
                    dirEntry.Close();
                }

            }
            catch (System.DirectoryServices.DirectoryServicesCOMException e)
            {
                Console.WriteLine("Remove User Log" + " - group probably exists elsewhere on AD (" + e.Message.ToString() + ")");
            }
        }


        static void AddToGroup(string userDn, string groupDn, string usersLocation, string activeDirOU, string activeDirPath)
        {
            try
            {
                DirectoryEntry dirEntry = new DirectoryEntry("LDAP://CN=" + groupDn + "," + activeDirOU + "," + activeDirPath);
                string distinguished = GetUserDn(userDn, usersLocation, activeDirPath);
                dirEntry.Properties["member"].Add(distinguished);
                dirEntry.CommitChanges();
                dirEntry.Close();
            }
            catch (System.DirectoryServices.DirectoryServicesCOMException e)
            {
                Console.WriteLine("Add User Log For " + groupDn.ToString() + " - group probably exists elsewhere on AD (" + e.Message.ToString() + ")");
            }
        }


        static string GetUserDn(string identity, string usersLocation, string activeDirPath)
        {
            using (var rootEntry = new DirectoryEntry("LDAP://" + usersLocation + "," + activeDirPath, null, null, AuthenticationTypes.Secure))
            {
                using (var directorySearcher = new DirectorySearcher(rootEntry, String.Format("(sAMAccountName={0})", identity)))
                {
                    var searchResult = directorySearcher.FindOne();
                    if (searchResult != null)
                    {
                        using (var userEntry = searchResult.GetDirectoryEntry())
                        {
                            return (string)userEntry.Properties["distinguishedName"].Value;
                        }
                    }
                }
            }
            return null;
        }

    }
}
```

---

#### [Click here to grab the standalone, ready made tool & appropriate files.](https://github.com/normansolutions/CreateADGroupsFromSchoolbase/tree/master/StandAloneProgram)

---

## Using the tool

There are three files needed to execute the process:

- The main executable program _(obviously)!_
- A SQL database connection string config file _(this is literally the details of your SQL server connection)._
- A batch file containing the appropriate “parameters” _(this includes your AD LDAP connection information and query filter information)._

> _Clearly the tool will need to be run under a user account, that has full AD permissions._

---

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/249a56f0-5c0c-45a2-ae72-c6d286d8c70c-min.jpg"/>
{{< /rawhtml >}}

## Batch file explanation

The real key to using this process, is understanding the parameters / switches of the batch file.

The batch file is fundamentally broken into 5 arguments (parameters / switches) as explained below:

1.  The first parameter is where you enter your LDAP connection: _e.g. "DC=St-Stephens, DC=Local"._
2.  The second parameter is where you enter the Organisational Unit (OU) of where you are going to create your groups: _e.g. "OU=SBGroups"._
3.  The third parameter is where your AD students are located: e*.g. "OU=Students, OU=St Stephens Users".*
4.  The forth parameter is where you can filter down, to those subjects containing a name (or names) that you wish to **include** in your selection; you can create multiple selections by separating each word with a “|” _(pipe)_ symbol: _e.g. "Art|Photo"._
5.  The fifth parameter is where you can filter out those subjects containing a name (or names) that you wish to **exclude** from your selection; again, you can create multiple selections by separating each word with a “|” _(pipe)_ symbol: _e.g. "UCAS|History"._

---

## Example

Below is an example batch file, that when run _(either manually or on a task schedule)_ will select only those groups, where the subject name is like **Art** or **Photo** but doesn’t contain the word **UCAS**.

It would create new AD Groups within an _existing_ OU called “SBGroups” on an Active Directory domain titled “St-Stephens.Local” - populating these groups with students found in an OU called “Students” under a parent OU “St Stephens Users”.

> _Trust me – it’s a lot easier than it reads!_

```PowerShell
C:\SCHEDULE\SBGroups\CreateADGroups.exe  "DC=St-Stephens, DC=Local" "OU=SBGroups" "OU=Students, OU=St Stephens Users" "Art|Photo" "UCAS"
```

---

## Conclusion

Clearly, this is just one solution to a problem, and may not fit every situation.  But under the banner of “openness and sharing” you may just find something useful in this post.

> _It’s worth noting, that we have also experienced quite a nice side benefit from using this system, in that students and staff are much more likely to inform you of teaching group changes, when their access to network resources are involved!_

---

The entire project is available on my [GitHub account here](https://github.com/normansolutions/CreateADGroupsFromSchoolbase); please fee free to download it, fork it, adjust it or completely ignore it!

You may also choose to compose a different query, to create different group types?

_It also goes without saying, that you use any of this code, entirely at your own risk!_
