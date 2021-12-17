
let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let loadingTitle = document.querySelector(".loading-title");
let modalContainer = document.querySelector('#modal-container');

// function that returns all the pokemons in the list
function getAll() {
  return pokemonList;
};

// Function thet enables to add a new pokemon to the list
function add(pokemon) {
  if ( validate (pokemon)) {
    pokemonList.push(pokemon);
  }else{
    console.log('not a pokemon');
  }
};

// function that validates if pokemon added is added in the correct way
function validate(pokemon) {
  return (typeof pokemon === 'object' &&  "name" in pokemon)
};

// function that filter's pokemon by it's name
function findPokemon(pokemonName){
  return pokemonList.filter (pokemon => pokemon.name === pokemonName)
};

//Function that prints a single pokemon on the list
function addListItem(pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let listpokemon = document.createElement('li');
  listpokemon.setAttribute('data-toggle', 'modal');
  listpokemon.setAttribute('data-target', '#exampleModal');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class','btn');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener('click', function (event){
    showDetails(pokemon);
  })
};

  //function showLoadingMessage + hideLoadingMessage lets a message appear while loading the page
 function showLoadingMessage(){
   loadingTitle.classList.remove('hidden')
 };

 function hideLoadingMessage(){
   loadingTitle.classList.add('hidden')
 };


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
     console.error(e);
   })
 };

 //function: loadDetails - enables to load the details of the pokemon from the attched internet site
 function loadDetails(pokemon) {
   showLoadingMessage();
   let url = pokemon.detailsUrl;
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     // Now we add the details to the item
     pokemon.imageUrl = details.sprites.other['official-artwork'].front_default;
     pokemon.height = details.height;
    pokemon.weight = details.weight;
     pokemon.types = details.types.type.name;
     hideLoadingMessage();
   }).catch(function (e) {
     hideLoadingMessage();
     console.error(e);
   })
 };

 // function: showDetails - lets us see all the details about te pokemon in the console view
 function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log('click');
    })
  };

  // Function that shows the detail used in the modal
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header')

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
    let typeselement = $('<p>' + 'Type(s): ' + pokemon.type + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeselement);

    //modalContainer.classList.add('is-visible');
  }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });


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
  showModal: showModal,
  hideModal: hideModal,
  };
})()

// Foreach loop for addListItem
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
