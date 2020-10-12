---
layout: post
title: "Excel Macro to manipulate CAT data"
date: 2015-06-28 17:03:20
type: post
tags:
  - Macro
  - Excel
  - Script
  - MIS
  - QuickTip
---

Recently, I was asked whether I could provide some assistance with manipulating data, that had been exported from a [CAT](http://www.theschoolrun.com/year-7-cats-what-every-parent-needs-know) results test.  The problem, had slowly been driving a colleague of mine, very slightly crazy!

It had been quite some time since I’d last written an Excel Macro, so in many ways I relished the challenge.  Thus here is the story.

## The Problem

- To take exported data that was presented in a tabular fashion _(over 6 columns)._
- To re-present the data, with the last **three columns** transposed into their own row, with appropriate column title.

> It’s probably easier to view than to explain _(see below screen shots)_ – but in short, this was a classic convert columns to rows exercise!

---

## The Solution

Time was not on my side when approaching this, so I took advantage of the fact the there were many ‘known’ set values that wouldn’t change *(column titles & column counts etc).*  As such I ‘hard-coded’ these into the solution.

A little looping and incrementation proved to be the answer.  Below is the final script used.

```JavaScript

Private Sub NewData_Click()
'Select sheet by name
	Sheets("OriginalData").Select
'Get total rows in column 'a'
	RowCount = Cells(Cells.Rows.Count, "a").End(xlUp).Row
'Select range from K2 to O and clear contents
	Range("K2:O" & RowCount).Select
	Selection.ClearContents
'Variable to determin a new row
	NewRow = 0
'Loop from second row until end
	For i = 2 To RowCount
'Grab required values and assigned to variables
		Range("A" & i).Select
		ClassName = Range("A" & (ActiveCell.Row)).Value
'If content is empty then finish loop
		If ClassName = "" Then Exit Sub
		YearGroup = Range("B" & (ActiveCell.Row)).Value
		StudentName = Range("C" & (ActiveCell.Row)).Value
		Ver = Range("D" & (ActiveCell.Row)).Value
		Quan = Range("E" & (ActiveCell.Row)).Value
		NVR = Range("F" & (ActiveCell.Row)).Value

'Apply values for first column requirement 'Ver' to new cells but increasing row count
		Range("K" & i).Select
		Range("K" & (ActiveCell.Row + NewRow)).Value = ClassName
		Range("L" & i).Select
		Range("L" & (ActiveCell.Row + NewRow)).Value = YearGroup
		Range("M" & i).Select
		Range("M" & (ActiveCell.Row + NewRow)).Value = StudentName
		Range("N" & i).Select
		Range("N" & (ActiveCell.Row + NewRow)).Value = Ver
		Range("O" & i).Select
		Range("O" & (ActiveCell.Row + NewRow)).Value = "Ver"

'Apply values for second column requirement 'Quan' to new cells but increasing row count
		Range("K" & i).Select
		Range("K" & (ActiveCell.Row + NewRow + 1)).Value = ClassName
		Range("L" & i).Select
		Range("L" & (ActiveCell.Row + NewRow + 1)).Value = YearGroup
		Range("M" & i).Select
		Range("M" & (ActiveCell.Row + NewRow + 1)).Value = StudentName
		Range("N" & i).Select
		Range("N" & (ActiveCell.Row + NewRow + 1)).Value = Quan
		Range("O" & (ActiveCell.Row + NewRow + 1)).Value = "Quan"

'Apply values for first column requirement 'NVR' to new cells but increasing row count
		Range("K" & i).Select
		Range("K" & (ActiveCell.Row + NewRow + 2)).Value = ClassName
		Range("L" & i).Select
		Range("L" & (ActiveCell.Row + NewRow + 2)).Value = YearGroup
		Range("M" & i).Select
		Range("M" & (ActiveCell.Row + NewRow + 2)).Value = StudentName
		Range("N" & i).Select
		Range("N" & (ActiveCell.Row + NewRow + 2)).Value = NVR
		Range("O" & (ActiveCell.Row + NewRow + 2)).Value = "NVR"

'Ensure that row count increases correctly so that all columns are converted to new rows
		NewRow = NewRow + 2
	Next
End Sub
```

---

**SAMPLE SCREEN SHOT BEFORE**

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/b43f43db-c478-449a-b244-20f3ac992423-min.jpg" />
{{< /rawhtml >}}

**SAMPLE SCREEN SHOT AFTER**

{{< rawhtml >}}
<img
src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
data-src="/img/postimg/2ca22158-3774-4847-b1f3-7baf5d482766-min.jpg" />
{{< /rawhtml >}}

There was very little time for any proper code analysis or architecture – a simple, **get the job done** was the order of the day.

Put simply, it worked and did indeed, _get the job done_, resulting in a very happy customer.

[Link to example spreadsheet.](https://github.com/normansolutions/CATDataSpreadsheetMacro/blob/master/CATData.xlsm)
