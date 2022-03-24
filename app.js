const container = document.querySelector(".card-container");
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const allPokemonCont = document.querySelector(".all-pokemon-cont");
const allPokemonBtn = document.querySelector(".all-pokemon-btn");


function createHtml(data){
    const html = document.createElement("div");
    html.classList = "pokemon-img"
    html.innerHTML = `<img src="${data.sprites.front_default}">`;
    container.appendChild(html);
}

 async function getPokemon(){
     result = input.value
     const dataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${result}`)
     const data = await dataFetch.json();    
     createHtml(data);
     
 }

 search.addEventListener("click", (e)=>{
     e.preventDefault();
     clear();
     getPokemon();
 });

 function clear(){
     container.innerHTML = "";
     allPokemonCont.innerHTML= "";
 }

 async function getPokemons(){
    for(let i = 1; i< 100 ; i++){
    const dataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const data = await dataFetch.json();  

    const pokemonInfo = `<img src="${data.sprites.front_default}">
                            <div class="name">
                                <div class="number">${data.id}.</div>
                                <h2>${data.name}</h2>
                            </div>
                        <div class="types">${data.types.map((type) => type.type.name)}</div>
                        `               
    const pokeCard = document.createElement("div");
    pokeCard.classList.add("poke-card")
    pokeCard.innerHTML = pokemonInfo;
    allPokemonCont.appendChild(pokeCard)
    }
}

allPokemonBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    clear()
    getPokemons();
});




