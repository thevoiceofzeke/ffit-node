# ffit-node
"Fantasy Fitness" app using Node, Express, MongoDB, and Mongoose to write an API. Front end to be decided later.

## Getting Started

#### System Requirements
- Install [Node JS](https://nodejs.org/en/) on your machine.

#### Get the Project
1. Open terminal (Mac/Linux) or command prompt (Windows) and navigate to the directory where you want to store the project (i.e. `$ cd user/projects`)
2. Clone the project using `$ git clone https://github.com/thevoiceofzeke/ffit-node`

#### First-time Setup
In your terminal/command prompt, navigate to the project's root directory (`/ffit-node`) and run the following command: `$ npm install`. 

If you installed Node this command should run successfully and your terminal should go through the rather long process of installing all the project's dependencies. If your install fails, Google the error codes or ask me about it!

You can see the current dependencies and their versions in the `ffit-node/package.json` file. You will need to run `$ npm install` the first time you use the project and any time you manually add a new depency to `package.json`. 

## Run the Project
In terminal/command prompt, navigate to the project's root directory and run the following command: `$ npm start`. 

The project will start up and continue running until it encounters an error or you close it yourself (pressing `ctrl+c` in the terminal/command prompt).

You can see the project running at [http://localhost:3000](http://localhost:3000). 

You will be asked to login every time you start the project. The following credentials are available upon start-up:

> username: admin
> password: admin

> usernmae: notAdmin
> password: notAdmin

You can register as many new users as you like, logout, and log in as other users, but every time the app starts it will wipe the database clean and reset it to only include the two initial users and one league.

#### Alternative Commands
If you think you will be making frequent changes to the back end files (everything except the files in the `/views` and `/public` directories), you may want to start the app using `$ nodemon start` instead of `$ npm start`. 

This will run the app persistently and restart it automatically every time you save a file. If you do not run it this way, you'll have to stop and start the app every time you want to see a back end change in action.



