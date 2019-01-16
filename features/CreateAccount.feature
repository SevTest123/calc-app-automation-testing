#--------------------------------------------------------------------------------
# Acceptance Criterion:
# New users should be able to create an account giving name, email and password
# Acceptance Criterion:
# Password should be at least 8 characters
#---------------------------------------------------------------------------------

Feature: As a new User I want to create an account in order to input my calories 

@Manual @ToBeAutomated
Scenario: User creates and account by giving name, valid email and password
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets name:<Name> in name field
		And the user sets email:<email> in email field
		And the user sets password for Username in password field
		And the user sets password for Username in confirm password field
		And the user clicks on Join button 
		Then the user is directed to CallApp page

@Manual @ToBeAutomated		
Scenario: User cannot create account with empty name 
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets email:<email> in email field
		And the user sets password for Username in password field
		And the user sets password for Username in confirm password field
		And the user clicks on Join button 
		Then the user is not registered

@Manual @ToBeAutomated		
Scenario: User cannot create account with empty email 
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets name:<Name> in name field
		And the user sets password for Username in password field
		And the user sets password for Username in confirm password field
		And the user clicks on Join button 
		Then the user is not registered

@Manual @ToBeAutomated		
Scenario: User cannot create account with empty password 
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets name:<Name> in name field
		And the user sets email:<email> in email field
		And the user sets password for Username in confirm password field
		Then the user is not registered
		
@Manual @ToBeAutomated		
Scenario: User cannot create account with empty confirm password 
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets name:<Name> in name field
		And the user sets email:<email> in email field
		And the user sets password for Username in password field
		Then the user is not registered

@Manual @ToBeAutomated		
Scenario Outline: User cannot create account with invalid email
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets name:<Name> in name field
		And the user sets email:<invalidEmail> in email field
		And the user sets password for Username in password field
		Then the user is not registered
		Examples:
		| invalidEmail |
		| domain.com   |
		| test@.com    |
		| Test.uk@com  |

@Manual @ToBeAutomated		
Scenario Outline: User cannot create account when password and confirm password do not match
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets name:<Name> in name field
		And the user sets email:<email> in email field
		And the user sets <password> for Username in password field
		And the user sets <confirmpassword> for Username in confirm password field
		And the user clicks on Join button 
		Then the user is not registered
		Examples:
		| password 	| confirmpassword  | 
		| Aa123456	| Aa12345          | 

@Manual @ToBeAutomated			
Scenario Outline: User is able to create account giving password with more than/exactly 8 characters
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets name:<Name> in name field
		And the user sets email:<email> in email field
		And the user sets password for Username in password field
		And the user sets password for Username in confirm password field
		And the user clicks on Join button 
		Then error message is displayed
		And the user is not registered
		Examples:
		| password    |
		| test1234rt  |
		| test1234    |

@Manual @ToBeAutomated
Scenario Outline: User is not able to create account giving password with less then 8 characters
		Given on Welcome page
		And the user selects to register
		Then the user is on register page
		When the user sets name:<Name> in name field
		And the user sets email:<email> in email field
		And the user sets password for Username in password field
		And the user sets password for Username in confirm password field
		And the user clicks on Join button 
		Then error message is displayed
		And the user is not registered
		Examples:
		| password |
		| test123  |
		| test_99  |

			
		