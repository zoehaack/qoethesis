
const express = require('express');
const app = express();
var cors = require('cors')
const port = 3000 || process.env.PORT;
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const path = require('path');
const { env } = require('process');


//middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//route site
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname,'./public/index.html'))
})

app.post('/json', (req,res) => {
  const uuid = uuidv4();
  let file = fs.readFileSync('db.json');
  let parsed = JSON.parse(file);
  let data = req.body;
  let date = new Date().toLocaleString();
  data.push({key: uuid, timestamp: date})
  parsed.push(data);
  let newData = JSON.stringify(parsed, null, 2);
  fs.writeFile('db.json', newData, err =>{
    if(err){
      throw err;
    }
    console.log("New json data added");
  })
 res.send({ 'completion': uuid});
})

app.post('/csv', (req,res) => {
  let file = fs.readFileSync('csv.json');
  let parsed = JSON.parse(file);
  parsed.push(req.body);
  let newData = JSON.stringify(parsed, null, 2);
  fs.writeFile('csv.json', newData, err =>{
    if(err){
      throw err;
    }
    console.log("New csv data added");
  })
 res.sendStatus(200);
})

app.listen(port, () => {
  console.log('Listening on Port ' + port);
})