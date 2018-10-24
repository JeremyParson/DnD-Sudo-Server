const mysql = require('mysql');
const fs = require("fs");
var connection = null;


function getKey(){
    return new Promise((res, rej) => {
        fs.readFile('./database_key.txt', 'utf8', function(err, contents) {
            contents = contents.split("\n");
            res(contents)
        });
    })
}

getKey().then((results) => {
    connection = mysql.createConnection({
        host : 'localhost',
        user : results[0],
        password : results[1],
        database : results[2]
    })
}).then(() => {
    console.log("Connection Created!")
}).then(() => {
    console.log("query");
    connection.query('SELECT * FROM users', (err, results) => {
        if(err) throw err;
        console.log(results);
    })
})

exports.getId = (password, email) => {
    return new Promise((res, rej) => {
        let search = "user_id";
        let sql = `SELECT ${search} FROM users WHERE email = ${email} AND password = ${password}`;

        console.log(sql);

        let queryDB = () => {
            return new Promise((res, rej) => {
                connection.query(sql, function(err, results) {
                    if (err) throw err;
                    console.log(results);
                    if(results[0] == undefined){
                        res(null);
                    }else{
                        res(results[0].user_id);
                    }   
                })
            })

        }

        queryDB().then((data) => {
            res(data)
        })

    })
}
