var express = require("express");
var app = express();

var rootDir = process.cwd() + "/public";

//var port = 3000;

app.use(express.static(rootDir));

app.listen(process.env.PORT || 5000);
