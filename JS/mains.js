
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const gif = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const proximo = document.querySelector('.btn-next');
const anterior = document.querySelector('.btn-prev');

let searchPokemon = 1;

const fetchPokemon = async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status ==200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'CARREGANDO';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if(data){
     gif.style.display = 'block';
     pokemonName.innerHTML = data.name;
     pokemonNumber.innerHTML = data.id;
     gif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
     input.value = '';//limpar input
     searchPokemon = data.id;
    } else{
        gif.style.display = 'none';
        pokemonName.innerHTML = 'Não existe';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', () => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

})

proximo.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})
anterior.addEventListener('click', () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

renderPokemon(searchPokemon);


