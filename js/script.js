const PokemonName = document.querySelector('.pokemon__name');
const PokemonNumber = document.querySelector('.pokemon__number');
const PokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

//Pegando os dados e tratando para o formato JSON

const fetchPokemon = async (pokemon) => {
  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIresponse.status == 200) {
    const data = await APIresponse.json();
    return data;
  }
}

//renderizar os dados na tela

const renderPokemon = async (pokemon) => {

  PokemonName.innerHTML = 'Loading ...';
  PokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  if (data) {
    PokemonImage.style.display = 'block';
    PokemonName.innerHTML = data.name;
    PokemonNumber.innerHTML = data.id;
    PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    PokemonImage.style.display = 'none';
    PokemonName.innerHTML =  'Not Found';
    PokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if(searchPokemon >1){
    searchPokemon -=1;
    renderPokemon(searchPokemon);
  }
  
});

buttonNext.addEventListener('click', () => {
  searchPokemon +=1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);