'###################################################################################################################
'Test Script Name					:AO2_01_ISS_UAT_76
'Script Description					:
'Designed By Date					:Sukirdha 
'Designed Date(MM/DD/YY)			:08/24/2020
'Last executed & Status				:08/24/2020& Pass
'Modified By&date					:
'###################################################################################################################


On Error Resume Next
    
DataFilePath =  "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName ="AO2_01_ISS_UAT_76"

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
		'Applicable if needed to add stock to second item in order which is non IMEI
		strPLU2 = DataTable.Value("AdditionalNonIMEIPLU")
		intQuantity = DataTable.Value ("AdditionalNonIMEIPLU_Quantity")
		
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
		'Applicable only for iPhone Handsets or Companion device sale
		intEID = DataTable.Value("EID")
		'Applicabe only for companion devices
		strHANDSET_PLU = ataTable.Value("HANDSET_PLU")
		strHANDSET_IMEI = ataTable.Value("HANDSET_IMEI")
		Exit For
	End If
Next

'Loading Object Repositories 
Repositoriescollection.Add DirPath& "C:\OnStack_InStoreSales\Automation\ObjectRepository\NCXSroreFunction_24Aug.tsr"
Repositoriescollection.Add DirPath&"C:\Evolution\Automation\Object Repository\Evolution.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution_NC.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\MasterRepository.tsr"
Repositoriescollection.Add DirPath&"C:\OnStack_InStoreSales\Automation\ObjectRepository\Master_Repository_All_Sukirdha.tsr"

'Loading Functional Libraries
LoadFunctionLibrary DirPath&"C:\OnStack_InStoreSales\Automation\FunctionLibrary\Functions_1.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"

'Call fnLogIntoXStore(LoginType, strXstoreUsername, strXstorePassword)
'Wait 2
'Call fnAddStockTo2Products(strPLU, strIMEI, strPLU2, intQuantity)
'Wait 1
'Call LogOffFromXStore()
'Wait 1
Call fnLaunchEvolutionFromXStore(strUsername, strPassword)
Wait 1
Call fnLaunchNCepos()
Wait 1
Call fnAdd2ItemsToBasket(strPLU,strPLU2)
Call fnIdentityPage(stremailID)
Wait 2
'Customer Details Page
Wait 2
Call fnCustomerAndDeliveryDetails(strIMEI, intSSN, strFirstName, strLastName, dtDate, intMobileNumber, intHouseNumber,  intPostCode)
'Eligibility Check
Wait 4
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Eligibility Check").Click
Set DR = CreateObject("Mercury.DeviceReplay")
DR.Presskey 209
Wait 1
Set DR = nothing
Wait 2
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebList("Time At Address").Select "More than 10 years"
Wait 1
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebList("Employment Status").Select "Employed" 
Wait 1
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebList("Personal Income Information").Select "More than £50,000"
Wait 1
Set DR = CreateObject("Mercury.DeviceReplay")
DR.Presskey 209
Wait 1
Set DR = nothing
'PCCI Terms
Wait 2
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("PCCI Terms Check box").Highlight
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("PCCI Terms Check box").Click
Wait 1
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebButton("Confirm and continue before eligibility cehck").Click
Wait 2
If Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebButton("I am the advisor").Exist(3) Then
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebButton("I am the advisor").Click	
End If

Wait 2
If Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebButton("Continue with eligibility").Exist(2) Then
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebButton("Continue with eligibility").Highlight
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebButton("Continue with eligibility").Click	
End If


Wait 3

'Payment Account Information
If Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Your monthly Direct Debit Section Header").Exist(2) Then
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Your monthly Direct Debit Section Header").Click
End  If 
Wait 1
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("Name As displayed on your account").Set strAccountName
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("Sort Code").Set intSortCode
Set DR = CreateObject("Mercury.DeviceReplay")
DR.Presskey 209
Wait 1
Set DR = nothing
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("Account Number").Set intAccountNumber
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebEdit("A nickname for this account").Set strAccountName
Wait 1
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Terms check box1").Click
Wait 1
Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Terms check box 2").Click
'get continue button
Wait 1
Call CreditCheckAndCardDeails(strAccountName,intCardNumber,intCVV)
Wait 5
Call MoreOption()
Wait 5
Call ReviewDetails()
Wait 5
Call  AgreementDetails()
Wait 5
Call FinishAccountSetup(strePassword,strSecurityAnswer)
Wait 5
Call LoginXstore("Till",strXstoreUsername,strXstorePassword)
Wait 5
Call NC_Xstore_Validation()
''Enter Card Details
'Wait 1
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Customer Confirmation Check Box 1").Highlight
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Customer Confirmation Check Box 1").Click
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Customer Confirmation Check Box 2").Highlight
'Browser("Evolution").Page("Page").Frame("ePOSTab&&0Frame").WebElement("Customer Confirmation Check Box 2").Click
'Set DR = CreateObject("Mercury.DeviceReplay")
'DR.Presskey 209
'Wait 1
'Set DR = nothing
'If Browser("Evolution").Page("Page").Frame("Frame").WebElement("Payment data").Exist(1) Then
'Browser("Evolution").Page("Page").Frame("Frame").WebElement("Payment data").Highlight
'End  If
'Browser("Evolution").Page("Page").Frame("Frame").WebEdit("Card Holder Name").Set strAccountName
'Browser("Evolution").Page("Page").Frame("Frame").WebEdit("card Number").Set intCardNumber
'Browser("Evolution").Page("Page").Frame("Frame").WebEdit("CVC").Set intCVV
'
'Browser("Evolution").Page("Page").Frame("Frame").WebList("EXPIRYDATEMONTH").Select "8"
'Browser("Evolution").Page("Page").Frame("Frame").WebList("EXPIRYDATEYEAR").Select "2021"






Wait 1


'Call fnRetrieveAnNCOrderToViewport()	
'If  JavaWindow("Oracle Retail Xstore Point").JavaObject("DtvList$TransactionColumnHeade").Exist(1) Then
'Reporter.ReportEvent micPass, "To verify if order is retrieved to the viewport", "Order is retrieved to the viewport successfully, Pass"
'Else 
'Reporter.ReportEvent micFail, "To verify if order is retrieved to the viewport", "Order is not retrieved to the viewport, Fail"

'End If

On Error GoTo 0
ExitRun



'Add stock to 2 product


Call LogOffFromXStore()
On Error GoTo 0
ExitRun

