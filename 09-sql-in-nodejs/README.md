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

## The Database looks like:
