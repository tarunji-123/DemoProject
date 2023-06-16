var form = document.getElementById('my-form');
console.log(form);

form.addEventListener('submit',addSubmit);

// function addSubmit(e){
//     e.preventDefault();
//     var name = document.getElementById('name').value;
//     var email = document.getElementById('email').value;
//     var phone = document.getElementById('phone').value;
//     var dateAndTime = document.getElementById('date').value;

//     localStorage.setItem('name',name);
//     localStorage.setItem('email',email);
//     localStorage.setItem('phone',phone);
//     localStorage.setItem('date & time',dateAndTime);
// }

function addSubmit(e){
    e.preventDefault();
    let myObj = {
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        phone : document.getElementById('phone').value,
        dateAndTime : document.getElementById('date').value,
    }

    console.log(myObj);
    var obj_serialized = JSON.stringify(myObj);
    localStorage.setItem('myObj',obj_serialized);
}