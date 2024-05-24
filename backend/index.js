import express from 'express'
import mysql from 'mysql'

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iknjiga'
})

app.get('/', (req,res)=>{
    res.json("ovo je mudance")
})

app.listen(8800, 
    () => {
        console.log("mudo moe");
    }
)