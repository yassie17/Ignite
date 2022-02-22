let name = sessionStorage.getItem("name");
let x = "";
let lightbg = document.querySelectorAll(".lightbg");
let light = document.querySelectorAll(".light");
let arr = document.querySelectorAll("a");

fetch(`https://restcountries.eu/rest/v2/name/${name}`).then((response) => {
    return response.json();
}).then((response) => {
    details(response);
});

function details(x){
    x.forEach((e) => {
    let section = document.querySelector("section");
    let currencies = e.currencies;
    let languages = e.languages;
    let borders = e.borders;
    
    x = `<img src="${e.flag}"><section>
        <h2 class="h">${e.name}</h2><p><span>Native Name: </span>${e.nativeName}<br>
        <span>Population: </span>${e.population.toLocaleString()}<br>
        <span>Region: </span>${e.region}<br><span>Sub Region: </span>${e.subregion}<br>
        <span>Capital: </span>${e.capital}</p></section><section><p>
        <span>Top Level Domain: </span>${e.topLevelDomain}<br><span>Currencies: </span>`;
    for(let i=0; i<currencies.length; i++){
        if(i === 0)
            x+= currencies[i].name;
        else
            x+= ", "+currencies[i].name;
    }
    x+= `<br>
        <span>Languages: </span>`;
    for(let i=0; i<languages.length; i++){
        if(i === 0)
            x+= languages[i].name;
        else
            x+= ", "+languages[i].name;
    }
    x+= `</p></section><section>
        <h3>Border Countries:</h3><ul>`;
    for(let i=0; i<borders.length; i++){
        fetch(`https://restcountries.eu/rest/v2/alpha/${borders[i]}`).then((response) => {
            return response.json();
        }).then((response) => {
            x+=`<li class="light">${response.name}</li>`;
            if(i === borders.length-1)
                x+=`</ul></section>`;
            section.innerHTML = x;
        });   
    }});
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

