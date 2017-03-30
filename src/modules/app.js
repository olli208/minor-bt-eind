var routes = require('./routes.js');
var search = require('./search.js');

var app = {
    init: function () {
        routes.init();
        search.init();
    }
};

module.exports = app;