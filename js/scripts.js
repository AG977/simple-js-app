// array of objects

let pokemonRepository = (function () {
let pokemonList = [
  { name: 'Pikachu', height: 0.4, types: ['electric']},
  { name: 'Moltres', height: 2, types: ['fire', 'flying']},
  { name: 'Lugia', height: 5.2, types:['psychic', 'flying']},
];

function getAll() {
  return pokemonList;
}

// Includes Bonus part to Check if information added is an object
function add(pokemon) {
  if (typeof pokemon === 'object'){
  pokemonList.push(pokemon)
  }else{
  return 'not a pokemon'
  }
};

function printPokemonList(pokemon) {
  document.write('<li>' + pokemon.name  +  pokemon.height);
  if (pokemon.height > 3){
  document.write(" Wow, that’s big! ")
  }
  document.write('</li>')
};

// bonus - added object.keys
function validate(pokemon) {
  if(typeof(pokemon) === 'object'&&
  Object.keys(pokemon)[0] === 'name' &&
  Object.keys(pokemon)[1] === 'height' &&
  Object.keys(pokemon)[2] === 'type'){
  pokemonList.push(pokemon);
  }else{
  return 'not a pokemon'
  }
};

// bonus - create filter function() to find pokemon by name
function findPokemon(pokemonName){
  return pokemonList.filter (pokemon => pokemon.name === pokemonName)
};

return {
  getAll: getAll,
  add: add,
  validate: validate,
  findPokemon: findPokemon,
  printPokemonList: printPokemonList,
  };
//end of iife
})()

document.write('<ul>')
pokemonRepository.getAll().forEach(pokemonRepository.printPokemonList)
document.write('</ul>')
