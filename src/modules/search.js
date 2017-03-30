var request = require('./request.js');
var config = require('./config.js');

var search = {
    init: function() {
        config.dom.searchBarBtn.addEventListener('pointerdown', this.getQuery);
        config.dom.searchBar.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                config.dom.searchBarBtn.addEventListener('pointerdown', onSearch.getQuery());
            }
        });
    },
    getQuery: function() {
        // When user searches API call is made:
        request.init(document.getElementById("searchBar").value);
    }
};

module.exports = search;