'###################################################################################################################

'Test Script Name					:TC_082
'Script Description					:To verify if appropriate error is displayed while placing a new connection order with wrong PAC code provided
'Designed By Date					:Sukirdha 
'Designed Date(MM/DD/YY)			:13/07/2021
'Modified By&date					:

'###################################################################################################################


On Error Resume Next
    
DataFilePath =  "C:\NC_Evolution\Automation\TestData\NCEvolution.xls"
TestScriptName ="Suki"

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
LoadFunctionLibrary DirPath&"\FunctionLibrary\Functions_1.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"

'Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
'Wait 2
'Call CommonStockAdjustmentSellable(strPLU,strIMEI,LoginType,strXstoreUsername,strXstorePassword)
'Wait 2
Call LaunchEvolutionFromXstore() 
Wait 2
Call Storeselection(strStoreName,intStoreId)
Wait 2
Call LoginIntoEvolution(strUsername,strPassword)
Wait 2	
Call JustLogMein()	
Wait 30
Call LaunchNC()
wait 2
Call scanPLUSearch(intPLU)
Wait 2
Call ScannedProductDetailsPage()
Wait 2
Call ProductTariffSelection()
Wait 5
Call ProductNavtoGoToBasket()
Wait 2
Call ProductNavToCreateAccountPage()
Wait 2
Call ProductEnterEmailID(stremailID)
Wait 5
Call CustomerDetailsPage(strFirstName,strLastName,dtDate,intMobileNumber,intHouseNumber,intPostCode)
Wait 5
Call selectionIMEIorSSNoreSIM(strJourney,intIMEI,intSSN)
Wait 2
Call ReserveOrder()
Wait 5
Call EligibilityCheck()
Wait 5
Call AdvisorSteps()
Wait 5
Call DirectDebitDetails(strAccountName,intAccountNumber,intSortCode)
Wait 5
Call CreditCheckAndCardDeails(strAccountName,intCardNumber,intCVV)
Wait 5
Set WshellOBJ = CreateObject("WScript.Shell")
objSendKey.SendKeys ("{PGDN}")
If  Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Number transfer and cancellati").Exist(2) Then
Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebList("select").Select "Move my number"
End  If
Wait 1
If Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("WebEdit").Exist(5) Then
Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("WebEdit").Click
Browser("Browser").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("WebEdit").Set "123"
Reporter.ReportEvent micPass, "To verify if appropriate error is displayed", "Appropriate message is displayed"
Else 
Reporter.ReportEvent micFail, "To verify if appropriate error is displayed", "Appropriate message is not displayed"	
End If
ExitRun


