---
layout: post
title: "Power BI + iSAMS API"
date: 2020-02-19 17:31:17
type: post
tags:
  - iSAMS
  - PowerBI
  - Database
  - SQL
  - MIS
---

Like many people, I've tinkered with Power BI over the years but have never really dug deep into the weeds; the same can also be said for the iSAMS REST API. So recently I thought why not combine these two systems and see what can be achieved?

It transpires a fair amount, albeit with a few initial gotchas. So I decided to write a blog post detailing the process, if nothing else to serve as a tutorial to my future self!

[Power BI Desktop](https://powerbi.microsoft.com/en-us/desktop/) is the product required _(as against Power BI Online)_ - limitations in data connection options being the primary reason.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/GetData_637177867209747085-min.PNG"/>
{{< /rawhtml >}}

**Overview of stages with each system, used in my example.**

## iSAMS REST API Process

- Register for API access with iSAMS.
- Use client connection details _(provided by iSAMS)_ to connect to the iSAMS API endpoint.
- This initial request will return a token (which as I understand lasts for 1 hour).
- Use this token to make subsequent requests to the iSAMS API endpoints as required.
- Retrieve data.

## Power BI Process

- Connect to the iSAMS API.
- Retrieve data _(more on this later - especially if your results exceed 100 rows)_.
- Create a graph using returned data, sorted by month.

> At this stage, it's worth noting that the purpose of this blog post isn't to demonstrate all options available in Power BI (or indeed the iSAMS API). I should also register that this is just my journey and is not designed to be an official prescribed method - in short , no guarantees.

Underlying Power BI is a [Power Query Language (called "**M**")](https://docs.microsoft.com/en-us/powerquery-m/ "Power Query Language"). This is an imperative style language that allows you to transform and manipulate data in a staged process. For example, you may wish to take some "date" style data, extract just the month part, and then convert that month into a two digit numerical value etc. In other-words, each stage is a process represented by the Power Query Language (hereafter known as "M"). This process manipulation is essential when dealing with data from iSAMS, if nothing else in order to convert returned JSON data to workable tables.

Interestingly you can also put functions within your "**M**" code, which is ideal when you wish to connect to the [iSAMS API](https://developerdemo.isams.cloud/Main/swagger/ui/index "iSAMS API") endpoint.

So "M" is your friend when it comes to seamless connection to the iSAMS API and extraction of data.

In order to proceed with Power BI you must connect to a data source. I found connection to the ISAMS API is best done directly within the "M" code _(as hinted prior)_. My suggestion is to just select the "Blank Query" option and use the "Advanced Editor".

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/ConnectFromScratch_637177867209819872-min.png"/>
{{< /rawhtml >}}

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/Editor_637177870080426276-min.png"/>
{{< /rawhtml >}}

_(example code including connection syntax can be viewed below this post)_

It's worth noting that in my code example, I've utilised Power BI's ability to create Parameters rather than hard-code connection details; creation of Parameters within Power BI is well [documented online](https://powerbi.microsoft.com/en-us/blog/deep-dive-into-query-parameters-and-power-bi-templates/).

## Three parameters created as follows:

- ClientURLParameter
- ClientIDParameter
- ClientSecretParameter

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/Parameters_637177870080439722-min.PNG"/>
{{< /rawhtml >}}

---

Once connected, what soon became apparent was the number of viewable records were limited to 100. It appeared you had to "page" through to the following 100 records etc. I'm not entirely sure whether this is a throttling restriction of the iSAMS API or functionality within Power BI.

Of course this isn't necessarily a problem for fundamental record data viewing, but when you wish to compose a graph, it is - your graph only displays information based on the first 100 records, which isn't ideal!

After a little research, I was able to compose a query which returned the total number of pages in the entire result, and then use this value to perform an "each" loop incrementing through all pages grabbing data as required. In essence the query runs several times _(total number of pages, to be exact)_ merging the data from each returned result.

So I now had a query that connected to the iSAMS API _(by grabbing an authorised token)_ and extracting all data as required.

---

The next stage was to convert the returned data into a workable table format and rename columns as appropriate. In addition, for this specific example _(I was intending to create a graph of current pupils by enrolment month)_ it was also evident that in order to sort by calendar month on the graph, I needed to extract the month only part of the enrolment date field.

There are numerous well documented examples of field manipulation online using "M" so I shan't re-invent the wheel here; however in my sample code, I've included these processes under the Transformations comment and named each process appropriately _(e.g. **ExtractedMonth** and **ChangeMonthOrderType** etc)._

To a large extent the process was now complete in terms of connection, data extraction and column manipulation. All I needed now was a nice pretty bar chart.

Creation of the graph was pretty straight-forward _(as you would expect)_ with one exception; the ordering of monthly names was incorrect in terms of order within the year _(e.g. Jan, Feb, March etc)_. Because you can't order by a field not used on a report, there didn't seem to be an obvious cure and I nearly resulted in just using a numerical representation of month. However it transpires that if you populate the "tooltip" field on the graph, this also becomes a field you can utilise for sorting - in effect allowing you to sort on a hidden field.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/Tooltip_637177870080448946-min.PNG"/>
{{< /rawhtml >}}

The result was a graph of all current pupils by enrollment month, sorted in the correct monthly order, displaying user friendly month names.

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/Graph_637179069700956395-min.PNG"/>
{{< /rawhtml >}}

_(sample code below)_

```JavaScript

let
//Parameters
    ClientURL = ClientURLParamter,
    ClientID = ClientIDParameter,
    ClientSecret = ClientSecretParameter,
//Variables
    TokenUrl = "https://" & ClientURL & ".isams.cloud/auth/connect/token",
    TokenSecretRaw = "client_id=" & ClientID & "&client_secret=" & ClientSecret & "&grant_type=client_credentials&scope=restapi",
    BaseUrl = "https://" & ClientURL & ".isams.cloud/api/students",
//Functions
    GetToken = () =>
    let
            TokenOpions = [Headers = [#"Content-Type"="application/x-www-form-urlencoded"], Content = Text.ToBinary(TokenSecretRaw) ],
            TokenRawData = Web.Contents(TokenUrl, TokenOpions),
            TokenJson = Json.Document(TokenRawData),
            GetAccessTokenTable = Record.ToTable(TokenJson),
            ReturnToken = GetAccessTokenTable{0}[Value]
        in  ReturnToken,
    GetJson = (Url) =>
        let
            Options = [Headers=[ #"Authorization" = "Bearer " & GetToken() ]],
            RawData = Web.Contents(Url, Options),
            Json = Json.Document(RawData)
        in  Json,
    GetPageTotal = () =>
        let
            Url = BaseUrl,
            Json = GetJson(Url),
            PageTable = Record.ToTable(Json),
            ReturnPage = PageTable{4}[Value]
        in  ReturnPage,
    GetPage = (Index) =>
        let
            Url = BaseUrl & "?page=" & Number.ToText(Index),
            Json = GetJson(Url),
            Value = Json[#"students"]
        in  Value,
//Transformations
    PageIndices = { 0 .. GetPageTotal()},
    Pages = List.Transform(PageIndices, each GetPage(_)),
    Entities = List.Union(Pages),
    TableOfEntities = Table.FromList(Entities, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    ExpandedColumns = Table.ExpandRecordColumn(TableOfEntities, "Column1", {"academicHouse", "fullName", "personGuid","enrolmentDate"}),
    RenamedColumns = Table.RenameColumns(ExpandedColumns,{{"academicHouse", "Academic House"}}),
    ChangedDateType = Table.TransformColumnTypes(RenamedColumns,{{"enrolmentDate", type date}}),
    ExtractedMonth = Table.AddColumn(ChangedDateType, "Month", each Date.ToText([enrolmentDate], "MMM"), type text),
    ChangeMonthOrderType = Table.AddColumn(ExtractedMonth, "NumericalMonth", each Date.Month([enrolmentDate]), Int64.Type),
    SortByMonth = Table.Sort(ChangeMonthOrderType,{{"NumericalMonth", Order.Ascending}}),
    FinalData = Table.AddColumn(SortByMonth, "Order Month", each Text.PadStart(Text.From([NumericalMonth]),2,"0"))
in
    FinalData

```
