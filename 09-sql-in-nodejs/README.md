# Using SQL in Node Express

This part of the learning is all about how can we use the SQL database in our Node and Express and get rid of the fileSystem which we used in the previous project folder.

The biggest disadvantages of fileSystem is that they are not suitable for handling thousands of queries per second as the writing in to file and reading it from file is a exhausting task when the data in file is large.

## Things I used and learned in this part

- How to install SQL RDBMS and configure it with Express to execute queries.
- applied my previous knowledge of SQL to write queries in efficient.
- how to handle the response send by SQL server (like if it sends promise) for queries we wrote.

## What I implemented:

- fetching all and specific data from Tables
- update data in tables
- deleting data in tables
- Joining two tables to (Natural Joins)
- using aggregate funtion in conjuction with group by
- insert data conditionally when record exists and when record doesn't exit in the table

You can see the queries in `models` folder

## Project images:

![image](https://github.com/rambabu-patidar/nodejs-learning-projects/assets/96621812/b9ece582-9466-4121-b371-a69c2a6b1bbd)
![image](https://github.com/rambabu-patidar/nodejs-learning-projects/assets/96621812/0b3db46d-a16f-4620-8785-baa207491a65)
![image](https://github.com/rambabu-patidar/nodejs-learning-projects/assets/96621812/9657f763-ca7f-401d-8f0b-4685bc89b1b2)
![image](https://github.com/rambabu-patidar/nodejs-learning-projects/assets/96621812/3a68dcf6-c254-4e06-bdc2-01b0989fe533)
![image](https://github.com/rambabu-patidar/nodejs-learning-projects/assets/96621812/45e45127-5bd3-42f3-9841-33bc28caf1cc)
![image](https://github.com/rambabu-patidar/nodejs-learning-projects/assets/96621812/d32f270a-9ad9-4cdc-95bd-baa798681e02)







## The Database looks like:

![image](https://github.com/rambabu-patidar/nodejs-learning-projects/assets/96621812/214f1d5c-0a33-451f-80df-67203b93a7b9)
![image](https://github.com/rambabu-patidar/nodejs-learning-projects/assets/96621812/29785511-23e8-4a7c-8a6b-ff356c14e1bb)


