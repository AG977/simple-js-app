// array of objects
let pokemonList = [
  { name: ' Pikachu ', height: 0.4, types: ['electric']},
  { name: ' Moltres ', height: 2, types: ['fire', 'flying']},
  { name: ' Lugia ', height: 5.2, types:['psychic', 'flying']},
];

//creating a 'For' loop to show the pokemonlist and Added conditional to check if height is above 3M

document.write('<ul>')
for (let i = 0; i < pokemonList.length; i++) {
  document.write('<li>')
  document.write(pokemonList[i].name + pokemonList[i].height)
  if (pokemonList[i].height > 3){
  document.write(" Wow, that’s big! ")
  document.write('<li>')
  document.write('</ul>')
  }
}
