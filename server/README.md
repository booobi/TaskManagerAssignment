## Setup
The initially provided setup did not work for me and I had to change some configuration to get it working (step 2, step 3)

1.  Run `npm i` to install packages
2.  Navigate to config/security.js and change the `cors` `allRoutes` property to `true` and save the file
3.  (Windows) Run `SET NODE_ENV=production && node app.js` (alternatively change the npm start script)
OR
(Linux/Unix) Run `npm start`

Server should now be running.
