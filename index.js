// Import all modules
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let app = express();
let serverless = require("serverless-http");
let apiRoutes = require("./api-routes");
let cors = require("cors");

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors({origin: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to Mongoose and set connection variable
mongoose.connect(
  "mongodb+srv://user:userpassword@cluster0.yn58n.mongodb.net/taskb?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) =>
  res.send(
    "Hello World with Express and Nodemon! To begin, add /api to the back of the current url!"
  )
);

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running TaskB on port " + port);
});

module.exports = app;
module.exports.handler = serverless(app);
