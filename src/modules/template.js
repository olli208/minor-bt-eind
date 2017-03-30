var handlebars = require('handlebars');
var routie = require('routie');

var config = require('./config.js');

var template = {
    handlebars: function () {
        //renders the page with search results
        config.dom.artContainer.innerHTML = Handlebars.compile(config.dom.artObjects.innerHTML)(config.artPieces);

        // amount of results is shown to user
        Handlebars.compile(document.getElementById("results").innerHTML += config.artPieces.artObjects.length);

        // Route is used here because it depends
        // On the button that appears
        // When handlebars renders the searchresults
        routie({
            'app__list/:id': function(id) {
                renderHTML.moreInfo(id);
            }
        });

        config.dom.filterBtn.addEventListener('pointerdown', this.filter);
    },
    // More info function for when user selects more info
    moreInfo: function(hashId) {
        var idButton = document.getElementById(hashId).id;
        var idMoreInfo = document.getElementById("app__list/" + hashId).id.replace("app__list/", "");

        if (idButton === idMoreInfo) {
            document.getElementById("app__list/" + hashId).classList.remove('section__hide');
        }
    },
    // Filter button for when user
    filter: function() {
        var filterArtPieces = [];

        Object.keys(config.artPieces.artObjects).forEach(function (key) {
            filterArtPieces.push(config.artPieces.artObjects[key]);
        });

        var filter = filterArtPieces.filter(function (obj) {
            if (obj.hasImage) {
                return filterArtPieces
            }
        });

        // Because of how my Handlebars is setup,
        // I have to put the new array within an object
        var filterObject = {filter};

        config.dom.artContainer.innerHTML = Handlebars.compile(document.getElementById("artObjectsFilter").innerHTML)(filterObject);
        Handlebars.compile(document.getElementById("resultsfilter").innerHTML += filterObject.myFilter.length);
    }
};

module.exports = template;