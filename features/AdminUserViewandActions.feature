#-----------------------------------------------------------------------------------------------------
# Acceptance Criterion:
# If the user login as admin (email: harvey@pearson-specter.com and password: suits2016) he
# should be able to see a Users section through he can view the other users Edibles. He should be
# also able to change the role of other users and also delete them.
#------------------------------------------------------------------------------------------------------

Feature: As a User with role admin, I want to be able to delete or change role of users and also view their Edibles

@Manual @ToBeAutomated
Scenario: User with admin Role views Users
		Given the user with Admin role is on Calories app page
		When the user selects to view Users
		Then the user views Users records

@Manual @ToBeAutomated
Scenario: User with admin Role views Edilbes of Users via Users section
		Given the user with Admin role is on Calories app page
		And the user selects Users section
		Then the user views Users records
        When the user selects to view Edibles of user:<VeganUser>
        Then the following Edibles records are displayed:
        | Name          | Calories  | 
        | Tofu          | 80        |
        | Yogurt        | 180       |
        | Avocado salad | 200       |

@Manual @ToBeAutomated
Scenario Outline: User with admin Role changes role of user
		Given the user with Admin role is on Calories app page
		When the user views Users records
        And the user with Admin role sets role:<Role> to User:<User>
        Then the user:<User1> has role:<admin>
        Examples:
        | User  | Role    |
        | User1 | admin   |
        | User2 | simple  |		

@Manual @ToBeAutomated
Scenario Outline: User with admin Role deletes User
		Given the user with Admin role is on Calories app page
		When the user views Users records
        When the user with Admin role delects to delete User:<User>
        Then the user:<User1> has role:<admin>
        Then the user:<User1> is not included in Users section
        Examples:
        | User  | Role    |
        | User1 | admin   |

        