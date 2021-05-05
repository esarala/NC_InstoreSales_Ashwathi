'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
TestScriptName = "AO2_01_ISS_UAT_114"
	
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
'LoadFunctionLibrary DirPath&"\FunctionLibrary\Electronic_Audit_Xstore.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\XstoreCommonFunctions.qfl"
'msgbox DirPath

Call LoginXstore(LoginType,strXstoreUsername,strXstorePassword)
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Get Orders").Click
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Pending Orders").Click
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaList("Pending Orders").Select "#0"
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Retrieve Order Details").Click @@ hightlight id_;_1006271270_;_script infofile_;_ZIP::ssf2.xml_;_
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaEdit("Enter PLU or IMEI").Set "0190198107077"
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Enter").Click
Wait 4

If (JavaWindow("Oracle Retail Xstore Point").JavaEdit("text:=Not possible during a NetCracker transaction").Exist(2)) Then
		'JavaWindow("Oracle Retail Xstore Point").JavaEdit("text:=Not possible during a NetCracker transaction").GetROProperty("enabled")="1") Then
	Reporter.ReportEvent micPass, "Message displayed","Test Passed"
	Else
	Reporter.ReportEvent micFail, "Message not displayed","Test Failed"
End  if
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Log Off").Click
Wait 2
JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click


On Error GoTo 0
ExitRun
