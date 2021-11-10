// array of objects
let pokemonList = [
  { name: ' Pikachu ', height: 0.4, types: ['electric']},
  { name: ' Moltres ', height: 2, types: ['fire', 'flying']},
  { name: ' Lugia ', height: 5.2, types:['psychic', 'flying']},
];


//creating a 'For' loop to show the pokemonlist
for (let i = 0; i < pokemonList.length; i++) {
  document.write("<ul>")
  document.write(pokemonList[i].name + pokemonList[i].height)

  // Added conditional to check if height is above 3M
  if (pokemonList[i].height > 3){
    document.write(" Wow, that’s big! ");
  }
}
