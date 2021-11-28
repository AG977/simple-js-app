// array of objects

let pokemonRepository = (function () {
let repository = [
  { name: 'Pikachu', height: 0.4, types: ['electric']},
  { name: 'Moltres', height: 2, types: ['fire', 'flying']},
  { name: 'Lugia', height: 5.2, types:['psychic', 'flying']},
];

function getAll() {
  return repository;
}

// Includes Bonus part to Check if information added is an object
function add(pokemon) {
  if (typeof pokemon === 'object' &&
     "name" in pokemon &&
     "height" in pokemon &&
     "types" in pokemon
   ) {
    repository.push(pokemon)
  }else{
    console.log('not a pokemon')
  }
};

// bonus - added object.keys
function validate(pokemon) {
  if(typeof(pokemon) === 'object'&&
  Object.keys(pokemon)[0] === 'name' &&
  Object.keys(pokemon)[1] === 'height' &&
  Object.keys(pokemon)[2] === 'type'){
    repository.push(pokemon);
  }else{
    return 'not a pokemon'
  }
};

// bonus - create filter function() to find pokemon by name
function findPokemon(pokemonName){
  return prepository.filter (pokemon => pokemon.name === pokemonName)
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
    eventbutton(button, pokemon);
};

//more advanced
function eventbutton(button, pokemon){
  button.addEventListener('click', function(){
    showDetails(pokemon)
  }
)}

//add function showDetails()
function showDetails(pokemon){
  console.log(pokemon);
};

//Allows the function to be used outside of the IIFE
return {
  getAll: getAll,
  add: add,
  validate: validate,
  findPokemon: findPokemon,
  addListItem: addListItem,
  showDetails: showDetails,
  eventbutton: eventbutton,
  };
})()//end of iife


// Foreach loop for addListItem
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
