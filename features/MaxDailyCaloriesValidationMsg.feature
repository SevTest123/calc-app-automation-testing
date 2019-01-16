#-------------------------------------------------------------------------------------
# Acceptance Criterion:
# User should be able to set Max daily calories in his Profile section. If this number 
# is exceeded in Edibles section a validation message should be displayed
#-------------------------------------------------------------------------------------

Feature: User should be able to set Max daily calories in his Profile section. If this number is exceeded in Edibles section a validation message should be displayed.

@CucumberScenario
Scenario: User is able to edit records that indicate the food type, the calories and the Date.
		Given the user with email:'test1@domain.com' is on the Calories app page
        Then No records found text is displayed in the table 
        And the message in Calory Box is 'Today 0/1300 cals'
		When the user selects to ADD edible
        And the user sets 'Burger' at field 'Name'
        And the user sets '500' at field 'Calories'
        And the user clicks on 'Save'
        Then the following records are displayed in the table:
        | Name          | Calories  |
        | Burger        | 500       |
        And the message in Calory Box is 'Today 500/1300 cals'
        And validation message that today's calories number has exceeded Max Calories number is not displayed 
        When the user selects to ADD edible
        And the user sets 'Kokoretsi' at field 'Name'
        And the user sets '850' at field 'Calories'
        And the user clicks on 'Save'
        Then the following records are displayed in the table:
        | Name          | Calories  |
        | Burger        | 500       |
        | Kokoretsi     | 850       |
        And the message in Calory Box is 'Today 1350/1300 cals'
        And validation message that today's calories number has exceeded Max Calories number is displayed 
        When the user visits his profile section
        And the user edits Max Calories field to 1400
        When the user visits Edibles section 
        Then the message in Calory Box is 'Today 1350/1400 cals'
        And validation message that today's calories number has exceeded Max Calories number is not displayed 
        When the user selects to delete record with name:Kokoretsi and calories:850
        When the user selects to delete record with name:Burger and calories:500
        When the user visits his profile section
        And the user edits Max Calories field to 1300
        When the user visits Edibles section 
        Then the message in Calory Box is 'Today 0/1300 cals'