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

function add(pokemon) {
    pokemonList.push(pokemon);
  }

return {
    getAll: getAll,
    add: add
  };
})();


// foreach loop
document.write('<ul>')
function myLoopFunction(pokemon) {
document.write('<li>')
document.write(pokemon.name  +  pokemon.height);
if (pokemon.height > 3){
document.write(" Wow, that’s big! ")
  }
}
pokemonRepository.getAll().forEach(myLoopFunction);
document.write('</li>')
document.write('</ul>')
