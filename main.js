var form = document.getElementById('my-form');
var items = document.getElementById('items');
// var editMode = false;
// var editedItem = null;
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');

// form.addEventListener('submit', addItems);
form.addEventListener('submit', function(e) {
  addItems(e);
  fetchData(); // Fetch data after adding a new item
});
items.addEventListener('click', handleItemClick);
window.addEventListener('load', function() {
  fetchData(); // Fetch data when the page loads
});

function fetchData() {
  axios
    .get("https://crudcrud.com/api/b484d03bc805468ba8291e70444c2f3b/BookAppointment")
    .then((response) => {
      // Clear existing items
      items.innerHTML = "";

      // Loop through the response data and create list items
      response.data.forEach((item) => {
        var li = document.createElement('li');
        li.className = "item";

        var delBtn = document.createElement('input');
        delBtn.type = "button";
        delBtn.value = "Delete User";
        delBtn.className = "delete mx-2";

        var editBtn = document.createElement('input');
        editBtn.type = "button";
        editBtn.value = "Edit User";
        editBtn.className = "edit mx-2";

        li.appendChild(document.createTextNode(item.name));
        li.appendChild(document.createTextNode("-" + item.email));
        li.appendChild(document.createTextNode("-" + item.phone));
        li.appendChild(delBtn);
        li.appendChild(editBtn);

        items.appendChild(li);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function addItems(e) {
  e.preventDefault();

  var name = nameInput.value;
  var email = emailInput.value;
  var phone = phoneInput.value;

    var li = document.createElement('li');
    li.className = "item";

    var delBtn = document.createElement('input');
    delBtn.type = "button";
    delBtn.value = "Delete User";
    delBtn.className = "delete mx-2";

    var editBtn = document.createElement('input');
    editBtn.type = "button";
    editBtn.value = "Edit User";
    editBtn.className = "edit mx-2";

    li.appendChild(document.createTextNode(name));
    li.appendChild(document.createTextNode("-" + email));
    li.appendChild(document.createTextNode("-" + phone));
    li.appendChild(delBtn);
    li.appendChild(editBtn);

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
    // localStorage.removeItem(email);
    form.reset();
  }
}

function editItem(e) {

  var editedItem = e.target.parentElement;
  var name = editedItem.firstChild.textContent;
  var email = editedItem.childNodes[1].textContent.substring(1);
  var phone = editedItem.childNodes[2].textContent.substring(2);


  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;

  editedItem.remove();

  // var storedItem = localStorage.getItem(email);
  //   if(storedItem){
  //     localStorage.removeItem(email);
  //   }
  


}