# ffit-node
"Fantasy Fitness" app using Node, Express, MongoDB, and Mongoose to write an API. Front end to be decided later.

## Getting Started

#### System Requirements
- Install [Node JS](https://nodejs.org/en/)
- Install [Git](https://git-scm.com/downloads)

Node is a server tool that runs entirely on Javascript and creates a server on your local machine.

Git is a version control tool that you can read a little about [here](http://rogerdudler.github.io/git-guide/).

These are *tools*, not programs. You won't be opening a Git program or running node.exe. Once they're installed, they live on your computer and you'll be using them via the terminal/command line. If you have questions about the installation process, ask me or Noah.

**Worth Noting**: If you've looked at any of the very useful scotch.io tutorials I've linked via FB chat, such as ["Build a RESTful API Using Node and Express 4"](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4) or ["Easily Develop Node.js and MongoDB Apps with Mongoose"](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications), you may have noticed that terminal/command line commands are often prefaced by a dollar sign:

> `$ some command`

The dollar sign signifies the start of your command prompt, which looks different for everyone. Mine, for example, looks like `doit-2pk151g3-x:~ dwitter2$`, so the above command would actually look like `doit-2pk151g3-x:~ dwitter2$ some command` on my machine. **TLDR**: Think of the `$` you see in tutorials as a placeholder and ignore it.

#### Get the Project
1. Open terminal (Mac/Linux) or command prompt (Windows) and navigate to the directory where you want to store the project (i.e. `$ cd user/projects`)
2. Clone the project using `$ git clone https://github.com/thevoiceofzeke/ffit-node`

#### First-time Setup
In your terminal/command prompt, navigate to the project's root directory (`/ffit-node`) and run the following command: 
> `$ npm install` 

If you installed Node this command should run successfully and your terminal should go through the rather long process of installing all the project's dependencies. If your install fails, Google the error codes or ask me about it!

You can see the current dependencies and their versions in the `ffit-node/package.json` file. You will need to run `$ npm install` the first time you use the project and any time you manually add a new depency to `package.json`. 

## Run the Project
In terminal/command prompt, navigate to the project's root directory and run the following command: 
> `$ npm start`

The project will start up and continue running until it encounters an error or you close it yourself (pressing `ctrl+c` in the terminal/command prompt).

You can see the project running at [http://localhost:3000](http://localhost:3000). 

You will be asked to login every time you start the project. The following credentials are available upon start-up:

>**username:** admin
   **password:** admin

>**usernmae:** notAdmin
   **password:** notAdmin

You can register as many new users as you like, logout, and log in as other users, but every time the app starts it will wipe the database clean and reset it to only include the two initial users and one league.

#### Alternative Commands
If you think you will be making frequent changes to the back end files (everything except the files in the `/views` and `/public` directories), you may want to start the app using `$ nodemon start` instead of `$ npm start`. 

This will run the app persistently and restart it automatically every time you save a file. If you do not run it this way, you'll have to stop and start the app every time you want to see a back end change in action.



