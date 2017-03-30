var search = require('./search.js');
var template = require('./template.js');
var config = require('./config.js');

var request = {
    init: function (query) {
        var request = new window.XMLHttpRequest();
        var api = "https://www.rijksmuseum.nl/api/nl/collection?q=" + query + "&key=NG2q9L0R&format=json&ps=50&type=";

        app.dom.loader.classList.remove("section__hide");

        request.open("GET", api, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                config.dom.loader.classList.add("section__hide");
                var data = JSON.parse(request.responseText);

                config.artPieces = data;
                template.handlebars(data);
            } else {
                config.dom.loader.classList.add("section__hide");
                Handlebars.compile(config.dom.alertMessage.innerHTML += "Laden van foto's is niet gelukt.");
            }
        };

        request.onerror = function () {
            config.dom.loader.classList.add("section__hide");
            Handlebars.compile(config.dom.alertMessage.innerHTML += "Laden van foto's is niet gelukt.");
        };
        request.send();
    }
};

module.request = request;