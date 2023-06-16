var form = document.getElementById('my-form');
console.log(form);

form.addEventListener('submit',addSubmit);

function addSubmit(e){
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var dateAndTime = document.getElementById('date').value;
    
    localStorage.setItem('name',name);
    localStorage.setItem('email',email);
    localStorage.setItem('phone',phone);
    localStorage.setItem('date & time',dateAndTime);
}