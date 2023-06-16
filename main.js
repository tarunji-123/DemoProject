console.log("hii");

var form = document.getElementById('my-form');
var items = document.getElementById('items');

form.addEventListener('submit',addItems);

function addItems(e){
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var li = document.createElement('li');
    li.className = "item";
    li.appendChild(document.createTextNode(name));
    li.appendChild(document.createTextNode("-"+email));
    li.appendChild(document.createTextNode("-"+phone));
    console.log(li);

    items.appendChild(li);

    let myObj = {
        name : name,
        email : email,
        phone : phone,
    }

    console.log(myObj);

    let myObj_serialized = JSON.stringify(myObj);
    localStorage.setItem(email,myObj_serialized);

    
}