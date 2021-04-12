let connection;
var oracledb = require('oracledb');

(async function() {
try{
   connection = await oracledb.getConnection({
        user : '',
        password : '',
        connectString : '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA = (SID = orcl)))'
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