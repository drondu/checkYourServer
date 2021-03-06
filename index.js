const express = require('express');
const Datastore = require('nedb');
const cors = require('cors');
const app = express();

const fs = require('fs')
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;
const server = http.createServer(app);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cors());
app.use(express.static(__dirname + "/public/pages"));

app.use("/styles",express.static(__dirname +"/public/styles/"));

app.use("/scripts",express.static(__dirname +"/public/scripts/"));

app.use(express.static(__dirname + "/public"));

app.use(express.json());

var database = new Datastore({filename: 'database.db', autoload: true });
database.accounts = new Datastore({filename: 'accounts.db', autoload: true })

database.accounts.loadDatabase();



app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  console.log(data);
  database.insert(data);
  response.json(data);
});

app.get('/api', (request, response) => {
	database.find({})
			.sort({'timestamp': 1}).skip(0).limit(10000).exec((err,data)=>{ 
					response.json(data)}); 
});


app.use(bodyParser.urlencoded({extended: false}));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
   
});


app.post('/register', async (req, res) => {
    
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            database.accounts.insert(newUser);
            
            res.redirect('pages/registration_succesful.html');
        } else {
            res.redirect('pages/email_used.html');
        }
    }catch{
        res.send("Internal server error");
    }
});

app.post('/login', async(req, res) =>{
 
    database.accounts.find({"email":req.body.email}, async  function (err,docs){ 
        if (err) throw err;
        
        if(docs.length == 1){
        const foundUser = docs[0];
            const founUser_pass = foundUser.password;
            try{
                const match = await bcrypt.compare(req.body.password,founUser_pass);
                if(match){
                    res.status(200).json({user:foundUser});
                }else{
                res.status(401).json({message:"Your pass is invalid!!!!"});
                }
            }catch{
                res.status(401).json({message:"Your pass is invalid!!!!"});
            }
        }else{
        res.status(404).json({message:"User not found!!!!"});
        }
    });
});


const port = process.env.PORT || 3000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));