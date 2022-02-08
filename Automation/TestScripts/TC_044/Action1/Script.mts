' ###################################################################################################################
'Test Script Name: TC_044
'Script Description: Companion device sale
'Designed By Date: Sukirdha 
'Designed Date(MM/DD/YY): 015/07/2021
'Modified By&date: When do some change need to update here
'###################################################################################################################


On Error Resume Next
    
DataFilePath =  "C:\NC_Evolution\Automation\TestData\NCEvolution.xls"
TestScriptName ="TC_044"

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

Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call fnToAddStockForHandsetOfCompanionDevice(strHANDSET_PLU,strHANDSET_IMEI,LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call CommonStockAdjustmentSellable(strPLU,strIMEI,LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call Logout(strUsername,strPassword)
On Error GoTo 0
ExitRun
