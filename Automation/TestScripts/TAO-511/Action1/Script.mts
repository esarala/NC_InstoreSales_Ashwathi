'###################################################################################################################
'Test Script Name: TAO-511
'Script Description: Search a transaction using store and order details
'Designed By : SS
'Designed Date(MM/DD/YY): 17/06/2021
'Modified By&date: When do some change need to update here
'###################################################################################################################

On Error Resume Next

DataFilePath = "C:\RefundsAndExchange\Automation\Test Data\Refunds_Exg.xls"
TestScriptName = "TAO-511"

' Fetching data from the excel to data table
DataTable.Import DataFilePath

' Looping to the data table to get TCs data
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If strcomp(CurrentTestCaseName,TestScriptName)=0 Then
		intPLU = Datatable.Value("PLU")
		strUserName = Datatable.Value("UserName")
		strPassword = Datatable.Value("Password")
		LoginType = Datatable.Value("logintype")
		LoginType1 = Datatable.Value("Login")
		intStore= Datatable.Value("Store")
		intDateofPurchase= Datatable.Value("DateofPurchase")
		intTill= Datatable.Value("Till")
		intTransactionNumber= Datatable.Value("TransactionNumber")
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

' Loding functional library runtime
'LoadFunctionLibrary DirPath&"\Function Library\XstoreCommonFunctions.qfl"

' Adding OR runtime
Repositoriescollection.Add DirPath&"\Object Repository\LocalRepo.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\MasterRepository.tsr"

' To Login to XStore - Till
Call fnLoginXstore(LoginType1,strUsername,strPassword)

' To search a transaction using Store and Tran details in refund flow
Call fnRefundSearchUsingStoreDetails(intTransactionNumber,intDateofPurchase,intTill,intStore)

' When transaction is found
If JavaWindow("Oracle Retail Xstore Point").JavaButton("cancel").Exist(5) Then
	Reporter.ReportEvent micPass, "Transaction should be found successfully", " Transaction is found successfully."
Else
	Reporter.ReportEvent micFail, "Error Message should be displayed", "Transaction was not found."
End If

''' Logout from the XStore
'Call Logout(LoginType1)

On Error Goto 0
ExitRun


