let arr = [{item: "Complete online JavaScript course",completed: true},
            {item: "Jog around the house 3x",completed: false},
            {item: "10 minutes mediation",completed: false},
            {item: "Read for 1 hour",completed: false},
            {item: "Pick up groceries",completed: false},
            {item: "Complete todo App on Frontend Mentor",completed: false}];
const list = document.getElementById("list");
let night = true;
        
function add(){
    let li = document.createElement("li");
    li.classList.add("dark");
    let mode='class ="round dark"';
    if(!night){
        li.classList.add("light");
        mode='class ="round dark light"';
    }
    let item = document.getElementById("input").value;
    if(item !== ""){
        li.innerHTML = `<input type="checkbox" id="item1"><label for="item1"><div ${mode}></div><span>${item}</span><img src="images/icon-cross.svg"></label>`;
        list.appendChild(li);
        document.getElementById("input").value = "";
        arr.push({item: item,completed: false});
        countToDos();
    }
    else{
        alert("You have to insert an item");
    }
}

document.querySelector("input[Type='text']").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        let li = document.createElement("li");
        li.classList.add("dark");
        let mode='class ="round dark"';
        if(!night){
            li.classList.add("light");
            mode='class ="round dark light"';
        }
        let item = document.getElementById("input").value;
        if(item !== ""){
            li.innerHTML = `<input type="checkbox" id="item1"><label for="item1"><div ${mode}></div><span>${item}</span><img src="images/icon-cross.svg"></label>`;
            list.appendChild(li);
            document.getElementById("input").value = "";
            arr.push({item: item,completed: false});
            countToDos();
        }
        else{
            alert("You have to insert an item");
        }
    }
});

function countToDos(){
    let c=0;
    for(let i=0; i<arr.length; i++){
        if(!arr[i].completed)
            c++;
    }
    document.getElementById("count").innerHTML = `<label>${c} items left</label>`;
}

function active(){
    let checked = document.querySelectorAll(".checked");

    for(let i=0; i<checked.length; i++){
        checked[i].classList.add("invis");
    }
}

list.addEventListener("click", function(ev) {
    if (ev.target.tagName === "DIV") {
        ev.target.classList.toggle("checked");
        ev.target.parentNode.parentNode.classList.toggle("check");
        ev.target.nextElementSibling.classList.toggle("checkedText");
        if(ev.target.innerHTML === ""){
            ev.target.innerHTML = `<img src='images/icon-check.svg'>`;
            let ind = arr.findIndex(x => x.item ===ev.target.nextElementSibling.innerHTML);
            arr.splice(ind, 1, {item: ev.target.nextElementSibling.innerHTML, completed: true});
        }
        else{
            let ind = arr.findIndex(x => x.item ===ev.target.nextElementSibling.innerHTML);
            arr.splice(ind, 1, {item: ev.target.nextElementSibling.innerHTML, completed: false});
            ev.target.innerHTML = "";
        }
    }
    if (ev.target.tagName === "SPAN") {
        ev.target.classList.toggle("checkedText");
        ev.target.previousElementSibling.classList.toggle("checked");
        ev.target.parentNode.parentNode.classList.toggle("check");
        if(ev.target.previousElementSibling.innerHTML === ""){
            ev.target.previousElementSibling.innerHTML = `<img src='images/icon-check.svg'>`;
            let ind = arr.findIndex(x => x.item ===ev.target.innerHTML);
            arr.splice(ind, 1, {item: ev.target.innerHTML, completed: true});
        }
        else{
            ev.target.previousElementSibling.innerHTML = "";
            let ind = arr.findIndex(x => x.item ===ev.target.innerHTML);
            arr.splice(ind, 1, {item: ev.target.innerHTML, completed: false});
        }
    }
    if (ev.target.tagName === "IMG" && ev.target.parentNode.tagName === "DIV") {
        let ind = arr.findIndex(x => x.item ===ev.target.parentNode.nextElementSibling.innerHTML);
        arr.splice(ind, 1, {item: ev.target.parentNode.nextElementSibling.innerHTML, completed: false});
        ev.target.parentNode.classList.remove("checked");
        ev.target.parentNode.parentNode.parentNode.classList.toggle("check");
        ev.target.parentNode.nextElementSibling.classList.remove("checkedText");
        ev.target.parentNode.innerHTML="";
    }
    else if (ev.target.tagName === "IMG" && ev.target.parentNode.tagName !== "DIV"){
        list.removeChild(ev.target.parentNode.parentNode);
        let ind = arr.findIndex(x => x.item ===ev.target.previousElementSibling.innerHTML);
        arr.splice(ind, 1);
    }
  countToDos();
}, false);

document.querySelector("section button").addEventListener("click", function(){
    let checked = document.querySelectorAll(".check");
    for(let i=0; i<checked.length; i++){
        list.removeChild(checked[i]);
        let ind = arr.findIndex(x => x.item ===checked[i].childNodes[1].childNodes[1].innerHTML);
        arr.splice(ind, 1);
    }
}, false);

document.querySelector(".filters").addEventListener("click", function(ev){
    if(ev.target.id === "all"){
        let hidden = document.querySelectorAll(".hide");
        for(let i=0; i<hidden.length; i++){
            hidden[i].classList.remove("hide");
        }
    }
    else if(ev.target.id === "active"){
        document.querySelector(".blue").classList.remove("blue");
        ev.target.nextElementSibling.classList.add("blue");
        let items = Array.from(list.querySelectorAll(".check"));
        for(let i=0; i<list.children.length; i++){
            if(items.includes(list.children[i])){
                list.children[i].classList.add("hide");
            }
            else{
                list.children[i].classList.remove("hide");
            }
        }
    }
    else if(ev.target.id === "completed"){
        document.querySelector(".blue").classList.remove("blue");
        ev.target.nextElementSibling.classList.add("blue");
        let items = Array.from(list.querySelectorAll(".check"));
        for(let i=0; i<list.children.length; i++){
                if(!items.includes(list.children[i])){
                    list.children[i].classList.add("hide");
                }
                else{
                    list.children[i].classList.remove("hide");
                }
            } 
    }
}, false);

function themeChanger(){
    document.getElementsByTagName("header")[0].classList.toggle("lightimg");
    document.body.classList.toggle("lightbg");
    let darkItems = document.querySelectorAll(".dark");
    for(let i=0; i<darkItems.length; i++){
        darkItems[i].classList.toggle("light");
    }
    night = !night;   
}