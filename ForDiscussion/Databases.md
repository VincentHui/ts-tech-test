What is the main difference between these two functions?
Why is one better than the other?

const db = myDatabaseManager;

//this function uses one DB call to insert and update a row in the DB. One of the main benefits is that
//because this statement is isolated to one call the db transaction is somewhat atomic and can be reverted more easily
//and might cause less issues if each db call opens a connection to the db. It will be less performant as it needs
//to resolve the insert statement everytime even if its just to use the update logic. In my opinion this function
//is not as good as the other one in terms of maintainabiliity (the insertion and update logic aren't seperated)
// and performance

const myDbFunc = async (data) => {
await db(INSERT INTO table (id,name,age)
VALUES(${data.id},“{data.name}”, ${data.age}) 
    ON DUPLICATE KEY UPDATE name =‘${data.name}”,age=${data.age};‘)
}

//This function potentially sepeartes this logic into two seperate calls one which updates and one that inserts. Altough it might
//open more DB connections it clearly seperates the logic between updating and inserting, as well as being potentially
//more perfomant since the output condition of the first DB query might stop the second
const myOtherDbFunc = async (data) => {  
 const updatedRows = await db(`UPDATE table SET (name, age) VALUES ("${data.name}",${data.age}) WHERE id = ${data.id} RETURNING *;`)  
 // If no rows were updated  
 if (!updatedRows) {
await db(`INSERT INTO table (id, name, age) VALUES(${data.id},"${data.name}", ${data.age});`)
}}
