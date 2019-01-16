#-------------------------------------------------------------------------------------
# Acceptance Criterion:
# User should be able to logout and login again
#-------------------------------------------------------------------------------------

Feature: User should be able to logout and login again

@CucumberScenario
Scenario: User should be able to logout and login again from Welcome App Page
Given the user is on 'Welcome to Calc' page
When the user clicks on 'Login' button on welcome page
Then the user is directed to 'Login' page
When the user sets email:'test1@domain.com'
And the user sets password
And  the user clicks on 'Login' button on login page
Then the user is directed to Calories app page
When the user selects to Logout
Then the user is directed to 'Welcome to Calc' page

@Manual @ToBeAutomated
Scenario: User should be able to logout and login again from Register page
Given the user is on 'Welcome to Calc' page
When the user clicks on 'Register' button on welcome page
Then the user is directed to 'Register' page
When the user selects to Login from 'Register' page
Then the user is directed to 'Login' page
When the user sets email:'test1@domain.com'
And the user sets password
And  the user clicks on 'Login' button on login page
Then the user is directed to Calories app page