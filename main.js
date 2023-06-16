var form = document.getElementById('my-form');
var items = document.getElementById('items');
var editMode = false;
var editedItem = null;

form.addEventListener('submit', addItems);
items.addEventListener('click', handleItemClick);

function addItems(e) {
  e.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;

  if (editMode) {
    editedItem.firstChild.textContent = name;
    editedItem.childNodes[1].textContent = "-" + email;
    editedItem.childNodes[2].textContent = "-" + phone;

    var previousEmail = editedItem.dataset.email;
    localStorage.removeItem(previousEmail);
    editedItem.dataset.email = email;

    let myObj = {
      name: name,
      email: email,
      phone: phone,
    }
    let myObj_serialized = JSON.stringify(myObj);
    localStorage.setItem(email, myObj_serialized);

    editMode = false;
    editedItem = null;
  } else {
    var li = document.createElement('li');
    li.className = "item";

    var delBtn = document.createElement('input');
    delBtn.type = "button";
    delBtn.value = "Delete";
    delBtn.className = "delete";

    var editBtn = document.createElement('input');
    editBtn.type = "button";
    editBtn.value = "Edit";
    editBtn.className = "edit";

    li.appendChild(document.createTextNode(name));
    li.appendChild(document.createTextNode("-" + email));
    li.appendChild(document.createTextNode("-" + phone));
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    li.dataset.email = email;

    items.appendChild(li);

    let myObj = {
      name: name,
      email: email,
      phone: phone,
    }
    let myObj_serialized = JSON.stringify(myObj);
    localStorage.setItem(email, myObj_serialized);
  }

  form.reset();
}

function handleItemClick(e) {
  if (e.target.classList.contains('delete')) {
    removeItem(e);
  } else if (e.target.classList.contains('edit')) {
    editItem(e);
  }
}

function removeItem(e) {
  if (confirm('Are you sure?')) {
    var li = e.target.parentElement;
    var email = li.dataset.email;
    items.removeChild(li);
    localStorage.removeItem(email);
  }
}

function editItem(e) {
  editMode = true;
  editedItem = e.target.parentElement;
  var name = editedItem.firstChild.textContent;
  var email = editedItem.childNodes[1].textContent.substring(1);
  var phone = editedItem.childNodes[2].textContent.substring(1);

  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
  document.getElementById('phone').value = phone;
}