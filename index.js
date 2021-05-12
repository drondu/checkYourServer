const express = require('express');
const Datastore = require('nedb');
const cors = require('cors');

const app = express();

app.use(cors());
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const database = new Datastore({filename: 'database.db', autoload: true });
//const database_users = new Datastore({filename: 'database_users.db', autoload: true });
//database_users.loadDatabase();
database.loadDatabase();

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  console.log(data);
  database.insert(data);
  response.json(data);
});

// app.post('/api', (request, response) => {
//   const data = request.body;
//   const timestamp = Date.now();
//   data.timestamp = timestamp;
//   console.log(data);
//   database_users.insert(data);
//   response.json(data);
// });

app.get('/api', (request, response) => {
	database.find({})
			.sort({'timestamp': 1}).skip(0).limit(10000).exec((err,data)=>{ 
					response.json(data)}); 
});

// app.get('/api', (request, response) => {
//   database_users.find({})
//       .sort({'timestamp': 1}).skip(0).limit(10000).exec((err,data)=>{ 
//           response.json(data)}); 
// });






