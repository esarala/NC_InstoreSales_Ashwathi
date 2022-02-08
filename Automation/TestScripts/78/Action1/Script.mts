Repositoriescollection.Add DirPath&"\ObjectRepository\MasterRepository.tsr"

LoginType = "Till"

'LoginXstore(LoginType,strUsername,strPassword)
	If (LoginType="Backoffice") Then
		If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Back Office").Exist(2)) Then
			JavaWindow("Oracle Retail Xstore Point").JavaButton("Back Office").Click
			Wait 2
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Set "100"
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Activate
			Wait 2
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Set "1234"
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Activate

			If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").Exist(2)) Then
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
				Else 
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
			End If

			Else
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Set "100"
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Activate
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Set "1234"
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Back Office Login").Activate
			If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").Exist(2)) Then
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
				Else
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
			End If
			
		End If
	ElseIf (LoginType="Till") Then
		If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Till").Exist(2)) Then
			JavaWindow("Oracle Retail Xstore Point").JavaButton("Till").Click
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Login").Set "100"
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Login").Activate
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Login").Set "1234"
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Login").Activate
			If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").Exist(2)) Then
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
				Else 
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
			End If
			Else
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Login").Set "100"
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Login").Activate
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Login").Set "1234"
			JavaWindow("Oracle Retail Xstore Point").JavaEdit("Login").Activate
			If (JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").Exist(2)) Then
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Override").Click
				Wait 2
'				JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
'				ssWait 2
'				JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
		   ElseIf (JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Exist(2)) Then
		   		JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
				Wait 2
				JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click
			Else
				Reporter.ReportEvent micPass, "Able to login?","Yes, Logged in"
			End If
		End If	
	Else
		Reporter.ReportEvent micFail, "Unable to login", "Test step Failed"
	
	
	End If
	

