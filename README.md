This is my solution to the assignment for candidates applying for a frontend position at Falcon.io.
More info can be found at the [originally cloned repository](https://github.com/FalconSocial/frontend-assignment).

**Note: Please make sure that the server is setup and running BEFORE running the client app in order to have a smooth experience :) .**
## Client setup
Please navigate to /client/README.md file for client setup steps

## Server setup
Please navigate to /server/README.md file for server setup steps

A short description of the development process:
I decided to start the assigment with displaying/listing tasks. I decided to integrate ngrx for state management and routing as early as possible. I started with some hardcoded data and slowly moved my way to implementing a TaskService for fetching/posting data from the server. After that I moved my way to Create and Edit components, along with select and delete functionality. They were mostly straightforward. I added guards so that they can be more functional when their route is being initially requested. The final effort was for the Complete Task functionality.