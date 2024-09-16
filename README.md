# SmartBrain - Backend/API

1. Clone this repo

2. Run npm install

3. Run start

4. You must create a .env file and add your PAT key, user_id, app_id

5. set up Database by creating a database called smart-brain

6. make 2 tables called users, login
  - run this in your postgres sql: CREATE TABLE users (id PRIMARY KEY SERIAL, name VARCHAR(100), email VARCHAR(255), entries number, joined DATE);
  - run this in your postgres sql: CREATE TABLE login (id PRIMARY KEY SERIAL, hash VARCHAR(255), email VARCHAR(255));

