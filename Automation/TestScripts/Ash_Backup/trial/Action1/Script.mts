'Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame_2").WebElement("Build your package").Highlight
'
'Set DR = CreateObject("Mercury.DeviceReplay")
'DR.Presskey 209
'Wait 1
'Set DR = nothing
'



'If Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Customer details").Exist(3)  Then
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("Select title...").Set "Mr"
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("fname").Set strFirstName
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("mname").Set "Mc"
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("lname").Set strLastName
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("bday").Set dtDate
'Set DR = CreateObject("Mercury.DeviceReplay")
'DR.Presskey 209
'Wait 1
'Set DR = nothing
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("tel").Set intMobileNumber
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("address").Set intHouseNumber
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("postal").Set intPostCode

'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame_2").WebElement("WebElement").Highlight
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame_2").WebElement("WebElement").set ON
Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame_3").WebElement("WebElement").Click

Wait 1
'End If
