const mysql = require('mysql');

const mysqlConnection = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        database:'todolist',
        password:'123123'
    }
)

mysqlConnection.connect((err)=>{
    if(err){
        console.log(`db connected error => ${err}`);
    }else{
        console.log(`db connected!`);
    }
})

module.exports = mysqlConnection;