// ========================================================
// TO DO LIST / Wishlist
// ========================================================

(function() { 

  autocomplete();
  letterIndicator();
  navScroll();
  
  // Store names on the page in to its own list
  function storeNames(people , mainElement) {
    
    var contactList = mainElement.querySelectorAll('li');
  
    for (var x = 0; x < contactList.length; x++) {
      var list = contactList[x].innerHTML;
      people.push(list.toLowerCase())
    };
  
    return people;
  }
  
  // Upon typing show suggested names
  function autocomplete() { 
    document.querySelector('.autocomplete').className += ' autocomplete hide';
    var word = [];
    var people = [];
    var mainElement = document.querySelector('main');
    var searchBox = document.querySelector('input');
  
    storeNames(people , mainElement);
    
    searchBox.addEventListener('input' , function(ev) {      
        var searchQuery = searchBox.value;
        var filterPeople = filterOutNames(searchBox.value , people);
  
        renderSuggestions(searchBox , filterPeople , mainElement)
    })
  }
  
  // Show result of what uder is typing
  function renderSuggestions(searchBox , filterPeople , mainElement) {
    var autocomplete = document.querySelector('.autocomplete-names');
    var autocompleteSection = document.querySelector('.autocomplete');
    autocomplete.innerHTML= '';
  
    if (searchBox.value.length > 0) {
      var firstLetter = searchBox.value.charAt(0);
      var h2FirsTLEtter = document.createElement('h2')
  
      filterPeople.forEach(function(name) {
        autocomplete.innerHTML += '<li>' + name + '</li>';
        autocompleteSection.className = ' autocomplete';
      })
  
    } else if (searchBox.value.length <= 0) {
      console.log(autocompleteSection);
      autocompleteSection.className = ' autocomplete hide';
    }
  }
  
  function filterOutNames(val , people) {
    var peopleList = [];
  
    for (i = 0; i < people.length; i++) {
      if (val === people[i].slice(0, val.length)) {
        peopleList.push(people[i]);
      }
    }
  
    return peopleList;
  }
  
  // Calculate the ofsett of an element from top
  function offset(el) {
    var rect = el.getBoundingClientRect();
    return { top: rect.top }
  }
  
  // Check which name section is at the top of the page
  function letterIndicator() {
    var sectionBegin = document.querySelectorAll('main section h2');
    var sideNav = document.querySelector('aside');
  
    window.addEventListener('scroll', function(e) {        
      sectionBegin.forEach(function(el) {
          var divOffset = offset(el);
          var currentLetter = el.innerHTML;
  
          if (divOffset.top > -100 && divOffset.top <= 50) {
            // console.log(el , 'IS BOVEN');
            
            var letterNav = document.querySelector('aside #nav-' + currentLetter);
            letterNav.classList.add('big');                   
          }  else {
            var letterNav = document.querySelector('aside #nav-' + currentLetter);
            letterNav.classList.remove('big');   
          }
        })
    })
  }
  
  // There is a CSS version that works in some browser 
  // but it doenst give control to the speed of animation
  function navScroll() {
    var alphabetNav = document.querySelectorAll('.nav');
    
    for (var i = 0; i < alphabetNav.length; i++) {
      alphabetNav[i].addEventListener('click', function(ev) {
          smoothScroll(this, 15); 
      })
    };
  }
  
  // Animate scroll to the name clicked from letter
  function smoothScroll(toLetter, speed) {
    var pointer = toLetter.getAttribute('href').slice(1);
    var elem = document.getElementById(pointer);
    var elemOffset = elem.offsetTop; 
  
    // console.log(event.target.getAttribute('href').slice(1)) // Works also need testing in IE
  
    var counter = setInterval(function() {
      //  returns the number of pixels that the document is currently scrolled vertically
      window.pageYOffset;
  
      if (window.pageYOffset > elemOffset) { 
          window.scrollTo(0, window.pageYOffset);
          window.pageYOffset -= speed;
  
          if (window.pageYOffset <= elemOffset) {
              clearInterval(counter);
              window.scrollTo(0, elemOffset);
          }
      } else { 
          window.scrollTo(0, window.pageYOffset);
          window.pageYOffset += speed;
  
          if (window.pageYOffset >= elemOffset) { 
              clearInterval(counter);
              window.scrollTo(0, elemOffset);
          }
      }
    }, 1);
  }

}())