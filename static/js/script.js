// ========================================================
// TO DO LIST / Wishlist
// ========================================================

// - Save list as Onject(Like toast, or shopping list for a party)
// - Receive saved lists from somewhere (chaching shit)
// - Add more stuff to a list???(picture with every new item
// - saved lists can be seen in a pop up window when clicked it show the clicked list in the main screen
// - Autosuggest API maybe??
var socket = io();

function storage() {
  var list = [];
  var listStorage = localStorage.getItem('myList');
  if (listStorage != null) {
    list = JSON.parse(listStorage);
  }
  return list;
}

function addEvent(evnt, elem, func) {
  if (document.addEventListener) {
    document.querySelector('form').addEventListener('submit', add);
    document.querySelector('ul').addEventListener('click', remove);
  } else  { // !!! IE fallback for addeventlistener
    document.querySelector('form').attachEvent('submit', add);
    document.querySelector('ul').attachEvent('click', remove);
  }
}

addEvent();
show();

function remove(e) {
  // e.target is the clicked element!
  // Below searches for index of child node
  var tgt = e.target, i = 0, items;
  if (tgt === this) return;
  items = children(this);
  while (tgt.parentNode !== this) tgt = tgt.parentNode;
  while (items[i] !== tgt) i++;

  matches = e.target.matches ? e.target.matches('BUTTON.close') : e.target.msMatchesSelector('BUTTON.close');
  if (matches) {
    // if (e.preventDefault) {
    //     e.preventDefault();
    // } else {
    //     e.returnValue = false; // deprecated...
    // }

    //  remove listitem from server also
    var textofElement = e.target.parentNode.firstElementChild.innerHTML;
    console.log(textofElement);
    socket.emit('remove' , textofElement)

    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

    // Alsoremove item from local storage
    var list = JSON.parse(localStorage.getItem("myList")) || {};
    var items = list || [];
    for (var x = 0; x < items.length; x++) {
      if (items[x]) {
        // The i is index of child node that we got earlier
        items.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("myList", JSON.stringify(list));

    e.preventDefault();
  }
}

function children(e) {
  var i = 0, children = [], child;
  while (child = e.childNodes[i++]) {
    if (child.nodeType === 1) children.push(child);
  }
  return children;
}

function add(e) {
  var query = document.querySelector('input').value;
  var node = document.createElement('li');
  node.innerHTML = '<h2>' + query + '</h2>';

  if (query === '') {
    alert("You must write something!");
  } else {
    document.querySelector("ul").appendChild(node);

    var list = storage();
    list.push(query);

    //  Send query to server with socket
    socket.emit('new item' , query)

    // Also ADD items to localstorage
    localStorage.setItem('myList', JSON.stringify(list));
  }
  // console.log(storage());

  document.querySelector('input').value = "";
  appendXBtn(node);

  e.preventDefault();
}

// Add close button to each list element
function appendXBtn(e) {
  var button = document.createElement("BUTTON");
  var txt = document.createTextNode("\u00D7");
  button.className = "close";
  button.appendChild(txt);
  e.appendChild(button);
}

function show() {
  var list = storage();

  for(var i = 0; i < list.length; i++) {
    var node = document.createElement('li');
    node.innerHTML = '<h2>' + list[i] + '</h2>';

    document.querySelector("ul").appendChild(node);
    appendXBtn(node);
  }
}