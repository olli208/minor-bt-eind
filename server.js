var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

// View Engine
app.set('view engine' , 'ejs' );
app.set('views' , path.join(__dirname, 'views'));

// Static Path
app.use(express.static(path.join(__dirname, 'static')));

// Body Parser (Do I need This???)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

http.listen(3000, function(){
    console.log('APP IS HERE: http://localhost:3000');
});

// Routers/pages
app.get('/', home);
app.post('/add', addList);

var listArray = [];

function home(req, res) {
    res.render('index', {
        error: 'voeg items toe!',
        listArray: listArray
    })
}

function addList(req, res) {
  if (listArray[0] === undefined || req.body.query !== listArray[listArray.length - 1]) {
      listArray.push(req.body.query)
  }

  if (req.body.query) {
    res.render('index', {
      error: 'nieuw item toegevoegd',
      listArray: listArray
    })
  } else if (req.body.query === '') {
    res.render('index', {
      error: 'Vul alstublieft iets in',
      listArray: listArray
    })
  }
}

// Remove item in array on the basis of a string instead of indexOf...
// source http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 0 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

// Sockets Here
io.sockets.on('connection', function (socket) {
    console.log(socket.id)
      socket.on('remove', function (data){
        removeA(listArray, data);
        console.log('update list' , listArray);
      });

      socket.on('new item', function (data){
        listArray.push(data)
        console.log('list from socket' , listArray);
      });
});