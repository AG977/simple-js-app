// array of objects

let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let loadingTitle = document.querySelector(".loading-title");



//start adding function's
function getAll() {
  return pokemonList;
}

// Includes Bonus part to Check if information added is an object
function add(pokemon) {
  if (
    typeof pokemon === 'object' &&
     "name" in pokemon
   ) {
    pokemonList.push(pokemon);
  }else{
    console.log('not a pokemon');
  }
};

// bonus - added object.keys
function validate(pokemon) {
  if(typeof(pokemon) === 'object'&&
  Object.keys(pokemon)[0] === 'name'){
    pokemonList.push(pokemon);
  }else{
    return 'not a pokemon'
  }
};

// bonus - create filter function() to find pokemon by name
function findPokemon(pokemonName){
  return pokemonList.filter (pokemon => pokemon.name === pokemonName)
};

//Continue task 1.6 - creating AddListItem function
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
    });
  }

  //bonus 1.7
  function showLoadingMessage(){
  loadingTitle.classList.remove('hidden')
}

function hideLoadingMessage(){
  loadingTitle.classList.add('hidden')
}

//add function showDetails()
function showDetails(pokemon){
  console.log(pokemon);
};

//add promise function:loadList(1.7)
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
       console.log(pokemon);
       hideLoadingMessage();
     });
   }).catch(function (e) {
     hideLoadingMessage();
     console.error(e);
   })
 }

 // add function loadDetails
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
   });
 }

 // add function: showDetails
 function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

//Allows the function to be used outside of the IIFE
return {
  getAll: getAll,
  add: add,
  validate: validate,
  findPokemon: findPokemon,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  loadDetails: loadDetails,
  showDetails: showDetails
  };
})()//end of iife

// Foreach loop for addListItem

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
