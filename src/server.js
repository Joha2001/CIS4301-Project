let connection;
var oracledb = require('oracledb');

(async function() {
try{
   connection = await oracledb.getConnection({
        user : 'maklein',
        password : 'Chimera15',
        connectString : 'oracle.cise.ufl.edu:1521/orcl'
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