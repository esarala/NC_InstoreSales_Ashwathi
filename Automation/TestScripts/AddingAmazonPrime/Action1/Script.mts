'###################################################################################################################
'Function Name: ToSelectAmazonPrime
'Function Description: To Select Amazon Prime in Build Your package screen
'Designed By Date: Sukirdha 
'Designed Date(MM/DD/YY): 06/24/2021
'Modified By&date: When do some change need to update here
'###################################################################################################################

' Call fnToSelectAmazonPrime()

If Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebElement("WebElement").Exist(30) Then
	 
	 If Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Free").Exist(3)  Then
	 	 Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Free").Click
	 	 Reporter.ReportEvent micPass,"Select Amazon Prime","Amazon Prime is selected"
	Else
		Reporter.ReportEvent micFail,"Select Amazon Prime","Amazon Prime  can not be selected"
 
	 End If
	   Reporter.ReportEvent micPass,"Select Amazon Prime","Amazon Prime is found"
	Else
		Reporter.ReportEvent micFail,"Select Amazon Prime","Amazon Prime is not found"
	End If		


