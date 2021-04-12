let connection;
var oracledb = require('oracledb');
require("dotenv").config();

(async function() {
try{
   connection = await oracledb.getConnection({
        user : process.env.USER,
        password : process.env.PASSWORD,
        connectString : process.env.CONNECT_STRING

   });
   console.log("Successfully connected to Oracle!")
} catch(err) {
    console.log("Error: ", err);
  } 
    if (connection) {
      try {
        await connection.close();
        console.log("Database Connection closed.")
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
}
)()