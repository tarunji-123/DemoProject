console.log("hii");

var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

form.addEventListener('submit',addItem);

itemList.addEventListener('click', removeItem);

// Add Item
function addItem(e){
    e.preventDefault();
    console.log(document.getElementById('item').value);
    var newItem = document.getElementById('item').value;

    var li = document.createElement('li');
    li.className = 'list-group-item';

    li.appendChild(document.createTextNode(newItem));

    var deletebtn = document.createElement('button');
    deletebtn.className = 'btn btn-danger btn-sm float-end delete';
    deletebtn.appendChild(document.createTextNode('X'));

    li.appendChild(deletebtn);
    itemList.appendChild(li);
    
}
//Delete Item
function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you confirm?')){
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}