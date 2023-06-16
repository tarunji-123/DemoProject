

var form = document.getElementById('my-form');
var items = document.getElementById('items');

form.addEventListener('submit',addItems);
items.addEventListener('click',removeItem);

function addItems(e){
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var li = document.createElement('li');
    li.className = "item";

    var delBtn = document.createElement('input');
    delBtn.type ="button";
    delBtn.value = "delete";
    delBtn.className = "delete";

    li.appendChild(document.createTextNode(name));
    li.appendChild(document.createTextNode("-"+email));
    li.appendChild(document.createTextNode("-"+phone));
    li.appendChild(delBtn);

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

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you confirm?')){
            var li = e.target.parentElement;
            
            var email = li.childNodes[1].textContent.substring(1);
            items.removeChild(li);
            localStorage.removeItem(email);
        }
    }
}
