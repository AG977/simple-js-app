
let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let loadingSpinner = document.querySelector('.loading-spinner');
let scrollButton= document.querySelector('.scroll-button');

scrollButton.addEventListener('click', function(){
  window.scrollTo(0,0)
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
}
// function that returns all the pokemons in the list
function getAll() {
  return pokemonList;
}

// Function thet enables to add a new pokemon to the list
function add(pokemon) {
  if ( validate (pokemon)) {
    pokemonList.push(pokemon);
  }
}

// function that validates if pokemon added is added in the correct way
function validate(pokemon) {
  return (typeof pokemon === 'object' &&  'name' in pokemon)
}

// function that filter's pokemon by it's name
function findPokemon(pokemonName){
  return pokemonList.filter (pokemon => pokemon.name === pokemonName)
}

//Function that prints a single pokemon on the list
function addListItem(pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let listpokemon = document.createElement('li');
  listpokemon.classList.add('list-group-item');
  let button = document.createElement('button');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#pokemonModal');
  button.innerText = pokemon.name;
  button.classList.add('button-class','btn');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener('click', function (event){
    showDetails(pokemon);
  })
}

  //function showLoadingMessage + hideLoadingMessage lets a message appear while loading the page
 function showLoadingMessage(){
   loadingSpinner.classList.remove('hidden')
 }

 function hideLoadingMessage(){
   loadingSpinner.classList.add('hidden')
 }


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
   })
 }

 //function: loadDetails - enables to load the details of the pokemon from the attched internet site
 function loadDetails(pokemon) {
   showLoadingMessage();
   let url = pokemon.detailsUrl;
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     // Now we add the details to the item
     pokemon.name = details.name;
     pokemon.imageUrl = details.sprites.other['official-artwork'].front_default;
     pokemon.height = details.height;
     pokemon.weight = details.weight;
     pokemon.types = details.types.map(type => type.type.name)
     hideLoadingMessage();
   }).catch(function (e) {
     hideLoadingMessage();
   })
 }

 // function: showDetails - lets us see all the details about te pokemon in the console view
 function showDetails(pokemon) {
   showLoadingMessage();
    pokemonRepository.loadDetails(pokemon).then(function () {
      printDetailsInModal(pokemon);
      hideLoadingMessage();
    })
  }

  // Function that shows the detail used in the modal
  function printDetailsInModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-header');

    //clear existing content from modal
    modalTitle.empty();
    modalBody.empty();

    //Creating element for name in modal content
    let nameElement = $('<h1>' + pokemon.name + '</h1>');

    //Creating img in modal content
    let imageElement = $('<img class="modal-img">');
    imageElement.attr('src', pokemon.imageUrl);

    //Creating element for height in modal content
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    //Creating element for weight in modal content
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    //Creating element for type in modal content
    let typeselement = $('<p>' + 'Type(s): ' + pokemon.types + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeselement);

  }

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
  printDetailsInModal: printDetailsInModal,
};
})()

// Foreach loop for addListItem
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
