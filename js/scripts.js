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
  if (typeof (pokemon) === 'object')
  pokemonList.push(pokemon)
  }else{
  return 'not a pokemon'
}

return {
    getAll: getAll,
    add: add
  };


// foreach loop
document.write('<ul>')
    function printPokemonList(pokemon) {
        document.write('<li>')
            document.write(pokemon.name  +  pokemon.height);
                if (pokemon.height > 3){
                  document.write(" Wow, that’s big! ")
  }
        document.write('</li>')
}
document.write('</ul>')

pokemonRepository.getAll().forEach(printPokemonList);


//bonus
// added object.keys to

  function validate(pokemon) {
  if(typeof(pokemon) === 'object'&&
  Object.keys(pokemon)[0] === 'name' &&
  Object.keys(pokemon)[1] === 'height' &&
  Object.keys(pokemon)[2] === 'type', 'type'){
  pokemonList.push(pokemon);
  }else{
  return 'not a pokemon'
    }
  }

  //create filter function() to find pokemon by name

  function findPokemon(pokemonName){
  return pokemonRepositor.filter (pokemon => pokemon.name === pokemonName)
  }
