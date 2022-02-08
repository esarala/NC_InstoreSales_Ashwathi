'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
		On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName = "TC003_Evolution_Verify_BrowserLogin"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If strcomp(CurrentTestCaseName,TestScriptName)=0 Then
		LoginType = Datatable.Value("Login")
		strUsername = trim(DataTable.Value("UserName"))
		strPassword = trim(DataTable.Value("Password"))
		strXstoreUsername = DataTable.Value("XstoreUserName")
		strXstorePassword = DataTable.Value("XstorePassword")
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
Repositoriescollection.Add DirPath&"\ObjectRepository\Steffy_NC.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\LocalRepo.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\MasterRepository.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\InventoryManagement.tsr"
'LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\Electronic_Audit_Xstore.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"
'msgbox DirPath

Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
Wait 2
Call Electronic_Audit() @@ hightlight id_;_814257313_;_script infofile_;_ZIP::ssf1.xml_;_
Wait 2
Call Logout(LoginType)
On Error GoTo 0
ExitRun

