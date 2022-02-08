﻿'###################################################################################################################
'Test Script Name:AO2_01_ISS_UAT_118 
'Script Description: Device Journey
'Designed By Date:Ashwathi Mahendran
'Designed Date(MM/DD/YY): 21/05/2021
'Modified By&date: When do some change need to update here
'###################################################################################################################

On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName ="AO2_01_ISS_UAT_67"
'       
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
		strePassword = DataTable.Value("Password")
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
Repositoriescollection.Add DirPath&"\ObjectRepository\MasterRepository.tsr"
'Repositoriescollection.Add DirPath&"\ObjectRepository\LocalRepo.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\InventoryManagement.tsr"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
'LoadFunctionLibrary DirPath&"\FunctionLibrary\Evolution.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"

'MsgBox DirPath

'Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
'Wait 2
'Call CommonStockAdjustmentSellable(strPLU,strIMEI,LoginType,strXstoreUsername,strXstorePassword)
'Wait 2
Call LaunchEvolutionFromXstore() 
wait 5
Call EvolutionLoginBrowser(strUsername,strPassword,strURL,intStoreId,strAnotherStoreId,strStoreName,strChangeStoreName)
Wait 2
Call LaunchNC()
wait 2
Call scanPLUSearch(intPLU)
Wait 2
Call ScannedProductDetailsPage()
Wait 2
If Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebElement("It looks like there's").Exist Then
	Reporter.ReportEvent micPass, "Stock is not available for accessory product - Validation success","Test Passed"
		Else
			Reporter.ReportEvent micFail, "Stock exist for accessory","Step Failed"
End If
Wait 2
Call EvolutionLogout()
'Browser("Browser").Page("Page").WebElement("app-menubar-logout-button-btnI").Click

On Error GoTo 0
ExitRun

