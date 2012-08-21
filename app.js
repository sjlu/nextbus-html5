var express = require('express');

var app = express();

app.configure(function(){
   app.use(express.static(__dirname + '/public'));
   app.use(express.logger());
   app.use(app.router);
});

app.listen(process.env.PORT || 5000);