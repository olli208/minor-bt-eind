var config = {
    artPieces: [],
    dom: {
        loader: document.querySelector('.spinner'),
        sections: document.querySelectorAll("section"),
        searchBarBtn: document.getElementById("searchBar__btn"),
        searchBar: document.getElementById("searchBar"),
        artContainer: document.getElementById("artContainer"),
        filterBtn: document.getElementById("filter"),
        artObjects: document.getElementById("artObjects"),
        alertMessage: document.getElementById("alertmsg")
    }
};

module.exports = config;