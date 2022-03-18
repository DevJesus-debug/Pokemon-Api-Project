const container = document.querySelector(".container");
const input = document.querySelector(".input");
const search = document.querySelector(".search");




 async function getPokemon(result){
     const dataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${result}/`)
     const data = await dataFetch.json();
    
     const html = document.createElement("div");
     html.classList = "pokemon-img"
     html.innerHTML = `<img src="${data.sprites.front_default}">`;
     container.appendChild(html);
 }

 search.addEventListener("click", (e)=>{
    e.preventDefault();
    result = input.value
    getPokemon(result)
 })



