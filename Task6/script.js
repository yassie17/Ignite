let container = document.querySelector('.flagGrid');
let dark = false;

document.addEventListener('DOMContentLoaded', function() {
    fetchCountries();
}, false);

document.getElementById("inp").addEventListener("input", (e) => {
    if(e.target.value){
        nameFilter(e.target.value);
    }
    else{
        document.querySelector("input[Type='text']").value ="Search for a country...";
        fetchCountries();
    }
});

document.querySelector("select").addEventListener("change", (e) => {
    if(e.target.value !== "none"){
      regionFilter(e.target.value);
    }
    else{
        fetchCountries();
    }
});

function fetchCountries(){
    container.innerHTML = "";
    fetch("https://restcountries.com/v3.1/all").then(function (response) {
        return response.json();
    })
    .then(function (response) {
        createCountry(response);
    });
}

function regionFilter(region) {
    container.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/region/${region}`).then((response) => {
        return response.json();
    })
    .then((response) => {
        createCountry(response);
    });
}

function nameFilter(name) {
    container.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/name/${name}`).then((response) => {
        return response.json();
    })
    .then((response) => {
        createCountry(response);
    }).catch(err => {
        alert("Error: Enter a valid Country Name");
    });
}

function createCountry(x){
    x.forEach((e) => {
        let link = document.createElement("a");
        link.innerHTML = 
        `<section onclick="sessionStorage.setItem('name', '${e.name.common}');">
        <img src="${e.flags.png}">
        <h2>${e.name.common}</h2>
        <p>
            <span>Population: </span>${e.population.toLocaleString()}<br>
            <span>Region: </span>${e.region}<br>
            <span>Capital: </span>${e.capital}
        </p>
        </section>`;
        if(dark)
            link.classList.add("dark");
        else
            link.classList.add("light");
        link.href = "detail.html";
        container.appendChild(link);
    });
}
document.querySelector("input[Type='checkbox']").addEventListener('change',function(){
    let lightbg = document.querySelectorAll(".lightbg");

    for(let i=0; i<lightbg.length; i++){
        lightbg[i].classList.toggle("darkbg");
    }

    let x= document.querySelectorAll(".dark");
    let y= document.querySelectorAll(".light");

    if(dark){
        for(let i=0; i<x.length; i++){
            x[i].classList.remove("dark");
            x[i].classList.add("light");
        }
        document.querySelector("input[Type='text']").placeholder.color = "#111111";
        dark=false;
    }
    else{
        for(let i=0; i<y.length; i++){
            y[i].classList.remove("light");
            y[i].classList.add("dark");
        }
        dark=true;
    }
});
