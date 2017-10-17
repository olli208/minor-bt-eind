// ========================================================
// TO DO LIST / Wishlist
// ========================================================

var alphabetNav = document.querySelectorAll('.nav');

for (var i = 0; i < alphabetNav.length; i++) {
  alphabetNav[i].addEventListener('click', function(ev) {
      smoothScroll(this, 15);
      ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false);
  })
};

function smoothScroll(toLetter, speed) {
  var pointer = toLetter.getAttribute('href').slice(1);
  var elem = document.getElementById(pointer);
  var elemOffset = elem.offsetTop; // returns the distance of the current element relative to the top of the offsetParent node

  // console.log(event.target.getAttribute('href').slice(1)) // Works also need testing in IE

  var counter = setInterval(function() {
    //  returns the number of pixels that the document is currently scrolled vertically
    window.pageYOffset;

    if (window.pageYOffset > elemOffset) { // from bottom to top
        window.scrollTo(0, window.pageYOffset);
        window.pageYOffset -= speed;

        if (window.pageYOffset <= elemOffset) { // scrolling until elemOffset is higher than scrollbar position, cancel interval and set scrollbar to element position
            clearInterval(counter);
            window.scrollTo(0, elemOffset);
        }
    } else { // from top to bottom
        window.scrollTo(0, window.pageYOffset);
        window.pageYOffset += speed;

        if (window.pageYOffset >= elemOffset) { // scroll until scrollbar is lower than element, cancel interval and set scrollbar to element position
            clearInterval(counter);
            window.scrollTo(0, elemOffset);
        }
    }
  }, 1);
}

function autocomplete() {
  var people = [];
  var word = [];
  var mainElement = document.querySelector('main');
  var contactList = mainElement.querySelectorAll('section')
  var searchBox = document.querySelector('input[type=search]');

  contactList.forEach(function (el) {
    el.querySelectorAll('li').forEach(function(el) {
      people.push(el.innerHTML.toLowerCase());
    })
  })

  // Need some fixing doesnt return all names just the first ones in each
  // for (var x = 0; x < contactList.length; x++) {
  //   var list = contactList[x].querySelectorAll('li');
    
  //   for (var i = 0; i < list.length; list++) {
  //     people.push(list[i].innerHTML.toLowerCase())
  //   };
  // };

  searchBox.addEventListener('input' , function(ev) {   
    var letter = word.push(ev.data);

    if (ev.data === null) {
      word.splice(word.length-2 , 2)
    } 
    
    var searchQuery = word.join('');
    
    var filterPeople = people.filter( function(names) {
      return names.includes(searchQuery);
    })

    var autocomplete = document.querySelector('.autocomplete');
    autocomplete.innerHTML= '';

    filterPeople.forEach( function (name) {
      autocomplete.innerHTML += '<li>' + name + '</li>';
      autocomplete.classList.remove('hide')
    })

    // filterPeople.forEach(function(name) {
    //   var contacts = document.querySelector('main');
    //   // console.log('names' , name);
    //   var filtered = document.querySelector('#letter-' + name.charAt(0));
    //   // console.log(filtered.querySelector('h2').innerHTML)
        
    //   var newSection = document.createElement('section');
    //   newSection.innerHTML = 
    //     '<h2>' + filtered.querySelector('h2').innerHTML + '</h2>' +
    //     '<li>' + filtered.querySelector('li').innerHTML + '</li>';

    //   console.log(filtered);
    //   // contacts.innerHTML = '';
    //   contacts.appendChild(newSection);
    // })

  })
}

autocomplete();

// queryselector polyfill for IE!!
if (!document.querySelectorAll) {
  document.querySelectorAll = function (selectors) {
    var style = document.createElement('style'), elements = [], element;
    document.documentElement.firstChild.appendChild(style);
    document._qsa = [];

    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
    window.scrollBy(0, 0);
    style.parentNode.removeChild(style);

    while (document._qsa.length) {
      element = document._qsa.shift();
      element.style.removeAttribute('x-qsa');
      elements.push(element);
    }
    document._qsa = null;
    return elements;
  };
}

if (!document.querySelector) {
  document.querySelector = function (selectors) {
    var elements = document.querySelectorAll(selectors);
    return (elements.length) ? elements[0] : null;
  };
}
