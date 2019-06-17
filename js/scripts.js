function ListItem(item, difficulty, deadline){
  this.item = item,
  this.difficulty = difficulty,
  this.deadline = deadline
}

ListItem.prototype.getItem = function () {
  return this.item;
};

ListItem.prototype.getDifficulty = function () {
  var date = new Date().now();
  date = date.getDay();
  if(date === 1){
    // it's monday
    return this.difficulty + 3;
  }
  return this.difficulty;
};

ListItem.prototype.getDeadline = function (){
  return this.deadline;
};

ListItem.prototype.printItem = function() {
  console.log(this.item, this.difficulty, this.deadline);
}


function ToDoList(name){
  this.name = name,
  this.itemArray = [],
  this.idCounter = 0

}

ToDoList.prototype.printList = function(){
  this.itemArray.forEach(function(item){
    item.printItem();
  })
}

ToDoList.prototype.addItem = function(item){
  this.idCounter++;
  item.id = this.idCounter;
  this.itemArray.push(item);
}

ToDoList.prototype.deleteItem = function(id) {
  for(i = 0; i < this.itemArray.lenght; i++){
    if(this.itemArray[i]){
      if(this.itemArray[i].id === id){
        delete this.itemArray[i];
      }
    }
  }
}

function ListController(list){
  $(".destinationList").append("<div id = ListTitle" + list.name + ">" + list.name + "</div>" + "<div class=section" + list.name + "><ul id = List" + list.name + "></ul></div>");
  $("#ListTitle"+list.name).click(function(event){
    $(".section"+list.name).toggle();
  })

  $("div.section" + list.name).append("<form id = form" + list.name + " action=index.html method=post><label for=CreateNewList>New Item:</label><input id = input name=CreateNewList " + list.name + ">" + "<button type=submit >Add</button></form>")



  var string = "#form" + list.name;
  $(string).submit(function(event){
    event.preventDefault();
    var inp = $("#form" + list.name + " input").val();
    ListItemControllerOut(inp, list);
  })
}

//controller: from model to view
function ListItemController(item, list){
  var strOfClasses = "item" + item.item;
  $("#List" + list.name).append("<li class=" + strOfClasses + ">" + item.item +"</li>");
  $(".item" + item.item).click(function(event){
    event.preventDefault();
    if ($("#List" + list.name +  " li.item" + item.item).hasClass("lineThrough")){
      $("#List" + list.name +  " li.item" + item.item).removeClass("lineThrough");
    } else {
      $("#List" + list.name +  " li.item" + item.item).addClass("lineThrough");
    }
  })
}

//controller: from view to model
function ListItemControllerOut(itemName, list){
  var newItem = new ListItem(itemName, 1, 2);
  list.addItem(newItem, list);
  ListItemController(newItem, list);
}

$(function(){
  $("#form").submit(function(event){
    event.preventDefault();
    var newListName = $("input#newListInput").val();
    var newList = new ToDoList(newListName);
    ListController(newList);
  });
});


//if we had more time and effort: each form with 3 inputs for properties of list item, display those
