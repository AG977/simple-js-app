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

// Check if information added is an object
function add(pokemon) {
  if(typeof Pokemon === 'object')
    pokemonList.push(pokemon);
  } else {
    return 'failed'
  }

return {
    getAll: getAll,
    add: add
  };
})();


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

  if(object.keys  === 'object'){
    return 'All good'
  }else{
    return 'problem';
  }

  //create filter function() to find pokemon by name

  function filterItems(pokemonName){
    return pokemonName.filter(function(name) {
      return name

  }
