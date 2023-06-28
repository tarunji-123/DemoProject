var form = document.getElementById('my-form');
var items = document.getElementById('items');

var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');


form.addEventListener('submit', function(e) {
  addItems(e);
  fetchData(); 
});
items.addEventListener('click', handleItemClick);
window.addEventListener('load', function() {
  fetchData(); 
});

function fetchData() {
  axios
    .get("https://crudcrud.com/api/bd7a8daba05f4f07aa4e9bb9cca56637/BookAppointment")
    .then((response) => {
      
      items.innerHTML = "";

      response.data.forEach((item) => {
        var li = document.createElement('li');
        li.className = "item";
        li.dataset.userId = item._id;

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
    .post("https://crudcrud.com/api/bd7a8daba05f4f07aa4e9bb9cca56637/BookAppointment",myObj)
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
    var userId = li.dataset.userId;

    axios
    .delete(`https://crudcrud.com/api/bd7a8daba05f4f07aa4e9bb9cca56637/BookAppointment/${userId}`)
    .then(()=>{
      items.removeChild(li);
      console.log("User successfully deleted");
    })
    .catch((error)=>{
      console.log(error);
    })
    // localStorage.removeItem(email);
    form.reset();
  }
}



function editItem(e) {
  var editedItem = e.target.parentElement;
  var name = editedItem.firstChild.textContent;
  var email = editedItem.childNodes[1].textContent.substring(1);
  var phone = editedItem.childNodes[2].textContent.substring(2);
  var userId = editedItem.dataset.userId;

  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;

  axios
    .delete(`https://crudcrud.com/api/bd7a8daba05f4f07aa4e9bb9cca56637/BookAppointment/${userId}`)
    .then(()=>{
      items.removeChild(editedItem);
      
    })
    .catch((error)=>{
      console.log(error);
    })
  
}
