﻿'###################################################################################################################fi 0.5i^FI )
'Test Script Name: TC001_UserAccess_Sample
'Script Description: SAMPLE SCRIPT VERIFICATION
'Designed By Date:RAMESH
'Designed Date(MM/DD/YY): 11/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
	
On Error Resume Next
    
'<<<<<<< Updated upstream
DataFilePath = "C:\OnStack_InStoreSales\Automation\TestData\InStoreSales.xls"
'=======
'DataFilePath = "C:\Evolution\Automation\Test Data\Evolution.xls"
'>>>>>>> Stashed changes
TestScriptName = "TC003_Evolution_Verify_BrowserLogin"
	
DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
'<<<<<<< Updated upstream
'	If strcomp(CurrentTestCaseName,TestScriptName)=0 Then
'=======
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
'>>>>>>> Stashed changes
		strUsername = trim(DataTable.Value("UserName"))
		strPassword = trim(DataTable.Value("Password"))
		strURL = DataTable.Value("URL")
		intStoreId = DataTable.Value("StoreID")
'<<<<<<< Updated upstream
		intPLU = DataTable.Value("PLU")
		strAnotherStoreId = DataTable.Value("ChangeStoreID")
		strStoreName = DataTable.Value("StoreName")
		strChangeStoreName = DataTable.Value("ChangeStoreName")
		strDeviceName = DataTable.Value("DeviceName")
		strSimType = DataTable.Value("SimType")
'=======
		strAnotherStoreId = DataTable.Value("ChangeStoreID")
		strStoreName = DataTable.Value("StoreName")
		strChangeStoreName = DataTable.Value("ChangeStoreName")
'>>>>>>> Stashed changes
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
'<<<<<<< Updated upstream
Repositoriescollection.Add DirPath&"\ObjectRepository\Evolution.tsr"
Repositoriescollection.Add DirPath&"\ObjectRepository\Steffy_NC.tsr"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
'LoadFunctionLibrary DirPath&"\Automation\Function Library\Evolution.qfl"

Call LaunchEvolutionFromXstore() 
wait (3)
call EvolutionLoginBrowser(strUsername,strPassword,strURL,intStoreId,strAnotherStoreId,strStoreName,strChangeStoreName)
Wait 2
Call LaunchNC()
wait 2
Call NCSearchProductsinListingsPage(strDeviceName)


'=======
Repositoriescollection.Add DirPath&"\Object Repository\Evolution.tsr"
LoadFunctionLibrary DirPath&"\Function Library\Common Functions.qfl"
'LoadFunctionLibrary DirPath&"\Automation\Function Library\Evolution.qfl"

wait (2)

If Browser("Evolution").exist(2) Then
	Browser("Evolution").Close	
End If

If Browser("Evolution").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	call EvolutionLoginBrowser(strUsername,strPassword,strURL,intStoreId,strAnotherStoreId,strStoreName,strChangeStoreName)
	wait 1
End If

wait 3
'>>>>>>> Stashed changes

If Browser("Evolution").exist(2) Then
	Browser("Evolution").Close
End If
 @@ hightlight id_;_6162156_;_script infofile_;_ZIP::ssf1.xml_;_
'Call Logout(strUsername,strPassword)


On Error GoTo 0
ExitRun 
