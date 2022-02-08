' ###################################################################################################################
'Test Script Name: TC_112
'Script Description: To verify if 'Closing ePOS?' pop up is displayed, when another ePOS session is opened already
'Designed By Date: Sukirdha 
'Designed Date(MM/DD/YY): 05/07/2021
'Modified By&date: When do some change need to update here
'###################################################################################################################


On Error Resume Next
    
DataFilePath =  "C:\NC_Evolution\Automation\TestData\NCEvolution.xls"
TestScriptName ="TC_112"

DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If InStr(1,CurrentTestCaseName,TestScriptName,1)>0 Then
		strUsername = trim(DataTable.Value("UserName"))
		strPassword = trim(DataTable.Value("Password"))
		strXstoreUsername = DataTable.Value("XstoreUserName")
		strXstorePassword = DataTable.Value("XstorePassword")
		LoginType= Datatable.Value("Login")
		strPLU= DataTable.Value("PLU")
		strIMEI= DataTable.Value("IMEI")
		strURL = DataTable.Value("URL")
		intStoreId = DataTable.Value("StoreID")
		intPLU = DataTable.Value("PLU")
		strAnotherStoreId = DataTable.Value("ChangeStoreID")
		strStoreName = DataTable.Value("StoreName")
		strChangeStoreName = DataTable.Value("ChangeStoreName")
		strDeviceName = DataTable.Value("DeviceName")
		strSimType = DataTable.Value("SimType")
		stremailID = DataTable.Value("email")
		strFirstName = DataTable.Value("FirstName")
		strLastName = DataTable.Value("LastName")
		dtDate = DataTable.Value("DOB")
		intMobileNumber = DataTable.Value("MobileNumber")
		intHouseNumber = DataTable.Value("HouseNo")
		intPostCode = DataTable.Value("PostCode")
		strJourney = DataTable.Value("Journey")
		intIMEI = DataTable.Value("IMEI")
		intSSN = DataTable.Value("SSN")
		strAccountName = DataTable.Value("AccountName")
		intAccountNumber = DataTable.Value("AccountNumber")
		intSortCode = DataTable.Value("SortCode")
		intCardNumber  = DataTable.Value("CardNumber")
		intCVV  = DataTable.Value("CVV")
		strePassword = DataTable.Value("SecurityPassword")
		strSecurityAnswer = DataTable.Value("SecurityAnswer")
		Exit For
	End If
Next
	
'Using for jenkins
strScriptLoc="Local"
TestScriptRootPath=Environment.Value("TestDir")
spath=Split(TestScriptRootPath,"\")
If strScriptLoc="Local" Then
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)
Else
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)&"\"&spath(3)&"\"&spath(4)&"\"&spath(5)&"\"&spath(6)&"\"&spath(7)&"\"&spath(8)&"\"&spath(9)&"\"&spath(10)
End If

'loading object repositories and library files
Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution_NC.tsr"
Repositoriescollection.Add "C:\NCInstoreSales\Automation\ObjectRepository\Evolution_Suki.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\InventoryManagement.tsr"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
'LoadFunctionLibrary DirPath&"\FunctionLibrary\Evolution.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"





Call LaunchEvolutionFromXstore() 
wait 2
Call EvolutionLoginBrowser(strUsername,strPassword,strURL,intStoreId,strAnotherStoreId,strStoreName,strChangeStoreName)
Wait 20
Call LaunchNC()
wait 2
Call scanPLUSearch(intPLU)
Wait 2
Call ScannedProductDetailsPage()
Wait 2
Call ProductTariffSelection()
Wait 2
Call LaunchNC()
If  Browser("Browser").Page("Page").WebElement("innertext:=Closing ePOS?.*","index:=1").Exist(20) Then
If Browser("Browser").Page("Page").WebElement("Are you sure you want").Exist(10) Then
Browser("Browser").Page("Page").WebButton("Yes").Click
Reporter.ReportEvent micPass, "Verify if Closing ePOS pop up is displayed","Closing ePOS pop up is displayed"
Else Reporter.ReportEvent micFail, "Verify if Closing ePOS pop up is displayed","Closing ePOS pop up is not displayed"
End If	
End If
Wait 3
Call Logout(strUsername,strPassword)
On Error GoTo 0
ExitRun




'TBR
Call one()
Call two()
Call three()


Function one()



	msgbox "1"
	
End Function

Function two()
	msgbox "2"
	
End Function
Function three()
	msgbox "3"
	msgbox "over"
	
End Function
