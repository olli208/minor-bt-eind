var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();


// View Engine
app.set('view engine' , 'ejs' );
app.set('views' , path.join(__dirname, 'views'));

// Static Path
app.use(express.static(path.join(__dirname, 'static')));

// Body Parser (Do I need This???)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log('APP IS HERE: http://localhost:3000');
});


// Routers/pages
app.get('/', home);
app.post('/add', addList);
app.post('/remove', removeList);

var listArray = [];

function home(req, res) {
    res.render('index', {
        error: 'voeg items toe!',
        listArray: listArray
    })
}

function addList(req, res) {
    // console.log(req.body.query);
    if (req.body.query === '') {
        res.render('index', {
            error: 'Vul alstublieft iets in',
            listArray: listArray
        })
    } else  {
        listArray.push(req.body.query);
        res.render('index', {
            error: 'nieuw item toegevoegd',
            listArray: listArray
        })
    }
    // console.log(listArray);
}

function removeList(req, res) {
    removeA(listArray, 'kaas');
    // listArray.splice(1, 1);
    console.log(req.remove);
    res.render('index', {
        error: 'voeg items toe!',
        listArray: listArray
    });
}

// source http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}