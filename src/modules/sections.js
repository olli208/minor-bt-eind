var routes = require('./routes.js');
var config = require('./config.js');

var sections = {
    toggle: function(route) {
        config.dom.sections.forEach(function (el) {
            if ('#' + el.id === route) {
                el.classList.remove("section__hide");
            } else {
                el.classList.add("section__hide");
            }
        });
    }
};

module.exports = sections;
