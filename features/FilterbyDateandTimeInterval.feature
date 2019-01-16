#-------------------------------------------------------------------------------------
# Acceptance Criterion:
# User should be able to Filter by Date and Time Interval
#-------------------------------------------------------------------------------------

Feature: User should be able to Filter by Date and Time Interval

@CucumberScenario
Scenario: User visits Welcome Calc page and filters table with date and hour criteria
Given the user is on 'Welcome to Calc' page
When the user clicks on 'Login' button on welcome page
Then the user is directed to 'Login' page
When the user sets email:'vegan@domain.com'
And the user sets password
And  the user clicks on 'Login' button on login page
Then the user is directed to Calories app page
Then the following records are displayed in the table:
| Name          | Calories  |
| Tofu          | 80        |
| Yogurt        | 180       |
| Avocado salad | 200       |
When the user selects to FILTER BY DATE & TIME INTERVAL
Then the filter by date criteria area is displayed
When the user sets '13012019'at Start Date
And  the user sets '14012019'at End Date
When the user sets '12'at Start Time
And  the user sets '14'at End Time
And the user clicks on Filter button
Then the following records are displayed in the table:
| Name          | Calories  |
| Yogurt        | 180       |
| Avocado salad | 200       |
