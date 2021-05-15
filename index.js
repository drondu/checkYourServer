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
            
            // console.log('User list', users);
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.post('/login', async(req, res) =>{

    try{
        var foundUser; 
        database.accounts.find({"email":req.body.email}, async  function (err,docs){ 
            if (err) throw err;
            foundUser = docs[0];
            
        });
        
        await sleep(100);

        if (foundUser.username !== "") {
            let submittedPass = req.body.password;
            const passwordMatch = await bcrypt.compare(submittedPass, foundUser.password);
            if (passwordMatch) {
                var usrname = foundUser.username;
                res.render(path.join(__dirname+'/public/pages/charts.html'), {uname: foundUser.username});
            } 
            else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

const port = process.env.PORT || 3000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));