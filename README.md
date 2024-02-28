## Description
Blog entries with React + Vite
## Requirements
* Docker
* NVM

## First steps Backend
> **Go to directory `backend/blog-api` and create `.env` file at the root backend project with the environment variables:**

```sh
PORT=3100
DB_HOST=localhost
DB_PORT=1433
DB_USER_NAME=sa
DB_POSSWORD=My_Password
DATA_BASE=master
```
> **Run the following command inside the folder `backend/blog-api`:**

> **Run `Microsoft SQL Server` in docker container:**
```bash
$ docker-compose up -d
```

> **Run the following commands to setup node environment:**

This will install the node version required for this project.
```bash
$ nvm install 
```

This will set as current node version the required version for this project.
```bash
$ nvm use 
```

This will install the project dependencies.
```bash
$ npm install
```
## Running the BackEnd app
This command will start the server, the application will run on `http://localhost:3100/`

```bash
# development
$ npm run start
```

## First steps Frontend
> **Open another thermal and go to directory `frontend/blog-app` and run the following commands to setup node environment.**



This will install the node version required for this project.
```bash
$ nvm install 
```

This will set as current node version the required version for this project.
```bash
$ nvm use 
```

This will install the project dependencies.
```bash
$ npm install
```

## Running the FrontEnd app
This command will start the server, the application will run on `http://127.0.0.1:5173/`

```bash
# development
$ npm run dev
```

## Getting started
> **Open browser in `http://127.0.0.1:5173/`**

> The app starts and displays all the entries.

> You can add, delete or display an entry by clicking the corresponding button.

> You can search entry by title, author or content, all the entries are paginated.


## BackEnd endPoints
> A `blog-api.postman_collection.json` file with a postman collection is attached to the root project, showing the operation of each endpoint.

### Create Entry
> It is necessary to send Json body in the request with the `title, author, content` of the entry.

```bash
Verb: POST
http://localhost:3100/entries
```

### Get Entry by entryId
> It is necessary to send Path Variable `entryId`.

```bash
Verb: GET
http://localhost:3100/:entryId
```

### Delete Entry by entryId
> It is necessary to send Path Variable `entryId`.
This does a soft delete to maintain data consistency.

```bash
Verb: DELETE
http://localhost:3100/:entryId
```

### Get all Entries
> It is optional to send Query Param `limit`, `page` and `search` (to search for a entry by title, author or content) to return data paginated.

```bash
Verb: GET
http://localhost:3100/entries?page=0&limit=10&search=omar
```
## Further work
* Implement endpoint to update entry.
* Implement authentication to create entries with the authenticated user.
* Do integration tests.
* Implement TypeORM migrations.
* Cache the API response to improve performance and have faster response times.
* Improve user interface