## plantcare

This is a small PERN stack demo project

It's a plant watering app

You can create users and add plants to a user, and share these plants with other users as well. You register the plant's watering frequency in X days when creating it

Then you can see the user's upcoming plants that have to be watered: when the due date of watering a plant comes, you can check off "plant watered!" and the app pushes the next due date forward of X days


<br>

### How to run the project locally:

<br>

To run this project on your computer, you need to have installed Node.js and npm.
(Here are [instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to do so)

From the command line, navigate to the project's folder, and run:

```
npm run install
```
to install the project's dependencies

<br>

To install PostgreSQL, create a database and connect to it, follow the instructions [here](https://www.taniarascia.com/node-express-postgresql-heroku/), and use the sql commands in the file ./server/init.sql to initiate the database.

In the .env file you have created in ./server, add the following variable:
LOCAL_FRONTEND=http://localhost:3000

Likewise, create an .env file in ./client, with the variable:
VITE_BACKEND_URL=http://localhost:3002

<br>

Then you can start developing:

```
npm run dev
```

this is going to open the development backend and frontend servers

<br>



---

### File structure:

<br>

./client is the frontend:

- src // The code is here
	- components // The React components of the application
	- types // The Typescript types for the project
	- utils // Utility functions
	- main.tsx // The React entry point of the application
- .env // environement variables, not tracked by Git
- .gitignore // the files and folders that shouldn't be tracked by Git
- package-lock.json // Automatically generated, do not touch
- package.json
- tsconfig.json // the Typescript configuration file

./server is the backend:

- controllers // the handler functions for every API route
- databaseLayer // the code responsible to communicate to the database
- routes // the routes for the backend API
- .env // environment variables, not tracked by Git
- config.ts // the configuration file to connect to PostgreSQL
- index.ts // the entry point of the app
- init.sql // the file needed to initiate the database when deploying
- package-lock.json // Automatically generated, do not touch
- package.json
- tsconfig.json // the Typescript configuration file

<br>

---

### Tools used in this project:

<br>

- React, with Vite
- Typescript
- Express
- PostgreSQL
- Styled components

(The idea I had for this mini project was to code as many things as possible by hand, which is why I haven't used libraries such as React Hook Form, Material, an orm...)

<br>

---

🌱

