console.log("Javascript wrote this");

var number = 10;
var string = 'Hi there';
var isRad = true;

var groceries = ['Milk', 'Eggs', 'Cheese']

document.getElementById('box').innerText = string;

if (number == 10){
    console.log("num is 10")
}
else {
    console.log("nope");
}

for (var i = 0; i < number; i++) {
    console.log(i);
}

function listGroceries() {
    for (var i = 0; i < groceries.length; i++) {
        console.log(groceries[i]);
    }
}

listGroceries();

document.getElementById("box").addEventListener("click", function(){
    alert("I got clicked");
})
