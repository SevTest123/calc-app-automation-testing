#-------------------------------------------------------------------------------------
# Acceptance Criterion:
# User should be able to Add / Edit / Delete records that indicate the food type,
# the calories and the Date
#-------------------------------------------------------------------------------------

Feature: User should be able to Add / Edit / Delete records that indicate the food type, the calories and the Date.

@Manual @ToBeAutomated
Scenario: User is able to Add records that indicate the food type, the calories and the Date.
		 Given the user is on Calc App page
		 When the user selects to ADD edible
		 And the user sets 'Burger' at field 'Name'
		 And the user sets '500' at field 'Calories'
		 And the user clicks on 'Save'
		 Then the following records are displayed in the table:
			| Name          | Calories  |
			| Burger        | 500       |

@Manual @ToBeAutomated
Scenario: User is able to delete records that indicate the food type, the calories and the Date.
		Given the user is on Calc App page
		Then the following records are displayed in the table:
		| Name          | Calories  |
		| Burger        | 500       |
		| Kokoretsi     | 850       |
		When the user selects to delete record with name:Kokoretsi and calories:850
		Then the following records are displayed in the table:
		| Name          | Calories  |
		| Burger        | 500       |
		
@CucumberScenario
Scenario: User is able to edit records that indicate the food type, the calories and the Date.
		  Given the user with email:'vegan@domain.com' is on the Calories app page
		  Then the following records are displayed in the table:
            | Name          | Calories  |
            | Tofu          | 80        |
            | Yogurt        | 180       |
            | Avocado salad | 200       |
		  When the user selects to edit record with name:Yogurt and calories:180
		  And the user edits the record with name:Yogurt and calories:180 and sets '130' at field 'Calories'
		  And the user saves the record with name:Yogurt and calories:130
		  Then the following records are displayed in the table:
		    | Name          | Calories  |
            | Tofu          | 80        |
            | Yogurt        | 130       |
            | Avocado salad | 200       |
		  When the user selects to edit record with name:Yogurt and calories:130
		  And the user edits the record with name:Yogurt and calories:130 and sets '180' at field 'Calories'
		  And the user saves the record with name:Yogurt and calories:180
		  Then the following records are displayed in the table:
		    | Name          | Calories  |
            | Tofu          | 80        |
            | Yogurt        | 180       |
            | Avocado salad | 200       |
		
@Manual @ToBeAutomated		
Scenario: User is not able to save a record with empty name 
		  Given the user is on Calc App page
		  When the user selects to ADD edible
		  And the user sets '80' at field 'Calories'
		  And the user clicks on 'Save'
		  Then Error message is displayed 
		  And the record is not saved

@Manual @ToBeAutomated
Scenario: User is not able to save a record with empty calories 
 		  User is not able to save a record with empty name 
		  Given the user is on Calc App page
		  When the user selects to ADD edible
		  And the user sets 'Burger' at field 'Name'
		  And the user clicks on 'Save'
		  Then Error message is displayed
		  And the record is not saved
		  

@Manual @ToBeAutomated
Scenario: User cancels Adding record action
		  Given the user is on Calc App page
		  And No records found text is displayed in the table
		  And the user sets 'Burger' at field 'Name'
		  And the user sets '500' at field 'Calories'
		  And the user clicks on 'Cancel'
		  Then No records found text is displayed in the table

@Manual @ToBeAutomated
Scenario: User cancels editing record action
		  Given the user with email:'vegan@domain.com' is on the Calories app page
		  Then the following records are displayed in the table:
            | Name          | Calories  |
            | Tofu          | 80        |
            | Yogurt        | 180       |
            | Avocado salad | 200       |
		  When the user selects to edit record with name:Yogurt and calories:180
		  And the user edits the record with name:Yogurt and calories:180 and sets '130' at field 'Calories'
		  And the user clicks on 'Cancel' 
		  Then the following records are displayed in the table:
            | Name          | Calories  |
            | Tofu          | 80        |
            | Yogurt        | 180       |
            | Avocado salad | 200       |

