var form = document.getElementById('my-form');
var items = document.getElementById('items');
// var editMode = false;
// var editedItem = null;
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');

form.addEventListener('submit', addItems);
items.addEventListener('click', handleItemClick);

function addItems(e) {
  e.preventDefault();

  var name = nameInput.value;
  var email = emailInput.value;
  var phone = phoneInput.value;

  // if (editMode) {
  //   editedItem.firstChild.textContent = name;
  //   editedItem.childNodes[1].textContent = "-" + email;
  //   editedItem.childNodes[2].textContent = "-" + phone;

  //   var previousEmail = editedItem.dataset.email;
  //   localStorage.removeItem(previousEmail);
  //   editedItem.dataset.email = email;

  //   let myObj = {
  //     name: name,
  //     email: email,
  //     phone: phone,
  //   }
  //   let myObj_serialized = JSON.stringify(myObj);
  //   localStorage.setItem(email, myObj_serialized);

  //   editMode = false;
  //   editedItem = null;
  // } else {
    var li = document.createElement('li');
    li.className = "item";

    var delBtn = document.createElement('input');
    delBtn.type = "button";
    delBtn.value = "Delete User";
    delBtn.className = "delete";

    var editBtn = document.createElement('input');
    editBtn.type = "button";
    editBtn.value = "Edit User";
    editBtn.className = "edit";

    li.appendChild(document.createTextNode(name));
    li.appendChild(document.createTextNode("-" + email));
    li.appendChild(document.createTextNode("-" + phone));
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    // li.dataset.email = email;

    
    let myObj = {
      name: name,
      email: email,
      phone: phone,
    }
    
    axios
    .post("https://crudcrud.com/api/b484d03bc805468ba8291e70444c2f3b/BookAppointment",myObj)
    .then((respone)=>{
        items.appendChild(li);
        console.log(respone);
      })
      .catch((err)=>{
        console.log(err);
      })
    // let myObj_serialized = JSON.stringify(myObj);
    // localStorage.setItem(email, myObj_serialized);
  

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
    var email = li.childNodes[1].textContent.substring(1);
    items.removeChild(li);
    localStorage.removeItem(email);
    form.reset();
  }
}

function editItem(e) {
  // editMode = true;
  var editedItem = e.target.parentElement;
  var name = editedItem.firstChild.textContent;
  var email = editedItem.childNodes[1].textContent.substring(1);
  var phone = editedItem.childNodes[2].textContent.substring(2);

  // document.getElementById('name').value = name;
  // document.getElementById('email').value = email;
  // document.getElementById('phone').value = phone;
  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;

  editedItem.remove();

  var storedItem = localStorage.getItem(email);
    if(storedItem){
      localStorage.removeItem(email);
    }
  


}