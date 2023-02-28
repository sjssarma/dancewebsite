const express = require("express");
const path = require("path");
const app = express();
const port = 800;

const conn = require('./connection');

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var address = req.body.address;

    var sql = 'INSERT INTO contact(name, phone,email,address) VALUES(?, ?, ?, ?)';
    conn.query(sql, [name, phone, email, address], (error, data)=>{
        if(error){
            console.log(error);
        }else{
            const params = {}
            res.status(200).render('home.pug', params);
        }
    })
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});