const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "demo_cms"
})

app.get('/showData', (req, res)=> {
    db.query("SELECT * FROM blog", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.post('/create', (req, res) =>{
    const title = req.body.title;
    const description = req.body.description;

    db.query("INSERT INTO blog (title, description) VALUES(?,?)", 
    [title, description],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values inserted")
        }
    }
    );
})

app.put('/update', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    db.query("UPDATE blog SET title = ?, description = ? WHERE id = ?", 
    [title, description, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);   
        }
    });
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM blog WHERE id = ?", id, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

app.listen('3001', () =>{
    console.log('Server is running on port 3001');
})