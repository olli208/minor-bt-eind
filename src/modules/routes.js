var routie = require('routie');

var routes = {
    init: function() {
        routie({
            'app__home': function() {
                sections.toggle(window.location.hash);
                },
            'app__list': function() {
                sections.toggle(window.location.hash);
                }
            });
        }
        };

    module.exports = routes;