const container = document.querySelector(".card-container");
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const allPokemonCont = document.querySelector(".all-pokemon-cont");
const allPokemonBtn = document.querySelector(".all-pokemon-btn");
const showMoreBtn = document.querySelector(".more-pokemon");

let pokemonList = 899;
 

function createHtml(data){
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
        allPokemonCont.appendChild(pokeCard);
}

 async function getPokemon(){ 
     result = input.value;
     const dataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${result}`)
     const data = await dataFetch.json();    
     createHtml(data);
     
 }

 function clear(){
     container.innerHTML = "";
     allPokemonCont.innerHTML= "";
     input.value = "";
 }

 async function getPokemons(){
    const promises = [];
    for(let i = 1; i < pokemonList ; i++){
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json()))
    }

    await Promise.all(promises).then(datas =>{
         datas.map(data =>{
            createHtml(data);
        });
    })
}





showMoreBtn.addEventListener("click", (e)=>{
  
});


search.addEventListener("click", (e)=>{
    e.preventDefault();
    getPokemon(); 
    clear()
});

allPokemonBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    clear()
    getPokemons();
});




