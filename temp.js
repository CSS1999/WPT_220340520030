const express = require('express');
const app = express();

const mysql = require('mysql');

app.use(express.static("sf"));

app.listen(990);

app.get('/getbookname',(req, resp)=>{
    console.log("Ajex function called");

    const dbobject = {
        host: 'localhost',
        user: 'chndrakant',
        password: 'cdac',
        database: 'pleasework',
        port: '3306'
    }
    const con = mysql.createConnection(dbobject);

    let output = {status: false, detail:{bookid: 0, bookname: "", prize:""}}

    let bookid = req.query.bookid;
    console.log(bookid);
    
    con.query('select bookid, bookname, prize from book where bookid = ?', [bookid],
        (error, rows) => {
            if(error){
                console.log(error);
            }
            else{
                if(rows.length>0){
                    output.status = true;
                    output.detail = rows[0];
                }
                else {
                console.log("No book found with this bookid");
                }
            }
            console.log(output);
            resp.send(output);
        });
    
});

app.get('/updatebookname', (req, resp)=>{
    console.log("Ajex function called");

    const dbobject = {
        host: 'localhost',
        user: 'chndrakant',
        password: 'cdac',
        database: 'pleasework',
        port: '3306'
    }
    const con = mysql.createConnection(dbobject);

    let detail = {bookid: req.query.bookid,
        bookname : req.query.bookname,
        prize : req.query.prize}

    let output = {status: false}

    console.log(bookid);
    
    con.query('update from book set bookid = ?, bookname = ?, prize = ?', 
    
    [detail.bookid, detail.bookname, detail.prize]

        (error, res) = {

            if(error){

                console.log(error);

            } else {
                if(res.affectedRows > 0){
                    console.log("update Successful");
                    output.status = true;

                }
                else{
                    console.log("Update failed");
                }
            }
            console.log(output);
            resp.send(output)
        });
                    
                    

                
 });   