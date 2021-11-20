// array of objects
let pokemonList = [
  { name: 'Pikachu', height: 0.4, types: ['electric']},
  { name: 'Moltres', height: 2, types: ['fire', 'flying']},
  { name: 'Lugia', height: 5.2, types:['psychic', 'flying']},
];


// foreach loop

function myLoopFunction(pokemon) {
  document.write('<li>')
  document.write(pokemon.name + pokemon.height);
  if (pokemon.height > 3){
  document.write(" Wow, that’s big! ")
  }
  document.write('</li>')
}

document.write('<ul>')
  pokemonList.forEach(myLoopFunction)
document.write('</ul>')
