const mysql = require('mysql');

const conn = mysql.createConnection({
    host : 'localhost',
    database : 'testing',
    user : 'root',
    password : ''
})

conn.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Connected');
    }
})

module.exports = conn;