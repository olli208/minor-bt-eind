// ========================================================
// TO DO LIST / Wishlist
// ========================================================

document.querySelectorAll('.nav').forEach(function(ev) {
  ev.addEventListener('click', function(el) {
      smoothScroll(this, 15);
      // el.preventDefault();
  })
});

function smoothScroll(toElement, speed) {
  var pointer = toElement.getAttribute('href').slice(1);
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
  var people = []
  var word = []
  var contactList = document.querySelector('main');
  var searchBox = document.querySelector('input[type=search]')
  searchBox.addEventListener('input' , function(ev) {   
    var letter = word.push(ev.data);

    if (ev.data === null) {
      word.splice(word.length-2 , 2)
    }

    console.log(word.join('')); 

    contactList.querySelectorAll('section').forEach(function (el) {
      el.childNodes[3].querySelectorAll('li').forEach(function (el) {
        people.push(el.innerHTML)
      })
    })
  })

  // // collect all names n an array
  // contactList.querySelectorAll('section').forEach(function (el) {
  //   el.childNodes[3].querySelectorAll('li').forEach(function (el) {
  //     people.push(el.innerHTML)
  //   })
  // })

}

autocomplete();

// if (document.addEventListener) {
//       document.querySelector('form').addEventListener('submit', add);
//       document.querySelector('ul').addEventListener('click', remove);
//       document.querySelector('.saveList').addEventListener('click', saveList);
//       document.querySelector('.loadloaclstorage').addEventListener('click', show);
// } else  {
//       // !!! IE < 8 fallback for addeventlistener but queryselector doenst work so this is useless...
//       document.querySelector('form').attachEvent('submit', add);
//       document.querySelector('ul').attachEvent('click', remove);
//       document.querySelector('.saveList').attachEvent('click', saveList);
//       document.querySelector('.loadloaclstorage').attachEvent('click', show);
// }
