'TBC##################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales1.xls"
TestScriptName = "AO2_01_ISS_UAT_78"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strUsername = DataTable.Value("XstoreUserName")
		strPassword = DataTable.Value("XstorePassword")
		strLoginType = DataTable.Value("LoginType")
'		strNewPassword = DataTable.Value("NewPassword")
'		strConformPassword = DataTable.Value("ConformPassword")
'		strFirstName = DataTable.Value("FirstName")
'		strLastName = Datatable.Value("LastName")
'		intEINSF = Datatable.Value("EINSF")
'		strEmail = Datatable.Value("Email")
'		intTillLevel = Datatable.Value("TillLevel")
'		intBackOfficeLevel = Datatable.Value("BackOfficeLevel")
'		IMEI = Datatable.Value("IMEI")
		intMobileNum = datatable.Value("Mobile Number")
		
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
Repositoriescollection.Add DirPath&"\Object Repository\LocalRepo.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Repository1.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\Logout.tsr"
Repositoriescollection.Add DirPath&"\Object Repository\ETURepo.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"
LoadFunctionLibrary DirPath&"\Function Library\ETU_New.qfl"
wait (2)

If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	Call LoginXstore(strLoginType,strUsername,strPassword)
	wait 1
End If




Call Logout(strLoginType)

On Error GoTo 0
ExitRun
