'###################################################################################################################
'Test Script Name					:AO2_01_ISS_UAT_78
'Script Description					:Retrieve Order Details -  F2
'Designed By Date					:Sukirdha 
'Designed Date(MM/DD/YY)			:08/24/2020
'Last executed & Status				:08/24/2020& Pass
'Modified By&date					:
'###################################################################################################################


On Error Resume Next
    
DataFilePath =  "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName ="AO2_01_ISS_UAT_78"

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
		'Applicable only for iPhone Handsets or Companion device sale
		intEID = DataTable.Value("EID")
		'Applicabe only for companion devices
		strHANDSET_PLU = ataTable.Value("HANDSET_PLU")
		strHANDSET_IMEI = ataTable.Value("HANDSET_IMEI")
		Exit For
	End If
Next

Repositoriescollection.Add DirPath& "C:\OnStack_InStoreSales\Automation\ObjectRepository\NCXSroreFunction_24Aug.tsr"
LoadFunctionLibrary DirPath&"C:\OnStack_InStoreSales\Automation\FunctionLibrary\Functions_1.qfl"


Call fnLogIntoXStore(LoginType, strXstoreUsername, strXstorePassword)
Wait 1
Call fnRetrieveAnNCOrderToViewport()	
If  JavaWindow("Oracle Retail Xstore Point").JavaObject("DtvList$TransactionColumnHeade").Exist(1) Then
Reporter.ReportEvent micPass, "To verify if order is retrieved to the viewport", "Order is retrieved to the viewport successfully, Pass"
Else 
Reporter.ReportEvent micFail, "To verify if order is retrieved to the viewport", "Order is not retrieved to the viewport, Fail"	
End If
Call LogOffFromXStore()
Wait 1
On Error GoTo 0
ExitRun
