var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var http = require('http').createServer(app);

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
app.post('/search', search);

var listArray = [];
var savedLists = [];

function home(req, res) {
  res.render('index')
}

function search(req, res) {
  var searchResults = filterOutNames(req.body.contact , people);
  console.log(searchResults);
  res.render('result' , {searchResults});
}

// list of people
var people = ["alfonzo schmitmeyer", "annelle ledger", "ardis newcombe", "billy deshotel", "buffy azure", "cecile umberger", "chase montilla", "classie baxter", "david correll", "delora kerrigan", "donette yahn", "emelina balogh", "francis underwood", "gaye saravia", "geoffrey epperson", "glenda neira", "helen lala", "ileen hermosillo", "imogene cresswell", "jasmine beier", "justine varan", "karolyn kyer &nbsp;", "katrina grigsby &nbsp;", "kenda felter &nbsp;", "kiana madewell &nbsp;", "lakenya commodore &nbsp;", "laurie severns", "lazaro lagace&nbsp;", "lola woodbridge", "lorraine preas", "luther trimmer ", "marc olmsted ", "mariana jellison ", "maryann stemm&nbsp;", "nick olmsted", "odell gaier", "odell gayer", "pierre goehring", "peter goehring", "quincy jones ", "q-park amsterdam", "refugia echols", "regina everson", "sophie echols", "sardine everson", "timothy bradley", "tom everson", "ultimate lala", "veronica valala", "veronica mars", "veronica someone", "walker schultheis", "warner chenoweth", "wilhemina seim", "xan xan", "yolanda someone", "zazi zaza", "zidane"]

function filterOutNames(val , people) {
  var peopleList = [];

  for (i = 0; i < people.length; i++) {
    if (val === people[i].slice(0, val.length)) {
      peopleList.push(people[i]);
    }
  }

  return peopleList;
}