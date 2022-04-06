const mainContainer = document.querySelector(".container")
const container = document.querySelector(".card-container");
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const allPokemonCont = document.querySelector(".all-pokemon-cont");
const allPokemonBtn = document.querySelector(".all-pokemon-btn");
const showMoreBtn = document.querySelector(".more-pokemon");
const loading = document.querySelector(".loading-icon");
const myTeamCont = document.querySelector(".my-team-cont");
const addTeamBtn = document.querySelector(".add-team-btn");
const myTeamPage = document.querySelector(".my-team-page");



let pokemonList = 899;
let pokeArray = [];

function upperCase(data){
    const letter = data.name[0].toUpperCase() + data.name.slice(1)
    return letter
 }

 function typeColors(data,cards){
    //Colors of the cards 
    if(data.types[0].type.name === "fire"){
        cards.classList.add("fire")
     }
     
     if(data.types[0].type.name === "grass"){
         cards.classList.add("grass")
     }
     
     if(data.types[0].type.name === "bug" ){
        cards.classList.add("bug")
    }

     if(data.types[0].type.name === "water"){
         cards.classList.add("water")
     }

     if(data.types[0].type.name === "normal"){
        cards.classList.add("normal")
    }

    if(data.types[0].type.name === "ground"){
        cards.classList.add("ground")
    }

    if(data.types[0].type.name === "electric"){
        cards.classList.add("electric")
    }

    if(data.types[0].type.name === "psychic"){
        cards.classList.add("psychic")
    }

    if(data.types[0].type.name === "poison"){
        cards.classList.add("poison")
    }

    if(data.types[0].type.name === "dark"){
        cards.classList.add("dark")
    }

    if(data.types[0].type.name === "dragon"){
        cards.classList.add("dragon")
    }

    if(data.types[0].type.name === "ice"){
        cards.classList.add("ice")
    }

    if(data.types[0].type.name === "ghost"){
        cards.classList.add("ghost")
    }

    if(data.types[0].type.name === "fighting"){
        cards.classList.add("fighting");
    }

    if(data.types[0].type.name === "steel"){
        cards.classList.add("steel");
    }

    if(data.types[0].type.name === "fairy"){
        cards.classList.add("fairy");
    }

    if(data.types[0].type.name === "rock"){
        cards.classList.add("rock");
    }

    if(data.types[0].type.name === "flying"){
        cards.classList.add("flying");
    }
}


async function pushingToTeam(id){ 
    const dataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await dataFetch.json();
    
    if(myTeamCont.children.length < 6){
        createHtml(data,myTeamCont)
        const children = myTeamCont.children
        const removeBtn = document.createElement("div");
        const html =`<button class="remove-btn" onclick="removingTeam(${data.id})">X</button>`
        removeBtn.innerHTML = html
       

        Array.from(children).forEach(child=>{
            child.appendChild(removeBtn)
            
        })

    }else{
        false
    }
}


async function removingTeam(id){
    const dataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await dataFetch.json();
    const children = myTeamCont.children
  }


 

 function createHtml(data,container,pokeCard){
    const pokemonInfo = `
    <div class="img-cont">
        <img src="${data.sprites.front_default}">
    </div>
    <div class="info-cont">
        <div class="name">
            <div class="number">${data.id}.</div>
                <h2>${upperCase(data)}</h2>
        </div>
        <div class="types">Type: ${data.types.map((type) => upperCase(type.type))}</div>
        <div class="add-team-btn" onclick="pushingToTeam(${data.id})">Add to team</div>
    </div>
    ` 
       pokeCard = document.createElement("div");
        pokeCard.classList.add("poke-card")
        pokeCard.innerHTML = pokemonInfo;
        container.appendChild(pokeCard);
        
        

        typeColors(data,pokeCard)

}

 async function getPokemon(){ 
     result = input.value;
     const dataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${result}`)
     const data = await dataFetch.json();    
     createHtml(data,allPokemonCont);
 }

 function clear(){
     
     allPokemonCont.innerHTML= "";
     input.value = "";
 }

 async function getAllPokemons(){
    const promises = [];
    for(let i = 1; i < pokemonList ; i++){
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json()))
    }

    await Promise.all(promises).then(datas =>{
         datas.map(data =>{
            createHtml(data, allPokemonCont);
        });
    })
    loading.classList.remove("load");
}



//Event Listeners

search.addEventListener("click", (e)=>{
    e.preventDefault();
    getPokemon(); 
    clear()
});

allPokemonBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    loading.classList.add("load");
    getAllPokemons();
    clear();
});


