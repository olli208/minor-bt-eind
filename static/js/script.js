// ========================================================
// TO DO LIST / Wishlist
// ========================================================

// - Save list as Onject(Like toast, or shopping list for a party)
// - Receive saved lists from somewhere (chaching shit)
// - Add more stuff to a list?(picture with every new item

var socket = io();

document.querySelector('.error').style.display = 'none';

function storage() {
  var listLocal = [];
  var listStorage = localStorage.getItem('myList');
  if (listStorage !== null) {
    listLocal = JSON.parse(listStorage);
    console.log(listLocal)
  }
  return listLocal;
}

function addEvent() {
  if (document.addEventListener) {
    document.querySelector('form').addEventListener('submit', add);
    document.querySelector('ul').addEventListener('click', remove);
  } else  {
    // !!! IE fallback for addeventlistener
    document.querySelector('form').attachEvent('submit', add);
    document.querySelector('ul').attachEvent('click', remove);
  }
}

addEvent();
show();

//  Event event delegation to remove dynamically created list(thanks Krijn!)
function remove(e) {
  // Below searches for index of child node
  var tgt = e.target, i = 0, items;
  if (tgt === this) return;
  items = children(this);
  while (tgt.parentNode !== this) tgt = tgt.parentNode;
  while (items[i] !== tgt) i++;

  matches = e.target.matches ? e.target.matches('BUTTON.close') : e.target.msMatchesSelector('BUTTON.close');
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
    event.preventDefault ? event.preventDefault() : (event.returnValue = false); // internet explorer (8) fallback
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
  var listItem = document.createElement('li');
  listItem.innerHTML = '<h2>' + query + '</h2>';

  if (query === '') {
    // Alert user when HTML from doenst validate
    alert("You must write something!");
  } else {
    document.querySelector("ul").appendChild(listItem);

    // Add items from local storage
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

  event.preventDefault ? event.preventDefault() : (event.returnValue = false); // internet explorer (8) fallback

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