var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var config = require('./config/db');
var sql = require("mssql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    if(req.method==="OPTIONS"){

        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
  });
  

require("./routes/todos.js")(app);

app.get('/', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
    });
});

var port = 8080;
app.listen(port);
