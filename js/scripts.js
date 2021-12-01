// array of objects

let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let loadingTitle = document.querySelector(".loading-title");


//start adding function's
// function that returns all the pokemons in the list
function getAll() {
  return pokemonList;
};

// Function thet enables to add a new pokemon to the list
function add(pokemon) {
  if ( validate (pokemon)) {
    pokemonList.push(pokemon);
  }else{
    console.log('not a pokemon');
  }
};

// function that validates if pokemon added is added in the correct way
function validate(pokemon) {
  return (typeof pokemon === 'object' &&  "name" in pokemon)
};

// function that filter's pokemon by it's name
function findPokemon(pokemonName){
  return pokemonList.filter (pokemon => pokemon.name === pokemonName)
};

//Function that prints a single pokemon on the list
function addListItem(pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let listpokemon = document.createElement('li');
  let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function (event){
      showDetails(pokemon);
    })
  };

  //function showLoadingMessage + hideLoadingMessage lets a message appear while loading the page
 function showLoadingMessage(){
   loadingTitle.classList.remove('hidden')
 };

 function hideLoadingMessage(){
   loadingTitle.classList.add('hidden')
 };


//function:loadList(promise) enables to load the list of pokemon from the internet site attached
function loadList() {
   showLoadingMessage();
   return fetch(apiUrl).then(function (response) {
     return response.json();
   }).then(function (json) {
     json.results.forEach(function (item) {
       let pokemon = {
         name: item.name,
         detailsUrl: item.url
       };
       add(pokemon);
       hideLoadingMessage();
     });
   }).catch(function (e) {
     hideLoadingMessage();
     console.error(e);
   })
 };

 //function: loadDetails - enables to load the details of the pokemon from the attched internet site
 function loadDetails(item) {
   showLoadingMessage();
   let url = item.detailsUrl;
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     // Now we add the details to the item
     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.types = details.types;
     hideLoadingMessage();
   }).catch(function (e) {
     hideLoadingMessage();
     console.error(e);
   })
 };

 // function: showDetails - lets us see all the details about te pokemon in the console view
 function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    })
  };

//Allows the function to be used outside of the IIFE
return {
  getAll: getAll,
  add: add,
  validate: validate,
  findPokemon: findPokemon,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showLoadingMessage: showLoadingMessage,
  hideLoadingMessage: hideLoadingMessage,
  };
})()//end of iife

// Foreach loop for addListItem

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
