#--------------------------------------------------------------------------------
# Test Scenario that will test e2e the calories-calc application
#---------------------------------------------------------------------------------

Feature: User enters calories calc web-app in order to manage his calories 

@CucumberScenario
Scenario: User visits Welcome Calc page in order to add Edibles
Given the user is on 'Welcome to Calc' page
When the user clicks on 'Login' button on welcome page
Then the user is directed to 'Login' page
When the user sets email:'test1@domain.com'
And the user sets password
And  the user clicks on 'Login' button on login page
Then the user is directed to Calories app page
When the user selects to ADD edible
And the user sets 'Burger' at field 'Name'
And the user sets '500' at field 'Calories'
And the user clicks on 'Save'
Then the following records are displayed in the table:
| Name          | Calories  |
| Burger        | 500       |
When the user selects to ADD edible
And the user sets 'Kokoretsi' at field 'Name'
And the user sets '850' at field 'Calories'
And the user clicks on 'Save'
Then the following records are displayed in the table:
| Name          | Calories  |
| Burger        | 500       |
| Kokoretsi     | 850       |
When the user selects to delete record with name:Kokoretsi and calories:850
Then the following records are displayed in the table:
| Name          | Calories  |
| Burger        | 500       |
When the user selects to delete record with name:Burger and calories:500
Then No records found text is displayed in the table
When the user selects to Logout
Then the user is directed to 'Welcome to Calc' page

