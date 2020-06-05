// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
var bodyParser = require('body-parser');
var express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
var cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// const weatherFakeData = [];

app.get('/projectData', getWeatherData)
function getWeatherData(req, res) {
  res.send(projectData);
}

app.post('/projectData', addResponse);

function addResponse(req, res) {

  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }

  // projectData.push(newEntry)
  res.send(projectData)
  console.log(addResponse)
}
// Setup ServerW
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost:${port}`);
}