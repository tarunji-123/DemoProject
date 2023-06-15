console.log("hii");

var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
console.log(itemList);
var filter = document.getElementById('filter');


form.addEventListener('submit',addItem);

itemList.addEventListener('click', removeItem);

filter.addEventListener('keyup', filterItems);

// Add Item
function addItem(e){
    e.preventDefault();
    
    var newItem = document.getElementById('item').value;
    var newItem2 = document.getElementById('item2').value;
    

    var li = document.createElement('li');
    li.className = 'list-group-item';

    li.appendChild(document.createTextNode(newItem));
    li.appendChild(document.createTextNode(" "+newItem2));

    var deletebtn = document.createElement('button');
    deletebtn.className = 'btn btn-danger btn-sm float-end delete';
    deletebtn.appendChild(document.createTextNode('X'));

    let editbtn = document.createElement('button');
    editbtn.className = "btn btn-success btn-sm float-end mx-2";
    editbtn.append(document.createTextNode('Edit'));
    
    li.appendChild(deletebtn);
    li.appendChild(editbtn);
    itemList.appendChild(li);
    
}

let allItems = document.getElementsByClassName('list-group-item');
console.log(allItems)


for(var i=0; i<allItems.length; i++){
    
    var editbtn = document.createElement('button');
    editbtn.className = "btn btn-success btn-sm float-end mx-2";
    editbtn.append(document.createTextNode('Edit'));
    allItems[i].appendChild(editbtn);
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

// Filter Item
function filterItems(e){
    // convert text to lowercase
    var text = e.target.value.toLowerCase();
    // Get lis
    var items = itemList.getElementsByTagName('li');
    // Convert to an array
    Array.from(items).forEach(function(item){
      var itemName = item.childNodes[0].textContent;
      var itemName2 = item.childNodes[1].textContent;
      if(itemName.toLowerCase().indexOf(text) != -1 || itemName2.toLowerCase().indexOf(text) !=-1){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
}