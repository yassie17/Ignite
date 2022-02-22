let cname = sessionStorage.getItem("name");
let x = "";
let lightbg = document.querySelectorAll(".lightbg");
let light = document.querySelectorAll(".light");
let arr = document.querySelectorAll("a");

fetch(`https://restcountries.com/v3.1/name/${cname}`).then((response) => {
    return response.json();
}).then((response) => {
    console.log(response);
    details(response);
});

function details(x){
    x.forEach((e) => {
    let section = document.querySelector("section");
    let tld = e.tld;
    let borders = e.borders;
    let borname = [];
    x = `<img src="${e.flags.png}"><section>
        <h2 class="h">${e.name.common}</h2><p>
        <span>Population: </span>${e.population.toLocaleString()}<br>
        <span>Region: </span>${e.region}<br><span>Sub Region: </span>${e.subregion}<br>
        <span>Capital: </span>${e.capital}</p></section><section><p>
        <span>Top Level Domain: </span>`;
        for(let i=0; i<tld.length; i++){
            if(i === 0)
                x+= tld[i];
            else
                x+= ", "+tld[i];
        }
    
    section.innerHTML = x;
});
}

document.querySelector("input[Type='checkbox']").addEventListener('change',function(){
    light = document.querySelectorAll(".light");
    for(let i=0; i<lightbg.length; i++){
        lightbg[i].classList.toggle("darkbg");
    }
    for(let i=0; i<light.length; i++){
        light[i].classList.toggle("dark");
    }
    for(let i=0; i<arr.length; i++){
        arr[i].classList.toggle("dark");
    }
    document.querySelector(".lighta").classList.toggle("darka");
});

