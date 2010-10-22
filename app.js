var port = 1337;
require.paths.unshift(__dirname + '/support/express/support/express/lib/',
                      __dirname + '/support/jade/lib/',
                      __dirname + '/');

var express = require('./support/express');

var app = module.exports = express.createServer();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  port = 80;
  app.use(express.errorHandler()); 
});

app.get('/', function(req, res){
  res.render('board.jade', {
    layout: false,
    locals: {
      title: 'pounce'
    }
  });
});

if (!module.parent) app.listen(port);
