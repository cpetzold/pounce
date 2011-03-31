var express = require('express');

var app = module.exports = express.createServer();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('board.jade', {
    layout: false,
    locals: {
      title: 'pounce'
    }
  });
});

if (!module.parent) app.listen(8080);