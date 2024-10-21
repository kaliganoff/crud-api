This is a simple CRUD API.

Here's how you use it:
1. Clone the repository: git clone https://github.com/kaliganoff/crud-api
2. Switch to **develop** branch: git switch develop
3. Install all dependencies: npm i
4. Run "npm run start:dev" for dev mode or "npm run start:prod" for prod mode.

You can change the port in the .env file.

Using Postman you can send the following requests:

GET api/users is used to get all persons

GET api/users/{userId} is used to get a single person

POST api/users is used to create record about new user and store it in database

The body has to have this format:

{ 
    username: string;
    age: number;
    hobbies: string[] | []
}

PUT api/users/{userId} is used to update existing user

The body has to have this format:

{ 
    username?: string;
    age?: number;
    hobbies?: string[] | []
}

DELETE api/users/{userId} is used to delete existing user from database