let bill =  document.getElementById("bill");
let custom = document.getElementById("custom");
let people = document.getElementById("people");

function peopleErr(x){
    if(x === 1){
        document.querySelector("input[name='inv']").classList.add("inv");
        document.getElementById("people").classList.add("error");
        document.getElementById("error").innerHTML ="Can't be zero";
    }
    else{
        document.querySelector("input[name='inv']").classList.remove("inv");
        document.getElementById("people").classList.remove("error");
        document.getElementById("error").innerHTML ="";
    }
}

function Calculate(){
    document.querySelector("input[Type='reset']").classList.add("form");
    let totalBill = (bill.value !== "")?parseFloat(bill.value):parseFloat("0");
    let totalPeople = (people.value !== "")?parseFloat(people.value):parseFloat("0");
    let tipList = document.querySelector(".selected");
    let customTip = (tipList.value !== "")?parseFloat(tipList.value):parseFloat("0");
    if(totalPeople < 1){
        peopleErr(1);
    }
    else{
        peopleErr(0);
        let tipval = totalBill * customTip / 100;
        let tipper = (tipval/totalPeople).toFixed(2);
        let totper = ((totalBill + tipval) / totalPeople).toFixed(2);
        document.getElementById("tipper").innerText = `$${tipper}`;
        document.getElementById("totper").innerText = `$${totper}`;
    }
}

bill.addEventListener('input', Calculate);
people.addEventListener('input', Calculate);
custom.addEventListener('input', Calculate);
document.querySelectorAll("input[name='tip'], input[name='cust']").forEach((elem) =>{
    elem.addEventListener("click",function(){
        if(document.querySelector('.selected'))
        document.querySelector('.selected').classList.remove('selected');
        if(document.querySelector('.selectedL'))
            document.querySelector('.selectedL').classList.remove('selectedL');
        elem.classList.add('selected');
        if(elem.id !==  'custom'){
            let selector = 'label[for=' + elem.id + ']';
            document.querySelector(selector).classList.add('selectedL');
        }
        Calculate();
    })
});

document.getElementById("res").addEventListener('click', function(){
    document.querySelector("input[Type='reset']").classList.remove("form");
    document.getElementById("tipper").innerText = '$0.00';
    document.getElementById("totper").innerText = '$0.00';
    if(document.querySelector('.selected'))
        document.querySelector('.selected').classList.remove('selected');
        if(document.querySelector('.selectedL'))
            document.querySelector('.selectedL').classList.remove('selectedL');
});

