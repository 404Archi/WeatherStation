const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const websocket = require('ws');


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "WeatherStation",
  password: "123dupa321",
  database : 'weatherstation'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query('use weatherstation', function (err, result) {
    if (err) throw err;
  });
});

const wss = new websocket.Server({
  server: httpServer
});

app.use(express.static(__dirname + '/website'));
httpServer.listen(80, function() {
    console.log("Server listening at port 80!");
});

wss.on('connection', (_ws, _req) => {
  console.log('Socket connected from '+_req.socket.remoteAddress+'.');
  _ws.on('message', (data) => {
    data = JSON.parse(data);
    console.dir(data);
    console.log("Got message ["+data+"]");
    if (data.type == "current") {
      console.log("current");
      getCurrent(_ws.send.bind(_ws));
    } else if (data.type == "readings") {
      getReadings(data.range,_ws.send.bind(_ws));
    }else if (data.type == "tempg") {
      getTempg(data.range,_ws.send.bind(_ws));
    }
  });
});

// function getReadings(days, callback) {
//   const sql = "select * from readings where date > now() - INTERVAL "+days+" day ORDER by date DESC";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     callback(JSON.stringify({type: "readings", data: result}));
//   });
// }

function getCurrent(callback) {
  const sql = "select * from readings ORDER by date DESC LIMIT 1";
  con.query(sql, function (err, result) {
    if (err) throw err;
    callback(JSON.stringify({type: "current", data: result}));
  });
}
function getTempg(days, callback) {
  const sql = "select * from readings ORDER by date DESC LIMIT 74";
  con.query(sql, function (err, result) {
    if (err) throw err;
    callback(JSON.stringify({type: "tempg", data: result}));
  });
}
//select * from temperature where date > now() - INTERVAL 7 day; // last 7 days temperature
//select * from humidity where date > now() - INTERVAL 7 day; // last 7 days temperature
//select * from pressure where date > now() - INTERVAL 7 day; // last 7 days temperature