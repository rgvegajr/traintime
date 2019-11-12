This application allows users to input a train name, destinattion, first departure time and frequency.  The application then calculates and displays the next arrival time and how many minutes from current time (when entered) until the next train arrives.  The application stores these data items in a persistent database and displays relevant data in a table format.

This application was built using standard front end technologies (HTML5, CSS< javascript) as well as bootstrap, jquery, and momentJS libraries.  Additionally, the application uses Google firebase noSQL back-end technology for train data storage and retrieval.

Instructions:
1.  Enter train name, destination, first departure time (in 24 hour format) and frequency (in minutes) and click submit.
2.  Table will display name, destination, and frequency as well as the next train arrival time and how many minutes to go until the arrival from the current time.  Current time is defined as the time when the form is completed and submitted.

Known Issues:
1.  Inconsistent cross-browser handling of train departure time entry may require use of time in AM or PM versus the desired entry time in 24 hour format

Future Enhancements:
1.  TBD

Link to application:

https://rgvegajr.github.io/traintime/
