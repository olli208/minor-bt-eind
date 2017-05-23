// ========================================================
// TO DO LIST / Wishlist
// ========================================================

// - Save list as Onject(Like toast, or shopping list for a party)
// - Receive saved lists from somewhere (chaching shit)
// - Add more stuff to a list?(picture with every new item
// - keep track of the list server side and only show it when localStorage fails/ detect that there is no javascript

var socket = io();

document.querySelector('.error').style.display = 'none';

addEvent();

function storage() {
  var listLocal = [];
  var listStorage = localStorage.getItem('myList');
  if (listStorage !== null) {
    listLocal = JSON.parse(listStorage);
  }
  return listLocal;
}

function addEvent() {
    if (document.addEventListener) {
      document.querySelector('form').addEventListener('submit', add);
      document.querySelector('ul').addEventListener('click', remove);
      document.querySelector('.saveList').addEventListener('click', saveList);
      document.querySelector('.loadloaclstorage').addEventListener('click', show);
    } else  {
      // !!! IE fallback for addeventlistener
      document.querySelector('form').attachEvent('submit', add);
      document.querySelector('ul').attachEvent('click', remove);
      document.querySelector('.saveList').attachEvent('click', saveList);
      document.querySelector('.loadloaclstorage').attachEvent('click', show);
    }
}

//  Event event delegation to remove dynamically created list(thanks Krijn!)
function remove(e) {
  // Below searches for index of child node
  var tgt = e.target, i = 0, items;
  if (tgt === this) return;
  items = children(this);
  while (tgt.parentNode !== this) tgt = tgt.parentNode;
  while (items[i] !== tgt) i++;

  matches = e.target.matches ? e.target.matches('BUTTON.close') : e.target.msMatchesSelector('BUTTON.close'); //  feature detection for older browsers
  if (matches) {
    //  remove from the dom
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

    // remove element from server
    var textofElement = e.target.parentNode.firstElementChild.innerHTML;
    console.log(textofElement);
    socket.emit('remove' , textofElement)

    // At last remove item from local storage also
    var list = JSON.parse(localStorage.getItem("myList")) || {};
    items = list || [];
    for (var x = 0; x < items.length; x++) {
      if (items[x]) {
        items.splice(i, 1);
        break;
      }
    }

    //  set updated list to localstorage
    localStorage.setItem("myList", JSON.stringify(list));
  }
}

function children(e) {
  var i = 0, children = [], child;
  while (child = e.childNodes[i++]) {
    if (child.nodeType === 1) children.push(child);
  }
  return children;
}

function add(event) {
  var list = [];
  var query = document.querySelector('input').value;
  var listItem = document.createElement('li');
  listItem.className = 'liClient';
  listItem.innerHTML = '<h2>' + query + '</h2>';

  if (query === '') {
    // Alert user when HTML from doenst validate
    alert("You must write something!");
  } else {
    document.querySelector("ul").appendChild(listItem);

    // Add items from local storage
    var localstorageList = storage();
    list.push(query);
    localstorageList.push(query)

    //  Send query to server with socket
    socket.emit('new item' , query)

    // Also ADD items to localstorage
    localStorage.setItem('myList', JSON.stringify(localstorageList));

    document.querySelector('input').value = "";
    appendXBtn(listItem);
  }
  (event.preventDefault) ? event.preventDefault() : event.returnValue = false; // internet explorer (8) fallback
}

//  Show items from loaclstorage
function show() {
  var list = storage();

  for(var i = 0; i < list.length; i++) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<h2>' + list[i] + '</h2>';

    document.querySelector("ul").appendChild(listItem);
    appendXBtn(listItem);
  }
}

function saveList() {
  document.querySelector("ul").innerHTML = ''
  socket.emit('save list')
}

// Add close button to each list element
function appendXBtn(e) {
  var button = document.createElement("BUTTON");
  var x = document.createTextNode("\u00D7");
  button.className = "close";
  button.appendChild(x);
  e.appendChild(button);
}